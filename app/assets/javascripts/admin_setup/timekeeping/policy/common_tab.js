var common_tab = {
    title:'Common',
    xtype:'panel',
    layout:'vbox',
    items:[
        {
            xtype:'fieldset',
            title:'Holidays',
            layout:'vbox',
            margin:15,
            items:[
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'fieldset',
                            title:'Legal Holiday',
                            width:350,
                            items:[
                                {
                                    xtype:'policyholiday',
                                    holidayDesc:'Legal Holiday',
                                    holidayPayName:'com_payhollg',
                                    attendanceBeforeName:'com_requireattbefhollg',
                                    attendanceAfterName:'com_requireattafthollg'
                                }
                            ]
                        },
                        {
                            margin:'0 0 0 25',
                            xtype:'fieldset',
                            width:350,
                            title:'Special Holiday',
                            items:[
                                {
                                    xtype:'policyholiday',
                                    holidayDesc:'Special Holiday',
                                    holidayPayName:'com_payholsp',
                                    attendanceBeforeName:'com_requireattbefholsp',
                                    attendanceAfterName:'com_requireattaftholsp'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'fieldset',
                            title:'Holiday Type 1',
                            width:350,
                            items:[
                                {
                                    xtype:'policyholiday',
                                    holidayDesc:'Holiday 1',
                                    holidayPayName:'com_payholtype1',
                                    attendanceBeforeName:'com_requireattbefholtype1',
                                    attendanceAfterName:'com_requireattaftholtype1'
                                }
                            ]
                        },
                        {
                            margin:'0 0 0 25',
                            xtype:'fieldset',
                            title:'Holiday Type 2',
                            width:350,
                            items:[
                                {
                                    xtype:'policyholiday',
                                    holidayDesc:'Holiday 2',
                                    holidayPayName:'com_payholtype2',
                                    attendanceBeforeName:'com_requireattbefholtype2',
                                    attendanceAfterName:'com_requireattaftholtype2',
                                }
                            ]
                        }
                    ]
                } 
            ]
        },
        {
            xtype:'fieldset',
            title:'Other Item Code/s',
            margin:'0 0 0 15',
            items:[
                {
                    xtype:'combobox',
                    fieldLabel:'Meal Allowance',
                    name:'policy[com_mealallowcode]',
                    id:'meal_allowance_code',
                    store:[],
                    allowBlank:true,
                    labelWidth:150
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Transportation Allowance',
                    name:'policy[com_transallowcode]',
                    id:'transpo_allowance_code',
                    store:[],
                    allowBlank:true,
                    labelWidth:150
                }
            ]
        }
    ]
};