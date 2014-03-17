function leaveSetupEditor(leave)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Leave Benefit Editor',
        items:
        [
            { 
                id:'leave_setup_form',
                items:[{
                    layout:'vbox',
                    items:
                    [
                        {
                            fieldLabel:'Type of Leave Benefit',
                            xtype:'combobox',
                            store:[],
                            triggerAction:'all'
                        },
                        {
                            fieldLabel:'Number of Days Entitled',
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
                }]
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
    }).show();
}