
function holidayEditor(holiday, is_copy)
{
    var country_holiday_types = createLocalDataFromServer('/client/country_holiday_types');
    var id = (holiday && !is_copy) ? holiday.get('id') : null;
    var hl_id = holiday ? holiday.get('id') : null;
    var submit_function = function(exit){
        var url = id ? '/holidays/'+id : '/holidays';
        var method = id ? 'PUT' : 'POST';
        var locations = ExtCmp('affected_location_grid').store.getRange();

        var new_locations = []
        var coverage = ExtCmp('coverage').getValue();
        if(coverage == 'L'){
            Ext.each(locations,function(location){
                if(location.get('hl_id') == undefined){
                    var local = {'location_id':location.get('id'),'company_id':location.get('company_id')};
                    new_locations.push(local);
                }
            });
        }

        var form = ExtCmp('holiday_form').getForm();
        
    
        if(!form.isValid()){

            var invalid_field = getFirstInvalidField(ExtCmp(form_id));
            var error_msg = 'Please fill-up all required fields.';
            if(invalid_form_callback != undefined)
            {
                invalid_form_callback();
            }
            notify(error_msg, 'warning');
        }
        else if(coverage == 'L' && locations.length == 0){
            notify('Local Holidays require affected location/s.', 'warning'); return false;
        }
        else if(!form.isDirty() && new_locations.length == 0){
            notify('No changes made.','warning');
            return false;
        }
        else
        {
            Ext.MessageBox.show({
                msg:'Processing request...',
                progressText:'Processing request...',
                wait:true,
                width:200,
                waitConfig:{interval:300}
            });
            form.submit({
                url:url,
                method:method,
                submitEmptyText:true,
                params:{
                    _method:method,
                    utf8:true,
                    authenticity_token:authToken(),
                    locals:Ext.JSON.encode(new_locations)
                },
                success:function(f, action){
                    var response = action.result;
                    Ext.MessageBox.hide();
                    notify(response.notice, 'success');
                    if(exit){
                        editor_window.destroy();
                    }else{
                        emptyFormFieldsValue(ExtCmp('holiday_form'), 'holiday_calendar_id');
                        resetFormOriginalFieldsValue(ExtCmp('holiday_form'));
                    }
                    ExtCmp('global_setup').store.load();
                    return;
                },
                failure:function(f, action){
                    var response = action.result;
                    Ext.MessageBox.hide();
                    notify(response.errormsg, 'error');
                    return;
                }
            })
        }
    };


    var location_window = Ext.create('Ext.window.Window',{
        layout:'fit',
        closeAction:'hide',
        modal:true,
        items:[
            {
                xtype:'gridpanel',
                title:'Locations',
                id:'location_selection_grid',
                width:450,
                height:350,
                selModel:{
                    mode:'SIMPLE',
                    allowDeselect:true
                },
                features:[Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'})],
                forceFit:true,
                store:createLocalStore(selections.locations),
                columns:[
                    {text:'Location Code', dataIndex:'code', width:35},
                    {text:'Description', dataIndex:'desc'}
                ]
            }
        ],
        buttons:[
            {
                text:'OK',
                handler:function(){
                    var selections = ExtCmp('location_selection_grid').getSelectionModel().getSelection();
                    ExtCmp('affected_location_grid').store.add(selections);
                    location_window.hide();
                }
            }
        ],
        listeners:{
            show:function(){
                var selection_grid = ExtCmp('location_selection_grid');
                var pre_loaded = ExtCmp('affected_location_grid').store.getRange();
                selection_grid.getSelectionModel().deselectAll();
                Ext.each(pre_loaded,function(loaded){
                    var index_in_selection = selection_grid.store.find('id', loaded.get('location_id'));
                    selection_grid.store.removeAt(index_in_selection);
                    selection_grid.store.group('company');
                });
            }
        }
    });

    var editor_window = Ext.create('People.editor.Window',{
        title:'Holiday Editor',
        enterFn:function(){submit_function},
        items:
        [
            {
                layout:{ type: 'table', columns:2},
                id:'holiday_form',
                margin:'0 15 0 0',
                defaults:{
                    allowBlank:false,
                    width:300,
                    margin:'0 10 0 10'
                },
                items:[
                    {
                        fieldLabel:'Holiday Calendar',
                        xtype:'combobox',
                        name:'holiday[country_id]',
                        displayField:'description',
                        id:'holiday_calendar_id',
                        valueField:'country_id',
                        store:createLocalStore(country_holiday_types.countries),
                        listeners:{
                            change:function(cmp, new_country, old_country){
                                var holiday_type_field = ExtCmp('holiday_type');
                                var holiday_type_store = createLocalStore(country_holiday_types[new_country]);
                                holiday_type_field.bindStore(holiday_type_store);

                                if(old_country) holiday_type_field.setValue(null);
                            }
                        }
                    },
                    {
                        fieldLabel:'Holiday Type',
                        xtype:'combobox',
                        name:'holiday[holidaytype_id]',
                        id:'holiday_type',
                        displayField:'description',
                        valueField:'id',
                        triggerAction:'all'
                    },
                    {
                        fieldLabel:'Date',
                        xtype:'datefield',
                        name:'holiday[holidaydate]'
                    },
                    {
                        fieldLabel:'Description',
                        name:'holiday[description]',
                        xtype:'textfield'
                    },
                    {
                        fieldLabel:'Coverage',
                        xtype:'combobox',
                        id:'coverage',
                        name:'holiday[coverage]',
                        store:[['N','National'],['L','Local']],
                        colspan:2,
                        listeners:{
                            change:function(cov, new_coverage){
                                var affected_location_grid = ExtCmp('affected_location_grid');
                                if(new_coverage == 'L'){
                                    affected_location_grid.show();
                                    editor_window.doLayout();
                                    editor_window.center();
                                }else{
                                    affected_location_grid.hide();
                                    editor_window.doLayout();
                                    editor_window.center();
                                }
                            }
                        }
                    },
                    {
                        xtype:'gridpanel',
                        title:'Locations',
                        hidden:true,
                        id:'affected_location_grid',
                        colspan:2,
                        width:620,
                        height:250,
                        features:[Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl:'{name}'})],
                        selModel:{
                            allowDeselect:true,
                            mode:'SIMPLE'
                        },
                        store:createJsonStore('/holidaylocals/affected_locations/'+hl_id),
                        listeners:{
                            afterrender:function(){
                                this.store.load();
                                this.store.group('company');
                                if(!is_copy){
                                    this.store.on('load',function(record){
                                        
                                    });
                                }
                            }
                        },
                        forceFit:true,
                        columns:[
                            {text:'Location Code', dataIndex:'code', width:25},
                            {text:'Description', dataIndex:'desc'}
                        ],
                        tbar:[
                            {
                                iconCls:'add-icon',
                                tooltip:'Add New Location',
                                handler:function(){
                                    location_window.show();
                                }
                            },
                            {
                                iconCls:'delete-icon',
                                tooltip:'Delete Selected Item',
                                handler:function(){
                                    var selections = ExtCmp('affected_location_grid').getSelectionModel().getSelection();
                                    deleteHolidayLocals(selections);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        tbar:[
            {
                iconCls:'save-icon',
                tooltip:'Save and Exit',
                handler:function(){submit_function()}
            },
            {
                iconCls:'save-add-icon',
                tooltip:'Save and Add New',
                handler:function(){
                    submit_function(false);
                }
            } 
        ]
    }); 

    editor_window.show();

    if(holiday){
        loadRecordToArrayForm(ExtCmp('holiday_form'), 'holiday', holiday); 
        resetFormOriginalFieldsValue(ExtCmp('holiday_form'));
    }
}

function deleteHolidayLocals(selections)
{
    var holidaylocal_ids = []
    Ext.each(selections,function(selected){
        if(selected.get('hl_id') != undefined)
        {
            holidaylocal_ids.push(selected.get('hl_id'));
        }
    });

    Ext.MessageBox.show({
        title:'MyPeople',
        buttons:Ext.MessageBox.YESNO,
        msg:'Are you sure you want to delete selected item/s',
        icon:Ext.MessageBox.QUESTION,
        fn:function(btn){
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url:'/holidaylocals/multi_delete',
                    method:'POST',
                    params:{
                        authenticity_token:authToken(),
                        holidaylocal_ids:Ext.JSON.encode(holidaylocal_ids)
                    },
                    callback:function(option, success ,result)
                    {
                        var response = $.parseJSON(result.responseText);
                        if(response.success){
                            notify(response.notice, 'success');
                            ExtCmp('affected_location_grid').store.remove(selections);
                        }else{
                            notify(response.errormsg,'error'); return;
                        }
                    }
                });
            }
        }
    });
    
}