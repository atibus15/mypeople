
var working_days_overtime_tabs = {
    title:'Overtime',
    xtype:'tabpanel',
    layout:'hbox',
    padding:0,
    activeTab:0,
    minHeight:400,
    items:[
        {
            title:'Before In',
            padding:15,
            items:[
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'container',
                            items:[
                                {
                                    xtype:'fieldset',
                                    title:'Regular Overtime',
                                    width:425,
                                    items:[
                                        {
                                            xtype:'policycheckbox',
                                            items:[
                                                {
                                                    margin:'0',
                                                    xtype :'peoplecheckbox',
                                                    boxLabel:'Allow Overtime',
                                                    name:'policy[wo_bi_allowot]'
                                                },
                                                {
                                                    xtype:'container',
                                                    items:[
                                                        {
                                                            fieldLabel:'Minimum Overtime',
                                                            xtype:'numberfield',
                                                            hideTrigger:true,
                                                            width:200,
                                                            labelWidth:110,
                                                            allowBlank:false,
                                                            emptyText:'Minutes',
                                                            name:'policy[wo_bi_minotmins]'
                                                        },
                                                        {
                                                            xtype:'box',
                                                            margin:'0 0 5 5',
                                                            html:'Minutes'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype:'policycheckbox',
                                                    layout:'vbox',
                                                    items:[
                                                        {
                                                            margin:0,
                                                            boxLabel:'Require Overtime Permit',
                                                            xtype:'peoplecheckbox',
                                                            name:'wo_bi_requirepermit'
                                                        },
                                                        {
                                                            xtype:'peoplecheckbox',
                                                            boxLabel:'Complete Standard Regular Hours',
                                                            name:'policy[wo_bi_completestandardhrs]'
                                                        },
                                                        {
                                                            xtype:'peoplecheckbox',
                                                            boxLabel:'Offset Undertime to Early Bird\'s Overtime',
                                                            name:'policy[wo_bi_offsetuttoebot]'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype:'fieldset',
                                    title:'Meal Allowance',
                                    items:[
                                        {
                                            xtype:'allowancefield',
                                            boxLabel:'Meal Allowance',
                                            namePrefix:'wo_bi_withmealallow'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            width:450,
                            margin:'0 0 0 25',
                            title:'Transportation Allowance',
                            items:[
                                {
                                    xtype:'allowancefield',
                                    boxLabel:'Transportation Allowance',
                                    namePrefix:'wo_bi_withtransallow'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title:'After Out',
            layout:'hbox',
            margin:'0 0 25 0',
            items:[
                {
                    xtype:'container',
                    layout:'vbox',
                    items:[
                        {
                            margin:15,
                            width:400,
                            xtype:'fieldset',
                            title:'Regular Overtime',
                            items:[
                                {
                                    xtype:'policycheckbox',
                                    items:[
                                        {
                                            margin:'0',
                                            xtype :'peoplecheckbox',
                                            boxLabel:'Allow Overtime',
                                            name:'policy[wo_ao_allowot]',
                                            inputValue:'1'
                                        },
                                        {
                                            xtype:'container',
                                            items:[
                                                {
                                                    fieldLabel:'Minimum Overtime',
                                                    xtype:'numberfield',
                                                    hideTrigger:true,
                                                    allowBlank:false,
                                                    width:200,
                                                    labelWidth:110,
                                                    emptyText:'Minutes',
                                                    name:'policy[wo_ao_minotmins]'
                                                },
                                                {
                                                    xtype:'box',
                                                    margin:'0 0 5 5',
                                                    html:'Minutes'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'container',
                                            layout:'hbox',
                                            items:[
                                                {
                                                    xtype:'policycheckbox',
                                                    layout:'vbox',
                                                    width:300,
                                                    items:[
                                                        {
                                                            margin:0,
                                                            boxLabel:'Require Overtime Permit',
                                                            xtype:'peoplecheckbox',
                                                            name:'wo_ao_requirepermit'
                                                        },
                                                        {
                                                            xtype:'policycheckbox',
                                                            items:[
                                                                {
                                                                    margin:0,
                                                                    xtype:'peoplecheckbox',
                                                                    boxLabel:'Earliest OT Start Time',
                                                                    name:'wo_ao_earliesttime'
                                                                },
                                                                {
                                                                    xtype:'peopletimefield',
                                                                    name:'policy[wo_ao_earliesttime]',
                                                                    width:75
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype:'peoplecheckbox',
                                                            boxLabel:'Complete Standard Regular Hours',
                                                            name:'policy[wo_ao_completestandardhrs]'
                                                        },
                                                        {
                                                            xtype:'peoplecheckbox',
                                                            boxLabel:'Offset Late to Overtime',
                                                            name:'policy[wo_ao_offsetlatetoot]'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            margin:15,
                            width:400,
                            title:'Meal Allowance',
                            items:[
                                {
                                    xtype:'allowancefield',
                                    boxLabel:'Meal Allowance',
                                    namePrefix:'wo_ao_withmealallow'
                                }
                            ]
                        }
                    ]
                } ,
                {
                    xtype:'fieldset',
                    width:450,
                    margin:'15 15 0 25',
                    title:'Transportation Allowance',
                    items:[
                        {
                            xtype:'allowancefield',
                            boxLabel:'Transportation Allowance',
                            namePrefix:'wo_ao_withtransallow'
                        }
                    ]
                }
            ]
        },
        {
            title:'Mid Break',
            items:[
                {
                    margin:15,
                    xtype:'fieldset',
                    width:350,
                    title:'Regular Overtime',
                    items:[
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:0,
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Allow Overtime on 1st Break',
                                    name:'policy[wo_mb_1stbrk_allowot]'
                                },
                                {
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            fieldLabel:'Minimum Overtime',
                                            name:'policy[wo_mb_1stbrk_minotmins]',
                                            labelWidth:115,
                                            allowBlank:false,
                                            emptyText:'Minutes',
                                            width:190
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:0,
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Allow Overtime on 2nd Break',
                                    name:'policy[wo_mb_2ndbrk_allowot]'
                                },
                                {
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            fieldLabel:'Minimum Overtime',
                                            name:'policy[wo_mb_2ndbrk_minotmins]',
                                            labelWidth:115,
                                            allowBlank:false,
                                            emptyText:'Minutes',
                                            width:190
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:0,
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Allow Overtime on 3rd Break',
                                    name:'policy[wo_mb_3rdbrk_allowot]'
                                },
                                {
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            fieldLabel:'Minimum Overtime',
                                            name:'policy[wo_mb_3rdbrk_minotmins]',
                                            labelWidth:115,
                                            allowBlank:false,
                                            emptyText:'Minutes',
                                            width:190
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                }      
                            ]
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:0,
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Allow Overtime on 4th Break',
                                    name:'policy[wo_mb_4thbrk_allowot]'
                                },
                                {
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            fieldLabel:'Minimum Overtime',
                                            name:'policy[wo_mb_4thbrk_minotmins]',
                                            labelWidth:115,
                                            allowBlank:false,
                                            emptyText:'Minutes',
                                            width:190
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                }   
                            ]
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:0,
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Allow Overtime on 5th Break',
                                    name:'policy[wo_mb_5thbrk_allowot]'
                                },
                                {
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            fieldLabel:'Minimum Overtime',
                                            name:'policy[wo_mb_5thbrk_minotmins]',
                                            labelWidth:115,
                                            allowBlank:false,
                                            emptyText:'Minutes',
                                            width:190
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                } 
                            ]
                        }
                    ]
                } 
            ]
        }
    ]
};