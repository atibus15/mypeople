pattern_id = false;



function patternEditor(pattern, category_id, is_copy)
{
    pattern_id = (pattern && !is_copy) ? pattern.get('id') : null;


    var submit_function = function(){
        var save_url = pattern_id ? '/workskedpatterns/'+pattern_id : '/workskedpatterns';
        var method = pattern_id ? 'PUT' : 'POST';
        var submit_empty_text = pattern_id ? true : false;
        console.log(submit_empty_text);
        ExtCmp('break_time_grid').createBreakTextFields();

        submitForm('pattern_editor_form', save_url, method, 
            function(){
                ExtCmp('time_keeping_grid').store.load();
                ExtCmp('pattern_editor_window').destroy();
            }, 
        submit_empty_text);
    };
    var pattern_win = Ext.create('People.editor.Window',{
        title:'Pattern Editor',
        id:'pattern_editor_window',
        enterFn:submit_function,
        items:[
            {
                id:'pattern_editor_form',
                layout:'hbox',
                items:[
                    {
                        layout:'vbox',
                        items:[
                            {
                                xtype:'textfield',
                                hidden:true,
                                name:'pattern[workskedcategory_id]',
                                value:category_id,
                                id:'category_id'
                            },
                            {
                                xtype:'combobox',
                                fieldLabel:'Company',
                                name:'pattern[company_id]',
                                id:'pattern-company-id',
                                valueField:'id',
                                displayField:'desc',
                                allowBlank:false,
                                labelWidth:100,
                                store:createLocalStore(selections.companies)
                            },
                            {
                                fieldLabel:'Code',
                                name:'pattern[patterncode]',
                                id:'pattern-code',
                                xtype:'textfield',
                                labelWidth:100,
                                allowBlank:false
                            },
                            {
                                fieldLabel:'Description',
                                name:'pattern[description]',
                                xtype:'textfield',
                                labelWidth:100,
                                allowBlank:false
                            },
                            {
                                width:400,
                                xtype:'myfieldset',
                                title:'Required Time',
                                id:'required_time_field',
                                items:[
                                    
                                    {
                                        xtype:'myfieldset',
                                        title:'Work Hours',
                                        width:380,
                                        items:[
                                            {
                                                fieldLabel:'Required',
                                                xtype:'numberfield',
                                                id:'req-work-hours',
                                                hideTrigger:true,
                                                labelWidth:65,
                                                width:165,
                                                name:'pattern[requiredhrs]',
                                                allowBlank:false,
                                                listeners:{
                                                    change:function(){
                                                        var half = parseFloat(this.getValue()) / 2;
                                                        setFieldValue('first_half', half);
                                                        setFieldValue('second_half',half);
                                                    }
                                                }
                                            },
                                            {
                                                items:[
                                                    {
                                                        fieldLabel:'1st half',
                                                        name:'pattern[hrswkam]',
                                                        id:'first_half',
                                                        xtype:'numberfield',
                                                        hideTrigger:true,
                                                        width:165,
                                                        allowBlank:false,
                                                        labelWidth:65,
                                                        margin:'0 15 0 0'
                                                    },
                                                    {
                                                        fieldLabel:'2nd half',
                                                        name:'pattern[hrswkpm]',
                                                        id:'second_half',
                                                        xtype:'numberfield',
                                                        hideTrigger:true,
                                                        labelWidth:65,
                                                        width:165
                                                    }
                                                ]
                                            } 
                                        ]
                                    }
                                ]
                            },
                            {
                                title:'Break time',
                                xtype:'breaktimeeditor',
                                id:'break_time_grid',
                                form_name:'pattern',
                                height:200,
                                width:400,
                                store:breakTimeStore('/workskedpatterns/'+pattern_id+'/breaks')
                            }
                        ]
                    }
                ]
            }
        ],
        tbar:[
            {
                iconCls:'save-icon',
                tooltip:'Save and Exit',
                handler:submit_function
            },
            {
                iconCls:'save-icon',
                tooltip:'Save and Add New',
                handler:function(){
                    var save_url = pattern_id ? '/workskedpatterns/'+pattern_id : '/workskedpatterns';
                    var method = pattern_id ? 'PUT' : 'POST';
                    var submit_empty_text = pattern_id ? true : false;


                    ExtCmp('break_time_grid').createBreakTextFields();

                    submitForm('pattern_editor_form', save_url, method, 
                        function(){
                            emptyFormFieldsValue(ExtCmp('pattern_editor_form'), 'category_id');
                            pattern_id = false;
                            ExtCmp('break_time_grid').store.loadData([]);
                            ExtCmp('time_keeping_grid').store.load();
                        },
                    submit_empty_text);
                }
            },
            {
                iconCls:'reset-icon',
                tooltip:'Reset',
                handler:function(){
                    ExtCmp('pattern_editor_form').getForm().reset();
                }
            }
        ]
    });
                                    
    if(category_id == 'FLX'){
        ExtCmp('required_time_field').insert(0, {
            id:'flex_container',
            items:[
                {
                    fieldLabel:'Earliest In',
                    name:'pattern[flexiearliestin]',
                    xtype:'peopletimefield',
                    submitFormat:'H:i:s',
                    increment:30,
                    width:175,
                    allowBlank:false,
                    labelWidth:75,
                    margin:'0 15 0 0'
                },
                {
                    fieldLabel:'Lates In',
                    name:'pattern[flexilatestin]',
                    submitFormat:'H:i:s',
                    increment:30,
                    allowBlank:false,
                    xtype:'peopletimefield',
                    labelWidth:65,
                    width:165
                }
            ]
        });

        Ext.getCmp('req-work-hours').setValue(0);
    }else{
        ExtCmp('required_time_field').insert(0,{
            id:'str_container',
            items:[
                {
                    fieldLabel:'Time In',
                    name:'pattern[timein]',
                    xtype:'peopletimefield',
                    submitFormat:'H:i:s',
                    increment:30,
                    width:175,
                    allowBlank:false,
                    labelWidth:75,
                    margin:'0 15 0 0'
                },
                {
                    fieldLabel:'Time Out',
                    name:'pattern[timeout]',
                    submitFormat:'H:i:s',
                    increment:30,
                    allowBlank:false,
                    xtype:'peopletimefield',
                    labelWidth:65,
                    width:165
                }
            ]
        });
    }

    pattern_win.show();

    ExtCmp('break_time_grid').store.load();

    if(pattern)
    {
        var form = ExtCmp('pattern_editor_form');
        loadRecordToArrayForm(form, 'pattern', pattern);
        resetFormOriginalFieldsValue(form);

        if(!is_copy){
            ExtCmp('pattern-company-id').setReadOnly(true);
            ExtCmp('pattern-code').setReadOnly(true);
        }
    }
}