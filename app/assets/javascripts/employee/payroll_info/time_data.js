
Ext.define('People.schedule.Manager',
{

    extend:'People.crud.Grid',
    alias:'widget.schedmanager',
    constructor:function(config){
        this.callParent(arguments);
        this.initConfig(config);
    },
    onLoadForm:function(data){
        var form = Ext.create('People.editor.Window',{
            title:'Schedule Editor',
            items:[
                {
                    id:'schedule_editor_form',
                    
                    items:[
                        {
                            xtype:'fieldcontainer',
                            labelWidth:75,
                            fieldLabel:'Time In',
                            items:[
                                {
                                    xtype:'datefield',
                                    name:'time_in[date]',
                                    emptyText:'Date',
                                    width:115,
                                    margin:0
                                },
                                {
                                    xtype:'peopletimefield',
                                    name:'time_in[time]',
                                    emptyText:'Time',
                                    width:100
                                }
                            ]
                        },
                        {
                            xtype:'fieldcontainer',
                            fieldLabel:'Time Out',
                            labelWidth:75,
                            items:[
                                {
                                    xtype:'datefield',
                                    name:'time_out[date]',
                                    emptyText:'Date',
                                    width:115,
                                    margin:0
                                },
                                {
                                    xtype:'peopletimefield',
                                    name:'time_out[time]',
                                    emptyText:'Time',
                                    width:100
                                }
                            ]
                        }
                    ]
                }
            ],
            fbar:[
                {
                    text:'Save and Exit'
                },
                {
                    text:'Save and Add New'
                },
                {
                    text:'Cancel',
                    handler:function(){
                        form.destroy();
                    }
                }
            ]
        });

        form.show();
    },
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            title:'Schedule Manager',
            height:300,
            width:600,
            store:[],
            columns:[
                {text:'Date In'},
                {text:'Time In'},
                {text:'Date Out'},
                {text:'Time Out'}
            ],
            addBtnHandler:function(){
                me.onLoadForm();
            },
            editBtnHandler:function(){
                var sched = me.getSelected();
                me.onLoadForm(sched);
            },
            deleteBtnHandler:function(){

            }
        });
        me.callParent(arguments);
    }
});


function timeDataEditor(employee)
{
    Ext.create('People.editor.Window',
    {
        title:'Employee Time Data',
        id:'time_data_window',
        items:[
            {
                width:750,
                id:'time_data_form',
                items:
                [
                    {
                        layout:'hbox',
                        items:[
                            {
                                xtype:'combobox',
                                fieldLabel:'Work Schedule'
                            }
                        ]
                    },
                    {
                        layout:'hbox',
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel:'Work Schedule'
                            },

                            {
                                xtype:'textfield',
                                fieldLabel:'Work Policy'
                            }
                        ]
                    },
                    {
                        layout:'hbox',
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel:'Holiday Calendar'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel:'Temporary Holiday Calendar'
                            }
                        ]
                    },
                    {
                        defaultType:'combobox',
                        items:
                        [
                            {
                                fieldLabel:'Grace Period Allowed',
                                store:[[1,'YES'],[0,'NO']],
                                width:250
                            },
                            {
                                fieldLabel:'Grace Period(in minute/s)',
                                width:250
                            }
                        ]
                    },
                    {
                        xtype:'listgrid',
                        title:'Planned Schedules',
                        width:600,
                        height:250,
                        columns:[
                            {text:'Date In'},
                            {text:'Time In'},
                            {text:'Date Out'},
                            {text:'Time Out'}
                        ]
                    },
                    {
                        xtype:'myfieldset',
                        title:'Required Working Time',
                        items:[
                            {
                                items:[
                                    {
                                        xtype:'peopletimefield',
                                        fieldLabel:'TIME IN',
                                        margin:'0 25 0 0',
                                        readOnly:true,
                                        width:200
                                    },
                                    {
                                        xtype:'peopletimefield',
                                        fieldLabel:'TIME OUT',
                                        readOnly:true,
                                        width:200
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title:'Break Time',
                        xtype:'listgrid',
                        width:600,
                        forceFit:false,
                        height:200,
                        columns:[
                            Ext.create('Ext.grid.RowNumberer'),
                            {text:'Break Description',width:150, flex:1},
                            {text:'Start Time'},
                            {text:'End Time'}
                        ]
                    }
                ]
            }
        ],
        fbar:[
            {
                text:'Save'
            },
            {
                text:'Cancel',
                handler:function(){
                    this.findParentByType('editorwindow').destroy();
                }
            }
        ]
    }).show();
}
            
            