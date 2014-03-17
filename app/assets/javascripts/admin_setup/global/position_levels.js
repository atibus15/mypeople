
function positionLevelEditor(level, is_copy)
{
    var id = (level && !is_copy) ? level.get('id') : null;

    var submit_function = function(){
        var save_url = id ? '/positionlevels/'+id : '/positionlevels';
        var method = id ? 'PUT' : 'POST';
        console.log('save');
        submitForm('positionlevel_form', save_url, method, function(){
            editor_window.destroy();
            
            selections = createLocalDataFromServer('/client/default_selections');

            ExtCmp('global_setup').bindStore(createLocalStore(selections.position_levels));
            ExtCmp('global_setup').store.load();
        });
    };

    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        enterFn:submit_function,
        title:'Position Level Editor',
        items:
        [
            {
                id:'positionlevel_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0'},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Code',
                                id:'code',
                                name:'positionlevel[positionlevelcode]'
                            },
                            {
                                fieldLabel:'Description',
                                name:'positionlevel[description]',
                                id:'description'
                            },
                            {
                                fieldLabel:'Status',
                                xtype:'combobox',
                                name:'positionlevel[isactive]',
                                value:1,
                                store:[[1,'Active'],[0,'Inactive']]
                            }
                        ]
                    }
                ]
            }
        ],
        buttons:[
            {
                iconCls:'save-icon',
                handler:submit_function
            },
            {
                iconCls:'reset-icon'
            }
        ]
    });

    if(level)
    {
        setFieldValue('code', level.get('positionlevelcode'));
        setFieldValue('description', level.get('description'));
        resetFormOriginalFieldsValue(ExtCmp('positionlevel_form'));
        if(!is_copy) ExtCmp('code').setReadOnly(true);
    }
    editor_window.show();
}