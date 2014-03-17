
Ext.define('People.policy.Break',{
    extend:'People.policy.Checkbox',
    alias:'widget.adambreak',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            items:[
                { margin:0,xtype:'peoplecheckbox',boxLabel:me.checkBoxLabel,name:'policy['+me.checkboxName+']'},
                {xtype:'policycheckbox',layout:'vbox',
                    items:[
                        {margin:0,xtype:'peoplecheckbox',boxLabel:me.strictLabel,name:'policy['+me.strictName+']'},
                        {xtype:'timerange', startName:me.startName, endName:me.endName}
                    ]
                }
            ]
        });me.callParent(arguments);
    }
});

var working_days_break_tabs = {
    title:'Break',
    layout:'hbox',
    padding:0,
    minHeight:400,
    items:[
        {
            margin:15,
            xtype:'fieldset',
            title:'Breaks',
            layout:'hbox',
            width:700,
            items:[
                {
                    xtype:'container',
                    width:350,
                    items:[
                        {
                            xtype:'adambreak',
                            checkBoxLabel:'With First Break',
                            strictLabel:'Strict First Break',
                            checkboxName:'wb_with1stbrk',
                            strictName:'wb_strict1stbrk',
                            startName:'policy[wb_strict1stbrk_starttime]',
                            endName:'policy[wb_strict1stbrk_endtime]'
                        },
                        {
                            xtype:'adambreak',
                            checkBoxLabel:'With Second Break',
                            strictLabel:'Strict Second Break',
                            checkboxName:'wb_with2ndbrk',
                            strictName:'wb_strict2ndbrk',
                            startName:'policy[wb_strict2ndbrk_starttime]',
                            endName:'policy[wb_strict2ndbrk_endtime]'
                        },
                        {
                            xtype:'adambreak',
                            checkBoxLabel:'With Third Break',
                            strictLabel:'Strict Third Break',
                            checkboxName:'wb_with3rdbrk',
                            strictName:'wb_strict3rdbrk',
                            startName:'policy[wb_strict3rdbrk_starttime]',
                            endName:'policy[wb_strict3rdbrk_endtime]'
                        }
                    ]
                },
                {
                    xtype:'container',
                    items:[
                        {
                            xtype:'adambreak',
                            checkBoxLabel:'With Fourth Break',
                            strictLabel:'Strict Fourth Break',
                            checkboxName:'wb_with4thbrk',
                            strictName:'wb_strict4thbrk',
                            startName:'policy[wb_strict4thbrk_starttime]',
                            endName:'policy[wb_strict4thbrk_endtime]'
                        },
                        {
                            xtype:'adambreak',
                            checkBoxLabel:'With Fifth Break',
                            strictLabel:'Strict Fifth Break',
                            checkboxName:'wb_with5thbrk',
                            strictName:'wb_strict5thbrk',
                            startName:'policy[wb_strict5thbrk_starttime]',
                            endName:'policy[wb_strict5thbrk_endtime]'
                        }
                    ]
                }   
            ]
        }
    ]
};