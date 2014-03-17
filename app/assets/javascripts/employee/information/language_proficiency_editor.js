function languageProficiencyEditor(skill)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Language Proficiency Editor',
        items:[
            {
                layout:'vbox',
                items:
                [
                    {
                        fieldLabel:'Read',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Spoken',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Written',
                        xtype:'combobox'
                    },
                    {
                        fieldLabel:'Proficiency Level',
                        xtype:'combobox'
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