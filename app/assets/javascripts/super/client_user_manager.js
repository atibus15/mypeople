Ext.define('Client.user.Manager',{
	extend:'Ext.grid.GridPanel',
	alias:'widget.usermanager',
	columns:[
		{dataIndex:'username', text:'Username'},
		{dataIndex:'isactive', text:'Active?',  renderer:icon_status},
		{dataIndex:'islocked', text:'Locked?', renderer:icon_status}
	],
	store:createJsonStore('/super_user_accounts.json?is_admin=1', 'username', false),
	initComponent:function(){
		var me = this;
		
		Ext.apply(me, {

			tbar:[
				{
					iconCls:'add-icon',
					tooltip:'Add New Administrator',
					handler:function(){
						me.adminEditor();
					}
				},
				{
					iconCls:'update-icon',
					tooltip:'Update Administrator Details',
					handler:function(){
						me.editSelected();
					}
				},
				{
					iconCls:'delete-icon',
					tooltip:'Delete User',
					handler:function(){
						me.deleteRecord();
					}
				}
			]
		});
		me.callParent(arguments);
		me.on('itemdblclick',function(model, record){
			me.adminEditor(record);
		});
	},
	constructor:function(configs){
		var me =this;
		me.callParent(arguments);
		me.initConfig(configs);
	},
	setClientID:function(client_id){
		this.client_id = client_id;
	},
	loadStore:function(){
		if(!this.client_id) return notify('Please Select Client');
		this.store.load({
			params:{
				client_id:this.client_id
			}
		});
	},
	validatePassword:function(){
		var me = this;
		var password = Ext.getCmp('user-password').getValue();
		var password_confirm = Ext.getCmp('confirm-password').getValue();

		return (password == password_confirm);
	},
	saveUser:function(){
		var me  = this;
		var id  = me.user_id;

		if(!me.validatePassword())return notify('Password confirmation doesn\'t match.', 'warning');

        var save_url = id ? '/super_user_accounts/'+id : '/super_user_accounts';
        var method = id ? 'PUT' : 'POST';
        submitForm('user_account_form', save_url+'.json', method,function(){
            me.editor.destroy();
            me.loadStore();            
        });
	},
	editSelected:function(){
		var me = this;
		var selected = me.getSelectionModel().getLastSelected();
		if(!selected) return notify('Please select record.', 'warning');
		me.adminEditor(selected);
	},
	deleteRecord:function(){
		var me = this;
		var record = me.getSelectionModel().getLastSelected();
		if(!record) return notify('Please select record.',' warning');

		deleteRecordViaAjax('/super_user_accounts/'+record.get('id')+'.json', 
			'Are you sure you want to delete this user?', 
			function(){
				me.loadStore();
			}
		);
	},
	adminEditor:function(user){
		var me = this,
		roles = createLocalDataFromServer('/super_admroles.json?client_id='+me.client_id+'&is_admin=1');
		me.user_id = user ? user.get('id') : null;

		console.log(roles);
		me.editor = Ext.create('Ext.window.Window',{
			modal:true,
			layout:'fit',
			title:'Client Administrator Manager',
			autoWidth:true,
			tbar:[
				{
					iconCls:'save-icon',
					tooltip:'Save',
					handler:function(){
						me.saveUser();
					}
				}
			],
			items:[
				{
					xtype:'form',
					margin:10,
					frame:false,
					border:false,
					bodyStyle:'background-color:transparent;',
					id:'user_account_form',
					defaultType:'textfield',
					defaults:{
						width:350,
						labelWidth:100,
						allowBlank:false
					},
					items:[
						{
							fieldLabel:'Client ID',
							name:'account[mypclient_id]',
							readOnly:true,
							value:me.client_id
						},
						{
							fieldLabel:'Username',
							name:'account[username]',
							id:'user-name'
						},
						{
							fieldLabel:'Password',
							name:'account[userpasswd]',
							inputType:'password',
							id:'user-password'
						},
						{
							fieldLabel:'Confirm Password',
							name:'confirm-password',
							inputType:'password',
							id:'confirm-password'
						},
						{
							xtype:'checkboxgroup',
							fieldLabel:'Roles',
							columns:1,
							id:'user-roles-group',
							vertical:true,
							items:[]

						}
					]
				}
			]
		}).show();

		Ext.each(roles.data,function(role){
			ExtCmp('user-roles-group').add({
				boxLabel:role.description,
				name:'userroles[]',
				inputValue:role.id,
				value:role.id,
				id:'role-'+role.id
			});
		});
		if(user){
			ExtCmp('user-name').setValue(user.get('username'));
			Ext.each(user.get('roles'),function(user_role){
				ExtCmp('role-'+user_role.admuserrole_id.trim()).setValue(true);
			});
		}
	}
});