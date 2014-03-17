Ext.define('People.list.Grid',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.listgrid',
    require:['Ext.grid.*', 'Ext.form.*'],
    constructor:function(config){
        var me = this;
        me.callParent(arguments);
        me.initConfig(config);
    },
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            forceFit: me.forceFit||true,
            store:me.store,
            columns:me.columns,
            height: me.height || 450,
            border:true,
            scroll:false,
            frame:false,
            padding:0,
            dockedItems:[{
                xtype:'pagingtoolbar',
                store: me.store,   
                dock: 'bottom',
                displayInfo: true
            }]
        });
        me.callParent(arguments);
    }
});