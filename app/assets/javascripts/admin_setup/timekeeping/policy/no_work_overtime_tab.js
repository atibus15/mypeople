var no_work_overtime_tab = {
    title:'Overtime',
    layout:'hbox',
    autoHeight:true,
    items:[
        {
            xtype:'container',
            items:[
                {
                    xtype:'fieldset',
                    title:'Overtime',
                    width:350,
                    items:[
                        {
                            xtype:'policycheckbox',
                            items:[
                                {
                                    margin:'0',
                                    xtype :'peoplecheckbox',
                                    boxLabel:'Allow Overtime',
                                    name:'policy[wo_bi_allowot]',
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
                                            emptyText:'Minutes',
                                            labelWidth:110,
                                            name:'policy[wo_bi_minotmins]'
                                        },
                                        {
                                            xtype:'box',
                                            margin:'0 0 5 5',
                                            html:'Minutes'
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
                            namePrefix:'no_withmealallow'
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
                    namePrefix:'no_withtransallow'
                }
            ]
        }
    ]
};