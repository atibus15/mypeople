function employmentHistoryEditor(employee)
{

    var editor_window = Ext.create('People.editor.Window',{
        title:'Employment History Details Editor',
        items:
        [
            {
                items:[
                    {
                        fieldLabel:'Start Date from Previous Employer',
                        xtype:'datefield'
                    },
                    {
                        fieldLabel:'End Date from Previous Employer',
                        xtype:'datefield'
                    },
                    {
                        fieldLabel:'Duration of Employment',
                        labelWidth:170,
                        width:320
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Last Position Held'
                    },
                    {
                        fieldLabel:'Position Level'
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'labor Type',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Labor Type details',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Labor Sub Group',
                        xtype:'combobox',
                        labelWidth:170,
                        width:320
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Department'
                    },
                    {
                        fieldLabel:'Department Sub Group'
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Company'
                    },
                    {
                        fieldLabel:'Company Telephone No.'
                    },
                    {
                        fieldLabel:'Company Fax No.',
                        labelWidth:170,
                        width:320
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Company Address'
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Immediate Superior'
                    },
                    {
                        fieldLabel:'Main Responsibility'
                    },
                    {
                        fieldLabel:'Company Benefits',
                        labelWidth:170,
                        width:320
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Designation of Immidiate Sup.'
                    },
                    {
                        fieldLabel:'Last Drawn Salaries'
                    },
                    {
                        fieldLabel:'Reason of Leaving',
                        labelWidth:170,
                        width:320
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