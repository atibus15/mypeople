var policy_grid = Ext.create('People.unity.Grid',{
    title:'Policies',
    store:[],
    columns:[
        {text:'Policy code'},
        {text:'Policy description'},
        {text:'Created Date'},
        {text:'Created by'},
        {text:'Last Updated Date'},
        {text:'Last Updated by'}
    ],
    tbar:[
        {
            text:'Working Policies',
            menu:{
                xtype:'menu',
                items:[
                    {
                        text:'Regular',
                        handler:function(){
                            loadScript('/assets/policies/working/regular.js');
                            regularWorkingPolicyEditor();
                        }
                    },
                    {
                        text:'Overtime',
                        handler:function(){

                        }
                    },
                    {
                        text:'Break',
                        handler:function(){

                        }
                    },
                    {
                        text:'Night Differential',
                        handler:function(){

                        }
                    },
                    {
                        text:'Shift Differential',
                        handler:function(){
                            
                        }
                    }
                ]
            }
        },
        {
            text:'Non Working Policies'
        },
        {
            text:'Common'
        }
    ]
});