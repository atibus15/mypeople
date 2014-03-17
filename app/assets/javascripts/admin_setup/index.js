
Ext.require(['Ext.data.*','Ext.grid.*', 'Ext.toolbar.*']);

success_callback = function(){
    ExtCmp('editor_window').destroy();
    setup_grid.store.load();
};

selections = createLocalDataFromServer('/client/default_selections');


var setup_selection_store = [
    ['holdcom','Holding Companies','Enterprise'],
    ['bizgroup','Business Groups','Enterprise'],
    ['com','Companies','Enterprise'],
    ['location','Locations','Enterprise'],
    ['dept','Departments','Enterprise'],
    ['deptgroup','Department Sub-Groups','Enterprise'],
    ['postlevel','Position Levels','Enterprise'],
    ['post','Positions','Enterprise'],
    ['holiday','Holidays','Other/s'],
    ['leave', 'Leave Types','Other/s']
];

status_renderer = function(v){return v == 1 ? 'Active' : 'Inactive';}

var company_columns = [
    {groupable:false, hideable:false,text:'Company Code', dataIndex:'companycode'},
    {groupable:false, hideable:false,text:'Company Description', dataIndex:'description'},
    {groupable:false, hideable:false,text:'Country', dataIndex:'country'},
    {groupable:false, hideable:false,text:'Holiday Pay Basis', dataIndex:'holidaypaybasis', renderer:function(b){return b == 1 ? 'Basic Salary' : 'Basic Salary + Tax Shield';}},
    {groupable:false, hidden:true,text:'Status', dataIndex:'isactive', renderer:status_renderer},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true,text:'Created By', dataIndex:'createdby'},
    {groupable:false, hidden:true,text:'Last Updated Date',dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true,text:'Last Updated By',dataIndex:'lastupdateby'}
];
var department_columns = [
    {groupable:false,flex:1, hideable:false,text:'Department Code', dataIndex:'departmentcode'},
    {groupable:false,flex:1, hideable:false,text:'Department Description', dataIndex:'description'},
    {groupable:false,flex:1, hidden:true,text:'Status', dataIndex:'status',renderer:status_renderer},
    {groupable:false,flex:1, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false,flex:1, hidden:true,text:'Created By', dataIndex:'createdby'},
    {groupable:false,flex:1, hidden:true,text:'Last Updated Date',dataIndex:'lastupdatedate'},
    {groupable:false,flex:1, hidden:true,text:'Last Updated By',dataIndex:'lastupdateby'}
];
var dept_group_columns = [
    {groupable:false,hideable:false,text:'Department', dataIndex:'department'},
    {groupable:false,hideable:false,text:'Group Code', dataIndex:'deptgroupcode'},
    {groupable:false,hideable:false,text:'Group Description', dataIndex:'description'},
    {groupable:false,hidden:true,text:'Status', dataIndex:'status',renderer:status_renderer},
    {groupable:false,hidden:true,text:'Created Date', dataIndex:'created_date'},
    {groupable:false,hidden:true,text:'Created By', dataIndex:'created_by'},
    {groupable:false,hidden:true,text:'Last Updated Date',dataIndex:'last_update'},
    {groupable:false,hidden:true,text:'Last Updated By',dataIndex:'last_update_by'}
];
var bizgroup_columns = [
    {groupable:false, hideable:false,text:'Business Group Code', dataIndex:'code'},
    {groupable:false, hideable:false,text:'Business Group Description', dataIndex:'description'},
    {groupable:false, hidden:true,text:'Status', dataIndex:'status',renderer:status_renderer},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true,text:'Created By', dataIndex:'createdby'},
    {groupable:false, hidden:true,text:'Last Updated Date',dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true,text:'Last Updated By',dataIndex:'lastupdateby'}
];

var holding_company_columns = [
    {groupable:false, hideable:false,text:'Holding Company Code', dataIndex:'code'},
    {groupable:false, hideable:false,text:'Holding Company Description', dataIndex:'description'},
    {groupable:false, hidden:true,text:'Status', dataIndex:'status',renderer:status_renderer},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'created_date'},
    {groupable:false, hidden:true,text:'Created By', dataIndex:'created_by'},
    {groupable:false, hidden:true,text:'Last Updated Date',dataIndex:'last_update'},
    {groupable:false, hidden:true,text:'Last Updated By',dataIndex:'last_update_by'}
];
var position_level_columns = [
    {groupable:false, hideable:false,text:'Position Level Code', dataIndex:'positionlevelcode'},
    {groupable:false, hideable:false,text:'Position Level Description', dataIndex:'description'},
    {groupable:false, hidden:true,text:'Status', dataIndex:'status',renderer:status_renderer},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true,text:'Created By', dataIndex:'createdby'},
    {groupable:false, hidden:true,text:'Last Updated Date',dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true,text:'Last Updated By',dataIndex:'lastupdateby'}
];


var position_columns = [
    {groupable:false, hideable:false,text:'Position Code', dataIndex:'code'},
    {groupable:false, hideable:false,text:'Position Description', dataIndex:'description'},
    {groupable:false, hidden:true,text:'Status', dataIndex:'status',renderer:status_renderer},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true,text:'Created By', dataIndex:'createdby'},
    {groupable:false, hidden:true,text:'Last Updated Date',dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true,text:'Last Updated By',dataIndex:'lastupdateby'}
];

var holiday_columns = [
    {groupable:false, hideable:false,text:'Description', dataIndex:'description'},
    {groupable:false, hideable:false, text:'Holiday Date', dataIndex:'holidaydate'},
    {groupable:false, hideable:false,text:'Type', dataIndex:'holiday_type'},
    {groupable:false, hideable:false,text:'Coverage', dataIndex:'coverage', renderer:function(v){return v == 'N' ? 'National' : 'Local';}},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true,text:'Created by', dataIndex:'createdby'},
    {groupable:false, hidden:true,text:'Last Updated Date', dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true,text:'Last Updated by', dataIndex:'lastupdateby'}
];

var policy_columns = [
    {groupable:false, hideable:false,text:'Policy Code', dataIndex:'policycode'},
    {groupable:false, hideable:false,text:'Policy Description', dataIndex:'description'},
    {groupable:false, hidden:true,text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true,text:'Created by', dataIndex:'createdby'},
    {groupable:false, hidden:true,text:'Last Updated Date', dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true,text:'Last Updated by', dataIndex:'lastupdateby'}
];
var wsched_columns = [
    {groupable:false,hideable:false,text:'Category', dataIndex:'category'},
    {groupable:false,hideable:false,text:'Code', dataIndex:'workskedcode'},
    {groupable:false,hideable:false,text:'Description', dataIndex:'description'},
    {groupable:false,hideable:false,text:'Time In', dataIndex:'requiredtimein', width:55},
    {groupable:false,hideable:false,text:'Time Out', dataIndex:'requiredtimeout', width:55},
    {groupable:false,hidden:true,text:'Mon', dataIndex:'monday',width:30},
    {groupable:false,hidden:true,text:'Tue', dataIndex:'tuesday',width:30},
    {groupable:false,hidden:true,text:'Wed', dataIndex:'wednesday',width:30},
    {groupable:false,hidden:true,text:'Thu', dataIndex:'thursday',width:30},
    {groupable:false,hidden:true,text:'Fri', dataIndex:'friday',width:30},
    {groupable:false,hidden:true,text:'Sat', dataIndex:'saturday',width:30},
    {groupable:false,hidden:true,text:'Sun', dataIndex:'sunday',width:30}
];

var wpat_columns = [
    {groupable:false,hidden:false,text:'Code', dataIndex:'patterncode'},
    {groupable:false,hidden:false,text:'Description', dataIndex:'description'},
    {groupable:false,hidden:false,text:'Time In', dataIndex:'timein'},
    {groupable:false,hidden:false,text:'Time Out', dataIndex:'timeout'},
    {groupable:false,hidden:false,text:'Required Work Hours', dataIndex:'requiredhrs'}
]

var location_columns = [
    {hideable:false,text:'Location Code', dataIndex:'locationcode'},
    {hideable:false,text:'Description', dataIndex:'description'},
    {groupable:false, hidden:true, text:'Status', dataIndex:'isactive',renderer:status_renderer},
    {groupable:false, hidden:true, text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true, text:'Created by', dataIndex:'createdby'},
    {groupable:false, hidden:true, text:'Last Updated Date', dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true, text:'Last Updated by', dataIndex:'lastupdateby'}
]

var leave_type_columns = [
    {hideable:false,text:'Leave Code', dataIndex:'leavetypecode'},
    {hideable:false,text:'Description', dataIndex:'description'},
    {groupable:false, hidden:true, text:'Status', dataIndex:'isactive',renderer:status_renderer},
    {groupable:false, hidden:true, text:'Created Date', dataIndex:'createddate'},
    {groupable:false, hidden:true, text:'Created by', dataIndex:'createdby'},
    {groupable:false, hidden:true, text:'Last Updated Date', dataIndex:'lastupdatedate'},
    {groupable:false, hidden:true, text:'Last Updated by', dataIndex:'lastupdateby'}
]

var company_store       = createJsonStore('/companies/setupList', 'companycode');
var department_store    = createJsonStore('/departments/setupList', 'department_id',true, false, 'company');
var dept_group_store    = createJsonStore('/deptgroups/setupList', 'id');
var bizgroup_store      = createJsonStore('/busgroups/setupList', 'group_id');
var holding_company_store = createJsonStore('/holdcompanies/setupList', 'holding_id'); 
var position_store      = createJsonStore('/positions/setupList', 'position_id');  
var holiday_store       = createJsonStore('/client/holidays', 'position_id');
var position_level_store= createLocalStore(selections.position_levels);
var policy_store        = createJsonStore('/workskedpolicies/client_list');
var wsched_store        = createJsonStore('/workskeds/setupList','id');
var wpat_store          = createJsonStore('/workskedpatterns/setupList','id');
var location_store      = createJsonStore('/client/locations', 'id');
var leave_type_store    = createJsonStore('/client/leave_types','id');

Ext.define('People.setup.Grid',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.setupgrid',
    requires: ['Ext.panel.*','Ext.form.*','Ext.grid.*'],
    getToolbar: function(){
        return this.getDockedItems('toolbar[dock="top"]')[0];
    },
    getSearchField:function(){
        return this.getToolbar().getComponent(0);
    },
    getSearchButton:function(){
        return this.getToolbar().getComponent(1);
    },
    getNewButton:function(){
        return this.getToolbar().getComponent(2);
    },
    updateNewButton:function(new_cmp){
        this.getToolbar().remove(2);
        this.getToolbar().insert(2, new_cmp);
    },
    returnOrigNewButton:function(){
        var me = this;
        me.updateNewButton({
            text:'New',
            handler:function(){
                me.loadSetupEditor();
            }
        });
    },
    getEditButton:function(){
        return this.getToolbar().getComponent(3);
    },
    getCopyButton:function(){
        return this.getToolbar().getComponent(4);
    },
    getDeleteButton:function(){
        return this.getToolbar().getComponent(5);
    },
    getSelectedRecord:function(){
        var setup_sm = this.getSelectionModel();
        var selections = setup_sm.getSelection();
        return selections ? selections[0] : null;
    },
    showEditCopyDelete:function(){
        var me = this;
        var edit_btn = me.getEditButton();
        var copy_btn = me.getCopyButton();
        var del_btn = me.getDeleteButton();

        if(!edit_btn.isVisible()) edit_btn.show();
        if(!copy_btn.isVisible()) copy_btn.show();
        if(!del_btn.isVisible()) del_btn.show();
    },
    setSetupCode:function(new_code){
        this.setupCode = new_code;
    },
    getSetupCode:function(){
        return this.setupCode;
    },
    loadSetupEditor: function(data, copy)
    {
        var setup_code = this.getSetupCode();

        switch(setup_code){
            case 'com':
                companyEditor(data, copy);
            break;
            case 'dept':
                departmentEditor(data, copy);
            break;
            case 'deptgroup':
                deptGroupEditor(data, copy);
            break;
            case 'bizgroup':
                bizGroupEditor(data, copy);
            break;
            case 'holdcom':
                holdingCompanyEditor(data, copy);
            break;
            case 'postlevel':
                positionLevelEditor(data, copy);
            break;
            case 'post':
                positionEditor(data, copy);
            break;
            case 'location':
                locationEditor(data, copy);
            break;
            case 'leave':
                leaveTypeEditor(data, copy);
            break;
            case 'holiday':
                holidayEditor(data, copy);
            break;
            case 'wpol':
                policyManager(data, copy);
            break;
            case 'wsched':
                scheduleManager(data, data.get('workskedcategory_id'), copy);
            break;
            case 'wpat':
                patternEditor(data, data.get('workskedcategory_id'),copy);
            break;
        }
    },
    deleteSetupRecord: function(data)
    {    
        var me = this;
        var data = this.getSelectedRecord();
        if(!data)
        {
            ExtMessage('Please select record to edit.'); return false;
        }
        
        var setup_code = me.getSetupCode();

        var callback = function(){
                setup_tab.getActiveTab().getComponent(0).store.load();
                selections = createLocalDataFromServer('/client/default_selections');
                if(setup_code == 'postlevel')
                {

                    ExtCmp('global_setup').bindStore(createLocalStore(selections.position_levels));
                    ExtCmp('global_setup').store.load();
                }
            };
        var confirmation_msg = 'Are you sure you want to delete this record?';
        var del_url = false;
        switch(setup_code){
            case 'com':         del_url = '/companies/'+data.get('id');break;
            case 'dept':        del_url = '/departments/'+data.get('department_id'); break;
            case 'deptgroup':   del_url = '/deptgroups/'+data.get('id');break;
            case 'bizgroup':    del_url = '/busgroups/'+data.get('group_id');break;
            case 'holdcom':     del_url = '/holdcompanies/'+data.get('holding_id');break;
            case 'postlevel':   del_url = '/positionlevels/'+data.get('id');break;
            case 'post':        del_url = '/positions/'+data.get('position_id');break;
            case 'holiday':     del_url = '/holidays/'+data.get('id');break;
            case 'leave':       del_url = '/leavetypes/'+data.get('id'); break;
            case 'location':    del_url = '/locations/'+data.get('id'); break;
            case 'wsched':      del_url = '/workskeds/'+data.get('id'); break;
            case 'wpat':      del_url = '/workskedpatterns/'+data.get('id'); break;
            default: notify('No delete module yet. Please inform the developer.', 'warning');
        }
        if(del_url){
            deleteRecordViaAjax(del_url ,confirmation_msg,callback);
        }
    },
    reconfigureGrid: function(new_store, new_column){
        var me = this;
        var paging = me.getDockedItems('toolbar[dock="bottom"]')[0];

        me.reconfigure(new_store, new_column);
        paging.bindStore(new_store);
    },
    reconfigureLayout:function()
    {   
        var me = this;

        var setup_code = me.getSetupCode();
        switch(setup_code){
            case 'com': me.reconfigureGrid(company_store, company_columns);  break;
            case 'dept': 

                me.reconfigureGrid(department_store, department_columns); 
                me.store.group('company');

            break;
            case 'deptgroup': 
                me.reconfigureGrid(dept_group_store, dept_group_columns); 
                me.store.group(['company']);
            break;
            case 'bizgroup': me.reconfigureGrid(bizgroup_store, bizgroup_columns); break;
            case 'holdcom': me.reconfigureGrid(holding_company_store, holding_company_columns); break;
            case 'postlevel': 
                me.reconfigureGrid(position_level_store, position_level_columns); 
            break;
            case 'post': 
                me.reconfigureGrid(position_store, position_columns); 
                me.store.group('company');
            break;
            case 'location': 
                me.reconfigureGrid(location_store,location_columns); 
                me.store.group('company');
            break;
            case 'leave': 
                me.reconfigureGrid(leave_type_store,leave_type_columns); 
                me.store.group('company');
            break;
            case 'holiday': 
                me.reconfigureGrid(holiday_store,holiday_columns); 
                me.store.group('country');
            break;
            case 'wpol' : 
                me.reconfigureGrid(policy_store, policy_columns); 
                me.store.group('company');
            break;
            case 'wsched': 
                me.reconfigureGrid(wsched_store, wsched_columns);
                me.store.group('company');
                me.updateNewButton({
                    text:'New',
                    menu:{
                        xtype:'menu',
                        items:[
                            {
                                iconCls: 'asched-icon',
                                text:'Actual Schedule',
                                handler:function(){
                                    scheduleManager(null, 'ACT');
                                }
                            },
                            {
                                iconCls: 'flexsched-icon',
                                text:'Flexible Schedule',
                                handler:function(){
                                    scheduleManager(null, 'FLX');
                                }
                            },
                            {
                                iconCls: 'strsched-icon',
                                text:'Straight Schedule',
                                handler:function(){
                                    scheduleManager(null, 'STR');
                                }
                            }
                        ]
                    }
                });
            break;
            case 'wpat':
                me.reconfigureGrid(wpat_store, wpat_columns);
                me.store.group('company');
                me.updateNewButton({
                    text:'New',
                    menu:{
                        xtype:'menu',
                        items:[
                            {
                                iconCls: 'flexsched-icon',
                                text:'Flexible Schedule',
                                handler:function(){
                                    patternEditor(null, 'FLX');
                                }
                            },
                            {
                                iconCls: 'strsched-icon',
                                text:'Straight Schedule',
                                handler:function(){
                                    patternEditor(null, 'STR');
                                }
                            }
                        ]
                    }
                });
            break;
            default: return false;
        }

        me.store.load({
        callback:function(){
                
                var edit_btn = me.getEditButton();
                var del_btn = me.getDeleteButton();
                var copy_btn = me.getCopyButton();
                if(edit_btn.isVisible()) edit_btn.hide();
                if(del_btn.isVisible()) del_btn.hide();
                if(copy_btn.isVisible()) copy_btn.hide();

                me.features[0].collapseAll();
                me.getSelectionModel().select(0);
                me.getView().focus();
            }
        });
    },
    constructor:function(config){
        var me = this;
        me.callParent(arguments);
        me.initConfig(config);
    },
    setSorter:function(new_sorter){
        this.sorter = new_sorter;
    },
    getSorter:function(){
        return this.sorter;
    },
    initComponent:function(){
        var me = this;
        var group_feature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'});
        var selection_group_feature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'});
        Ext.apply(me, {
            store:[],
            collapsible:true,
            setup_selection_store: me.setup_selection_store,
            forceFit:true,
            sortableColumns:false,
            features: [group_feature],
            columns:[],
            tbar:[
                {
                    xtype:'textfield',
                    fieldLabel:'Search',
                    labelWidth:50,
                    width:450,
                    name:'clue' 
                },
                {
                    iconCls:'search-icon',
                    tooltip:'Search',
                    handler:function(){
                        me.getSorter();
                    }
                },
                {
                    text:'New',
                    hidden:true,
                    handler:function(){
                        me.loadSetupEditor();
                    }
                },
                {
                    text:'Edit',
                    hidden:true,
                    handler:function(){
                        me.loadSetupEditor(me.getSelectedRecord());
                    }
                },
                {
                    text:'Copy',
                    hidden:true,
                    handler:function(){
                        me.loadSetupEditor(me.getSelectedRecord(), true);
                    }
                },
                {
                    text:'Delete',
                    hidden:true,
                    handler:function(){
                        me.deleteSetupRecord(me.getSelectedRecord());
                    }
                }
            ],
            listeners:{
                itemclick:function(){
                    this.showEditCopyDelete();
                },
                itemdblclick:function(grid, record){
                    this.loadSetupEditor(record);
                },
                afterrender:function(){
                    createGridEnterKeyEvent(me, function(keyCode, e) {
                        me.loadSetupEditor(e.record);
                    });
                },
                itemcontextmenu: function(grid, record, item, index, e)
                {
                    this.showEditCopyDelete();
                    Ext.create('Ext.menu.Menu',{
                        width:100,
                        floating:true,
                        items:[
                           {
                                text:'Edit',
                                handler:function(){
                                    me.loadSetupEditor(record);
                                }
                            },
                            {
                                text:'Copy',
                                handler:function(){
                                    me.loadSetupEditor(record, true);
                                }
                            },
                            {
                                text:'Delete',
                                handler:function(){
                                    me.deleteSetupRecord();
                                }
                            }
                        ]
                    }).showAt(e.getXY());
                },
                sortchange:function(grid_container, columns, string){
                    me.setSorter(columns.dataIndex);
                }
            },
            dockedItems:[
                {
                    dock:'left',
                    xtype:'gridpanel',
                    columns:[
                        {menuDisabled:true, sortable:false, text:'Selections', dataIndex:'field2'}
                    ],
                    forceFit:true,
                    width:215,
                    features: [selection_group_feature],
                    store:me.setup_selection_store,
                    listeners:{
                        itemdblclick:function(g, record){
                            me.returnOrigNewButton();
                            me.getNewButton().show();
                            me.setSetupCode(record.get('field1'));
                            me.reconfigureLayout();
                        },
                        afterrender:function(){
                            this.store.group(me.selection_group);
                            createGridEnterKeyEvent(this, function(keyCode, e) {
                                me.returnOrigNewButton();
                                me.getNewButton().show();
                                me.setSetupCode(e.record.get('field1'));
                                me.reconfigureLayout();
                            });
                        }
                    }
                },
                
                {
                    xtype:'pagingtoolbar',
                    store: me.store,   
                    dock: 'bottom',
                    displayInfo: true
                }
            ]
        });
        
        me.callParent(arguments);   
    }
});


var setup_tab = Ext.create('Ext.tab.Panel',{
    title:'File Maintenance',
    id:'setup_tab',
    margin:'10 25 0 15',
    region:'center',
    height:600,
    items:[ 
        {
            xtype:'setupgrid',
            title:'Global',
            id:'global_setup',
            selection_group:'field3',
            setup_selection_store:setup_selection_store
        },
        {
            xtype:'setupgrid',
            title:'Timekeeping',
            id:'time_keeping_grid',
            setup_selection_store:[['wpol','Work Policies'],['wsched','Work Schedule'],['wpat', 'Work Pattern']]
        }
    ]
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items:[setup_tab]
    });
    
});