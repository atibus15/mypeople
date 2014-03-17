function allowanceSetupEditor(allowance)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Allowance Editor',
        items:
        [ 
            {
                id:'allowance_form',
                items:[
                    {
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Type of Allowance',
                                xtype:'combobox',
                                store:[],
                                triggerAction:'all'
                            },
                            {
                                fieldLabel:'Allowance Amount',
                                maskRe:/[\d,.]/
                            },
                            {
                                fieldLabel:'Effective Start Date',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Effective End Date',
                                xtype:'datefield'
                            }
                        ]
                    }
                ]
            }
        ],
        buttons:[
            {
                text:'Save',
            },
            {
                text:'Cancel',
                handler:function(){
                    editor_window.destroy();
                }
            }
        ]
    });
    editor_window.show();
}