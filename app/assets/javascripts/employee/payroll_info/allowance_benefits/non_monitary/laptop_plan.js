function laptopPlanEditor(plan_id)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Laptop Plan Editor',
        items:
        [
            {
                id:'laptop_plan_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Memo of Agreement No./Plan No.',
                                labelWidth:185,
                                width:335
                            },
                            {
                                fieldLabel:'Plan Type',
                                xtype:'combobox',
                                labelWidth:170,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Employee\' Share',
                                labelWidth:185,
                                width:335
                            },
                            {
                                fieldLabel:'Plan Amount',
                                maskRe:/[\d.,]/,
                                labelWidth:170,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Plan Effective Start Date',
                                xtype:'datefield',
                                labelWidth:185,
                                width:335
                            },
                            {
                                fieldLabel:'Term (In Month/s)',
                                maskRe:/[\d]/,
                                labelWidth:170,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Plan Effective End Date',
                                xtype:'datefield',
                                labelWidth:185,
                                width:335
                            },
                            {
                                fieldLabel:'Company Property Tag No.',
                                maskRe:/[\d-]/,
                                labelWidth:170,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'No. of Months under Warranty',
                                maskRe:/[\d]/,
                                labelWidth:185,
                                width:335
                            },
                            {
                                fieldLabel:'Company Property Asset No.',
                                maskRe:/[\d-]/,
                                labelWidth:170,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Brand',
                                labelWidth:50,
                                width:215
                            },
                            {
                                fieldLabel:'Model',
                                labelWidth:50,
                                width:215
                            },
                            {
                                fieldLabel:'Color',
                                labelWidth:50,
                                width:215
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
