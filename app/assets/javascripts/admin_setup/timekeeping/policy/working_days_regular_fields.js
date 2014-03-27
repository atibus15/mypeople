var working_days_regular_fields = {
    title:'Regular',
    layout:'hbox',
    items:[
        {
            xtype:'fieldcontainer',
            defaultType:'fieldset',
            width:410,
            defaults:{
                width:400
            },
            items:[
                {
                    title:'Meal Allowance',
                    items:[
                        {
                            xtype:'allowancefield',
                            namePrefix:'wr_withmealallow',
                            boxLabel:'Meal Allowance'
                        }
                    ]
                }, // meal allowance end
                {
                    title:'Late and Undertime',
                    items:[
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:'0',
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Strict Policy on Lates',
                                    name:'policy[wr_strictlatepolicy]'
                                },
                                {
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            labelWidth:50,
                                            width:150,
                                            allowBlank:false,
                                            fieldLabel:'Half-day',
                                            emptyText:'Minutes',
                                            name:'policy[wr_strictlatepolicy_hdmins]'
                                        },
                                        {
                                            xtype:'box',
                                            html:'&nbsp;Minutes',
                                            margin:'0 0 5 0'
                                        }
                                    ]
                                },
                                {
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            labelWidth:50,
                                            allowBlank:false,
                                            width:150,
                                            fieldLabel:'Absent',
                                            emptyText:'Minutes',
                                            name:'policy[wr_strictlatepolicy_abmins]'
                                        },
                                        {
                                            xtype:'box',
                                            width:500,
                                            html:'&nbsp;Minutes',
                                            margin:'0 0 5 0'
                                        }
                                    ]
                                }  
                            ]
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:'0',
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Strict Policy on Undertime',
                                    name:'policy[wr_strictutpolicy]'
                                },
                                {
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            labelWidth:50,
                                            allowBlank:false,
                                            width:150,
                                            fieldLabel:'Half-day',
                                            emptyText:'Minutes',
                                            name:'policy[wr_strictutpolicy_hdmins]'
                                        },
                                        {
                                            xtype:'box',
                                            html:'&nbsp;Minutes',
                                            margin:'0 0 5 0'
                                        }
                                    ]
                                },
                                {
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            labelWidth:50,
                                            allowBlank:false,
                                            width:150,
                                            emptyText:'Minutes',
                                            fieldLabel:'Absent',
                                            name:'policy[wr_strictutpolicy_abmins]'
                                        },
                                        {
                                            xtype:'box',
                                            width:500,
                                            html:'&nbsp;Minutes',
                                            margin:'0 0 5 0'
                                        }
                                    ]
                                }  
                            ]
                        },
                        {
                            xtype:'peoplecheckbox',
                            boxLabel:'Apply/s to Night Differential',
                            name:'policy[wr_strictlateut_applytondiff]'
                        }
                    ]
                }
            ]
        },
        {
            xtype:'fieldcontainer',
            defaultType:'fieldset',
            width:400,
            defaults:{
                width:300
            },
            items:[
                {
                    title:'Grace Period',
                    items:[
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:'0',
                                    xtype :'peoplecheckbox',
                                    boxLabel:'With Grace Period on Time-In',
                                    name:'policy[wr_withgraceprd_timein]',
                                    inputValue:'1'
                                },
                                {
                                    items:[
                                        {
                                            fieldLabel:'Grace Period',
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            allowBlank:false,
                                            width:145,
                                            labelWidth:75,
                                            emptyText:'Minutes',
                                            name:'policy[wr_withgraceprd_timein_mins]'
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                },
                                {
                                    items:[
                                        {
                                            boxLabel:'Deduct grace period from total late',
                                            xtype:'peoplecheckbox',
                                            name:'policy[wr_graceprd_deductfromlate]'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:'0',
                                    xtype :'peoplecheckbox',
                                    boxLabel:'With Grace Period on Time-Out',
                                    name:'policy[wr_withgraceprd_timeout]',
                                    inputValue:'1'
                                },
                                {
                                    items:[
                                        {
                                            fieldLabel:'Grace Period',
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            allowBlank:false,
                                            width:145,
                                            labelWidth:75,
                                            emptyText:'Minutes',
                                            name:'policy[wr_withgraceprd_timeout_mins]'
                                        },
                                        {
                                            xtype:'box',
                                            html:'Minutes',
                                            margin:'0 0 5 5'
                                        }
                                    ]
                                },
                                {
                                    items:[
                                        {
                                            boxLabel:'Deduct grace period from total undertime',
                                            xtype:'peoplecheckbox',
                                            name:'policy[wr_graceprd_deductfromut]'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title:'Leave of Absences',
                    items:[
                        {
                            xtype:'peoplecheckbox',
                            boxLabel:'Ignore Swipe if there is a Leave Application',
                            name:'policy[wr_loa_ignorelogs]'
                        },
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:'0',
                                    xtype :'peoplecheckbox',
                                    boxLabel:'Prioritize Leave Application',
                                    name:'policy[wr_loa_prioritizeapp]',
                                    inputValue:'1'
                                },
                                {
                                    items:[
                                        {
                                            fieldLabel:'Minimum Chargeable to Leave',
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            allowBlank:false,
                                            width:200,
                                            labelWidth:125,
                                            emptyText:'Minutes',
                                            name:'policy[wr_loa_minchargemins]'
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
                },
                {
                    title:'Other/s',
                    width:1000,
                    items:[
                        {
                            xtype:'container',
                            items:[
                                {
                                    margin:'0',
                                    xtype:'peoplecheckbox',
                                    boxLabel:'Compute Incomplete Logs as',
                                    inputValue:'1'
                                },
                                {
                                    xtype:'container',
                                    items:[
                                        {
                                            xtype:'radiogroup',
                                            columns:1,
                                            vertical:true,
                                            items:[
                                                {
                                                    boxLabel:'Half Day',
                                                    inputValue:'1'
                                                },
                                                {
                                                    boxLabel:'Absent',
                                                    inputValue:'1'
                                                },
                                                {
                                                    boxLabel:'Hours of Work',
                                                    inputValue:'1'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'peoplecheckbox',
                            boxLabel:'Set Hours Work as Complete',
                            name:'policy[wr_oth_sethrswkcomplete]'
                        },
                        {
                            xtype:'peoplecheckbox',
                            boxLabel:'Offset Late to Extended Hours',
                            name:'policy[wr_oth_offsetlatetoexthrs]'
                        }
                    ]
                }
            ]
        }
    ]
};