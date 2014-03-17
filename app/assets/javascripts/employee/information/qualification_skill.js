function qualificationSkillList(){
    var qualification_skill_window = Ext.create('Ext.window.Window',{
        title:'Qualification and Skills',
        layout:'vbox',
        modal:true,
        autoHeight:true,
        autoWidth:true,
        items:[
            {
                xtype:'gridpanel',
                title:'Qualifications',
                width:750,
                height:200,
                forceFit:true,
                store:[],
                columns:[
                    {text:'License No.'},
                    {text:'Examination Taken'},
                    {text:'Year Taken'},
                    {text:'Rating'},
                    {text:'Country of Examination'},
                    {text:'Color'}
                ],
                tbar:[
                    {
                        text:'Add',
                        handler:function(){
                            qualificationEditor();
                        }
                    },
                    {
                        text:'Edit',
                        handler:function(){
                            qualificationEditor();
                        }
                    },
                    {
                        text:'Delete'
                    }
                ]
            },
            {
                xtype:'gridpanel',
                title:'Skills',
                width:750,
                height:200,
                forceFit:true,
                store:[],
                columns:[
                    {text:'Type'},
                    {text:'Level'},
                    {text:'Date Last Used'}
                ],
                tbar:[
                    {
                        text:'Add',
                        handler:function(){
                            loadScript('/assets/employee/information/skill_editor.js');
                            skillEditor();
                        }
                    },
                    {
                        text:'Edit',
                        handler:function(){
                            loadScript('/assets/employee/information/skill_editor.js');
                            skillEditor();
                        }
                    },
                    {
                        text:'Delete'
                    }
                ]
            }
        ]
    });
    qualification_skill_window.show();
}