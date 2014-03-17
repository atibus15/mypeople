function educationBackGround()
{
    var education_window = Ext.create('Ext.window.Window',{
        title:'Educational Background',
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
                    {text:'Education Level'},
                    {text:'Year Covered'},
                    {text:'Course'},
                    {text:'Date Graduated'},
                    {text:'Major'},
                    {text:'Honors'},
                    {text:'School/University'}
                ],
                tbar:[
                    {
                        text:'Add',
                        handler:function(){
                            educationBackgroundEditor();
                        }
                    },
                    {
                        text:'Edit',
                        handler:function(){
                            educationBackgroundEditor();
                        }
                    },
                    {
                        text:'Delete'
                    }
                ]
            }
        ]
    });
    education_window.show();
}