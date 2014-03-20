//= require components/list_grid
//= require components/combo_modal
//= require components/employee
//= require ./exception_grid
//= require_self

Ext.define('People.policy.Grid',{
    extend:'Ext.grid.GridPanel',
    require:['Ext.form.*', 'Ext.grid.*'],
    alias:'widget.policygrid',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            forceFit:true,
            features:[Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'})],
            viewConfig:{
                shirnkWrap:true
            },
            store:createJsonStore('/workskedpolicies/client_list.json', 'id', true),
            columns:[
                {groupable:false, hideable:false,text:'Policy Code', dataIndex:'policycode'},
                {groupable:false, hideable:false,text:'Policy Description', dataIndex:'description', width:200},
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


Ext.define('People.policy.Assignment',{
    extend:'Ext.panel.Panel',
    alias:'widget.policyassignment',
    require:['Ext.grid.*', 'People.employee.Grid'],
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            layout:'hbox',
            items:[
                {
                    title:'Work Policies',
                    xtype:'policygrid',
                    width:'50%',
                    height:'100%',
                    id:'policy-grid'
                },
                {
                    xtype:'employeelist',
                    title:'Employees',
                    id:'policy-employee-list',
                    store:createJsonStore('/policy/assigned_employees.json', 'empidno', false, 'total_employee'), 
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
                                        var policy = me.getSelectedPolicy();
                                        if(!policy){
                                            notify('Please select policy.', 'warning');
                                            return false;
                                        }
                                        me.loadCurrentlyAssignedEmployees();
                                    }
                                },
                                {
                                    iconCls:'add-icon',
                                    tooltip:'Manage',
                                    handler:function(){
                                        me.createEmployeePicker();
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
        var policy = me.getSelectedPolicy();
        if(!policy){
            notify('Please select policy.', 'warning');
            return false;
        }

        var policy_id = policy.get('id');
        var company_id = policy.get('company_id');

        Ext.create('People.employee.Selector',{
            id:'policy-employee-selector',
            saveFn:function(selector){
                var selections = selector.getSelectedEmployeeGrid().getStore();
                me.saveChanges(selections);
            },
            resultStore:createJsonStore('/employee/list.json?company_id='+company_id, 'empidno', false, 'total_employee'),
            selectedStore:[] //createJsonStore('/policy/assigned_employees?policy_id='+policy_id, 'empidno', false)
        }).show();
    },

    constructor:function(configs){
        var me =this;
        me.callParent(arguments);
        me.initConfig(configs);

        me.getPolicyGrid().on('itemdblclick',function(view, policy){
            me.loadCurrentlyAssignedEmployees(policy)
        });
        me.getPolicyGrid().on('select',function(view, policy){
            me.setSelectedPolicy(policy);
            me.updateDisplayBox();
            me.bindLocationStore();
        });
    },
    consolidateRecordChanges:function(employees){
        var me = this;
        var consolidated_selections = [];


        employees.each(function(employee){
            consolidated_selections.push({
                mypclient_id:employee.get('mypclient_id'),
                company_id:employee.get('company_id'),
                empidno:employee.get('empidno'),
                workskedpolicy_id:me.getSelectedPolicy().get('id')
            });
        });

        return Ext.JSON.encode(consolidated_selections);
    },
    saveChanges:function(employees){
        var me = this;
        var consolidated_records = me.consolidateRecordChanges(employees);
        Ext.Ajax.request({
            url:'/emppolicies/update_assignment.json',
            method:'POST',
            params:{
                authenticity_token:authToken(),
                emp_policy:consolidated_records
            },
            callback:function(success, option, result){
                var response = Ext.JSON.decode(result.responseText);
                if(response.success){
                    notify(response.notice, 'success');
                    Ext.getCmp('policy-employee-selector').destroy();
                    me.loadCurrentlyAssignedEmployees();

                    Ext.getCmp('policy-exception-grid').removeEmployees(Ext.JSON.decode(consolidated_records));
                }
                else{
                    notify(response.errormsg, 'error'); return false;
                }
            }
        });
    },
    setSelectedPolicy:function(new_policy){
        this.selected_policy = new_policy;
    },
    bindLocationStore:function(){
        var policy = this.getSelectedPolicy();

        var new_location_store = createLocalStore(filterStoreData(selections.locations,{"company_id":policy.get('company_id')}));
        this.getLocationID().bindStore(new_location_store);
    },
    getSelectedPolicy:function(){
        return this.selected_policy;
    },
    updateDisplayBox:function(){
        var policy =this.getSelectedPolicy();
        var policy_code = policy.get('policycode');
        var policy_desc = policy.get('description');
        this.getPolicyDisplayBox().update('Policy : '+policy_code+' - '+policy_desc);
    },
    loadCurrentlyAssignedEmployees:function(){
        var policy = this.getSelectedPolicy();
        var policy_id  = policy.get('id');
        var company_id = policy.get('company_id');
        var status = this.getEmployeeStatus().getValue() ? 1 : 0;
        var location_id = this.getLocationID().getValue();
        var new_location_data = filterStoreData(selections.locations, {'company_id':company_id});
        this.getLocationID().bindStore(createLocalStore(new_location_data));
        this.getLocationID().setValue(null);

        this.getEmployeeGrid().store.load({
            params:{
                policy_id:policy_id,
                location_id:location_id,
                status:status
            }
        });

    },
    getPolicyGrid:function(){
        return this.getComponent(0);
    },
    getEmployeeGrid:function(){
        return this.getComponent(1);
    },
    getLocationID:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(1);
    },
    getPolicyDisplayBox:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(0);
    },
    getEmployeeStatus:function(){
        return this.getEmployeeGrid().getDockedComponent(2).getComponent(2);
    }
});


var selections = createLocalDataFromServer('/client/default_selections.json');

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items: [
            {
                region:'west',
                xtype:'exceptiongrid',
                id:'policy-exception-grid',
                collapsed:true,
                collapsible:true,
                split:true,
                title:'Employees without Policy',
                store:createJsonStore('/employees/without_policy.json', 'id', true)
            },
            {
                region:'center',
                title:'Policy Assignment',
                xtype:'policyassignment'
            }
        ]
    });
});