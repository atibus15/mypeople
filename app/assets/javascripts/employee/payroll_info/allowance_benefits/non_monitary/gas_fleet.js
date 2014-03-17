function gasFleetEditor(fleet_id)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Fleet for Gasoline Editor',
        items:
        [
            {
                id:'gas_fleet_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Fleet Card No.'
                            },
                            {
                                fieldLabel:'Date Issued',
                                xtype:'datefield'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Allowed No. of Liter(s)',
                                maskRe:/[\d]/
                            },
                            {
                                fieldLabel:'Expiry Date',
                                xtype:'datefield'
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Basis of Consumption of Allowed No. of Liter(s)',
                                xtype:'combobox'
                            },
                            {
                                fieldLabel:'Fleet Amount',
                                maskRe:/[\d.,]/
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
