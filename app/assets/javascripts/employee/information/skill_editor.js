function skillEditor(skill)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Skill Editor',
        items:[
            {
                layout:'vbox',
                items:
                [
                    {
                        fieldLabel:'Type of Skill',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Skill Level.',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Date Last Used',
                        xtype:'datefield'
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