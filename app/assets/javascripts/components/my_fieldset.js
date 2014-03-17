Ext.define('People.fieldset.form',{
    extend:'Ext.form.FieldSet',
    alias:'widget.myfieldset',
    constructor:function(configs)
    {
        var me = this;
        me.callParent(arguments);
        me.initConfig(configs);
    },
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            border:true,
            frame:false,
            width:me.width || 600,
            autoHeight:true,
            padding:me.padding || '0 5px 0 10px',
            margin:me.margin || '15 0 15 0',
            layout:'vbox',
            defaultType:'fieldcontainer',
            defaults:{
                layout:'hbox',
                autoWidth:true,
                defaultType:'textfield'
            }
        });
        me.callParent(arguments);
    }
});