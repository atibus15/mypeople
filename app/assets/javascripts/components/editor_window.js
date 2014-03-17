Ext.define('People.editor.Window', {
    extend: 'Ext.window.Window',
    alias:'widget.editorwindow',
    requires: ['Ext.panel.*','Ext.form.*'],
    initComponent: function(){
        var me = this;
        var padding = this.padding ? this.padding : '0';
        Ext.apply(this, {
            modal:true,
            defaultType:'form',
            autoScroll:true,
            closeAction:'destroy',
            layout:'vbox',
            defaults:{
                bodyStyle:'background-color:transparent;',
                frame:false,
                border:false,
                maxHeight:600,
                padding:padding,
                defaultType:'panel',
                defaults:{
                    padding:'5px',
                    bodyStyle:'background-color:transparent;',
                    frame:false,
                    border:false,
                    defaultType:'textfield',
                    autoWidth:true,
                    autoHeight:true,
                    layout:'hbox',
                    defaults:{
                        enableKeyEvents:true,
                        width:300,
                        labelWidth:150,
                        margin:'0 25px 0 0'
                    }
                }
            }
            
        });
        
        me.callParent(arguments);
        me.on('afterrender',function(){
            new Ext.util.KeyMap({
                target:me.getEl(),
                key:13,
                fn:function(){
                    me.enterFn();
                }
            });
        })

        
    },
    constructor:function(config){
        var me = this;
        me.callParent(arguments);
    }
});
