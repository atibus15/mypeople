function payrollRemittanceEditor(employee)
{
    Ext.create('People.editor.Window',
    {
        title:'Payroll Remittance Editor',
        items:[
            {
                id:'payroll_remittance_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Payment Method',
                                xtype:'combobox'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Bank Type',
                                xtype:'combobox'
                            },
                            {
                                fieldLabel:'Payment Currency',
                                xtype:'combobox'
                            },
                            {
                                fieldLabel:'Bank Name'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Bank Branch'
                            },
                            {
                                fieldLabel:'Bank Account No.',
                                maskRe:/[\d-]/
                            },
                            {
                                fieldLabel:'Bank Country'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Bank Account Type',
                                xtype:'combobox'
                            },
                            {
                                fieldLabel:'Swift Code'
                            },
                            {
                                fieldLabel:'Bank Contact No.'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Bank Address',
                                width:950
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
