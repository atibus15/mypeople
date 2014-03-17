
function leaveTypeEditor(leave_type, is_copy)
{

    var countries = createLocalDataFromServer('/countries');

    var id = (leave_type && !is_copy) ? leave_type.get('id') : null;

    var submit_function = function(){
        var save_url = id ? '/leavetypes/'+id : '/leavetypes';
        var method = id ? 'PUT' : 'POST';
        submitForm('leave_type_form', save_url, method, 
            function(){
                editor_window.destroy();
                ExtCmp('global_setup').store.load();
            }, true);
    };

    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        title:'Leave Type Editor',
        enterFn:submit_function,
        items:
        [
            {
                id:'leave_type_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:325,enableKeyEvents:true,margin:'0 25px 0 0', allowBlank:false},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Company',
                                xtype:'combobox',
                                id:'leave_type_company',
                                name:'leave_type[company_id]',
                                displayField:'desc',
                                editable:false,
                                valueField:'id',
                                store:createLocalStore(selections.companies)
                            },
                            {
                                fieldLabel:'Leave Code',
                                id:'leave_type_code',
                                name:'leave_type[leavetypecode]'
                            },
                            {
                                fieldLabel:'Description',
                                name:'leave_type[description]',
                                width:500
                            },
                            {
                                xtype:'peoplecheckbox',
                                boxLabel:'Credit Convertible to Attendance',
                                checked:true,
                                value:1,
                                name:'leave_type[converttoatt]',
                                margin:'0 0 0 105'
                            },
                            {
                                xtype:'peoplecheckbox',
                                boxLabel:'Active',
                                checked:true,
                                value:1,
                                name:'leave_type[isactive]',
                                margin:'0 0 0 105'
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

    if(leave_type)
    {
        loadRecordToArrayForm(ExtCmp('leave_type_form'), 'leave_type', leave_type);
        resetFormOriginalFieldsValue(ExtCmp('leave_type_form'));
        if(!is_copy){
            ExtCmp('leave_type_code').setReadOnly(true);
            ExtCmp('leave_type_company').setReadOnly(true);
        }
    }
    editor_window.show();
}