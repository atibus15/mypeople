Ext.define('Super.client.Manager',{
	extend:'Ext.grid.GridPanel',
	alias:'widget.clientmanager',
	title:'Client Manager',
	columns:[
		{dataIndex:'id',hideable:false,text:'Client ID', maxWidth:75},
		{dataIndex:'description',hideable:false,text:'Description'},
		{dataIndex:'security_token',text:'Security Token Hash', maxWidth:200},
		{dataIndex:'isactive',text:'Status', maxWidth:50, renderer:icon_status},
		{dataIndex:'createddate',hidden:true, text:'Created Date'},
		{dataIndex:'createdby',hidden:true, text:'Created By'},
		{dataIndex:'lastupdatedate',hidden:true, text:'Last Update'},
		{dataIndex:'lastupdateby',hidden:true, text:'Last Update By'}
	],
	forceFit:true,
	initComponent:function(){
		var me = this;
		Ext.apply(me, {
			tbar:[
				{
					iconCls:'add-icon',
					tooltip:'Add new client',
					handler:function(){
						me.clientEditor();
					}
				},
				{
					iconCls:'update-icon',
					tooltip:'Update client details',
					handler:function(){
						me.updateClient();
					}
				},
				{
					iconCls:'delete-icon',
					tooltip:'Delete Client',
					handler:function(){
						me.deleteClient();
					}
				}
			]
		})
		me.callParent(arguments);
	},
	constructor:function(configs){
		var me = this;
		me.callParent(arguments);
		me.initConfig(configs);
	},
	updateClient:function(){
		var selected  = this.getSelectionModel().getLastSelected();
		if(!selected) return notify('Please Select Client.', 'warning');

		this.clientEditor(selected);
	},
	deleteClient:function(){
		var me =this;
		var selected  = this.getSelectionModel().getLastSelected();
		if(!selected) return notify('Please Select Client.', 'warning');
		deleteRecordViaAjax('/mypclients/'+selected.get('id')+'.json', 'Are you sure you want to delete client?', function(){
			me.store.load();
		});
	},
	submitClient:function(){
		var me  = this;
		var id  = me.client_id;
        var save_url = id ? '/mypclients/'+id : '/mypclients';
        var method = id ? 'PUT' : 'POST';
        submitForm('client_form', save_url+'.json', method,function(){
            me.editor.destroy();
            me.store.load();            
        });
	},
	clientEditor:function(client){
		var me = this;
		me.client_id = client ? client.get('id') : null;

		me.editor = Ext.create('Ext.window.Window',{
			modal:true,
			layout:'fit',
			autoWidth:true,
			tbar:[
				{
					iconCls:'save-icon',
					tooltip:'Save Client',
					handler:function(){
						me.submitClient();
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
					id:'client_form',
					defaultType:'textfield',
					defaults:{
						width:350,
						labelWidth:100
					},
					items:[
						{
							fieldLabel:'Client ID',
							name:'client[id]',
							id:'client-id'
						},
						{
							fieldLabel:'Description',
							name:'client[description]'
						},
						{
							fieldLabel:'Security Token',
							name:'client[security_token]'
						},
						{
							fieldLabel:'Active',
							xtype:'checkboxfield',
							name:'client[isactive]',
							checked:true,
							inputValue:1,
							uncheckedValue:0
						}
					]
				}
			]
		}).show();

		if(client){
			loadRecordToArrayForm(ExtCmp('client_form'), 'client', client);
			ExtCmp('client-id').setReadOnly(true);
		}
	}
});