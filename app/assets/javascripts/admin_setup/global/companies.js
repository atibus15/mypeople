
function companyEditor(company, is_copy)
{

    var countries = createLocalDataFromServer('/countries');

    var id = (company && !is_copy) ? company.get('id') : null;

    var submit_function = function(){
        var save_url = id ? '/companies/'+id : '/companies';
        var method = id ? 'PUT' : 'POST';
        submitForm('company_form', save_url, method, 
            function(){
                editor_window.destroy();
                ExtCmp('global_setup').store.load();
                selections = createLocalDataFromServer('/client/default_selections');
            }, true);
    };

    var editor_window = Ext.create('People.editor.Window',{
        id:'editor_window',
        title:'Company Editor',
        enterFn:submit_function,
        items:
        [
            {
                id:'company_form',
                items:[
                    {
                        defaults:{labelWidth:100,width:325,enableKeyEvents:true,margin:'0 25px 0 0', allowBlank:false},
                        layout:'vbox',
                        items:
                        [
                            {
                                fieldLabel:'Code',
                                id:'company_code',
                                name:'company[companycode]'
                            },
                            {
                                fieldLabel:'Country',
                                xtype:'combomodal',
                                name:'company[country_id]',
                                displayField:'description',
                                valueField:'id',
                                codeField:'id',
                                store:createLocalStore(countries),
                                changeFn:function(){}
                            },
                            {
                                fieldLabel:'Description',
                                name:'company[description]',
                                width:500
                            },
                            {
                                fieldLabel:'Address',
                                xtype:'textfield',
                                name:'company[companyaddress]',
                                width:500
                            },
                            {
                                fieldLabel:'Holding Company',
                                name:'company[holdcompany_id]',
                                xtype:'combobox',
                                valueField:'id',
                                displayField:'desc',
                                triggerAction:'all',
                                store:createLocalStore(selections.holdings)
                            },
                            {
                                fieldLabel:'Business Group',
                                name:'company[busgroup_id]',
                                xtype:'combobox',
                                valueField:'id',
                                displayField:'desc',
                                triggerAction:'all',
                                store:createLocalStore(selections.busgroups)
                            },
                            {
                                fieldLabel:'SSS/GSIS No.',
                                name:'company[sssgsisno]',
                                xtype:'textfield',
                                allowBlank:true
                            },
                            {
                                fieldLabel:'VAT Reg.',
                                name:'company[vatregno]',
                                xtype:'textfield',
                                allowBlank:true
                            },
                            {
                                fieldLabel:'Holiday Pay Basis',
                                xtype:'combobox',
                                name:'company[holidaypaybasis]',
                                triggerAction:'all',
                                store:[[1,'Basic Salary'],[2,'Basic Salary + Tax Shield']]
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

    if(company)
    {
        loadRecordToArrayForm(ExtCmp('company_form'), 'company', company);
        resetFormOriginalFieldsValue(ExtCmp('company_form'));
        
        if(!is_copy) ExtCmp('company_code').setReadOnly(true);
    }
    editor_window.show();
}