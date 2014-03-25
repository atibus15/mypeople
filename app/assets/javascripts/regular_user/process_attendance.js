Ext.define('People.payroll.Attendance',{
    extend:'Ext.grid.GridPanel',
    xtype:'payrollattendance',
    columns:[
        {dataIndex:'field3', text:'Item Description'},
        {dataIndex:'field1', text:'Date In'},
        {dataIndex:'field5', text:'Time In'},
        {dataIndex:'field6', text:'Time Out'},
        {dataIndex:'field2', text:'Date Out'},
        {dataIndex:'field4', text:'Hours'}
    ],
    store:[
        ['2013-12-14', '2013-12-14', 'OTREGF8', 3.00, , , ],
        ['2013-12-14', '2013-12-14', 'OTRGRSF8', 5.50, , , ],
        ['2013-12-16', '2013-12-16', 'HRWK', 8.60, '8:24 AM', '6:48 PM', ],
        ['2013-12-16', '2013-12-16', 'LWOP', 0.40, '8:24 AM', '6:48 PM', ],
        ['2013-12-17', '2013-12-17', 'HRWK', 8.62, '8:22 AM', '6:40 PM', ],
        ['2013-12-17', '2013-12-17', 'LWOP', 0.37, '8:22 AM', '6:40 PM', ],
        ['2013-12-18', '2013-12-18', 'HRWK', 8.90, '8:05 AM', '11:58 PM', ],
        ['2013-12-18', '2013-12-18', 'LWOP', 0.09, '8:05 AM', '11:58 PM', ],
        ['2013-12-18', '2013-12-18', 'NDREGF8', 2.00, , , ],
        ['2013-12-18', '2013-12-18', 'OTREGF8', 3.50, , , ],
        ['2013-12-19', '2013-12-19', 'NDREGF8', 1.97, '12:12 AM', '11:58 PM', ],
        ['2013-12-19', '2013-12-19', 'HRWK', 9.00, '12:12 AM', '11:58 PM', ],
        ['2013-12-19', '2013-12-19', 'OTREGF8', 5.47, '12:12 AM', '11:58 PM', ],
        ['2013-12-20', '2013-12-20', 'NDREGF8', 4.97, '12:01 AM', '6:40 PM', ],
        ['2013-12-20', '2013-12-20', 'HRWK', 9.00, '12:01 AM', '6:40 PM', ],
        ['2013-12-20', '2013-12-20', 'OTREGF8', 5.97, '12:01 AM', '6:40 PM', ],
        ['2013-12-23', '2013-12-23', 'HRWK', 8.65, '8:21 AM', '6:38 PM', ],
        ['2013-12-23', '2013-12-23', 'LWOP', 0.35, '8:21 AM', '6:38 PM', ],
        ['2013-12-24', '2013-12-24', 'HOLSP', 9.00, , , ],
        ['2013-12-25', '2013-12-25', 'HOLLG', 9.00, , , ],
        ['2013-12-26', '2013-12-26', 'HRWK', 8.49, '8:30 AM', '6:51 PM', ],
        ['2013-12-26', '2013-12-26', 'LWOP', 0.50, '8:30 AM', '6:51 PM', ],
        ['2013-12-27', '2013-12-27', 'HRWK', 8.86, '8:08 AM', '6:40 PM', ],
        ['2013-12-27', '2013-12-27', 'LWOP', 0.14, '8:08 AM', '6:40 PM', ],
        ['2013-12-30', '2013-12-30', 'HOLLG', 9.00, , , ],
        ['2013-12-31', '2013-12-31', 'HOLSP', 9.00, , , ],
        ['2014-01-01', '2014-01-01', 'HOLLG', 9.00, , , ],
        ['2014-01-02', '2014-01-02', 'ABSENT', 9.00, , , ],
        ['2014-01-03', '2014-01-03', 'ABSENT', 9.00, , , ]
    ],
    initComponent:function(){

        var me = this;
        Ext.apply(me, {
            tbar:[
                {
                    xtype:'combobox',
                    fieldLabel:'Payroll Reference',
                    editable:false
                },
                {
                    iconCls:'search-icon'
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
                title:'Payroll Process Attendance',
                xtype:'payrollattendance',
                width:'100%'
            }
        ]
    });
});
