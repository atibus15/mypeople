
function deptGroupEditor(dept_group, is_copy)
{

    var id = (dept_group && !is_copy) ? dept_group.get('id') : null;
    var submit_function = function(){
        var save_url = id ? '/deptgroups/'+id : '/deptgroups';
        var method = id ? 'PUT' : 'POST';
        submitForm('deptgroup_form', save_url, method, function(){
            editor_window.destroy();
            ExtCmp('global_setup').store.load();
            selections = createLocalDataFromServer('/client/default_selections');
        });
    };
    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        enterFn:submit_function,
        title:'Department Sub-Group Editor',
        items:
        [
            {
                id:'deptgroup_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0'},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Company',
                                name:'dept_group[company_id]',
                                xtype:'combobox',
                                valueField:'id',
                                displayField:'desc',
                                id:'ds_company_id',
                                store:createLocalStore(selections.companies),
                                listeners:{
                                    change:function(comp, new_val, old_val)
                                    {
                                        var dept_field = ExtCmp('ds_department_id');

                                        var department_data = filterStoreData(selections.departments, {'company_id':new_val});
                                        dept_field.bindStore(createLocalStore(department_data));
                                        if(old_val)
                                        {
                                            dept_field.setValue('');
                                            dept_field.setRawValue('');
                                        }
                                    }
                                }
                            },
                            {
                                fieldLabel:'Department',
                                id:'ds_department_id',
                                name:'dept_group[department_id]',
                                xtype:'combomodal',
                                codeField:'code',
                                valueField:'id',
                                displayField:'desc',
                                changeFn:function(){}
                            },
                            {
                                fieldLabel:'Code',
                                id:'dept_group_code',
                                name:'dept_group[deptgroupcode]'
                            },
                            {
                                fieldLabel:'Description',
                                name:'dept_group[description]',
                                width:500
                            }
                        ]
                    }
                ]
            }
        ],
        tbar:[
            {
                iconCls:'save-icon',
                handler:submit_function
            },
            {
                iconCls:'reset-icon'
            }
        ]
    });

    editor_window.show();

    if(dept_group)
    {
        var deptgroup_form = ExtCmp('deptgroup_form');
        loadRecordToArrayForm(deptgroup_form, 'dept_group', dept_group); 
        resetFormOriginalFieldsValue(deptgroup_form);
        if(!is_copy){
            ExtCmp('ds_company_id').setReadOnly(true);
            ExtCmp('ds_department_id').setReadOnly(true);
            ExtCmp('dept_group_code').setReadOnly(true);
        }

    }
    
}