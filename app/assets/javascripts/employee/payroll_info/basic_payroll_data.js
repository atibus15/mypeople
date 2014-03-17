
function basicPayrollDataEditor(employee)
{
    Ext.create('People.editor.Window',{
        title:'Basic Payroll Data',
        id:'basic_payroll_data_window',
        autoScroll:true,
        items:[
            {
                id:'basic_payroll_data_form',
                items:[
                    {
                        layout:'hbox',
                        items:[
                            {
                                fieldLabel:'Tax Identification No.'
                            },
                            {
                                fieldLabel:'SSS/GSIS No.'
                            },
                            {
                                fieldLabel:'PagIbig No.'
                            },
                            {
                                fieldLabel:'PhilHealth No.'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'COOP Member'
                            },
                            {
                                fieldLabel:'UNION Member'
                            },
                            {
                                fieldLabel:'Employee is SENIOR'
                            },
                            {
                                fieldLabel:'Senior ID No.'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Cooperative\'s Name'
                            },
                            {
                                fieldLabel:'Coop Member ID'
                            },
                            {
                                fieldLabel:'UNION\'s Name'
                            },
                            {
                                fieldLabel:'UNION\'s Member ID'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'TAX Type'
                            },
                            {
                                fieldLabel:'Payroll Type'
                            },
                            {
                                fieldLabel:'Rate per Day on Basic Pay'
                            },
                            {
                                fieldLabel:'Actual Basic Pay'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Payroll Frequency'
                            },
                            {
                                fieldLabel:'Rate per Day on Basic Pay + Tax Shield Amount'
                            },
                            {
                                fieldLabel:'Declared Basic Pay'
                            },
                            {
                                fieldLabel:'Basic of Overtime Pay'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Tax Shield Amount'
                            }
                        ]
                    }
                ]
            }
        ],
        fbar:[
            {
                text:'Save'
            },
            {
                text:'Cancel',
                handler:function(){
                    this.findParentByType('editorwindow').destroy();
                }
            }
        ]
    }).show();
}