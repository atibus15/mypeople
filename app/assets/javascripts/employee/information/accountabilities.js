function accountabilityList(){
    var accountability_window = Ext.create('Ext.window.Window',{
        title:'Accountability on Company Owned Property',
        layout:'fit',
        modal:true,
        autoHeight:true,
        autoWidth:true,
        items:[
            {
                xtype:'gridpanel',
                width:750,
                height:450,
                forceFit:true,
                store:[],
                columns:[
                    {text:'Ref No.'},
                    {text:'Description'},
                    {text:'Date of Receipt'},
                    {text:'Brand'},
                    {text:'Model'},
                    {text:'Color'},
                    {text:'Serial No.'},
                    {text:'Tag No./Asset No.'},
                    {text:'Remarks'}
                ],
                tbar:[
                    {
                        text:'Add',
                        handler:function(){
                            accountabilityEditor();
                        }
                    },
                    {
                        text:'Edit',
                        handler:function(){
                            accountabilityEditor();
                        }
                    },
                    {
                        text:'Delete'
                    }
                ]
            }
        ]
    });
    accountability_window.show();
}