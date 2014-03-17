function uniformEditor(uniform_id)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Uniform Editor',
        items:
        [
            {
                id:'uniform_form',
                items:[
                    {
                        layout:'vbox',
                        items:[
                            {
                                fieldLabel:'Uniform Acknowledgement No.'
                            },
                            {
                                fieldLabel:'Date Acknowledgement Receipt of Uniform',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Employee\' Share'
                            },
                            {
                                fieldLabel:'Uniform Size',
                                xtype:'combobox'
                            },
                            {
                                fieldLabel:'Uniform Amount',
                                maskRe:/[\d,.]/
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
