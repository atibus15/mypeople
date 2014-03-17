Ext.define('People.official.Travel',{
    extend:'Ext.grid.GridPanel',
    xtype:'officialtravel',
    columns:[
        {dataIndex:'field1', text:'Date Filed'},
        {dataIndex:'field2', text:'Date From'},
        {dataIndex:'field3', text:'Date To'},
        {dataIndex:'field4', text:'Destination'},
        {dataIndex:'field5', text:'Purpose', width:150},
        {dataIndex:'field6', text:'Remarks'}
    ],
    store:[
      ['02/19/2014','02/25/2014','02/28/2014','Head Office Singapore','General Assembly',''],
      ['02/24/2014','03/04/2014','03/06/2014','Cebu City','For Client Meeting',''],
      ['03/07/2014','03/10/2014','03/12/2014','Davao City','System Presentation','']
    ],
    initComponent:function(){

        var me = this;
        Ext.apply(me, {
            tbar:[
                {
                    fieldLabel:'File Date',
                    xtype:'datefield',
                    id:'filedate_from',
                    maxValue:_today_date,
                    emptyText:'From',
                    width:200,
                    labelWidth:50
                },
                {
                    xtype:'datefield',
                    id:'filedate_to',
                    maxValue:_today_date,
                    emptyText:'To',
                    width:150
                },
                {
                    iconCls:'search-icon',
                    handler:function(){
   
                    }
                }
            ]
        });
        me.callParent(arguments);
    },
    fileNew:function(){
    }
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                forceFit:true,
                title:'Official Travel',
                xtype:'officialtravel',
                width:'100%'
            }
        ]
    });
});
