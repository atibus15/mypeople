function deductionPaymentEditor(employee)
{
    Ext.create('People.editor.Window',{
        title:'Recurring Deduction/Payments',
        items:[
            {
                id:'deduction_payment_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Type of Recurring Deductions/Payments',
                                xtype:'combobox'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Reference No.'
                            },
                            {
                                fieldLabel:'Reference Date',
                                labelWidth:175,
                                width:325
                            },
                            {
                                fieldLabel:'No. of Deductions'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Total Deduction Amount'
                            },
                            {
                                fieldLabel:'Recurring Deduction Amount',
                                labelWidth:175,
                                width:325
                            },
                            {
                                fieldLabel:'Basis of Deduction',
                                xtype:'combobox'
                            }
                        ]
                    },
                    {
                        fieldLabel:'Remarks',
                        xtype:'textarea',
                        emptyText:'Enter your remarks here',
                        labelWidth:150,
                        width:975,
                        height:50
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