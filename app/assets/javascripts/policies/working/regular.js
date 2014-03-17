function regularWorkingPolicyEditor()
{
    Ext.create('People.editor.Window',
    {
        title:'Regular Working Policy Editor',
        items:[
            {
                id:'regular_working_policy_form',
                items:[

                    {
                        title:'Meal Allowance',
                        xtype:'myfieldset',
                        items:[
                            {
                                xtype:'fieldcontainer',
                                items:[
                                    {
                                        boxLabel:'With Fixed Meal Allowance of ',
                                        xtype:'checkboxfield',
                                        name:'meal_allowance[first_min][checkbox]'
                                    },
                                    {
                                        xtype:'textfield',
                                        name:'meal_allowance[first_min][value]'
                                    },
                                    {
                                        fieldLabel:'for the First',
                                        name:'meal_allowance[first_min][minute]'
                                    },
                                    {
                                        xtype:'box',
                                        html:'minutes.',
                                        width:25
                                    }
                                ]
                            },
                            {
                                xtype:'fieldcontainer',
                                items:[
                                    {
                                        boxLabel:'With Succeeding Meal Allowance of ',
                                        xtype:'checkboxfield',
                                        name:'meal_allowance[succeed_min][checkbox]'
                                    },
                                    {
                                        xtype:'textfield',
                                        name:'meal_allowance[succeed_min][value]'
                                    },
                                    {
                                        xtype:'numberfield',
                                        fieldLabel:'for the First',
                                        name:'meal_allowance[succeed_min][minute]'
                                    },
                                    {
                                        xtype:'box',
                                        html:'minutes.',
                                        width:25
                                    }
                                ]
                            },
                            {
                                xtype:'fieldcontainer',
                                items:[
                                    {
                                        boxLabel:'With Fix Meal Allowance of ',
                                        xtype:'checkboxfield',
                                        name:'meal_allowance[beyond_eq_min][checkbox]'
                                    },
                                    {
                                        xtype:'textfield',
                                        name:'meal_allowance[beyond_eq_min][value]'
                                    },
                                    {
                                        fieldLabel:'Beyond or Equal to',
                                        name:'meal_allowance[beyond_eq_min][minute]'
                                    },
                                    {
                                        xtype:'box',
                                        html:'minutes.',
                                        width:25
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype:'myfieldset',
                        title:'Transportation Allowance',
                        items:[
                            {
                                xtype:'checkboxfield',
                                boxLabel:'With fix transportation allowance of',
                                name:'trans_allowance_checkbox'
                            },
                            {
                                xtype:'textfield',
                                name:'trans_allowance_value'
                            }
                        ]
                    }
                ]
            }
        ]
    }).show();
}

// ggruba U112