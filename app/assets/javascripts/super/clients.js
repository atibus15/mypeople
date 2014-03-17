//= require_self
//= require_tree .

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport',{
		layout:'border',
		renderTo:'my-render-area',
		items:[
			{
				region:'center',
				xtype:"clientmanager",
				id:'client-manager-grid',
				store:createJsonStore('/mypclients.json', 'id', true)
			},
			{
				region:'east',
				xtype:'container',
				layout:'border',
				width:'60%',
				split:true,
				items:[
					{
						split:true,
						forceFit:true,
						width:'65%',
						region:'west',
						id:'role-manager-grid',
						xtype:'rolemanager',
						collapsible:true
					},
					{
						region:'center',
						forceFit:true,
						width:'35%',
						id:'client-admin-grid',
						title:'Client User Accounts',
						xtype:'usermanager'
					}
				]
			}
		]
	});

	var client_admin_grid = Ext.getCmp('client-admin-grid');
	var client_manager_grid = Ext.getCmp('client-manager-grid');
	var role_manager_grid = Ext.getCmp('role-manager-grid');
	client_manager_grid.on('itemclick',function(model, record){
		var client_id = record.get('id');
		client_admin_grid.setClientID(client_id);
		role_manager_grid.setClientID(client_id);
	});
	client_manager_grid.on('selectionchange',function(model, record){
		client_admin_grid.store.removeAll();
		role_manager_grid.store.removeAll();
	});
	client_manager_grid.on('itemdblclick', function(model, record){
		client_admin_grid.loadStore();
		role_manager_grid.loadStore();
	});
});