Ext.onReady(function(){
    var profile = Ext.JSON.decode(Ext.get('profile-data').getValue()).data;
    
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                xtype:'panel',
                title:'Employee Profile',
                layout:'border',
                defaults:{
                    bodyStyle:'padding:25px;'
                },
                items:[
                    {
                        xtype:'panel',
                        minWidth:250,
                        region:'west',
                        bodyStyle:'padding:25px;',
                        border:false,
                        items:[
                            {
                                xtype:'image',
                                src:'http://www.wilerandassociates.com/includes/img/profile_images/no_image.png'
                            },
                            {
                                xtype:'box',
                                html:'<a href="javascript:void(0)" id="change-photo">Change Photo</a>'
                            }
                        ]
                    },
                    {
                        region:'center',
                        xtype:'panel',
                        layout:'form',
                        minWidth:450,
                        border:false,
                        defaultType:'displayfield',
                        defaults:{
                            labelWidth:200,
                            labelStyle:'font-weight:bolder'
                        },
                        items:[
                            {fieldLabel:'ID Number',        value: profile.empidno},
                            {fieldLabel:'Badge Number',     value: profile.empbadgeno},
                            {fieldLabel:'Full Name',        value: profile.empfullnamelfm},
                            {fieldLabel:'Nickname',         value: profile.empnamealias},
                            {fieldLabel:'Date Hired',       value: profile.datehired},
                            {fieldLabel:'Company',          value: profile.company},
                            {fieldLabel:'Business Group',   value: profile.bizgroup},
                            {fieldLabel:'Holding Company',  value: profile.holding_company},
                            {fieldLabel:'Department',       value: profile.department},
                            {fieldLabel:'Department Group', value: profile.department_group},
                            {fieldLabel:'Position',         value: profile.position},
                            {fieldLabel:'Position Level',   value: profile.position_level},
                            {fieldLabel:'Account Status',   value: profile.isactivestatus == 1 ? 'Active' : 'Inactive'}
                        ]
                    }
                    
                ]
            }
        ]
    })
                

    Ext.get('change-photo').on('click',function(){
        Ext.create('People.editor.Window',{
            layout:'fit',
            items:[
                {
                    items:[
                        {
                            fieldLabel:"Photo",
                            xtype:'filefield',
                            name:'photo',
                            width:450,
                            allowBlank:false,
                            editable:false,
                            buttonText:'Select Photo'
                        }
                    ],
                    buttons:[
                        {
                            text:'Upload', 
                            type:'submit', 
                            formBind:true, 
                            handler:function(){
                                var form = this.up('form').getForm();
                                if(!form.isValid()) return notify('Please select Photo.');

                                form.submit({
                                    url:'/employee_photos',
                                    method:'POST',
                                    callback:function(f, action){
                                        console.log(action);
                                    }
                                })
                            }
                        }
                    ]
                }
            ]
        }).show();
    });
});
