Ext.Ajax.timeout = 120000;

Ext.override(Ext.data.Connection, {timeout:120000});

Ext.override(Ext.data.proxy.Ajax, { timeout:120000 });
Ext.tip.QuickTipManager.init();
_today_date = new Date();  



icon_status = function(status){
    var icon = status == 1 ? 'active.png' : 'cancel.gif';
    return "<img src='/assets/icons/"+icon+"' width='12px' height='12px'></img>";
}

function trimValues(data)
{
    if(typeof(data) === "object")
    {

        $.map(data,function(val, key){

            if(typeof(val) == 'string'){
            data[key] = val.trim();
            }else
            {
                data[key] = val;
            }
        });
        return data;
    }
}

function ExtCmp(id)
{
    var ext_component = Ext.getCmp(id);

    if(typeof(ext_component) !== 'undefined'){
        return ext_component;
    }else
    {
        console.log('Undefined Extjs Component : '+id); return false;
    }
}

function ExtCmpValue(id)
{
    return Ext.getCmp(id).getValue();
}

function setFieldValue(id, val)
{
    var ext_component = Ext.getCmp(id);

    if(typeof(ext_component) !== 'undefined'){
        ext_component.setValue(val);
    }else
    {
        console.log('Undefined Extjs Component : '+id); return false;
    }
}



function setFieldRawValue(id, val)
{
    var ext_component = Ext.getCmp(id);

    if(typeof(ext_component) !== 'undefined'){
        ext_component.setRawValue(val);
    }else
    {
        console.log('Undefined Extjs Component : '+id); return false;
    }
}


function getDateTime(date, format)
{
    format = !format ? 'G:i' : format;
    var date_str = String(date);
    return Ext.Date.format(new Date(date), format);
}


function getFormFields(form){
    return form.getForm().getFields().items;
}

function getFirstInvalidField(form){
    var form_fields = getFormFields(form);
    var first_invalid_field;
    Ext.each(form_fields, function(field){
        if(!field.isValid()){
            first_invalid_field = field;
            return false;
        }
    });
    return first_invalid_field ? first_invalid_field : false;
}

function resetFormOriginalFieldsValue(form)
{
    var form_fields = getFormFields(form);
    Ext.each(form_fields, function(field){
        try
        {
            field.resetOriginalValue();
        }
        catch(err)
        {
            console.log(err);
        }
    });
}

function in_array(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function emptyFormFieldsValue(form, exception)
{
    var form_fields = getFormFields(form);
    Ext.each(form_fields, function(field)
    {
        try{
            field_id = field.getId();
            if((typeof(exception) == 'array' && !in_array(field_id, exception)) || (typeof(exception) == 'string' && field_id != exception)){
                field.setValue(null);
            }
            
        }catch(err){
            console.log(err);
        }
    });
}


// Do not support multidimensional array.

function loadRecordToArrayForm(ext_form, array_name, record)
{
    var form_fields = getFormFields(ext_form);

    Ext.each(form_fields, function(field){
        try
        {
            var f_name = field.getName();
            if(eval('/'+array_name+'/').test(f_name))
            {
                var field_key = f_name.replace(array_name, '').replace(/[\[\]]/g, '');
                var value = record.get(field_key);
                var clean_val = (typeof(value) == 'string') ? value.trim() : value;
                field.setValue(value);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    });
}


function ExtMessage(msg, flag, callback)
{
    switch(flag){
        case 'ERROR':
            icon = Ext.MessageBox.ERROR;
        break;
        case 'INFO':
            icon = Ext.MessageBox.INFO;
        break;
        case 'QUESTION':
            icon = Ext.MessageBox.QUESTION;
        break;
        case 'WARNING':
            icon = Ext.MessageBox.WARNING;
        break;
        default:
            icon = Ext.MessageBox.SUCCESS
        break;
    }

    var error_box = Ext.MessageBox.show({
        title:'MyPeople',
        msg:msg,
        modal:true,
        focusOnToFront:true,
        icon:icon,
        buttons:Ext.MessageBox.OK,
        closable:false,
        fn:function(){
            if(callback != undefined){
                if(typeof(callback) == 'String'){
                    eval(callback+'()');
                }else{
                    callback();
                }
            }
        }
    });
    Ext.Function.defer(function(){
        error_box.zIndexManager.bringToFront(error_box);
    },50);
}


function deleteRecordViaAjax(delete_url, confirm_msg, success_callback)
{
    Ext.MessageBox.show({
        title:'MyPeople',
        buttons:Ext.MessageBox.YESNO,
        msg:confirm_msg,
        icon:Ext.MessageBox.QUESTION,
        fn:function(btn){
            if(btn == 'yes'){
                Ext.Ajax.request({
                    url:delete_url,
                    method:'DELETE',
                    params:{
                        authenticity_token:authToken(),
                        _method:'delete'
                    },
                    callback:function(option, success ,result)
                    {
                        var response = $.parseJSON(result.responseText);
                        if(response.success){
                            notify(response.notice, 'success');
                            if(success_callback != undefined){
                                success_callback(response);
                            }
                        }else{
                            notify(response.errormsg,'error'); return;
                        }
                    }
                });
            }
        }
    })
    
}


function createJsonStore(data_url, id_property, auto_load, total_property)
{
    auto_load = !auto_load ? false : true;
    return Ext.create('Ext.data.Store',{
        fields:[],
        proxy:{
            url:data_url,
            type:'ajax',
            reader:{
                type:'json',
                root:'data',
                idProperty:id_property,
                totalProperty:total_property || 'totalProperty'
            }
        },
        autoLoad:auto_load,
        listeners:{
            metachange:function(store, meta){
                store.fields = meta.fields; // set metaData fields as store field model
                if(meta.grouper) store.groupField = meta.grouper;
            }
        }
    });
}

function createLocalStore(store)
{
    var fields = typeof(store.metaData.fields) != 'undefined' ? store.metaData.fields : ['code','desc'];
    
    var data = store.data ? store.data : [];

    return Ext.create('Ext.data.Store',{
        fields:fields,
        data:data,
        autoLoad:true
    });
}

function filterStoreData(store, conditions){
    new_store = new Object();
    new_store.metaData = store.metaData;
    new_store.data = store.data;

    new_data = []
    Ext.each(new_store.data, function(store_data){
        var match = true;
        $.each(conditions, function(data_key, val){
            if(store_data[data_key] != val){
                match = false; return;
            }
        });
        if(match){
            new_data.push(store_data);
        }
    });
    new_store.data = new_data;

    return new_store;
}

function notify(msg, type)
{
    showNotification({
        autoClose:true,
        duration:10,
        type:type,
        message:msg
    });
}

function submitForm(form_id, action_url, method, success_callback, submit_empty_text, invalid_form_callback, additional_params)
{
    method = method ? method : 'POST';
    var submit_empty_text = (submit_empty_text==undefined) ? true : submit_empty_text 
    var form = ExtCmp(form_id).getForm();

    
    if(!form.isValid()){

        var invalid_field = getFirstInvalidField(ExtCmp(form_id));
        // var error_msg = invalid_field.getFieldLabel()+' is required.';
        var error_msg = 'Please fill-up all required fields.';
        if(invalid_form_callback != undefined)
        {
            invalid_form_callback();
        }
        notify(error_msg, 'warning');
    }
    else if(!form.isDirty()){
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
            url:action_url,
            method:method,
            submitEmptyText:submit_empty_text,
            params:{
                _method:method,
                utf8:true,
                authenticity_token:authToken(),
                additional_params:additional_params
            },
            success:function(f, action){

                var response = action.result;
                Ext.MessageBox.hide();
                notify(response.notice, 'success');
                
                success_callback(response);
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
}

function createLocalDataFromServer(server_url){
    var request = $.ajax({
        url:server_url,
        async:false
    });

    var response = $.parseJSON(request.responseText);
    if(response.success){
        return response;
    }else{
        ExtMessage(response.errormsg);
        return false;
    }
}

function createGridEnterKeyEvent(grid, enter_function){
    return new Ext.util.KeyMap({
            target:grid.getView(),
            eventName:'itemkeydown',
            processEvent:function(view, record, node, index, event){
                event.view = view;
                event.store = view.getStore();
                event.record = record;
                event.index = index;
                return event;
            },
            binding: {
            key: Ext.EventObject.ENTER,
            fn: enter_function
        }
    });
}