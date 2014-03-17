function exitInterview(employee)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Exit Interview',
        items:
        [
            {
                layout:'vbox',
                items:[
                    {
                        fieldLabel:'Date Conducted',
                        xtype:'datefield',
                        editable:false,
                        typeAhead:false,
                        width:450
                    },
                    {
                        fieldLabel:'Person In-Charge of Exit Interview',
                        width:450
                    },
                    {
                        fieldLabel:'Reason of leaving',
                        width:450
                    },
                    {
                        fieldLabel:'Proceed with Issuance of Certificate of Employment',
                        xtype:'combobox',
                        labelWidth:300,
                        width:450
                    },
                    {
                        fieldLabel:'Remarks',
                        width:450
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