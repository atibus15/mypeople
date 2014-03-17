
function positionEditor(position, is_copy)
{
    var id = (position && !is_copy) ? position.get('position_id') : null;

    var submit_function = function(){
        var save_url = id ? '/positions/'+id : '/positions';
        var method = id ? 'PUT' : 'POST';
        console.log('save');
        submitForm('position_form', save_url, method, function(){
            editor_window.destroy();
            
            selections = createLocalDataFromServer('/client/default_selections');
            ExtCmp('global_setup').store.load();
        });
    };
    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        enterFn:submit_function,
        title:'Position Editor',
        items:
        [
            {
                id:'position_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0'},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Company',
                                id:'p_company_id',
                                name:'position[company_id]',
                                xtype:'combobox',
                                valueField:'id',
                                displayField:'desc',
                                store:createLocalStore(selections.companies)
                            },
                            {
                                fieldLabel:'Code',
                                id:'position_code',
                                name:'position[positioncode]'
                            },
                            {
                                fieldLabel:'Description',
                                name:'position[description]',
                                id:'description',
                                width:500
                            },
                            {
                                fieldLabel:'Position Level',
                                xtype:'combobox',
                                id:'p_level',
                                name:'position[positionlevel_id]',
                                store:position_level_store,
                                valueField:'id',
                                displayField:'description',
                                triggerAction:'all',
                                editable:false
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

    if(position)
    {
        setFieldValue('position_code', position.get('code'));
        setFieldValue('p_company_id', position.get('company_id'));
        setFieldValue('description', position.get('description'));
        setFieldValue('p_level', position.get('positionlevel_id'));
        resetFormOriginalFieldsValue(ExtCmp('position_form'));
        if(!is_copy){
            ExtCmp('p_company_id').setReadOnly(true);
            ExtCmp('position_code').setReadOnly(true);
        }
    }
    editor_window.show();
}