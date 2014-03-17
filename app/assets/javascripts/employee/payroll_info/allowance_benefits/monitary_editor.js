function monitarySetupEditor(leave)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Leave Benefit Editor',
        items:
        [
            { 
                id:'leave_setup_form',
                items:[
                    {
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Type of Monetary Benefit',
                                xtype:'combobox',
                                store:[],
                                triggerAction:'all'
                            },
                            {
                                fieldLabel:'Basic of Computation of Monetary Benefit',
                                xtype:'combobox',
                                store:[],
                                triggerAction:'all'
                            },
                            {
                                fieldLabel:'Amount',
                                maskRe:/[\d,.]/
                            },
                            {
                                fieldLabel:'Percentage',
                                maskRe:/[\d.,]/
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
    }).show();
}