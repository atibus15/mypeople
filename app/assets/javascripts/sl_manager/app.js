Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'west',
                title:'Employees',
                xtype:'gridpanel',
                id:'sl-employee-grid',
                split:true,
                width:400,
                collapsible:true,
                forceFit:true,
                features:[Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'})],
                store:createJsonStore('/employee/list.json', 'empidno', true, 'total_employee'),
                columns:[
                    {text:'ID No.', dataIndex:'empidno', width:75},
                    {text:'Full Name', dataIndex:'empfullnamelfm', width:150},
                    {text:'Date Hired', dataIndex:'datehired', renderer:function(v){return Ext.util.Format.date(v, 'm/d/Y')}, width:75},
                    {hidden:true,text:'Department', dataIndex:'department_desc', width:150},
                    {hidden:true,text:'Position', dataIndex:'position_desc', width:150}
                ]
            },
            {
                region:'center',
                xtype:'panel',
                layout:'border',
                items:[
                    {
                        region:'north',
                        xtype:"gridpanel",
                        collapsible:true,
                        split:true,
                        title:'Loans',
                        height:'50%',
                        columns:[
                            {dataIndex:'field1', text:'Ref. ID'},
                            {dataIndex:'field2', text:'Loan Code'},
                            {dataIndex:'field3', text:'Ref. No'},
                            {dataIndex:'field4', text:'Date Granted'},
                            {dataIndex:'field5', text:'Principal'},
                            {dataIndex:'field6', text:'Int. Rate (%)'},
                            {dataIndex:'field7', text:'Term (mos)'},
                            {dataIndex:'field8', text:'Beg. Bal.'},
                            {dataIndex:'field9', text:'Monthly Amort.'},
                            {dataIndex:'field10', text:'PY Deduction'},
                            {dataIndex:'field11', text:'Remarks'},
                            {dataIndex:'field12', text:'Closed'},
                            {dataIndex:'field13', text:'Close Date'}
                        ],
                        store:[
                            ['1','COMPLOAN', '0001' ,'02/01/2012', '50,000.00', '2.00', '24.00', '74,000.00', '3,083.33', '1,541.67', 'New Loan'],
                            ['24','HDMFLOAN', '0008' ,'11/19/2013', '10,503.00', '0.00', '24.00', '10,503.00', '875.25', '437.63', 'New Loan']
                        ]
                    },
                    {
                        region:'center',
                        xtype:"gridpanel",
                        title:'SL Transactions',
                        forceFit:true,
                        columns:[
                            {dataIndex:'field1',text:'Tr. Date'},
                            {dataIndex:'field2',text:'Tr. No'},
                            {dataIndex:'field3',text:'Particulars', minWidth:350},
                            {dataIndex:'field4',text:'Debit'},
                            {dataIndex:'field5',text:'Credit'},
                            {dataIndex:'field6',text:'Balance'}
                        ],
                        store:[
                            ['01/01/2014', '000068','Recon Balance as of 12/31/2013', '25,800.50','0.00','25,800.50'],
                            ['01/15/2014', '000105','January 15, 2014 Payroll', '0.00','1,541.67',Ext.util.Format.number(25800.50 - 1541.67, '0,000.00')],
                            ['01/30/2014', '000269','January 30, 2014 Payroll', '0.00','1,541.67',Ext.util.Format.number(24258.83 - 1541.67, '0,000.00')]
                        ]
                    }
                ]
            }
        ]
    });

    ExtCmp('sl-employee-grid').store.on('load',function(){
        this.group('company_desc');
    })
});