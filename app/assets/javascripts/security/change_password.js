Ext.onReady(function(){

    Ext.create('Ext.container.Viewport',{
        layout:{
            type:'vbox',
            align:'center',
            pack:'center'
        },
        items:[
            {
                title:'Change Password',
                xtype:'form',
                id:'password-form',
                defaultType:'textfield',
                minWidth:450,
                bodyStyle:'padding:25px',
                formBind:true,
                defaults:{
                    width:'100%',
                    inputType:'password',
                    allowBlank:false,
                },
                items:[
                    {
                        fieldLabel:'Current Password',
                        name:'current_password',
                        id:'current-password'
                    },
                    {
                        fieldLabel:'New Password',
                        name:'new_password',
                        id:'new-password'
                    },
                    {
                        fieldLabel:'Confirm Password',
                        name:'confirm_password',
                        id:'confirm-password'
                    }
                ],
                tbar:[
                    {
                        iconCls:'save-icon',
                        tooltip:'Save new Password',
                        formBind:true,
                        handler:function(){
                            if(ExtCmp('new-password').getValue() != ExtCmp('confirm-password').getValue()){
                                return notify('Password and Confirmation Password doesn\'t match','warning');
                            }
                            var username = Ext.get('username').getValue().trim();
                            var update_url = '/'+username+'/security/update_password.json';
                            submitForm('password-form',update_url, 'PUT', function(){
                                ExtCmp('password-form').getForm().reset();
                            });
                        }
                    },
                    {
                        iconCls:'reset-icon'
                    }
                ]
            }
        ]
    });
});