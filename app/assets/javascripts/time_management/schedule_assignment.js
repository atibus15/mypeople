//= require components/list_grid
//= require components/combo_modal
//= require components/employee
//= require_self
var selections = createLocalDataFromServer('/client/default_selections.json');
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
            store:createJsonStore('/workskeds/setupList.json', 'id', true),
            columns:[
                {groupable:false, hideable:false,text:'Schedule Code', dataIndex:'workskedcode'},
                {groupable:false, hideable:false,text:'Schedule Description', dataIndex:'description', width:200},
                {groupable:false, hidden:false ,text:'Created Date', dataIndex:'createddate'},
                {groupable:false, hidden:false ,text:'Created by', dataIndex:'createdby'},
                {groupable:false, hidden:false ,text:'Last Updated Date', dataIndex:'lastupdatedate'},
                {groupable:false, hidden:false ,text:'Last Updated by', dataIndex:'lastupdateby'}
            ]
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        this.callParent(arguments);
        this.initConfig(configs);
        this.store.on('load',function(store){
            store.group('company');
        })
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
            layout:'hbox',
            items:[
                {
                    title:'Work Schedules',
                    xtype:'schedulegrid',
                    width:'50%',
                    height:'100%',
                    id:'worksked-grid'
                },
                {
                    xtype:'employeelist',
                    title:'Employees',
                    id:'schedule-employee-list',
                    store:createJsonStore('/schedule/assigned_employees.json', 'empidno', false, 'total_employee'), 
                    width:'50%', 
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
                                    fieldLabel:'Employee Status',
                                    xtype:'peoplecheckbox',
                                    checked:true,
                                    boxLabel:'Active'
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

                                        Ext.create('People.editor.Window',{
                                            title:'Schedule Date Range',
                                            id:'schedule-date-range-window',
                                            enterFn:function(){
                                                me.createEmployeePicker();
                                            },
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
                                            buttons:[
                                                {
                                                    text:'Set',
                                                    handler:function(){
                                                        if(!ExtCmp('schedule-start-date').getValue()) return notify('Start Date is required.', 'warning');
                                                        me.createEmployeePicker();
                                                    }
                                                }
                                            ]
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
    },
    consolidateRecordChanges:function(selected_employee){
        var me = this;
        var consolidated_selections = [];
        var new_records = selected_employee.queryBy(function(rec){
            return (typeof(rec.get('empsked_id')) == 'undefined');
        });
        // var deleted_records = selections.getRemovedRecords();
        // Ext.each(deleted_records, function(employee){
        //     consolidated_selections.push({
        //         action:'destroy',
        //         mypclient_id:employee.get('mypclient_id'),
        //         company_id:employee.get('company_id'),
        //         empidno:employee.get('empidno'),
        //         worksked_id:me.selected_schedule.get('id')
        //     });
        // });

        new_records.each(function(employee){
            consolidated_selections.push({
                action:'create',
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
                }
                else{
                    notify(response.errormsg, 'error'); return false;
                }
            }
        })

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
        return this.getComponent(1);
    },
    getLocationID:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(1);
    },
    getDisplayBox:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(0);
    },
    getEmployeeStatus:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(2);
    }
});


Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items: [
            {
                region:'west',
                xtype:'gridpanel',
                collapsed:true,
                collapsible:true,
                width:450,
                forceFit:true,
                split:true,
                store:createJsonStore('/employees/without_schedule.json', 'id', true),
                title:'Employees without assigned Schedule',
                columns:[
                    {maxWidth:60,dataIndex:'empidno',text:'ID No.'},
                    {dataIndex:'empfullnamelfm',text:'Fullname'},
                    {dataIndex:'company',text:'Company'}
                ]
            },
            {
                region:'center',
                title:'Schedule Assignment',
                xtype:'scheduleassignment'
            }
        ]
    });
});