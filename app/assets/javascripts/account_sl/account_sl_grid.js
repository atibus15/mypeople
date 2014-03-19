/* Created by   : adam ibus
 * Release Date : 01/15//2014 
 * Copyright    : Business Software and Application Group 2013
 */


Ext.define('People.accountsl.List',{
    extend:'Ext.grid.GridPanel',
    xtype:'accountsllist',
    title:'Accounts SL List',
    store:[
        ['1','SSS Loan','2014/01/25','25000.00','23071.60'],
        ['2','PagIbig Loan','2014/03/05','15000.00','15000.00'],
        ['3','Salary Loan','2014/03/14','10000.00','10000.00']
    ],
    columns:[
        {dataIndex:'field1',text:'Ref. No.', maxWidth:50},
        {dataIndex:'field2',text:'Description'},
        {dataIndex:'field3',text:'Date Granted',renderer:function(val){return Ext.util.Format.date(val, 'm/d/Y')}},
        {dataIndex:'field4',text:'Balance as of', renderer:function(val){return Ext.util.Format.number(val, '0,000.00')}},
        {dataIndex:'field5',text:'Outstanding Balance',renderer:function(val){return Ext.util.Format.number(val, '0,000.00')}}
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            tbar:[
                {
                    fieldLabel:'Account Status',
                    xtype:'combobox',
                    store:[[1, 'OPEN'], [0,'CLOSED']],
                    triggerAction:'all',
                    editable:false,
                    width:200,
                    labelWidth:100
                },
                {
                    iconCls:'search-icon',
                    handler:function(){

                    }
                },
                {
                    iconCls:'view-icon',
                    tooltip:'View SL Details'
                },
                {
                    iconCls:'pdf-icon',
                    tooltip:'Download as PDF'
                }
            ]
        });
        me.callParent(arguments);
    }
});

Ext.define('People.accountsl.Detail',{
    extend:'Ext.grid.GridPanel',
    xtype:'accountsldetail',
    title:'Account SL Details',
    columns:[
        {dataIndex:'field1',text:'Transaction Date'},
        {dataIndex:'field2',text:'Ref No.'},
        {dataIndex:'field3',text:'Particular'},
        {dataIndex:'field4',text:'Debit',renderer:function(val){return Ext.util.Format.number(val, '0,000.00')}},
        {dataIndex:'field5',text:'Credit',renderer:function(val){return Ext.util.Format.number(val, '0,000.00')}},
        {dataIndex:'field6',text:'Outstanding Balance', renderer:function(val){return Ext.util.Format.number(val, '0,000.00')}}
    ],
    store:[
        ['2014/02/01','20140215','SSS Loan','25000.00','642.80','24357.20'],
        ['2014/02/24','20140228','SSS Loan','24357.20','642.80','23714.40'],
        ['2014/03/04','20140315','SSS Loan','23714.40','642.80','23071.60']
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            tbar:[
                {
                    iconCls:'reset-icon',
                    tooltip:'Reload records'
                }
            ]
        });
        me.callParent(arguments);
    }
});

Ext.define('People.accountsl.View',{
    extend:'Ext.container.Container',
    xtype:'accountslview',
    layout:'border',
    items:[
        {
            region:'center',
            forceFit:true,
            xtype:'accountsllist',
        },
        {
            region:'east',
            width:'60%',
            split:true,
            collapsible:true,
            forceFit:true,
            xtype:'accountsldetail'
        }
    ]
})

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:{
            region:'center',
            xtype:'accountslview'
        }
    });
})