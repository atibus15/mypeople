
Ext.onReady(function(){
    var profile = Ext.JSON.decode(Ext.get('profile-data').getValue()).data;
    
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                xtype:'panel',
                title:'Employee Profile',
                layout:{type:'table', columns: 1},
                defaultType:'displayfield',
                defaults:{
                    margin:'0 250 0 25'
                },
                items:[
                    {
                        fieldLabel:'ID Number',
                        value:profile.empidno
                    },
                    {
                        fieldLabel:'Badge Number',
                        id:'badge_no',
                        value:profile.empbadgeno
                    },
                    {
                        fieldLabel:'Full Name',
                        id:'fullname',
                        value:profile.empfullnamelfm
                    },
                    {
                        fieldLabel:'Nickname',
                        id:'nickname',
                        value:profile.empnamealias
                    },
                    {
                        fieldLabel:'Date Hired',
                        id:'date_hired',
                        value:profile.datehired
                    },
                    {
                        fieldLabel:'Company',
                        id:'company',
                        value:profile.company
                    },
                    {
                        fieldLabel:'Business Group',
                        id:'biz_group',
                        value:profile.bizgroup
                    },
                    {
                        fieldLabel:'Holding Company',
                        value:profile.holding_company
                    },
                    {
                        fieldLabel:'Department',
                        value:profile.department
                    },
                    {
                        fieldLabel:'Department Group',
                        value:profile.department_group
                    },
                    {
                        fieldLabel:'Position',
                        value:profile.position
                    },
                    {
                        fieldLabel:'Position Level',
                        value:profile.position_level
                    },
                    {
                        fieldLabel:'Account Status',
                        
                    }
                ]
            }
        ]
    })
                

    
});
