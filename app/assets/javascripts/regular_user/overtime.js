Ext.define('People.overtime.Grid',{
    extend:'Ext.grid.GridPanel',
    xtype:'overtimegrid',
    columns:[
        {dataIndex:'field1',text:'Date Filed'},
        {dataIndex:'field2',text:'OT Date'},
        {dataIndex:'field3',text:'OT Time-In', width:150},
        {dataIndex:'field4',text:'OT Time-Out'},
        {dataIndex:'field5',text:'Purpose'},
        {dataIndex:'field6',text:'Remarks'}
    ],
    store:[
        ['03/10/2014','03/10/2014','7:00PM','9:45PM','Project Enhancement',''],
        ['03/12/2014','03/12/2014','7:00PM','10:00PM','Project Development','']
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            tbar:[
                {
                    fieldLabel:'OT Date',
                    xtype:'datefield',
                    name:'filedate_from',
                    id:'filedate_from',
                    emptyText:'From',
                    width:200,
                    labelWidth:50,
                    maxValue:_today_date
                },
                {
                    xtype:'datefield',
                    name:'filedata_to',
                    id:'filedata_to',
                    emptyText:'To',
                    width:150,
                    maxValue:_today_date
                },
                {
                    iconCls:'search-icon',
                    name:'filter',
                    id:'filter',
                    handler:function(){
                        getOTApplicationByStatus();
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                title:'Overtime Filings',
                xtype:'overtimegrid',
                forceFit:true
            }
        ]
    });
});

