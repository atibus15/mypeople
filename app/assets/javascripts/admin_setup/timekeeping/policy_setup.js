function getTabHierarchy(component){
    var heirarchy = [];
    var sorted_heirarchy = [];
    tab_cmp = component;
    while(tab_cmp){
        tab_cmp = tab_cmp.findParentBy(function(cmp){
            return (cmp.tab != undefined);
        });  
        if(tab_cmp) heirarchy.push(tab_cmp);
    }
    var count = heirarchy.length - 1;
    for(var i = count; i >= 0; i--){
        sorted_heirarchy.push(heirarchy[i]);
    }

    return sorted_heirarchy;
}

function reconfigureMealTransCombobox(){

    var allowance_checkboxes = ExtCmp('policy_form').queryBy(function(cmp){
        return (cmp.getXType() == 'peoplecheckbox' && (cmp.boxLabel.trim() == 'With Meal Allowance' || cmp.boxLabel.trim() == 'With Transportation Allowance'));
    });

    Ext.each(allowance_checkboxes, function(allowance){
        if(allowance.getValue() == 1){
            if(allowance.boxLabel == 'With Meal Allowance') Ext.apply(ExtCmp('meal_allowance_code'),{allowBlank:false});
            else  Ext.apply(ExtCmp('transpo_allowance_code'),{allowBlank:false});
        }
    });
}


function policyManager(policy, copy)
{
    var id = (policy && !copy) ? policy.get('id') : null;

    var submit_function = function(){  
        reconfigureMealTransCombobox();                          
        var url = id ? '/workskedpolicies/'+id : '/workskedpolicies';
        var method = id ? 'PUT' : 'POST';
        submitForm('policy_form',url,method, function(){
                ExtCmp('time_keeping_grid').store.load();
                ExtCmp('policy_window').destroy();
            },
            true,
            function(){
                var invalid_field = getFirstInvalidField(ExtCmp('policy_form'));
                var tabs = getTabHierarchy(invalid_field);
                Ext.each(tabs, function(tab){
                    var my_tabpanel = tab.findParentByType('tabpanel');
                    my_tabpanel.setActiveTab(tab.getId());
                });

                invalid_field.focus();
        });
    };
    Ext.create('People.editor.Window',{
        id:'policy_window',
        title:'Policy Editor',
        enterFn:submit_function,
        width:1000,
        height:500,
        layout:'fit',
        resizable:false,
        dockedItems:[
            {
                xtype:'toolbar',
                dock:'top',
                items:[
                    {
                        iconCls:'save-icon',
                        tooltip:'Save and Exit',
                        handler:submit_function
                    },
                    {
                        iconCls:'reset-icon',
                        tooltip:'Reset Form',
                        handler:function(){
                            Ext.getCmp('policy_form').getForm().reset();
                        }
                    }
                ]
            }
        ],
        items:[
            {
                id:'policy_form',
                padding:'0 0 0 0',
                layout:'fit',
                width:980,
                items:[
                    {
                        xtype:'fieldcontainer',
                        defaultType:'textfield',
                        defaults:{
                            labelWidth:75
                        },
                        items:[
                            {
                                fieldLabel:'Company',
                                name:'policy[company_id]',
                                xtype:'combobox',
                                displayField:'desc',
                                valueField:'id',
                                id:'policy-company-id',
                                allowBlank:false,
                                store:createLocalStore(selections.companies)
                            },
                            {
                                fieldLabel:'Policy Code',
                                name:'policy[policycode]',
                                allowBlank:false,
                                id:'policy-code',
                                margin:'0 15 0 5'
                            },
                            {
                                fieldLabel:'Description',
                                allowBlank:false,
                                name:'policy[description]',
                                width:325
                            }
                        ]
                    },      
                    {
                        xtype:'nestedtab',
                        width:1200,
                        autoWidth:false,
                        activeTab:0,
                        items:[
                            {
                                title:'Working Days',
                                activeTab:0,
                                autoHeight:true,
                                layout:'fit',
                                items:[
                                    working_days_regular_fields,
                                    working_days_overtime_tabs,
                                    working_days_break_tabs,
                                    working_days_nightdiff_tab,
                                    working_days_shiftdiff_tab
                                ]
                            },
                            {
                                title:'Non Working Days',
                                activeTab:0,
                                layout:'fit',
                                autoHeight:true,
                                items:[
                                    no_work_overtime_tab,
                                    no_work_break_tab,
                                    no_work_night_diff_tab,
                                    no_work_shift_diff_tab
                                ]
                            },
                            common_tab
                        ]
                    }
                ]
            }
        ]
    }).show();

    if(policy)
    {
        var form = ExtCmp('policy_form');
        loadRecordToArrayForm(form, 'policy', policy);
        resetFormOriginalFieldsValue(form);
        if(!copy){
            ExtCmp('policy-company-id').setReadOnly(true);
            ExtCmp('policy-code').setReadOnly(true);
        }
    }
}