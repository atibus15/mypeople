
function locationEditor(location, is_copy)
{
    var id = (location && !is_copy) ? location.get('id') : null;

    var submit_function = function(){
        var save_url = id ? '/locations/'+id : '/locations';
        var method = id ? 'PUT' : 'POST';
        submitForm('location_form', save_url, method, 
            function(){
                editor_window.destroy();
                ExtCmp('global_setup').store.load();
                selections = createLocalDataFromServer('/client/default_selections');
            }, true);
    };

    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        title:'Location Editor',
        enterFn:submit_function,
        items:
        [
            {
                id:'location_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:325,enableKeyEvents:true,margin:'0 25px 0 0', allowBlank:false},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Company',
                                name:'location[company_id]',
                                id:'location_company_id',
                                xtype:'combobox',
                                valueField:'id',
                                displayField:'desc',
                                store:createLocalStore(selections.companies)
                            },
                            {
                                fieldLabel:'Code',
                                id:'location_code',
                                name:'location[locationcode]'
                            },
                            {
                                fieldLabel:'Description',
                                name:'location[description]',
                                width:500
                            },
                            {
                                fieldLabel:'Status',
                                xtype:'combobox',
                                name:'location[isactive]',
                                value:1,
                                store:[[1,'Active'],[0,'Inactive']]
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

    if(location)
    {
        loadRecordToArrayForm(ExtCmp('location_form'), 'location', location);
        resetFormOriginalFieldsValue(ExtCmp('location_form'));
        if(!is_copy){
            ExtCmp('location_code').setReadOnly(true);
            ExtCmp('location_company_id').setReadOnly(true);
        }
        
    }
    editor_window.show();
}