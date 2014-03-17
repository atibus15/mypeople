
function departmentEditor(department, is_copy)
{
    var id = (department && !is_copy) ? department.get('department_id') : null;
    var submit_function = function(){
            var save_url = id ? '/departments/'+id : '/departments';
            var method = id ? 'PUT' : 'POST';
            submitForm('department_form', save_url, method, function(){
                editor_window.destroy();
                ExtCmp('global_setup').store.load();
                selections = createLocalDataFromServer('/client/default_selections');
            });
        }
    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        enterFn:submit_function,
        title:'Department Editor',
        tbar:[
            {
                iconCls:'save-icon',
                handler:submit_function
            },
            {
                iconCls:'reset-icon'
            }
        ],
        items:
        [
            {
                id:'department_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0', allowBlank:false},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Company',
                                name:'department[company_id]',
                                xtype:'combobox',
                                displayField:'desc',
                                valueField:'id',
                                id:'d_company_id',
                                store:createLocalStore(selections.companies)
                            },
                            {
                                fieldLabel:'Code',
                                id:'department_code',
                                name:'department[departmentcode]'                            },
                            {
                                fieldLabel:'Description',
                                name:'department[description]',
                                width:500
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if(department)
    {
        var department_form = ExtCmp('department_form');
        loadRecordToArrayForm(department_form, 'department', department); 
        resetFormOriginalFieldsValue(department_form);
        if(!is_copy){
            ExtCmp('d_company_id').setReadOnly(true);
            ExtCmp('department_code').setReadOnly(true);
        }
    }
    editor_window.show();
}