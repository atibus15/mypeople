Ext.define('People.exception.Grid',{
    extend:'Ext.grid.GridPanel',
    xtype:'exceptiongrid',
    width:450,
    forceFit:true,
    columns:[
        {maxWidth:60,dataIndex:'empidno',text:'ID No.'},
        {dataIndex:'empfullnamelfm',text:'Fullname'},
        {dataIndex:'company',text:'Company'}
    ],
    removeEmployees:function(employee_records){
        var me = this;
        Ext.each(employee_records,function(employee){
            record_index = me.store.find('empidno', employee['empidno']);
            if(record_index >= 0) me.store.removeAt(record_index);
        });
    }
});