function trainingSeminarEditor(training)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Training and Seminar Editor',
        items:[
            {
                items:[
                    {
                        fieldLabel:'Description',
                        labelWidth:100,
                        width:350
                    }
                ]
            },
            {
                items:
                [
                    {
                        fieldLabel:'Date Covered',
                        xtype:'datefield',
                        emptyText:'From',
                        labelWidth:100,
                        width:213
                    },
                    {
                        emptyText:'To',
                        xtype:'datefield',
                        width:113,
                        margin:'3px 0 0 0'
                    }
                ]
            },
            {
                layout:'vbox',
                items:[
                    {
                        fieldLabel:'Facilitator',
                        labelWidth:100,
                        width:350
                    },
                    {
                        fieldLabel:'Venue',
                        labelWidth:100,
                        width:350
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