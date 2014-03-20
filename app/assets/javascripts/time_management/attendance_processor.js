//= require components/combo_modal
//= require time_management/time_card
//= require_self
var selections = createLocalDataFromServer('/client/default_selections.json');

// CUT-OFF LIST

Ext.define('People.cutoff.Grid',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.cutoffgrid',
    title:'Attendance Cut-off',
    store:createJsonStore('/cut_offs.json', 'id', false),
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            columns:[
                {dataIndex:'cutoffcode',text:'Cut-off Code'},
                {dataIndex:'description',text:'Description'},
                {dataIndex:'datefr',text:'Date Start'},
                {dataIndex:'dateto',text:'Date End'}
            ],
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            fieldLabel:'Company',
                            xtype:'combobox',
                            store:createLocalStore(selections.companies),
                            valueField:'id',
                            displayField:'desc',
                            editable:false,
                            id:'cut-off-company-id',
                            labelWidth:75,
                            triggerAction:'all',
                            width:'75%',
                            listeners:{
                                change:function(combo, company_id){
                                    me.company_id = company_id;
                                    me.loadStore();
                                }
                            }
                        },
                        {
                            iconCls:'search-icon',
                            tooltip:'Show List',
                            handler:function(){
                                me.loadStore();
                            }
                        }
                    ]
                },
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            iconCls:'add-icon',
                            tooltip:'Add new cut-off.',
                            handler:function(){
                                me.editor();
                            }
                        },
                        {
                            iconCls:'update-icon',
                            tooltip:'Update cut-off',
                            handler:function(){
                                var cut_off = me.getSelectedCutOff();
                                if(cut_off){
                                    me.editor(cut_off);
                                }
                            }
                        },
                        {
                            iconCls:'delete-icon',
                            tooltip:'Delete Selected',
                            handler:function(){
                                var cut_off = me.getSelectedCutOff();
                                if(cut_off){
                                    var id = cut_off.get('id');
                                    deleteRecordViaAjax("/cut_offs/"+id+".json", 'Are you sure you want to delete selected record?',function(response){
                                        me.store.remove(cut_off);
                                    });
                                }
                            }
                        },
                        {
                            xtype:'displayfield',
                            fieldLabel:"Head Count",
                            id:'cut-off-head-count',
                            margin:'0 0 0 30',
                            value:0
                        }  
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        var me = this;
        me.callParent(arguments);
        me.initConfig(configs);
    },
    loadStore:function(){
        var me = this;
        if(!me.company_id) return notify('Please select Company.', 'warning');

        me.store.load({
            params:{
                company_id:me.company_id
            }
        });
    },
    getSelectedCutOff:function(){
        var me = this;
        var sm = me.getSelectionModel();
        var cut_off = sm.getLastSelected();
        if(!cut_off){
            notify('Please select cut-off.','warning'); return false;
        }
        return cut_off;
    },
    saveChanges:function(){
        var me = this;
        var method = me.cut_off_id ? 'PUT' : 'POST';
        var url = me.cut_off_id ? '/cut_offs/'+me.cut_off_id : '/cut_offs';

        submitForm('cut-off-form', url+'.json', method, function(response){
            me.editor_window.destroy();
            me.loadStore();
        },false);
    },
    editor:function(cut_off){
        var me = this;
        me.cut_off_id           = cut_off ? cut_off.get('id') : null;
        me.cut_off_code         = cut_off ? cut_off.get('cutoffcode') : null;
        me.cut_off_description  = cut_off ? cut_off.get('description') : null;
        me.cut_off_start        = cut_off ? cut_off.get('datefr') : null;
        me.cut_off_end          = cut_off ? cut_off.get('dateto') : null;
        me.company_id           = cut_off ? cut_off.get('company_id') : me.company_id;

        if(!me.company_id) return notify('Please select Company.', 'warning');

        var read_only = cut_off ? true : false;

        me.editor_window = Ext.create('People.editor.Window',{
            title:'Cut-Off Editor',
            enterFn:function(){return me.saveChanges();},
            tbar:[
                {
                    iconCls:'save-icon',
                    tooltip:'Save',
                    handler:function(){
                        return me.saveChanges();
                    }
                },
                {
                    iconCls:'reset-icon',
                    tooltip:'Reset Form',
                    handler:function(){
                        return ExtCmp('cut-off-form').getForm().reset();
                    }
                }
            ],
            items:[
                {
                    id:'cut-off-form',
                    layout:{type:'table', columns:2},
                    defaults:{
                        margin:'0 15 0 15'
                    },
                    items:[
                        {
                            colspan:2,
                            fieldLabel:'Company',
                            xtype:'combobox',
                            store:createLocalStore(selections.companies),
                            displayField:'desc',
                            valueField:'id',
                            name:'cutoff[company_id]',
                            value:me.company_id,
                            editable:false,
                            readOnly:true,
                            width:350
                        },
                        {
                            colspan:2,
                            fieldLabel:'Cut-off Code',
                            xtype:'textfield',
                            name:'cutoff[cutoffcode]',
                            value:me.cut_off_code,
                            readOnly:read_only,
                            width:350
                        },
                        {
                            colspan:2,
                            fieldLabel:'Description',
                            xtype:'textfield',
                            name:'cutoff[description]',
                            value:me.cut_off_description,
                            width:500
                        },
                        {
                            fieldLabel:'Date Start',
                            xtype:'datefield',
                            name:'cutoff[datefr]',
                            value:me.cut_off_start,
                            width:250
                        },
                        {
                            fieldLabel:'Date End',
                            xtype:'datefield',
                            name:'cutoff[dateto]',
                            value:me.cut_off_end,
                            width:220,
                            labelWidth:75
                        }
                    ]
                }
            ]
        }).show();
    }
});

Ext.define('People.payrollfile.Grid',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.payrollfilegrid',
    title:'Payroll Files',
    forceFit:true,
    store:createJsonStore('/attendance_files.json', 'id', false),
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            fieldLabel:'Company',
                            xtype:'combobox',
                            width:'85%',
                            labelWidth:60,
                            id:'file-company-id',
                            store:createLocalStore(selections.companies),
                            displayField:'desc',
                            valueField: 'id',
                            triggerAction: 'all',
                            readOnly:true
                        },
                        {
                            iconCls: 'search-icon',
                            tooltip:'Load Payroll Files',
                            handler:function(){
                                if(!me.cut_off) return notify('Please Select Cut-Off', 'warning');
                                me.loadStore();
                            }
                        }
                    ]
                },
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            iconCls:'add-icon',
                            tooltip:'Add New Payroll File',
                            handler:function(){
                                if(!me.cut_off) return notify('Please Select Cut-Off', 'warning');
                                me.editor();
                            }
                        },
                        {
                            iconCls:'update-icon',
                            tooltip:'Update Payroll File',
                            handler:function(){
                                if(!me.cut_off) return notify('Please Select Cut-Off', 'warning');
                                var file = me.getSelectedFile();
                                if(file) me.editor(file);
                            }
                        },
                        {
                            iconCls:'delete-icon',
                            tooltip:'Delete selected record.',
                            handler:function(){
                                var file = me.getSelectedFile();
                                if(file){
                                    var id = file.get('id');
                                    deleteRecordViaAjax("/attendance_files/"+id+".json", 'Are you sure you want to delete selected record?',function(response){
                                        me.store.remove(file);
                                    });
                                }
                            }
                        },
                        {
                            xtype:'displayfield',
                            fieldLabel:"Head Count",
                            id:'file-head-count',
                            margin:'0 0 0 30',
                            value:0
                        }
                    ]
                }
            ],
            columns:[
                {dataIndex:'attfilecode', text:'File Code'},
                {dataIndex:'description', text:'Description'},
                {dataIndex:'isposted', text:'Posted?', renderer:icon_status}
            ]
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        var me = this;
        me.callParent(arguments);
        me.initConfig(configs);
    },
    getSelectedFile:function(){
        var sm = this.getSelectionModel();
        var file = sm.getLastSelected();
        if(!file){
            notify('Please select Payroll File.', 'warning'); return false;
        }
        return file;
    },
    loadStore:function(){
        var me = this;
        me.store.load({
            params:{
                company_id:me.cut_off.get('company_id'),
                cutoff_id : me.cut_off.get('id')
            }
        });
    },
    setCutOff:function(cut_off){
        this.cut_off = cut_off;
        Ext.getCmp('file-company-id').setValue(cut_off.get('company_id'));
        this.updateGridTitle();
    },
    updateGridTitle:function(){
        var new_title = this.cut_off.get('description')+' Payroll Files';
        this.setTitle(new_title);
    },
    savePayrollFile:function(){
        var me = this;
        var method = me.payroll_file ? 'PUT' : 'POST';
        var url = me.payroll_file ? '/attendance_files/'+me.payroll_file.get('id') : '/attendance_files'
        submitForm('payroll-file-form', url+'.json', method, function(){
            me.editor_window.destroy();
            me.loadStore();
        })
    },
    editor:function(payroll_file){
        var me = this;

        me.editor_window = Ext.create('People.editor.Window',{
            title:'Payroll File Editor',
            enterFn:function(){me.savePayrollFile();},
            tbar:[
                {
                    iconCls: 'save-icon',
                    tooltip:'Save',
                    handler:function(){
                        me.savePayrollFile();
                    }
                },
                {
                    iconCls:'reset-icon',
                    tooltip:'Reset Form',
                    handler:function(){
                        Ext.getCmp('payroll-file-form').getForm().reset();
                    }
                }
            ],
            items:[
                {
                    id:'payroll-file-form',
                    layout:{type:'table',columns:1},
                    defaults:{
                        width:350,
                        margin:'0 15 0 15'
                    },
                    items:[
                        {
                            fieldLabel:'Company',
                            xtype:'combobox',
                            store:createLocalStore(selections.companies),
                            displayField:'desc',
                            valueField:'id',
                            triggerAction:'all',
                            name:'payrollfile[company_id]',
                            readOnly: true,
                            value:me.cut_off.get('company_id'),
                            editable:false
                        },
                        {
                            fieldLabel:'Cut-Off',
                            xtype:'textfield',
                            value:me.cut_off.get('description'),
                            readOnly:true
                        },
                        {
                            xtype:'hiddenfield',
                            value:me.cut_off.get('id'),
                            name:'payrollfile[cutoff_id]'
                        },
                        {
                            xtype:'textfield',
                            fieldLabel:'File Code',
                            name:'payrollfile[attfilecode]'
                        },
                        {
                            xtype:'textfield',
                            fieldLabel:'Description',
                            name:'payrollfile[description]'
                        },
                        {
                            xtype:'datefield',
                            minValue:_today_date,
                            fieldLabel:'Approval Cut-off Date',
                            labelWidth:150,
                            name:'payrollfile[efilesapprovalcutoff]'
                        },
                        {
                            xtype:'peoplecheckbox',
                            name:'payrollfile[isposted]',
                            value:1,
                            fieldLabel:'Posted?'
                        }
                    ]
                }
            ]
        }).show();

        if(payroll_file){
            me.payroll_file = payroll_file;
            loadRecordToArrayForm(ExtCmp('payroll-file-form'), 'payrollfile', payroll_file);
        }
    }
});

Ext.define('People.payrollfile.Employee',{
    extend:'Ext.grid.GridPanel',
    xtype:'payrollfileemployee',
    columns:[
        {text:'Badge No.', dataIndex:''},
        {text:'ID No.', dataIndex:''},
        {text:'Name', dataIndex:''},
        {text:'Location', dataIndex:''},
        {text:'Work Schedule', dataIndex:''},
        {text:'Policy', dataIndex:''}
    ], 
    store:createJsonStore('/employee/list.json', 'empidno', false, 'total_employee'),
    loadStore:function(){
        var me = this;
        me.store.load({
            company_id:me.company_id,
            client_id:me.client_id,
            file_code:me.file_code
        });
    }
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items: [
            {
                region:'west',
                collapsible:true,
                split:true,
                xtype:'cutoffgrid',
                id:'cut-off-grid',
                listeners:{
                    select:function(model, cut_off){
                        Ext.getCmp('payroll-file-grid').setCutOff(cut_off);
                    },
                    itemdblclick:function(model, cut_off){
                        Ext.getCmp('payroll-file-grid').loadStore();
                    }
                }
            },
            {
                region:'center',
                xtype:'container',
                layout:'border',
                items:[
                    {
                        region:'west',
                        collapsible:true,
                        split:true,
                        minWidth:350,
                        id:'payroll-file-grid',
                        xtype:'payrollfilegrid'
                    },
                    {
                        region:'center',
                        xtype:'container',
                        layout:'border',
                        items:[
                            {
                                region:'center',
                                title:'Employees',
                                xtype:'payrollfileemployee'
                            },
                            {
                                region:'south',
                                title:'Time Card',
                                xtype:'tabpanel',
                                split:true,
                                collapsible:true,
                                activeTab:2,
                                height:250,
                                items:[
                                    {
                                        title:'Transactions',
                                        xtype:'attendancetrans'
                                    },
                                    {title:'Processed'},
                                    {
                                        title:'Time Card', 
                                        xtype:'timecardmanager',
                                        id:'time-card-grid'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                region:'south',
                title:'<font color="red">Exceptions</font>',
                xtype:'gridpanel',
                height:100,
                forceFit:true,
                columns:[
                    {text:'ID No.'},
                    {text:'Badge No.'},
                    {text:'Name'},
                    {text:'Remarks'}
                ],
                store:[]
            }
        ]
    });

    Ext.getCmp('time-card-grid').loadStore();
});