function motorCarPlanEditor(plan_type , plan_id)
{
    var title = (plan_type == 'car_plan') ? 'Car Plan Editor' : 'Motorcycle Plan Editor';
    var editor_window = Ext.create('People.editor.Window',{
        title:title,
        items:
        [
            {
                id:'motorcar_plan_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Memo of Agreement No./Plan No.',
                                labelWidth:200,
                                width:350
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Employee\'s Share'
                            },
                            {
                                fieldLabel:'Plan Effective Start Date',
                                xtype:'datefield',
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Plan Effective End Date',
                                xtype:'datefield',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Plan Amount'
                            },
                            {
                                fieldLabel:'No. of Months under Warranty',
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Term (In Month/s)',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Brand'
                            },
                            {
                                fieldLabel:'Model',
                                emptyText:'Model',
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Driver License No.',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Engine No./Serial No.'
                            },
                            {
                                fieldLabel:'Color',
                                emptyText:'Color',
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Company Property Tag No.',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Chassis No.'
                            },
                            {
                                fieldLabel:'Plate No.',
                                emptyText:'Plate No.',
                                labelWidth:200,
                                width:350
                            },
                            {
                                fieldLabel:'Company Property Asset No.',
                                labelWidth:170,
                                width:320
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Covered w/ Insurance',
                                xtype:'combobox'
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

    if(plan_type == 'car_plan')
    {
        ExtCmp('motorcar_plan_form').add([
            {
                items:[
                    {
                        fieldLabel:'Car Insurance Company'
                    },
                    {
                        fieldLabel:'Car Insurance Contact No.',
                        labelWidth:200,
                        width:350
                    },
                    {
                        fieldLabel:'Car Insurance Policy',
                        labelWidth:170,
                        width:320
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Car Insurance Coverage'
                    },
                    {
                        fieldLabel:'Car Insurance Amount',
                        labelWidth:200,
                        width:350
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Validity Date From'
                    },
                    {
                        fieldLabel:'Validity Date To',
                        labelWidth:200,
                        width:350
                    }
                ]
            },
        ])
    }

    editor_window.show();

    
}
