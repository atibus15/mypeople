function repairMaintenanceEditor(maintenance_id)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Repair and Maintenance Editor',
        items:
        [
            {
                id:'repair_maintenance_form',
                items:[
                    {
                        layout:'vbox',
                        items:[
                            {
                                fieldLabel:'Plate No.'
                            },
                            {
                                fieldLabel:'Effective Start Date',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Effective End Date',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Amount'
                            },
                            {
                                fieldLabel:'Basic of Consumption for Allowed No. of Liter(s)',
                                xtype:'combobox'
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
