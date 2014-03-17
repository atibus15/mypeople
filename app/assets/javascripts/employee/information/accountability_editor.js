function accountabilityEditor(accountability)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Accountability on Company Owned Property',
        items:[
            {
                items:
                [
                    {
                        fieldLabel:'Type of Asset',
                        xtype:'combobox'
                    }
                ]
            },
            {
                items:
                [
                    {
                        fieldLabel:'Date of Receipt',
                        xtype:'datefield'
                    },
                    {
                        fieldLabel:'Reference No.'
                    }
                ]
            },
            {
                items:
                [
                    {
                        fieldLabel:'Brand'
                    },
                    {
                        fieldLabel:'Model'
                    }
                ]
            },
            {
                items:
                [
                    {
                        fieldLabel:'Color'
                    },
                    {
                        fieldLabel:'Serial No.'
                    }
                ]
            },
            {
                items:
                [
                    {
                        fieldLabel:'Tag No./Asset No.'
                    },
                    {
                        fieldLabel:'Remarks'
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