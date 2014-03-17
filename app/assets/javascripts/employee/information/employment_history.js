function employmentHistoryList(){
    var employment_window = Ext.create('Ext.window.Window',{
        title:'Employment History List',
        layout:'fit',
        modal:true,
        autoHeight:true,
        autoWidth:true,
        items:[
            {
                xtype:'gridpanel',
                width:650,
                height:450,
                forceFit:true,
                store:[],
                columns:[
                    {text:'Company'},
                    {text:'Department'},
                    {text:'Last Position Held', width:150},
                    {text:'Labor Type'},
                    {text:'Start Date'},
                    {text:'End Date'},
                    {text:'Duration of Employment', width:200}
                ],
                tbar:[
                    {
                        text:'Add',
                        handler:function(){
                            employmentHistoryEditor();
                        }
                    },
                    {
                        text:'Edit',
                        handler:function(){
                            employmentHistoryEditor();
                        }
                    },
                    {
                        text:'Delete'
                    }
                ]
            }
        ]
    });
    employment_window.show();
}