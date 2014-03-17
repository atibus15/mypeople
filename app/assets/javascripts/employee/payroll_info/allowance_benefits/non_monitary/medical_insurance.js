function medicalInsuranceEditor(medical_insurance_type , insurance_id)
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Medical Insurance Editor',
        items:
        [
            {
                id:'med_insurance_form',
                items:[
                    {
                        items:[
                            {
                                fieldLabel:'Insurance Policy No.'
                            },
                            {
                                fieldLabel:'Insurance Amount for Member',
                                labelWidth:185,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Insurance Effective Date.',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Insurance Coverage for Member',
                                labelWidth:185,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                fieldLabel:'Insurance Expiry Date',
                                xtype:'datefield'
                            },
                            {
                                fieldLabel:'Insurance Company',
                                labelWidth:185,
                                width:335
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                xtype:'box',
                                html:'&nbsp'
                            },
                            {
                                fieldLabel:'Insurance Contact No.',
                                maskRe:/[\d-]/,
                                labelWidth:185,
                                width:335
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

    if(medical_insurance_type == 'extended')
    {
        var dependents_list = Ext.create('Ext.grid.GridPanel',
        {
            title:'List of Family Member/Dependents',
            forceFit:true,
            width:editor_window.getWidth(),
            height:200,
            id:'dependents_list_grid',
            tbar:[
                {
                    text:'Add',
                    handler:function(){
                        insuranceDependentEditor();
                    }
                },
                {
                    text:'Edit',
                    handler:function(){
                        insuranceDependentEditor();
                    }
                },
                {
                    text:'Delete',
                    handler:function(){
                        Ext.MessageBox.show({
                            title:'MyPeople',
                            msg:'Are you sure you want to delete dependent',
                            icon:Ext.MessageBox.QUESTION,
                            buttons:Ext.MessageBox.YESNO,
                            fn:function(btn){
                                if(btn=='yes'){
                                    alert('burado! :D');
                                }
                            }
                        });
                    }
                }
            ],
            columns:[
                Ext.create('Ext.grid.RowNumberer'),
                {text:'Name of Dependent'},
                {text:'Insurance Amount for Dependent'}
            ]
        });
        
        editor_window.add(dependents_list);
        editor_window.setPosition(250, 100);
    }
    

    if(typeof(insurance_id) !== 'undefined'){
        // get insurance details;
        
    }
}

function insuranceDependentEditor(dependent_id, name, insurance_amount)
{
    var dependent_window = Ext.create('People.editor.Window',{
        title:'Family/Dependent Editor',
        items:[
            {
                xtype:'textfield',
                fieldLabel:'Name of Dependent',
                labelWidth:150,
                width:300  
            },
            {
                xtype:'textfield',
                fieldLabel:'Insurance Amount',
                labelWidth:150,
                width:300
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

    dependent_window.show();
}