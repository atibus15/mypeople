//= require components/list_grid
//= require components/combo_modal
//= require components/employee
//= require ./exception_grid
//= require ./current_assignment
//= require_self

var selections = createLocalDataFromServer('/client/default_selections.json');
var schedules =  createLocalDataFromServer('/workskeds/setupList.json');
var schedule_store = createLocalStore(schedules);
schedule_store.group('company');

Ext.define('People.schedule.DateRange',{
    extend:'People.editor.Window',
    xtype:'scheduledaterange',
    title:'Schedule Date Range',
    id:'schedule-date-range-window',
    items:[
        {
            xtype:'datefield',
            fieldLabel:'Start Date',
            id:'schedule-start-date'
        },
        {
            xtype:'datefield',
            fieldLabel:'End Date',
            id:'schedule-end-date'
        }
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            enterFn:function(){
                me.setFn();
            },
            buttons:[
                {
                    text:'Set',
                    handler:function(){
                        me.setFn();
                    }
                }
            ]
        });
        me.callParent(arguments);
    }
})

Ext.define('People.employee.Assignment',{
    extend:'People.editor.Window',
    xtype:'employeeassignment',
    title:'Employee to Schedule',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            enterFn:function(){
                me.saveAssignment();
            },
            tbar:[
                {
                    iconCls:'save-icon',
                    tooltip:'Save Assignment',
                    handler:function(){
                        me.saveAssignment();
                    }
                }
            ],
            items:[
                {
                    id:'employee-assignment-form',
                    items:[
                        {
                            fieldLabel:'Full Name',
                            xtype:'displayfield',
                            value:me.employee.get('empfullnamelfm')
                        },
                        {
                            xtype:'combomodal',
                            fieldLabel:'Policy',
                            labelWidth:55,
                            id:'employee-schedule-id',
                            valueField:'id',
                            codeField:'workskedcode',
                            displayField:'description',
                            triggerAction:'all',
                            queryMode:'local',
                            editable:false,
                            store:me.store,
                            changeFn:function(){},
                            width:225
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    saveAssignment:function(){
        var me  = this,
        schedule_id = Ext.getCmp('employee-schedule-id').getValue();

        if(!schedule_id) return notify('Schedule is required.', 'warning');

        var assignee = [{   
            mypclient_id:me.employee.get('mypclient_id'),
            company_id:me.employee.get('company_id'),
            empidno:me.employee.get('empidno'),
            worksked_id:schedule_id,
            startdate:Ext.util.Format.date(Ext.getCmp('schedule-start-date').getValue(),'m/d/Y'),
            enddate:Ext.util.Format.date(Ext.getCmp('schedule-end-date').getValue(),'m/d/Y')
        }];

        Ext.Ajax.request({
            url:'/schedule/update_assignment',
            method:'POST',
            params:{
                authenticity_token:authToken(),
                emp_schedule:Ext.JSON.encode(assignee)
            },
            callback:function(success, option, result){
                var response = Ext.JSON.decode(result.responseText);
                if(response.success){
                    notify(response.notice, 'success');
                    Ext.getCmp('schedule-date-range-window').destroy();
                    if(me.source == 'unassigned')Ext.getCmp('schedule-exception-grid').removeEmployees(assignee);
                    me.destroy();
                    Ext.getCmp('schedule-assignment-panel').loadCurrentlyAssignedEmployees();
                }
                else{
                    notify(response.errormsg, 'error'); return false;
                }
            }
        });
    }
});

Ext.define('People.schedule.Grid',{
    extend:'Ext.grid.GridPanel',
    require:['Ext.form.*', 'Ext.grid.*'],
    alias:'widget.schedulegrid',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            forceFit:true,
            features:[Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'})],
            viewConfig:{
                shirnkWrap:true
            },
            store:schedule_store,
            columns:[
                {groupable:false, hideable:false,text:'Schedule Code', dataIndex:'workskedcode'},
                {groupable:false, hideable:false,text:'Schedule Description', dataIndex:'description', width:200},
                {groupable:false, hidden:true, text:'Created Date', dataIndex:'createddate'},
                {groupable:false, hidden:true, text:'Created by', dataIndex:'createdby'},
                {groupable:false, hidden:true, text:'Last Updated Date', dataIndex:'lastupdatedate'},
                {groupable:false, hidden:true, text:'Last Updated by', dataIndex:'lastupdateby'}
            ]
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        this.callParent(arguments);
        this.initConfig(configs);
        // this.store.on('load',function(store){
        //     store.group('company');
        // })
    },
    getSelected:function(){
        return this.getSelectionModel.getLastSelected();
    }
});


Ext.define('People.schedule.Assignment',{
    extend:'Ext.panel.Panel',
    alias:'widget.scheduleassignment',
    require:['Ext.grid.*', 'People.employee.Grid'],
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            layout:'border',
            items:[
                {
                    region:'west',
                    title:'Work Schedules',
                    xtype:'schedulegrid',
                    width:'40%',
                    height:'100%',
                    id:'worksked-grid',
                    split:true
                },
                {
                    region:'center',
                    xtype:'employeelist',
                    title:'Assigned Employees',
                    id:'schedule-employee-list',
                    store:createJsonStore('/schedule/assigned_employees.json', 'empidno', false, 'total_employee'), 
                    width:'60%', 
                    height:'100%',
                    dockedItems:[
                        {
                            dock:'top',
                            xtype:'toolbar',
                            layout:{type:'table',columns:4},
                            items:[
                                {
                                    xtype:'box',
                                    width:'100%',
                                    html:'&nbsp;',
                                    padding:'0 0 0 3',
                                    style:'font-weight:bolder',
                                    colspan:4
                                },
                                {
                                    xtype:'combomodal',
                                    fieldLabel:'Location',
                                    labelWidth:55,
                                    emptyText:'Location',
                                    valueField:'id',
                                    codeField:'code',
                                    displayField:'desc',
                                    triggerAction:'all',
                                    queryMode:'local',
                                    editable:false,
                                    changeFn:function(){},
                                    width:225
                                },
                                {
                                    iconCls:'search-icon',
                                    tooltip:'Filter Employee',
                                    handler:function(){
                                        var schedule = me.selected_schedule;
                                        if(!schedule){
                                            notify('Please select work schedule.', 'warning');
                                            return false;
                                        }
                                        me.loadCurrentlyAssignedEmployees();
                                    }
                                },
                                {
                                    fieldLabel:'Employee Status',
                                    xtype:'peoplecheckbox',
                                    checked:true,
                                    boxLabel:'Active'
                                },
                                {
                                    iconCls:'add-icon',
                                    tooltip:'Manage',
                                    handler:function(){
                                        var schedule = me.selected_schedule;
                                        if(!schedule){
                                            notify('Please select work schedule.', 'warning');
                                            return false;
                                        }
                                        var schedule_id = schedule.get('id');
                                        var company_id = schedule.get('company_id');

                                        Ext.create('People.schedule.DateRange',{
                                            setFn:function(){
                                                if(!ExtCmp('schedule-start-date').getValue()) return notify('Start Date is required.', 'warning');
                                                me.createEmployeePicker();
                                            }
                                        }).show();
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    createEmployeePicker:function(){
        var me = this;
        var schedule = me.selected_schedule;
        if(!schedule){
            notify('Please select work schedule.', 'warning');
            return false;
        }
        var schedule_id = schedule.get('id');
        var company_id = schedule.get('company_id');

        Ext.create('People.employee.Selector',{
            id:'schedule-employee-selector',
            saveFn:function(selector){
                var selected_employee = selector.getSelectedEmployeeGrid().getStore();
                me.saveChanges(selected_employee);
            },
            resultStore:createJsonStore('/employee/list.json?company_id='+company_id, 'empidno', false, 'total_employee'),
            selectedStore:[] //createJsonStore('/schedule/assigned_employees.json?schedule_id='+schedule_id, 'empidno', false)
        }).show();
    },
    constructor:function(configs){
        var me =this;
        me.callParent(arguments);
        me.initConfig(configs);

        me.getScheduleGrid().on('itemdblclick',function(view, new_schedule){
            me.loadCurrentlyAssignedEmployees(new_schedule)
        });
        me.getScheduleGrid().on('select',function(view, new_schedule){
            me.setSelectedSchedule(new_schedule);
            me.updateDisplayBox();
            me.bindLocationStore();
        });

        me.getScheduleGrid().on('selectionchange',function(view, schedule){
            me.getEmployeeGrid().store.removeAll();
        });

        me.getEmployeeGrid().on('itemdblclick',function(view,record){
            assignEmployeeToSchedule(record);
        });
    },
    consolidateRecordChanges:function(selected_employees){
        var me = this;
        var consolidated_selections = [];

        selected_employees.each(function(employee){
            consolidated_selections.push({
                mypclient_id:employee.get('mypclient_id'),
                company_id:employee.get('company_id'),
                empidno:employee.get('empidno'),
                worksked_id:me.selected_schedule.get('id'),
                startdate:Ext.util.Format.date(Ext.getCmp('schedule-start-date').getValue(),'m/d/Y'),
                enddate:Ext.util.Format.date(Ext.getCmp('schedule-end-date').getValue(),'m/d/Y')
            });
        });

        return Ext.JSON.encode(consolidated_selections);
    },
    saveChanges:function(selected_employee){
        var me = this;
        var consolidated_records = me.consolidateRecordChanges(selected_employee);
        Ext.Ajax.request({
            url:'/schedule/update_assignment',
            method:'POST',
            params:{
                authenticity_token:authToken(),
                emp_schedule:consolidated_records
            },
            callback:function(success, option, result){
                var response = Ext.JSON.decode(result.responseText);
                if(response.success){
                    notify(response.notice, 'success');
                    Ext.getCmp('schedule-employee-selector').destroy();
                    Ext.getCmp('schedule-date-range-window').destroy();
                    me.loadCurrentlyAssignedEmployees();
                    Ext.getCmp('schedule-exception-grid').removeEmployees(Ext.JSON.decode(consolidated_records));
                }
                else{
                    notify(response.errormsg, 'error'); return false;
                }
            }
        });

    },
    setSelectedSchedule:function(new_schedule){
        this.selected_schedule = new_schedule;
    },
    bindLocationStore:function(){
        var schedule = this.selected_schedule;

        var new_location_store = createLocalStore(filterStoreData(selections.locations,{"company_id":schedule.get('company_id')}));
        this.getLocationID().bindStore(new_location_store);
    },
    updateDisplayBox:function(){
        var schedule = this.selected_schedule;
        var schedule_code = schedule.get('workskedcode');
        var schedule_desc = schedule.get('description');
        this.getDisplayBox().update('Schedule : '+schedule_code+' - '+schedule_desc);
    },
    loadCurrentlyAssignedEmployees:function(){
        var schedule = this.selected_schedule;
        if(!schedule) return false;

        var schedule_id  = schedule.get('id');
        var company_id = schedule.get('company_id');
        var status = this.getEmployeeStatus().getValue() ? 1 : 0;
        var location_id = this.getLocationID().getValue();
        var new_location_data = filterStoreData(selections.locations, {'company_id':company_id});
        this.getLocationID().bindStore(createLocalStore(new_location_data));
        this.getLocationID().setValue(null);

        this.getEmployeeGrid().store.load({
            params:{
                schedule_id:schedule_id,
                location_id:location_id,
                status:status
            }
        });

    },
    getScheduleGrid:function(){
        return this.getComponent(0);
    },
    getEmployeeGrid:function(){
        return this.getComponent(2);
    },
    getLocationID:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(1);
    },
    getDisplayBox:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(0);
    },
    getEmployeeStatus:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(3);
    }
});


function assignEmployeeToSchedule(employee, source){
    var company_id = employee.get('company_id');
    var schedule_selection_store = createLocalStore(filterStoreData(schedules, {'company_id': company_id}));
    Ext.create('People.schedule.DateRange',{
        setFn:function(){
            if(!ExtCmp('schedule-start-date').getValue()) return notify('Start Date is required.', 'warning');
            Ext.create('People.employee.Assignment',{
                employee:employee,
                store :schedule_selection_store, 
                source:source
            }).show();
        }
    }).show();
}

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items: [
            {
                region:'west',
                xtype:'exceptiongrid',
                id:'schedule-exception-grid',
                collapsed:true,
                collapsible:true,
                split:true,
                store:createJsonStore('/employees/without_schedule.json', 'id', true),
                title:'Unassigned Employees'
            },
            {
                region:'center',
                title:'Schedule Assignment',
                xtype:'scheduleassignment',
                id:'schedule-assignment-panel'
            },
            {
                region:'east',
                split:true,
                collapsed:true,
                collapsible:true,
                xtype:'currentassignmentgrid',
                title:'Current Assignments',
                id:'policy-current-assignment',
                store:createJsonStore('/schedule/assigned_employees.json', 'empidno', false, 'total_employee'),
                width:'30%'
            }
        ]
    });

    var exception_grid = Ext.getCmp('schedule-exception-grid');
    exception_grid.on('itemdblclick',function(view, record){
        assignEmployeeToSchedule(record, 'unassigned');
    });
    exception_grid.store.on('load',function(store, records){
        if(records.length > 0) exception_grid.expand(true);
    });

    Ext.getCmp('policy-current-assignment').on('itemdblclick',function(view, record){
        assignEmployeeToSchedule(record);
    });

});