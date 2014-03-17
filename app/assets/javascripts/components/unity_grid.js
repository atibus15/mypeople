Ext.define('People.unity.Grid',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.employeegrid',
    constructor:function(config){
        var me = this;
        me.callParent(arguments);
        me.initConfig(config);
    },
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            id:'employee_list_grid',
            height:600,
            forceFit:true,
            store:me.store,
            columns:me.columns,
            bbar:{
                xtype:'pagingtoolbar',
                store:me.store,
                displayInfo:true
            }
            
        });
        me.callParent(arguments);
    },
    getSelected:function(){
        var sm = this.getSelectionModel();
        var sel = sm.getSelection();
        return sel ? sel[0] : false;
    },
    checkSelection:function(){
        if(!this.getSelected())
        {
            Ext.Msg.alert('MyPeople', 'Please select employee.');
            return false;
        }
        return true;
    }
});