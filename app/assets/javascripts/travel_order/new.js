function travelOrderApplication()
{
    var editor_window = Ext.create('People.editor.Window',{
        title:'Travel Order Application',
        items:
        [ 
            {
                layout:'vbox',
                items:
                [
                    {
                        fieldLabel:'File Date',
                        xtype:'datefield',
                        readOnly:true,
                        value:_today_date,
                        labelWidth:100
                    },
                    {
                        fieldLabel:'Destination',
                        labelWidth:100
                    },
                    {
                        fieldLabel:'Date From',
                        xtype:'datefield',
                        labelWidth:100
                    },
                    {
                        fieldLabel:'Date To',
                        xtype:'datefield',
                        labelWidth:100
                    },
                    {
                        fieldLabel:'Details of Transport',
                        labelStyle:'font-weight:bold; padding:15px 0 0 0; font-size:11px;',
                        labelAlign:'top',
                        xtype:'textarea'
                    },
                    {
                        fieldLabel:'Purpose of Travel',
                        labelStyle:'font-weight:bold; padding:0; font-size:11px;',
                        labelAlign:'top',
                        xtype:'textarea'
                    }
                ]
            }
        ],
        buttons:[
            {
                text:'Send Application',
                handler:function(){

                }
            },
            {
                text:'Cancel',
                handler:function(){
                    editor_window.destroy();
                }
            }
        ]
    }).show();
}