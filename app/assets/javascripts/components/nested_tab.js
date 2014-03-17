Ext.define('People.nested.Tab',{
    extend:'Ext.tab.Panel',
    alias:'widget.nestedtab',
    requires:['Ext.form.*'],
    constructor:function(config)
    {
        this.callParent(arguments);
        this.initConfig(config);
    },
    initComponent:function(){
        var me = this;

        Ext.apply(me, {
            defaultType:'tabpanel',
            minHeight:300,
            minWidth:300,
            frame:false,
            padding:0,
            defaults:{
                minHeight:500,
                defaults:{padding:'15 15 30 15'}
            }
        });
        me.callParent(arguments);
    }
});