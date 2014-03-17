Ext.define('Dropdown', {
    extend:'Ext.data.Model',
    fields:[
        {name:'code'},
        {name:'desc'}
    ]
});

function comboBoxStore(url, auto_load)
{
    var auto_load = (!auto_load) ? false : true;
    return Ext.create('Ext.data.ArrayStore',{
        model:'Dropdown',
        proxy:{
            type:'ajax',
            async:false,
            url:url,
            reader:{
                root:'data'
            }
        },
        autoLoad:auto_load
    });
}

