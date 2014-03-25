Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', '/assets/extjs/examples/ux');

break_time_renderer = function(date_time){
    try{
        
        var no_date = Ext.util.Format.date('1/1/1970 '+date_time, 'g:i A');
        if(!no_date.match(/NaN/g)){
            return no_date;
        }else{
            return Ext.util.Format.date(date_time, 'g:i A');
        }
    }
    catch(err){
        console.log(err);
    }
}

Ext.define('Breaktime', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'break_start'},
        {name: 'break_end'},
        {name: 'hours'}
    ]
});


function breakTimeStore(http_url)
{
    var breaktime_store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'Breaktime',
        autoLoad:false,
        proxy: {
            type: 'ajax',
            url: http_url,
            reader: {
                type: 'json',
                root: 'data'
            }
        },
        sorters: [{
            property: 'id',
            direction:'ASC'
        }]
    });
    return breaktime_store;
}

var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1
});


Ext.define('Breaktime.editor.Grid',
{
    extend:'Ext.grid.Panel',
    alias:'widget.breaktimeeditor',
    require:[
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],
    
    initComponent:function(){
        var me = this;

        Ext.apply(me,{
            title:'Break Time Editor',
            scroll:false,
            forceFit:true,
            plugins: [cellEditing],
            form_name: me.form_name || 'pattern',
            tbar: [
                {
                    iconCls:'add-icon',
                    id:'add_break_btn',
                    handler : function(){

                        var break_count = me.store.getCount();
                        if(break_count < 5){
                            var new_break = Ext.create('Breaktime', {
                                break_start: '12:00 PM',
                                break_end: '1:00 PM',
                                hours: '1'
                            });
                            me.store.insert(break_count, new_break);
                            cellEditing.startEditByPosition({row: break_count, column: 0});
                        }

                        if(me.store.getCount() == 5){
                            this.setDisabled(true);
                        }
                    }
                },
                {xtype:'textfield',name:me.form_name+'[break1fr]',id:'break1fr',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break1to]',id:'break1to',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break1hrs]',id:'break1hrs',hidden:true},

                {xtype:'textfield',name:me.form_name+'[break2fr]',id:'break2fr',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break2to]',id:'break2to',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break2hrs]',id:'break2hrs',hidden:true},

                {xtype:'textfield',name:me.form_name+'[break3fr]',id:'break3fr',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break3to]',id:'break3to',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break3hrs]',id:'break3hrs',hidden:true},

                {xtype:'textfield',name:me.form_name+'[break4fr]',id:'break4fr',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break4to]',id:'break4to',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break4hrs]',id:'break4hrs',hidden:true},

                {xtype:'textfield',name:me.form_name+'[break5fr]',id:'break5fr',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break5to]',id:'break5to',hidden:true},
                {xtype:'textfield',name:me.form_name+'[break5hrs]',id:'break5hrs',hidden:true}
            ],
            columns:[
                {
                    text:'Time Start', dataIndex:'break_start',
                    editor:{
                        xtype:'peopletimefield',
                        selectOnTab:true,
                        format:'g:i A',
                        submitFormat:'H:i:s',
                        valueField:'none'
                    },
                    renderer:break_time_renderer
                },
                {
                    text:'Time End', dataIndex:'break_end',
                    editor:{
                        xtype:'peopletimefield',
                        format:'g:i A',
                        submitFormat:'H:i:s',
                        valueField:'none',
                        selectOnTab:true
                    },
                    renderer:break_time_renderer
                },
                {
                    text:'Hours', dataIndex:'hours'
                },
                {
                    xtype: 'actioncolumn',
                    width:30,
                    sortable: false,
                    items: [
                        {
                            icon: '/assets/icons/delete.gif',
                            tooltip: 'Delete',
                            handler: function(grid, rowIndex, colIndex) {
                                grid.store.removeAt(rowIndex); 
                                if(ExtCmp('add_break_btn').isDisabled())
                                {
                                    ExtCmp('add_break_btn').enable();
                                }
                            }
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        this.callParent(arguments);
        this.initConfig(configs);

        // cellEditing.on('validateedit',function(editor, e){
        //     var record  = e.record,
        //     break_start = record.get('break_start'),
        //     break_end   = record.get('break_end');

        //     if(!break_start || !break_end){
        //         editor.startEditing(e.rowIdx);
        //         notify('Break Start and Break End is required.', 'warning');
        //     }
        //     console.log(break_start, break_end);
        //     var break_time_ms = Ext.Date.getElapsed(new Date('01/01/2014 '+break_start), new Date('01/01/2014 '+break_end));
        //     console.log(break_time_ms);
        //     var total_hrs = (break_time_ms / (60 * 60 * 1000));
        //     record.set('hours', total_hrs);
        // });

        this.store.on('update',function(store, record, operation, mod_fields, e){

            if(mod_fields != null && (mod_fields.indexOf('break_start') >= 0 || mod_fields.indexOf('break_end') >= 0)){
                var break_start = record.get('break_start'),break_end   = record.get('break_end');

                break_start = (typeof(break_start) == 'string') ? '01/01/2008 '+break_start : break_start;
                break_end = (typeof(break_end) == 'string') ? '01/01/2008 '+break_end : break_end;


                if(!break_start || !break_end){
                    editor.startEditing(e.rowIdx);
                    notify('Break Start and Break End is required.', 'warning');
                }

                var break_time_ms = Ext.Date.getElapsed(new Date(break_start),new Date(break_end));

                var total_hrs = (break_time_ms / (60 * 60 * 1000));
                record.set('hours', total_hrs.toFixed(2));
                record.commit();
            }
            
        });
    },
    createBreakTextFields:function(){

        var toolbar = this.getDockedItems('toolbar[dock="top"]')[0];

        var toolbar_items = toolbar.items.items;

        Ext.each(toolbar_items,function(item){
            if(item.getId() != 'add_break_btn'){
                item.setValue('');
            }
        });

        var break_items = this.store.data.items;
        var break_storage = [];
        Ext.each(break_items,function(break_time, index){
            var key = index+1;
            var break_fr_id = 'break'+key+'fr';
            var break_to_id = 'break'+key+'to';
            var break_hours_id = 'break'+key+'hrs';

            setFieldValue(break_fr_id, break_time.get('break_start'));
            setFieldValue(break_to_id, break_time.get('break_end'));
            setFieldValue(break_hours_id, break_time.get('hours'));
        });
    }
});

