
Ext.define('People.combo.Modal',{
    extend:'Ext.form.ComboBox',
    require:['Ext.window.*', 'Ext.data.*', 'Ext.grid.*'],
    alias:'widget.combomodal',
    getTitle:function(){
        var my_title = this.fieldLabel || this.emptyText;
        if(my_title){
            var len = my_title.length;
            var last_letter = my_title.slice(len - 1).toLowerCase();
            if(last_letter == 's') return my_title;
            else if(last_letter == 'y') return my_title.substr(0, len - 1) + 'ies';
            else return my_title + 's';
        }else{
            return 'Selections';
        }
    },
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            valueField:me.valueField,
            displayField:me.displayField,
            store:me.store,
            changeFn:me.changeFn,
            editable:false,
            typeAhead:false,
            listConfig:{
                maxHeight:1
            },

            listeners:{
                expand:function(cmp, e){
                    var code_header = me.fieldLabel || me.emptyText;
                    me.store.reload();
                    original_record = me.store.getRange();
                    if(me.group) me.store.group(me.group);
                    var win = Ext.create('Ext.window.Window',{
                        title: me.getTitle(), //plural_labels[me.fieldLabel.trim()] || me.fieldLabel,
                        height:300,
                        autoWidth:true,
                        modal:true,
                        autoScroll:true,
                        closable:true,
                        layout:'fit',
                        items:[
                            Ext.create('Ext.grid.GridPanel',{
                                store:me.store,
                                autoScroll:false,
                                border:false,
                                frame:false,
                                features:[Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'})],
                                forceFit:true,
                                width:400,
                                columns:[
                                    {text:code_header+' Code', dataIndex:me.codeField, width:35},
                                    {text:'Description', dataIndex:me.displayField}
                                ],
                                listeners:{
                                    itemclick:function(g, record){
                                        me.setValue(record.get(me.valueField));
                                        win.destroy();
                                    }
                                }
                            })
                        ],
                        dockedItems:[
                            {
                                xtype:'toolbar',
                                dock:'bottom',
                                ui:'footer',
                                layout:'fit',
                                items:[
                                    {
                                        xtype:'textfield',
                                        fieldLabel:'Search',
                                        labelWidth:50,
                                        name:'combo_search',
                                        enableKeyEvents:true,
                                        listeners:{
                                            keyup:function(s, e){
                                                var search_val = s.getValue().trim();
                                                var grid = s.findParentByType('window').getComponent(0);

                                                grid.store.loadRecords(original_record);


                                                if(search_val){
                                                    var ereg = '/'+search_val+'/gi';
                                                    var match_record = grid.store.queryBy(function(record){
                                                        return eval(ereg).test(record.get(me.displayField));
                                                    });
                                                    grid.store.loadRecords(match_record.getRange());
                                                }                                     
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    });
                    win.show();
                    win.toFront();
                },
                change: me.changeFn
            }
        });
        me.callParent(arguments);
    },
    constructor:function(config){
        this.callParent(arguments);
        this.initConfig(config);
    }
});