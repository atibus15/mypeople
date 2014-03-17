
function holdingCompanyEditor(holding, is_copy)
{
    var id = (holding && !is_copy) ? holding.get('holding_id') : null;

    var submit_function = function(){
        var save_url = id ? '/holdcompanies/'+id : '/holdcompanies';
        var method = id ? 'PUT' : 'POST';
        submitForm('holding_form', save_url, method, function(){
            editor_window.destroy();
            ExtCmp('global_setup').store.load();
            selections = createLocalDataFromServer('/client/default_selections');
        });
    };
    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        enterFn:submit_function,
        title:'Holding Company Editor',
        items:
        [
            {
                id:'holding_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0'},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Code',
                                id:'code',
                                name:'code'
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
                iconCls:'reset-icon'
            }
        ]
    });

    if(holding)
    {
        setFieldValue('code', holding.get('code'));
        setFieldValue('description', holding.get('description'));
        
        resetFormOriginalFieldsValue(ExtCmp('holding_form'));

        if(!is_copy) ExtCmp('code').setReadOnly(true);

    }
    editor_window.show();
}