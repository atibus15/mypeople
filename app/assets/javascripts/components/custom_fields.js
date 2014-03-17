Ext.define('People.policy.Checkbox',{
    extend:'Ext.panel.Panel',
    requires:'Ext.form.*',
    alias:'widget.policycheckbox',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            border:false,
            frame:false,
            defaultType:'container',
            defaults:{
                layout:'table',
                margin:'0 0 0 15'
            }
        });

        me.callParent(arguments);

        me.getComponent(0).on('change',function(cmp, new_val, old_val,e){

            if(new_val){
                me.enableSubComponents();
            }else{
                me.disableSUbComponents();
            }
        });
    },
    constructor:function(configs){
        this.callParent(arguments);
        this.initConfig(configs);
        this.setSubComponents();
        this.disableSUbComponents();
    },
    setSubComponents:function(){
        var counter = 0;
        var me = this;
        this.subComponents = me.queryBy(function(child){
            counter++;
            return ((child.baseCls == 'x-field') && counter > 1);
        },me);
    },
    getSubComponents:function(){
        return this.subComponents;
    },
    enableSubComponents:function(){
        var me = this;
        var subs = me.getSubComponents();
        Ext.each(subs,function(sub){
            sub.enable(true);
            if(sub.getXType() == 'peoplecheckbox'){
                sub.setValue(1);
            }
        });
              
    },
    disableSUbComponents:function(){
        var me = this;
        var subs = me.getSubComponents();
        Ext.each(subs,function(sub){
            try{
                sub.setValue(null);
                sub.disable(true);
            }catch(e){}
        });
    }
});

Ext.define('People.time.Range',{
    extend:'Ext.container.Container',
    require:['Ext.form.peopletimefield'],
    alias:'widget.timerange',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            layout:me.layout || 'hbox', 
            defaultType:'peopletimefield',
            defaults:{width:125,labelWidth:35,emptyText:'Time',margin:'0 15 0 0'},
            items:[
                {fieldLabel:'Start',name:me.startName},
                {fieldLabel:'End',name:me.endName}
            ]
        });
        me.callParent(arguments);
    }
});


Ext.define('People.check.Timerange',{
    extend:'People.policy.Checkbox',
    require:['People.time.Range'],
    alias:'widget.checktimerange',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            items:[
                {
                    boxLabel:me.boxLabel,
                    xtype:'peoplecheckbox',
                    name:me.checkboxName,
                    margin:0
                },
                {
                    xtype:'timerange',
                    startName:me.startName,
                    endName:me.endName
                }
            ]
        });
        me.callParent(arguments);
    }
});


Ext.define('People.policybreak.Field',{
    extend:'People.policy.Checkbox',
    alias:'widget.policybreak',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            margin:'0',
            items:[
                {
                    xtype:'peoplecheckbox',
                    boxLabel:me.boxLabel,
                    name:'policy['+me.checkboxName+']',
                    margin:0
                },
                {
                    xtype:'policycheckbox',
                    layout:'hbox',
                    items:[
                        {
                            margin:0,
                            xtype:'peoplecheckbox',
                            boxLabel:'Fix Break of ',
                            name:'policy['+me.namePrefix+'_fixed]'
                        },
                        {
                            xtype:'numberfield',
                            hideTrigger:true,
                            allowBlank:false,
                            emptyText:'Minutes',
                            name:'policy['+me.namePrefix+'_fixmins]',
                            width:75
                        },
                        {
                            xtype:'box',
                            html:'minutes'
                        }
                    ]
                },
                {
                    xtype:'checktimerange',
                    boxLabel:'By Range',
                    layout:'vbox',
                    checkboxName:'policy['+me.namePrefix+'_range]',
                    startName:'policy['+me.namePrefix+'_starttime]',
                    endName:'policy['+me.namePrefix+'_endtime]'
                }
            ]
        });
        me.callParent(arguments);
    }
});

Ext.define('People.allowance.Field',{
    extend:'People.policy.Checkbox',
    alias:'widget.allowancefield',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            layout:'vbox',
            margin:'0',
            items:[
                {
                    margin:0,
                    xtype:'peoplecheckbox',
                    boxLabel:'With '+ me.boxLabel,
                    name:'policy['+me.namePrefix+']'
                },
                {
                    xtype:'policycheckbox',
                    layout:'vbox',
                    items:[
                        {
                            margin:0,
                            xtype:'peoplecheckbox',
                            boxLabel:'With Fixed '+me.boxLabel+' Amount of',
                            name:me.namePrefix+'_first',
                            width:300,
                        },
                        {
                            xtype:'container',
                            items:[
                                {
                                    xtype:'moneyfield',
                                    emptyText:'Amount',
                                    name:'policy['+me.namePrefix+'_firstamt]',
                                    width:100
                                },
                                {
                                    xtype:'numberfield',
                                    hideTrigger:true,
                                    fieldLabel:'&nbsp;for the first',
                                    name:'policy['+me.namePrefix+'_firstmins]',
                                    width:175,
                                    emptyText:'Minutes',
                                    allowBlank:false
                                },
                                {
                                    xtype:'box',
                                    margin:'0 0 0 5',
                                    html:'Minutes'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype:'policycheckbox',
                    layout:'vbox',
                    items:[

                        {
                            margin:0,
                            xtype:'peoplecheckbox',
                            boxLabel:'With Succeeding '+me.boxLabel+' Amount of',
                            name:me.namePrefix+'_succ',
                            width:300,
                        },
                        {
                            xtype:'container',
                            items:[
                                {
                                    xtype:'moneyfield',
                                    emptyText:'Amount',
                                    name:'policy['+me.namePrefix+'_succamt]',
                                    width:100
                                },
                                {
                                    xtype:'numberfield',
                                    hideTrigger:true,
                                    fieldLabel:'&nbsp;for the succeeding',
                                    name:'policy['+me.namePrefix+'_succmins]',
                                    width:190,
                                    emptyText:'Minutes',
                                    labelWidth:115,
                                    allowBlank:false
                                },
                                {
                                    xtype:'box',
                                    margin:'0 0 0 5',
                                    html:'Minutes'
                                }
                            ]
                        }       
                    ]
                },
                {
                    xtype:'policycheckbox',
                    layout:'vbox',
                    items:[
                        {
                            margin:0,
                            xtype:'peoplecheckbox',
                            boxLabel:'With Fixed '+me.boxLabel+' Amount of',
                            name:me.namePrefix+'_beyond',
                            width:300
                        },
                        {
                            xtype:'container',
                            items:[
                                {
                                    xtype:'moneyfield',
                                    emptyText:'Amount',
                                    name:'policy['+me.namePrefix+'_beyondamt]',
                                    width:100
                                },
                                {
                                    xtype:'numberfield',
                                    hideTrigger:true,
                                    fieldLabel:'&nbsp;Beyond or Equal To',
                                    name:'policy['+me.namePrefix+'_succmins]',
                                    width:200,
                                    emptyText:'Minutes',
                                    labelWidth:125,
                                    allowBlank:false
                                },
                                {
                                    xtype:'box',
                                    margin:'0 0 0 5',
                                    html:'Minutes'
                                }
                            ]
                        } 
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});

Ext.define('People.policy.Holiday',{
    extend:'People.policy.Checkbox',
    alias:'widget.policyholiday',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            items:[
                {
                    margin:0,
                    xtype:'peoplecheckbox',
                    boxLabel:'Pay '+me.holidayDesc,
                    name:'policy['+me.holidayPayName+']'
                },
                {
                    xtype:'peoplecheckbox',
                    boxLabel:'Require attendance before '+me.holidayDesc,
                    name:'policy['+me.attendanceBeforeName+']'
                },
                {
                    xtype:'peoplecheckbox',
                    boxLabel:'Require attendance after '+me.holidayDesc,
                    name:'policy['+me.attendanceAfterName+']'
                }
            ]
        });
        me.callParent(arguments);
    }
});
