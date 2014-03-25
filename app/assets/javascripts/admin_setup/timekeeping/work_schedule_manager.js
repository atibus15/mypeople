
function scheduleManager(sched, category, is_copy)
{
    var title_obj =  {ACT:'Actual', ALT:'Alternate', FLX:'Flexible', STR:'Straight'};

    category = !category ? sched.get('workskedcategory_id') : category;

    var id = (sched && !is_copy) ? sched.get('id') : null;

    var work_day_store = [['RWD','Working Day'],['RRD','Rest Day']];

    var work_days = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    var sched_win = Ext.create('People.editor.Window',{
        title:title_obj[category]+' Work Schedule Manager',
        id:'work_sched_window',
        items:[
            {
                id:'schedule_manager_form',
                layout:'hbox',
                items:[
                    {name:'sched[workskedcategory_id]', value:category, xtype:'textfield', hidden:true},
                    {
                        layout:'vbox',
                        items:[
                            {
                                xtype:'combobox',
                                fieldLabel:'Company',
                                name:'sched[company_id]',
                                id:'sched-company-id',
                                valueField:'id',
                                displayField:'desc',
                                allowBlank:false,
                                store:createLocalStore(selections.companies)
                            },
                            {
                                width:300,
                                xtype:'myfieldset',
                                title:'Schedule',
                                items:[
                                    {
                                        fieldLabel:'Code',
                                        name:'sched[workskedcode]',
                                        id:'sched-code',
                                        xtype:'textfield',
                                        allowBlank:false
                                    },
                                    {
                                        fieldLabel:'Description',
                                        name:'sched[description]',
                                        xtype:'textfield',
                                        allowBlank:false
                                    }
                                ]
                            },
                            {
                                width:300,
                                xtype:'myfieldset',
                                title:'Required Work Hour(s)',
                                id:'required_time_field',
                                items:[
                                    {
                                        fieldLabel:'Time In',
                                        name:'sched[requiredtimein]',
                                        xtype:'peopletimefield',
                                        submitFormat:'H:i:s',
                                        increment:30,
                                        width:200,
                                        allowBlank:false
                                    },
                                    {
                                        fieldLabel:'Time Out',
                                        name:'sched[requiredtimeout]',
                                        submitFormat:'H:i:s',
                                        increment:30,
                                        xtype:'peopletimefield',
                                        width:200
                                    },
                                    {
                                        fieldLabel:'Required Work Hours',
                                        xtype:'numberfield',
                                        hideTrigger:true,
                                        labelWidth:125,
                                        width:200,
                                        value:0,
                                        name:'sched[requiredwkhrs]',
                                        allowBlank:false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        items:[
                            {
                                width:235,
                                xtype:'myfieldset',
                                title:'Define Work Days',
                                id:'work_days_fieldset',
                                items:[]
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
                handler:function(){
                    var save_url = id ? '/workskeds/'+id : '/workskeds';
                    var method = id ? 'PUT' : 'POST';
                    submitForm('schedule_manager_form', save_url, method, function(){
                        ExtCmp('time_keeping_grid').store.load();
                        ExtCmp('work_sched_window').destroy();
                    });
                }
            },
            {
                iconCls:'save-add-icon',
                tooltip:'Save and Add New',
                handler:function(){
                    var save_url = id ? '/workskeds/'+id : '/workskeds';
                    var method = id ? 'PUT' : 'POST';
                    submitForm('schedule_manager_form', save_url, method, function(){
                        ExtCmp('schedule_manager_form').getForm().reset();
                        ExtCmp('time_keeping_grid').store.load();
                    });
                }
            },
            {
                iconCls:'cancel-icon',
                tooltip:'Cancel',
                handler:function(){
                    sched_win.destroy();
                }
            }
        ]
    });
    


    Ext.each(work_days, function(day)
    {
        ExtCmp('work_days_fieldset').add({
            xtype:'combobox',
            fieldLabel:day,
            value:'RWD',
            allowBlank:false,
            name:'sched['+day.toLowerCase()+']',
            store:work_day_store,
            width:200
        });
    });

    var time_fieldset = ExtCmp('required_time_field');

    switch(category){
        case 'ACT':
            time_fieldset.remove(0);
            time_fieldset.remove(0);
        break;
        case 'FLX':
            time_fieldset.remove(0);
            time_fieldset.remove(0);
            time_fieldset.insert(0, [
                {
                    fieldLabel:'Earliest In',
                    xtype:'peopletimefield',
                    name:'sched[flexiearliestin]',
                    width:200,
                    allowBlank:false
                },
                {
                    fieldLabel:'Latest In',
                    name:'sched[flexilatestin]',
                    xtype:'peopletimefield',
                    allowBlank:false,
                    width:200
                }
            ]);
        break;
    }

    sched_win.show();
    if(sched){
        loadRecordToArrayForm(ExtCmp('schedule_manager_form'), 'sched', sched);

        if(!is_copy){
            ExtCmp('sched-company-id').setReadOnly(true);
            ExtCmp('sched-code').setReadOnly(true);
        }
    }
}