// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


initial_selections = createLocalDataFromServer('/client/default_selections');

employee_list_store = createJsonStore('/employee/list.json', 'empidno', false, 'total_employee');




function getDepartmentsByComCode(company_id)
{
    var request = $.ajax({
        url:'/lookups/companydept.json',
        method:'get',
        async:false,
        data:{
            company_id: company_id
        }
    });

    var response = $.parseJSON(request.responseText);
    if(response.success)
    {
        return response.data;
    }
    else
    {
        alert(response.errormsg);
        return false;
    }
}

function getSubDepartments(company_id, dept_id)
{
    var request = $.ajax({
        url:'/lookups/deptsubgroup.json',
        method:'get',
        async:false,
        data:{
            company_id:company_id,
            dept_id:dept_id
        }
    });

    var response = $.parseJSON(request.responseText);
    if(response.success)
    {
        return response.data;
    }
    else
    {
        alert(response.errormsg);
        return false;
    }
}

function destroyEmployee(employee_id)
{   
    Ext.Ajax.request({
        url:'/employees/'+employee_id+'.json',
        method:'POST',
        params:{
            authenticity_token:authToken(),
            _method:'delete'
        },
        callback:function(option, success ,result)
        {
            var response = $.parseJSON(result.responseText);
            if(response.success){
                ExtMessage(response.notice, 'SUCCESS');
                ExtCmp('employee_list_grid').store.reload();
            }
            else
            {
                ExtMessage(result.errormsg,'WARNING'); return;
            }
        }
    })
}



var employee_list_group_feature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}', hideGroupedHeader:true});
    
var emp_grid = Ext.create('People.unity.Grid',{
    title:'Employee Management',
    region:'center',
    margin:'10 15 0 15',
    id:'employee-grid',
    store:employee_list_store,
    features:[employee_list_group_feature],
    columns:[
        {text:'No.', dataIndex:'empno', width:50},
        {text:'ID Number', dataIndex:'empidno', width:50},
        {text:'Badge No.', dataIndex:'empbadgeno', width:50},
        {text:'Last Name', dataIndex:'empnamelast'},
        {text:'First Name', dataIndex:'empnamefirst'},
        {text:'Middle Name', dataIndex:'empnamemiddle'},
        {text:'Date Hired', dataIndex:'datehired', renderer:function(v){return Ext.util.Format.date(v, 'm/d/Y')}},
        {text:'Company', dataIndex:'company_desc'},
        {text:'Department', dataIndex:'department_desc'},
        {text:'Position', dataIndex:'position_desc'}
    ],
    tbar:
    [    
        {
            xtype:'combobox',
            id:'company_id_clue',
            emptyText:'Company',
            valueField:'id',
            displayField:'desc',
            store:createLocalStore(initial_selections.companies),
            enableKeyEvents:true,
            triggerAction:'all',
            editable:false,
            listeners:{
                keypress:function(me,e){
                    if(e.getKey() == 13){
                        loadEmployeeList();
                    }
                }
            }
        },
        {
            xtype:'textfield',
            id:'id_number_clue',
            emptyText:'ID Number',
            enableKeyEvents:true,
            listeners:{
                keypress:function(me,e){
                    if(e.getKey() == 13){
                        loadEmployeeList();
                    }
                }
            }
        },
        {
            xtype:'textfield',
            id:'last_name_clue',
            emptyText:'Last Name',
            enableKeyEvents:true,
            listeners:{
                keypress:function(me,e){
                    if(e.getKey() == 13){
                        loadEmployeeList();
                    }
                }
            }
        },
        {
            iconCls:'search-icon',
            tooltip:'Search',
            handler:function(){
                loadEmployeeList();
            }
        },
        {
            iconCls:'add-icon',
            tooltip:'Add New Employee',
            handler:function(){
                employeeEditor();
            }
        },
        {
            iconCls:'reset-icon',
            tooltip:'Reset Form',
            tooltip:'Refresh',
            handler:function(){
                loadEmployeeList();
            }
        }
    ]
});

function loadEmployeeList()
{
    var company_id  = ExtCmpValue('company_id_clue');
    var id_number   = ExtCmpValue('id_number_clue');
    var last_name   = ExtCmpValue('last_name_clue');


    emp_grid.store.load({
        params:{
            company_id:company_id,
            id_number:id_number,
            last_name:last_name
        },
        callback:function(){
            emp_grid.store.group('company_desc');
            emp_grid.getSelectionModel().select(0);
            emp_grid.getView().focus();
            if(company_id){employee_list_group_feature.disable(); }
        }
    });
}


Ext.tip.QuickTipManager.init();
Ext.onReady(function(){

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items:[emp_grid]
    });    

    emp_grid.on('itemdblclick',function(grid, record){
        employeeEditor(record);
    });

    createGridEnterKeyEvent(emp_grid, function(keyCode, e) {
        // Attempt to select the record that's now in its place
        e.view.getSelectionModel().select(e.index);
        e.view.el.focus();
        employeeEditor(e.record);
    });
});

