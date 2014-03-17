Ext.define('People.payroll.Grid',{
    extend:'Ext.grid.GridPanel',
    xtype:'payrollgrid',
    store:[],
    columns:[
        Ext.create('Ext.grid.RowNumberer'),
        {text:'Description',  dataIndex:'field1', width:500},
        {text:'Cut-Off Date From',  dataIndex:'field2', width:500},
        {text:'Cut-Off Date To',  dataIndex:'field3', width:500}
    ],
    store:[
        ['January 15, 2014 Payroll','2013/12/14','2014/01/03'],
        ['January 30, 2014 Payroll','2014/01/04','2014/01/17'],
        ['February 15, 2014 Payroll','2014/01/18','2014/02/03'],
        ['February 28, 2014 Payroll','2014/02/04','2014/02/19']
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            iconCls:'pdf-icon',
                            tooltip:'Download as PDF',
                            handler:function(){
                                me.downloadAsPDF();
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
    downloadAsPDF:function(){

    }
});




Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                title:'Payslip List',
                forceFit:true,
                xtype:'payrollgrid'
            }
        ]
    });
});