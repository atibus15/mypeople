Ext.define('People.dtr.History',{
    extend:'Ext.grid.GridPanel',
    xtype:'dtrhistory',
    store:createJsonStore('/dtr/history.json'),
    columns:[
        {dataIndex:'dtrdatein',text:'Date In'},
        {dataIndex:'dtrtimein',text:'Time In'},
        {dataIndex:'dtrtimeout',text:'Time Out'},
        {dataIndex:'dtrdateout',text:'Date Out'}
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            fieldLabel:'Date',
                            xtype:'datefield',
                            id:'dtr-history-start-date',
                            maxValue:_today_date,
                            emptyText:'From',
                            width:200,
                            labelWidth:50,
                            submitFormat:'m/d/Y',
                            editable:false
                        },
                        {
                            xtype:'datefield',
                            id:'dtr-history-end-date',
                            maxValue:_today_date,
                            emptyText:'To',
                            width:150,
                            submitFormat:'m/d/Y',
                            editable:false
                        },
                        {
                            iconCls:'search-icon',
                            tooltip:'Show DTR History',
                            handler:function(){
                                me.loadStore();
                            }
                        }
                    ]
                },
                {
                    xtype:'pagingtoolbar',
                    store: [],   
                    dock: 'bottom',
                    displayInfo: true
                }
            ]

        });
        me.callParent(arguments);
    },
    loadStore:function(){
        var me = this;
        me.store.load({
            params:{
                id_no:Ext.get('id_number').getValue(),
                end_date:Ext.getCmp('dtr-history-end-date').getValue(),
                start_date:Ext.getCmp('dtr-history-start-date').getValue()
            }
        })
    }
});


Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                forceFit:true,
                title:'DTR History',
                xtype:'dtrhistory',
                id:'dtr-history-grid'
            }
        ]
    });
    Ext.getCmp('dtr-history-grid').loadStore();
})
