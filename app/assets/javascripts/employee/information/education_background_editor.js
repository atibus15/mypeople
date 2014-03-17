function educationBackgroundEditor(education)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Education Background Editor',
        items:[
            {
                items:[
                    {
                        fieldLabel:'Education Level',
                        labelWidth:100,
                        width:250
                    },
                    {
                        fieldLabel:'Year Covered',
                        emptyText:'From',
                        labelWidth:100,
                        width:160
                    },
                    {
                        emptyText:'To',
                        width:60,
                        margin:'3px 25px 0 0'
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Course',
                        labelWidth:100,
                        width:250
                    },
                    {
                        fieldLabel:'Date Graduated',
                        xtype:'datefield',
                        labelWidth:100,
                        width:250
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'Major',
                        labelWidth:100,
                        width:250
                    },
                    {
                        fieldLabel:'Honors',
                        labelWidth:100,
                        width:250
                    }
                ]
            },
            {
                items:[
                    {
                        fieldLabel:'School/University',
                        labelWidth:100,
                        width:250
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