Ext.define('People.dtrlog.Grid',{
    extend:'Ext.grid.GridPanel',
    xtype:'dtrlog',
    columns:[
        {dataIndex:'field1', text:'Date Filed'},
        {dataIndex:'field2', text:'Log Date'},
        {dataIndex:'field3', text:'Log Time'},
        {dataIndex:'field4', text:'Reason', width:150},
        {dataIndex:'field5', text:'Remarks'}
    ],
    store:[
        ['02/05/2014', '02/04/2014','8:01AM','Device Error','Manual Login'],
        ['02/05/2014', '02/04/2014','6:30PM','Device Error','Manual Login'],
        ['02/06/2014', '02/06/2014','7:59AM','Connection Problem','No DTR due to connection issue'],
        ['02/06/2014', '02/06/2014','6:35PM','Connection Problem','No DTR due to connection issue'],
        ['02/11/2014', '02/12/2014','8:12AM','Other','Forgot proximity ID'],
        ['02/11/2014', '02/12/2014','8:12AM','Other','Forgot proximity ID'],
        ['02/13/2014', '02/12/2014','8:00AM','Forgot to Log in/out','Forgot Login']
    ],
    initComponent:function(){

        var me = this;
        Ext.apply(me, {
            tbar:[
                {
                    fieldLabel:'Status',
                    xtype:'combobox',
                    name:'ot_status',
                    id:'ot_status',
                    store:[['P','Pending'],['A','Approve'],['D','Disapproved']],
                    value:'P',
                    width:200,
                    labelWidth:50
                },
                {
                    fieldLabel:'Filedate',
                    xtype:'datefield',
                    id:'filedate_from',
                    maxValue:_today_date,
                    emptyText:'from',
                    width:200,
                    labelWidth:50
                },
                {
                    xtype:'datefield',
                    id:'filedate_to',
                    maxValue:_today_date,
                    emptyText:'to',
                    width:150
                },
                {
                    iconCls:'search-icon',
                    handler:function(){
                        getDTRLogsByStatus();
                    }
                },
                {
                    iconCls:'add-icon',
                    tooltip:'File DTR Log',
                    handler:function(){
                        me.fileNew();
                    }
                }
            ]
        });
        me.callParent(arguments);
    },
    fileNew:function(){

        var me = this;
        Ext.create('People.editor.Window',{
            title:'DTR Log Application',
            closeAction:'destroy',
            items:
            [ 
                {
                    id:'dtr-log-form',
                    layout:{type:'table', columns:2},
                    defaults:{
                        margin:'3 10 3 5'
                    },
                    items:
                    [
                        {
                            colspan:2,
                            fieldLabel:'Reason',
                            xtype:'combobox',
                            labelWidth:75,
                            width:350,
                            store:[['CP','Connection Problem'],['DE','Device Error'],['FL','Forgot to Log in/out'],['PI','Power Interruption'],['O','Other']]
                        },
                        {
                            fieldLabel:'Log',
                            xtype:'datefield',
                            labelWidth:75,
                            emptyText:'Log Date',
                            maxValue:_today_date,
                            width:250
                        },
                        {
                            emptyText:'Log Time',
                            xtype:'peopletimefield',
                            width:80
                        },
                        {
                            colspan:2,
                            fieldLabel:'Remarks',
                            xtype:'textarea',
                            labelWidth:75,
                            width:350
                        }
                    ]
                }
            ],
            tbar:[
                {
                    iconCls:'save-icon',
                    tooltip:'Send Application',
                    handler:function(){

                    }
                },
                {
                    iconCls:'reset-icon',
                    tooltip:'Reset Form',
                    handler:function(){
                        Ext.getCmp('dtr-log-form').getForm().reset();
                    }
                }
            ]
        }).show();
    }
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                forceFit:true,
                title:'DTR LOG Application',
                xtype:'dtrlog',
                width:'100%'
            }
        ]
    });
});
