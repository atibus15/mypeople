Ext.define('People.pyeditor.Window',{
    extend:'People.editor.Window',
    alias:'widget.pyeditor',
    require:['Ext.form.*'],
    title:'Payroll Editor',
    initComponent:function(){
        var me = this;
        var submit_function = function(){

        };
        Ext.apply(me, {
            
            enterFn:submit_function,
            items:[
                {
                    id:'pyeditor_form',
                    layout:{type:'table', columns:1},
                    items:[
                        {
                            fieldLabel:'File Code',
                            xtype:'textfield'
                        },
                        {
                            fieldLabel:'Description',
                            xtype:'textfield'
                        },
                        {
                            xtype:'fieldset',
                            border:true,
                            frame:true,
                            title:'Attendance Cut-off',
                            layout:'vbox',
                            defaulType:'datefield',
                            defaults:{
                                width:200,
                                labelWidth:50
                            },
                            items:[
                                {
                                    fieldLabel:'From',
                                    xtype:'datefield'
                                },
                                {
                                    fieldLabel:'To',
                                    xtype:'datefield'
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            xtype:'fieldset',
                            border:true,
                            frame:true,
                            title:'For',
                            layout:'vbox',
                            defaults:{
                                labelWidth:50,
                                width:200
                            },
                            items:[
                                {
                                    fieldLabel:'Year',
                                    xtype:'numberfield',
                                    minValue:new Date().getFullYear() - 1,
                                    maxValue:new Date().getFullYear() + 1,
                                    hideTrigger:true,
                                    value:new Date().getFullYear()
                                },
                                {
                                    fieldLabel:'Month',
                                    xtype:'combobox',
                                    store:[
                                        [01,"January"],
                                        [02,"February"],
                                        [03,"March"],
                                        [04,"April"],
                                        [05,"May"],
                                        [06,"June"],
                                        [07,"July"],
                                        [08,"August"],
                                        [09,"September"],
                                        [10,"October"],
                                        [11,"November"],
                                        [12,"December"]
                                    ]

                                },
                                {
                                    fieldLabel:'Week',
                                    xtype:'combobox',
                                    editable:false,
                                    store:[[1,'1st'],[2,'2nd'],[3,'3rd'],[4,'4th']]
                                }
                                
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        var me = this;
        me.callParent(arguments);
        me.initConfig(configs);
    }
})