Ext.define('Client.role.Manager',{
	extend:'Ext.grid.GridPanel',
	alias:'widget.rolemanager',
	columns:[
		{dataIndex:'rolecode', text:'Role Code',maxWidth:125},
		{dataIndex:'description', text:'Description'},
		{dataIndex:'isadmin', text:'Is Admin?', maxWidth:60, renderer:icon_status},
		{dataIndex:'isactive', text:'Status', maxWidth:60,  renderer:icon_status}
	],
	title:'Roles',
	store:createJsonStore('/super_admroles.json', 'id', false),
	initComponent:function(){
		var me = this;
		Ext.apply(me, {
			tbar:[
				{
					iconCls:'add-icon',
					tooltip:'Add New Role',
					handler:function(){
						me.editor();
					}
				},
				{
					iconCls:'update-icon',
					tooltip:'Update Role Details',
					handler:function(){
						me.editSelected();
					}
				},
				{
					iconCls:'delete-icon',
					tooltip:'Delete Role',
					handler:function(){
						me.deleteRole();
					}
				}
			]
		});
		me.callParent(arguments);

		me.on('itemdblclick',function(model, record){
			me.editor(record);
		});
	},
	constructor:function(configs){
		var me = this;
		me.callParent(arguments);
		me.initConfig(configs);

	},
	deleteRole:function(){
		var me = this;
		var selected_role = me.getSelectionModel().getLastSelected();
		if(!selected_role) return notify('Please role to update.', 'warning');

		deleteRecordViaAjax('/super_admroles/'+selected_role.get('id')+'.json', 'Are you sure you to delete role?', function(){
			me.loadStore();
		});
	},
	editSelected:function(){
		var selected_role = this.getSelectionModel().getLastSelected();
		if(!selected_role) return notify('Please role to update.', 'warning');

		this.editor(selected_role);
	},
	save:function(){
		var me  = this;
		var id  = me.role_id;
        var save_url = id ? '/super_admroles/'+id : '/super_admroles';
        var method = id ? 'PUT' : 'POST';
        submitForm('role_form', save_url+'.json', method,function(){
            me.editor_window.destroy();
            me.loadStore();            
        });
	
	},
	editor:function(role){
		var me = this;
		if(!me.client_id) return notify('Please Select Client','warning');
		me.role_id = role ? role.get('id') : null;
		me.editor_window = Ext.create('Ext.window.Window',{
			modal:true,
			layout:'fit',
			title:'Role Editor',
			closeAction:'destroy',
			autoWidth:true,
			tbar:[
				{
					iconCls:'save-icon',
					tooltip:'Save',
					handler:function(){
						me.save();
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
					id:'role_form',
					defaultType:'textfield',
					defaults:{
						width:350,
						labelWidth:100,
						allowBlank:false
					},
					items:[
						{
							fieldLabel:'Client ID',
							name:'role[mypclient_id]',
							readOnly:true,
							value:me.client_id
						},
						{
							fieldLabel:'Role ID',
							name:'role[id]',
							id:'role-id'
						},
						{
							fieldLabel:'Role Code',
							name:'role[rolecode]',
							id:'role-code'
						},
						{
							fieldLabel:'Description',
							name:'role[description]'
						},
						{
							xtype:'checkbox',
							fieldLabel:'Administrator',
							name:'role[isadmin]',
							checked:true,
							inputValue:1,
							uncheckedValue:0
						}
					]
				}
			]
		}).show();

	    if(role)
	    {
	        loadRecordToArrayForm(ExtCmp('role_form'), 'role', role);
	        resetFormOriginalFieldsValue(ExtCmp('role_form'));
	        ExtCmp('role-id').setReadOnly(true);
	        ExtCmp('role-code').setReadOnly(true);
	    }
	},
	setClientID:function(client_id){
		this.client_id = client_id;
	},
	loadStore:function(){
		if(!this.client_id) return notify('Please Select Client');
		this.store.load({
			params:{
				client_id:this.client_id,
			}
		});
	}
});