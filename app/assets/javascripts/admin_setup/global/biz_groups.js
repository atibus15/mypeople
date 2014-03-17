
function bizGroupEditor(biz_group, is_copy)
{
    var id = (biz_group && !is_copy) ? biz_group.get('group_id') : null;

    var submit_function = function(){
        var save_url = id ? '/busgroups/'+id : '/busgroups';
        var method = id ? 'PUT' : 'POST';
        submitForm('busgroup_form', save_url, method,function(){
            editor_window.destroy();
            ExtCmp('global_setup').store.load();
            selections = createLocalDataFromServer('/client/default_selections');
            
        });
    };
    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        title:'Business Group Editor',
        enterFn:submit_function,
        items:
        [
            {
                id:'busgroup_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0'},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Code',
                                id:'group_code',
                                name:'group_code'
                            },
                            {
                                fieldLabel:'Description',
                                name:'description',
                                id:'description',
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
                iconCls:'cancel-icon',
                handler:function(){
                    editor_window.destroy();
                }
            }
        ]
    });

    if(biz_group)
    {
        setFieldValue('group_code', biz_group.get('code'));
        setFieldValue('description', biz_group.get('description'));
        
        resetFormOriginalFieldsValue(ExtCmp('busgroup_form'));

        if(!is_copy) ExtCmp('group_code').setReadOnly(true);
    }
    editor_window.show();
}