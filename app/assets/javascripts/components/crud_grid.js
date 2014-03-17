Ext.define('People.crud.Grid',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.crudgrid',
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
            addBtnHandler: me.addBtnHandler  || function(){},
            editBtnHandler:me.editBtnHandler  || function(){},
            deleteBtnHandler:me.deleteBtnHandler  || function(){},
            addMenu:me.addMenu || false,
            tbar:[
                {
                    text:'Add',
                    width:50,
                    handler:me.addBtnHandler || function(){},
                    menu: me.addMenu
                },
                {
                    text:'Edit',
                    width:50,
                    handler:function(){
                        if(me.checkSelection()){
                            me.editBtnHandler;
                        }
                    }
                },
                {
                    text:'Delete',
                    width:50,
                    handler:function(){
                        if(me.checkSelection()){
                            Ext.MessageBox.show({
                                title:'MyPeople',
                                msg:'Are your sure you want to delete this record?',
                                icon:Ext.MessageBox.QUESTION,
                                buttons:Ext.MessageBox.YESNO,
                                fn:me.deleteBtnHandler
                            });
                        }
                    }
                }
            ],
            dockedItems:[{
                xtype:'pagingtoolbar',
                store: me.store,   
                dock: 'bottom',
                displayInfo: true
            }]
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
            Ext.Msg.alert('MyPeople', 'Please select record.');
            return false;
        }
        return true;
    }
});