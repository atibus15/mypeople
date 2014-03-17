function currentEmploymentData(employee)
{

    var editor_window = Ext.create('People.editor.Window',{
        title:'Current Employment Data',
        items:
        [
            {
                id:'employment_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Labor Type',
                                xtype:'combobox',
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Labor Type Details',
                                xtype:'combobox',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Date Hired',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Last Labor Group',
                                xtype:'combobox',
                                labelWidth:200,
                                width:350
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Contract Element',
                                xtype:'combobox',
                                labelWidth:170,
                                width:320
                            },
                            {
                                fieldLabel:'Regularization/Confirmation Date',
                                xtype:'datefield',
                                readOnly:true
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Separation/Employment End Date',
                                xtype:'datefield',
                                readOnly:true,
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Length of Employment from Present Employer',
                                xtype:'datefield',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Employee an EXPAT',
                                xtype:'combobox',
                                store:[['0','NO'],['1','YES']],
                                listeners:{
                                    change:function(c, new_val){
                                        var expat_fieldset = Ext.getCmp('expat_data_set');
                                        if(new_val == '1')
                                        {
                                            expat_fieldset.show(true);
                                        }else{
                                            expat_fieldset.hide();
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype:'fieldset',
                        id:'expat_data_set',
                        layout:'column',
                        hidden:true,
                        width:850,
                        items:[
                            {
                                fieldLabel:'Work Permit'
                            },
                            {
                                fieldLabel:'Work Permit Validity Date',
                                xtype:'datefield',
                                emptyText:'From'
                            },
                            {
                                emptyText:'To',
                                xtype:'datefield',
                                width:150,
                                margin:'3px 25px 0 0'
                            },
                            {
                                layout:'column',
                                xtype:'panel',
                                frame:false,
                                border:false,
                                bodyStyle:'background-color:transparent;',
                                width:650,
                                items:[
                                    {
                                        fieldLabel:'Passport No.',
                                        xtype:'textfield',
                                        labelWidth:150,
                                        width:300,
                                        margin:'0 25px 0 0'
                                    },
                                    {
                                        fieldLabel:'Passport Date Issued',
                                        xtype:'datefield',
                                        labelWidth:150,
                                        width:300,
                                        margin:'0 25px 0 0'
                                    },
                                    {
                                        fieldLabel:'Passport Expiry Date',
                                        xtype:'datefield',
                                        labelWidth:150,
                                        width:300,
                                        margin:'0 25px 0 0'
                                    },
                                    {
                                        fieldLabel:'Passport Place of Issue',
                                        xtype:'textfield',
                                        labelWidth:150,
                                        width:300,
                                        margin:'0 25px 0 0'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        buttons:[
            {
                text:'Save',
                handler:function(){
                    alert('save :D');
                }
            },
            {
                text:'Cancel',
                handler:function(){
                    this.findParentByType('window').destroy();
                }
            } 
        ]
    });

    editor_window.show();
}