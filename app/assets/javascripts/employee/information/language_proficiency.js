function languageList(){
    var language_window = Ext.create('Ext.window.Window',{
        title:'Language Proficiency',
        layout:'fit',
        modal:true,
        autoHeight:true,
        autoWidth:true,
        items:[
            {
                xtype:'gridpanel',
                title:'Qualifications',
                width:500,
                height:200,
                forceFit:true,
                store:[],
                columns:[
                    {text:'Read'},
                    {text:'Spoken'},
                    {text:'Written'},
                    {text:'Proficiency Level'}
                ],
                tbar:[
                    {
                        text:'Add',
                        handler:function(){
                            languageProficiencyEditor();
                        }
                    },
                    {
                        text:'Edit',
                        handler:function(){
                            languageProficiencyEditor();
                        }
                    },
                    {
                        text:'Delete'
                    }
                ]
            }
        ]
    });
    language_window.show();
}