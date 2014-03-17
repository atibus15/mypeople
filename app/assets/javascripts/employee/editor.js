Ext.define('Employee', {
    extend:'Ext.data.Model',
    fields:[
        {name:'busgroup_id'},
        {name:'company_id'},
        {name:'datehired'},
        {name:'department_id'},
        {name:'deptgroup_id'},
        {name:'emailaddress'},
        {name:'empbadgeno'},
        {name:'empidno'},
        {name:'empnamealias'},
        {name:'empnamefirst'},
        {name:'empnamelast'},
        {name:'empnamemiddle'},
        {name:'empnamesuffix'},
        {name:'empno'},
        {name:'emptitle_id'},
        {name:'holdcompany_id'},
        {name:'id'},
        {name:'location_id'},
        {name:'mypclient_id'},
        {name:'position_id'},
        {name:'positionlevel_id'},
        {name:'suggested_username'}
    ]
});

Ext.define('People.employee.Editor',{
    extend:'People.editor.Window',
    alias:'widget.employeeeditor',

    accountGenerator: function()
    {
        var me = this;

        var submit_function = function(){
            var new_p = ExtCmp('user-password').getValue();
            var con_p = ExtCmp('confirm-password').getValue();

            if(!new_p) return notify('Password is required.','warning');
            if(!con_p) return notify('Confirmation is required.','warning');
            if(new_p != con_p) return notify('Password doesn\'t match', 'warning');

            submitForm('user-account-form', '/user_accounts.json', 'POST', function(){
                me.employee.set('suggested_username', null);
                ExtCmp('gen-account-btn').destroy();
                loadEmployeeList();
                me.account_generator.destroy();
            });
        }
        me.account_generator = Ext.create('People.editor.Window',{
            title:'User Account Editor',
            enterFn:submit_function,
            layout:'fit',
            tbar:[
                {
                    iconCls:'save-icon',
                    tooltip:'Save',
                    handler:submit_function
                },
                {
                    iconCls:'reset-icon',
                    tooltip:'Reset form',
                    handler:function(){
                        ExtCmp('user-account-form').getForm().reset();
                    }
                }
            ],
            items:[
                {
                    id:'user-account-form',
                    layout:{type:'table', columns:1},
                    defaultType:'textfield',
                    width:350,
                    margin:15,
                    defaults:{
                        width:'100%',
                        labelWidth:100
                    },
                    items:[
                        {
                            xtype:'hiddenfield',
                            name:'account[employee_id]',
                            id:'employee-id',
                            allowBlank:false,
                            value:me.employee_id,
                            readOnly:true
                        },
                        {
                            fieldLabel:'Client ID',
                            name:'account[mypclient_id]',
                            readOnly:true,
                            value:me.client_id
                        },
                        {
                            fieldLabel:'Username',
                            name:'account[username]',
                            id:'user-name',
                            value:me.username
                        },
                        {
                            fieldLabel:'Password',
                            name:'account[userpasswd]',
                            inputType:'password',
                            id:'user-password'
                        },
                        {
                            fieldLabel:'Confirm Password',
                            name:'confirm-password',
                            inputType:'password',
                            id:'confirm-password'
                        }
                    ]
                }
            ]
        }).show();
    },
    createEmployeeModelFromAjaxResponse:function(employee){
        var me = this;
        me.employee = Ext.create('Employee',{
            busgroup_id:    employee.busgroup_id,
            company_id:     employee.company_id,
            datehired:      employee.datehired,
            department_id:  employee.department_id,
            deptgroup_id:   employee.deptgroup_id,
            emailaddress:   employee.emailaddress,
            empbadgeno:     employee.empbadgeno,
            empidno:        employee.empidno,
            empnamealias:   employee.empnamealias,
            empnamefirst:   employee.empnamefirst,
            empnamelast:    employee.empnamelast,
            empnamemiddle:  employee.empnamemiddle,
            empnamesuffix:  employee.empnamesuffix,
            empno:          employee.empno,
            emptitle_id:    employee.emptitle_id,
            holdcompany_id: employee.holdcompany,
            id:             employee.id,
            location_id:    employee.location_id,
            mypclient_id:   employee.mypclient_id,
            position_id:    employee.position_id,
            positionlevel_id: employee.positionlevel_id,
            suggested_username: employee.suggested_username 
        });
    },
    saveEmployee:function(){
        var me = ExtCmp('employee-editor');
        var url = me.employee ? '/employees/'+me.employee_id : '/employees';
        var method = me.employee ? 'PUT' : 'POST';
        submitForm('employee_form',url+'.json',method, function(response){

                if(method == 'POST'){
                    me.toggleEmployeeOptions();
                    me.createEmployeeModelFromAjaxResponse(response.new_employee);
                    me.initAttributes();
                }
                
                loadEmployeeList();
                resetFormOriginalFieldsValue(ExtCmp('employee_form'));
            },
            false,
            function(){
                var invalid_field = getFirstInvalidField(ExtCmp('employee_form'));
                invalid_field.focus();
        });
    },
    toggleEmployeeOptions:function(){
        var me = this;
        var window_dock = me.getDockedItems('toolbar[dock="top"]')[0];
        var window_dock_items = window_dock.items.items;
        var window_dock_item_length = window_dock.items.length;

        for(var i = 1; i < window_dock_item_length; i++)
        {
            var dock_item = window_dock_items[i];
            if(dock_item.isHidden()){
                dock_item.show();
            }else{
                dock_item.hide();
            }
        }
    },
    initAttributes:function(){
        var me = this;
        var employee_type = typeof(me.employee);

        if(employee_type !== 'undefined'){
            me.employee_id  = me.employee.get('id');
            me.client_id    = me.employee.get('mypclient_id');
            me.username     = me.employee.get('suggested_username');
        }
    },
    initComponent:function(){
        var me = this;
        me.initAttributes();

        Ext.apply(me, {
            enterFn:function(){me.saveEmployee();},
            title:'Employee Editor',
            id:'employee-editor',
            tbar:
            [
                {
                    iconCls:'save-icon',
                    tooltip:'Save',
                    id:'employee_editor_save',
                    handler:function(){me.saveEmployee();}
                },
                {
                    iconCls:'delete-icon',
                    tooltip:'Delete employee.',
                    handler:function(){
                        deleteRecordViaAjax('/employees/'+me.employee_id, 'Are you sure you want to delete this employee?' ,function(){
                            ExtCmp('employee_list_grid').store.reload(); me.destroy();});
                    }
                },
                {
                    text:'Additional Employee Info',
                    menu:{
                        xtype:'menu',
                        items:[
                            {
                                iconCls: 'emngnt-icon',
                                text:'Current Employment Data',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    { 
                                        var selected = emp_grid.getSelected();
                                        currentEmploymentData(selected);
                                    }
                                }
                            },
                            {
                                iconCls: 'language-icon',
                                text:'Language Proficiency',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        languageList();
                                    }
                                }
                            },
                            {
                                iconCls: 'education-icon',
                                text:'Educational Background',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        educationBackGround();
                                    }
                                }
                            },
                            {
                                iconCls: 'skills-icon',
                                text:'Qualifications and Skills',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        qualificationSkillList();
                                    }
                                }
                            },
                            {
                                iconCls: 'seminar-icon',
                                text:'Training and Seminar',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        trainingSeminar();
                                    }
                                }
                            },
                            {
                                iconCls: 'history-icon',
                                text:'Employment History',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        employmentHistoryList(selected);
                                    }
                                    
                                }
                            },
                            {                            
                                iconCls: 'acct-icon',
                                text:'Accountability on Company Owned Property',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        accountabilityList();
                                    }
                                }
                            },
                            {
                                iconCls: 'exit-icon',
                                text:'Exit Interview',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        exitInterview(selected);
                                    }
                                    
                                }
                            }
                        ]
                    }
                },
                {
                    text:'Payroll Related Info',
                    menu:{
                        xtype:'menu',
                        items:[
                            {
                                iconCls: 'data-icon',
                                text:'Basic Payroll Data',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        basicPayrollDataEditor(selected);
                                    }
                                }
                            },
                            {
                                iconCls: 'time-icon',
                                text:'Time Data',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        timeDataEditor(selected);
                                    }
                                }
                            },
                            {
                                iconCls: 'benefits-icon',
                                text:'Allowances and Benefits',
                                menu:{
                                    xtype:'menu',
                                    items:[
                                        {
                                            iconCls: 'allowance-icon',
                                            text:'Allowances',
                                            handler:function(){
                                                if(emp_grid.checkSelection())
                                                {
                                                    var selected = emp_grid.getSelected();
                                                    allowanceSetupList();
                                                }
                                            }
                                        },
                                        {
                                            iconCls: 'leave-icon',
                                            text:'Leave Benefits',
                                            handler:function(){
                                                if(emp_grid.checkSelection())
                                                {
                                                    var selected = emp_grid.getSelected();
                                                    leaveSetupList();
                                                }
                                            }
                                        },
                                        {
                                            iconCls: 'monetary-icon',
                                            text:'Monetary Benefits',
                                            handler:function(){
                                                if(emp_grid.checkSelection())
                                                {
                                                    var selected = emp_grid.getSelected();
                                                    monitarySetupList();
                                                }
                                            }
                                        },
                                        {
                                            iconCls: 'nonmonetary-icon',
                                            text:'Non-monetary Benefits',
                                            handler:function(){
                                                if(emp_grid.checkSelection())
                                                {
                                                    var selected = emp_grid.getSelected();
                                                    nonMonitarySetupList();
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                iconCls: 'payment-icon',
                                text:'Recurring Deductions/Payments',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        deductionPaymentEditor(selected);
                                    }
                                }
                            },
                            {
                                iconCls: 'remit-icon',
                                text:'Payroll Remittances',
                                handler:function(){
                                    if(emp_grid.checkSelection())
                                    {
                                        var selected = emp_grid.getSelected();
                                        payrollRemittanceEditor(selected);
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    text:'Generate User Account',
                    id:'gen-account-btn',
                    handler:function(){
                        me.accountGenerator();
                    }
                }
            ],
            items:
            [
                {
                    id:'employee_form',
                    layout:{type:'table', columns:3},
                    defaultType:'textfield',
                    margin:15,
                    defaults:{allowBlank:false, labelWidth:100,width:250,enableKeyEvents:true,margin:'0 25px 0 0'},
                    items:[
                        {
                            fieldLabel:'Employee No.',
                            id:'employee_no',
                            name:'employee[empno]',
                            readOnly:true
                        },
                        {
                            fieldLabel:'Employee\'s ID No.',
                            name:'employee[empidno]',
                            id:'employee_id'
                        },
                        {
                            fieldLabel:'Employee\'s Badge No.',
                            name:'employee[empbadgeno]',
                            id:'employee_badge_no',
                            labelWidth:135,
                            width:250
                        },
                        {
                            fieldLabel:'Title',
                            name:'employee[emptitle_id]',
                            id:'name_title',
                            xtype:'combobox',
                            valueField:'code',
                            displayField:'desc',
                            queryMode:'local',
                            editable:false,
                            store:createLocalStore(initial_selections.titles),
                            triggerAction:'all',
                            colspan:3
                        },                            
                        {
                            fieldLabel:'Last Name',
                            name:'employee[empnamelast]',
                            id:'last_name'

                        },
                        {
                            fieldLabel:'First Name',
                            name:'employee[empnamefirst]',
                            id:'first_name',
                        },
                        {
                            fieldLabel:'Middle Name',
                            name:'employee[empnamemiddle]',
                            id:'middle_name'
                        },
                        {
                            fieldLabel:'Name Suffix',
                            name:'employee[empnamesuffix]',
                            allowBlank:true,
                            emptyText:'eg. JR/SR/III'
                        },
                        {
                            fieldLabel:'Nick Name',
                            name:'employee[empnamealias]',
                            id:'nick_name'
                        },
                        {
                            fieldLabel:'Email Address',
                            name:'employee[emailaddress]',
                            id:'email_add'
                        },
                        {
                            fieldLabel:'Date Hired',
                            name:'employee[datehired]',
                            id:'date_hired',
                            format:'m/d/Y',
                            xtype:'datefield',
                            maxValue:_today_date
                        },
                        {
                            fieldLabel:'Company',
                            id:'company',
                            name:'employee[company_id]',
                            xtype:'combobox',
                            valueField:'id',
                            codeField:'code',
                            displayField:'desc',
                            store:createLocalStore(initial_selections.companies),
                            queryMode:'local',
                            editable:false,
                            triggerAction:'all',
                            listeners:{
                                change:function(comp, new_val, old_val)
                                {
                                    var company = filterStoreData(initial_selections.companies, {'id':new_val}).data[0];

                                    var position_data = filterStoreData(initial_selections.positions, {'company_id':new_val});

                                    ExtCmp('position').bindStore(createLocalStore(position_data));

                                    var department_data = filterStoreData(initial_selections.departments, {'company_id':new_val});
                                    ExtCmp('department').bindStore(createLocalStore(department_data));

                                    var new_location_data = filterStoreData(initial_selections.locations, {'company_id':new_val});
                                    ExtCmp('location_id').bindStore(createLocalStore(new_location_data));

                                    setFieldValue('business_group', company.busgroup_id);
                                    setFieldValue('holdcompany', company.holdcompany_id);

                                    if((new_val && old_val) || !me.id){
                                        setFieldValue('position', null);
                                        setFieldValue('department', null);
                                        setFieldValue('location_id', null);
                                        setFieldValue('dept_sub_group', null);
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel:'Holding Company',
                            name:'employee[holdcompany_id]',
                            xtype:'combobox',
                            valueField:'id',
                            displayField:'desc',
                            id:'holdcompany',
                            queryMode:'local',
                            editable:false,
                            readOnly:true,
                            store:createLocalStore(initial_selections.holdings)
                        },
                        {
                            fieldLabel:'Business Group',
                            name:'employee[busgroup_id]',
                            id:'business_group',
                            xtype:'combobox',
                            valueField:'id',
                            displayField:'desc',
                            queryMode:'local',
                            editable:false,
                            readOnly:true,
                            store:createLocalStore(initial_selections.busgroups)
                        },
                        {
                            fieldLabel:'Department',
                            id:'department',
                            name:'employee[department_id]',
                            xtype:'combomodal',
                            valueField:'id',
                            codeField:'code',
                            displayField:'desc',
                            triggerAction:'all',
                            changeFn:function(comp, department_id, old_val)
                            {
                                var company_id = ExtCmpValue('company');

                                var new_departments = filterStoreData(initial_selections.dept_groups, {"company_id":company_id, "department_id":department_id});
                                ExtCmp('dept_sub_group').bindStore(createLocalStore(new_departments));

                                if((department_id && old_val) || !me.id){
                                    ExtCmp('dept_sub_group').setValue(null);
                                }
                            }
                        },
                        {
                            fieldLabel:'Dept. Sub-Group',
                            id:'dept_sub_group',
                            name:'employee[deptgroup_id]',
                            xtype:'combobox',
                            triggerAction:'all',
                            valueField:'id',
                            editable:false,
                            displayField:'desc'
                        },
                        {
                            fieldLabel:'Location',
                            name:'employee[location_id]',
                            id:'location_id',
                            xtype:'combomodal',
                            valueField:'id',
                            codeField:'code',
                            displayField:'desc',
                            triggerAction:'all',
                            queryMode:'local',
                            editable:false,
                            changeFn:function(){} //do not remove this everything will get unstable. :!
                        },
                        {
                            fieldLabel:'Position',
                            name:'employee[position_id]',
                            id:'position',
                            xtype:'combomodal',
                            valueField:'id',
                            codeField:'code',
                            displayField:'desc',
                            queryMode:'local',
                            editable:false,
                            changeFn:function(cmp, new_position){
                                var position = cmp.findRecordByValue(new_position);
                                var level = position.get('positionlevel_id');
                                ExtCmp('position_level').setValue(level);
                            }
                        },
                        {
                            fieldLabel:'Position Level',
                            name:'employee[positionlevel_id]',
                            id:'position_level',
                            xtype:'combobox',
                            valueField:'id',
                            displayField:'description',
                            queryMode:'local',
                            editable:false,
                            readOnly:true,
                            store:createLocalStore(initial_selections.position_levels,'id', true),
                            triggerAction:'all'
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
        me.on('destroy',function(){
            emp_grid.getView().focus();
        });
    }
});
function getNewEmployeeNo()
{
    $.getJSON('/employees/newEmployeeNumber',function(response)
    {
        if(!response.success)
        {
            errorMessage(response.errormsg); return false;
        }
        setFieldValue('employee_no', response.new_emp_no);
    });
}

function employeeEditor(employee)
{
    var editor  = Ext.create('People.employee.Editor',{
        employee:employee
    });

    if(!employee){
        editor.toggleEmployeeOptions();
        getNewEmployeeNo();
    }
    else
    {
        loadRecordToArrayForm(ExtCmp('employee_form'), 'employee', employee);
        resetFormOriginalFieldsValue(ExtCmp('employee_form'));
        ExtCmp('employee_id').setReadOnly(true);

        if(employee.get('suggested_username')){
            ExtCmp('gen-account-btn').show();
        }else{
            ExtCmp('gen-account-btn').hide();
        }
    }

    editor.show();
}



