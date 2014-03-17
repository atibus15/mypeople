function qualificationEditor(qualification)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Qualification Editor',
        items:[
            {
                layout:'vbox',
                items:
                [
                    {
                        fieldLabel:'Year Taken',
                        xtype:'datefield'
                    },
                    {
                        fieldLabel:'License No.'
                    },
                    {
                        fieldLabel:'Examination Taken'
                    },
                    {
                        fieldLabel:'Rating'
                    },
                    {
                        fieldLabel:'Country of Examination',
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