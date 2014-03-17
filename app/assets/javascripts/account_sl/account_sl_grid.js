/* Created by   : adam ibus
 * Release Date : 01/15//2014 
 * Copyright    : Business Software and Application Group 2013
 */


Ext.define('People.accountsl.List',{
    extend:'Ext.grid.GridPanel',
    xtype:'accountsllist',
    title:'Accounts SL List',
    store:[
        ['1','SSS Loan','2014/02/25','25,000.00','25,000.00'],
    ],
    columns:[
        {dataIndex:'field1',text:'Ref. #'},
        {dataIndex:'field2',text:'Description', width:250},
        {dataIndex:'field3',text:'Date Granted', width:500,renderer:function(val){return Ext.util.Format.date(val, 'm/d/Y');}},
        {dataIndex:'field4',text:'Balance as of'},
        {dataIndex:'field5',text:'Outstanding Balance', width:250,renderer:function(val){return Ext.util.Format.number(val, '0,000.00')}}
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
        {dataIndex:'field4',text:'Debit'},
        {dataIndex:'field5',text:'Credit'},
        {dataIndex:'field6',text:'Outstanding Balance'}
    ],
    store:[
        ['2014/03/04','20140315','SSS Loan','25,000.00','642.80','24357.20']
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