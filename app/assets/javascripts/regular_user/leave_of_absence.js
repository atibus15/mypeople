Ext.define('People.leave.Grid',{
    extend:'Ext.grid.GridPanel',
    xtype:'leavegrid',
    columns:[
        {dataIndex:'field1', text:'Date Filed'},
        {dataIndex:'field2', text:'Leave Type'},
        {dataIndex:'field3', text:'Date From', width:150},
        {dataIndex:'field4', text:'Date To'},
        {dataIndex:'field5', text:'Reason'},
        {dataIndex:'field6', text:'Remarks'},
        {dataIndex:'field7', text:'With Pay?'},
        {dataIndex:'field8', text:'Credit Used'}
    ],
    store:[
        ['03/07/2014','Sick Leave','03/05/2014','03/06/2014','Severe headache','','N','1'],
        ['03/04/2014','Vacation Leave','03/12/2014','03/14/2014','Family Reunion','','Y','3']
    ],
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
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
                    tooltip:'View leave of absences',
                    handler:function(){
                        me.loadStore();
                    }
                }
            ]
        });
        me.callParent(arguments);
    },
    loadStore:function(){
        
    }
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                forceFit:true,
                title:'Leave of Absence Filings',
                xtype:'leavegrid'
            }
        ]
    })
})