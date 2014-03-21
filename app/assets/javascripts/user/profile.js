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
                                xtype:'box',
                                html:'<img id="my-profile-pic" src="/profile_photos/'+profile.id+'">'
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
        var photo_uploader_window = Ext.create('People.editor.Window',{
            layout:'fit',
            enterFn:function(){},
            items:[
                {
                    id:'photo-form',
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
                            formBind:true, 
                            handler:function(){

                                var form = Ext.getCmp('photo-form').getForm();
                                if(!form.isValid())return notify('Please selection Profile Photo.');
                                form.submit({
                                    url:'/profile_photos.json',
                                    method:'post',
                                    params:{
                                        authenticity_token:authToken(),
                                        employee_id:profile.id
                                    },
                                    success:function(form, action){
                                        var response = action.result;
                                        notify(response.notice,'success');
                                        $('#my-profile-pic').attr('src','/profile_photos/'+profile.id+'?v='+response.version);
                                        photo_uploader_window.destroy();
                                    },
                                    failure:function(form, action){
                                        var response = action.result;
                                        notify(response.errormsg,'error');
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
