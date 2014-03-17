Ext.define('People.employee.Grid',{
	extend:'Ext.grid.GridPanel',
	alias:'widget.employeelist',
	columns:[
		{text:'ID No.', dataIndex:'empidno'},
		{text:'Name', dataIndex:'empfullnamelfm'},
		{text:'Badge No.', dataIndex:'empbadgeno'}
	],
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			minWidth:250,
			forceFit:true,
			minHeight:100
		});
		me.callParent(arguments);
	},
	constructor:function(configs){
		this.callParent(arguments);
		this.initConfig(configs);
	}
});

Ext.define('People.employeefilter.List',{
	extend:'People.employee.Grid',
	alias:'widget.employeefilterlist',
	initComponent:function(){
		var me = this;
		Ext.apply(me,{
			minWidth:250,
			forceFit:true,
			minHeight:100,	
			columns:[
				{text:'ID No.', dataIndex:'empidno'},
				{text:'Name', dataIndex:'empfullnamelfm'},
				{text:'Badge No.', dataIndex:'empbadgeno'}
			],
			dockedItems:[
                {
                    dock:'top',
                    xtype:'toolbar',
                    layout:{type:'table',columns:2},
                    items:[
                        {
                            xtype:'combobox',
                            store:createLocalStore(selections.companies),
                            displayField:'desc',
                            valueField:'id',
                            fieldLabel:'Company',
                            labelWidth:65,
                            emptyText:'Company',
                            listeners:{
                                change:function(ci, company_id){
                                    var new_location_data = filterStoreData(selections.locations, {'company_id':company_id});
                                    me.getLocationField().bindStore(createLocalStore(new_location_data));
                                    me.getLocationField().setValue(null);
                                }
                            }
                        },
                        {
                            fieldLabel:'Employee Status',
                            xtype:'peoplecheckbox',
                            checked:true,
                            boxLabel:'Active'
                        },
                        {
                            xtype:'combomodal',
                            emptyText:'Location',
                            group:'company',
                            store:createLocalStore(selections.locations),
                            valueField:'id',
                            displayField:'desc',
                            codeField:'code',
                            changeFn:function(){},
                            fieldLabel:'Location',
                            labelWidth:65
                        },
                        
                        {
                            iconCls:'search-icon',
                            tooltip:'Filter Employee',
                            handler:function(){
                                var status = me.getEmpStatusField().getValue() ? 1 : 0;
                                me.store.load({
                                    params:{
                                        company_id:me.getCompanyField().getValue(),
                                        location_id:me.getLocationField().getValue(),
                                        status:status
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
		});
		me.callParent(arguments);
	},
	constructor:function(configs){
		this.callParent(arguments);
		this.initConfig(configs);
	},
	getTBar:function(){
		return this.getDockedComponent(2);
	},
	getLocationField:function(){
		return this.getTBar().getComponent(2);
	},
	getCompanyField:function(){
		return this.getTBar().getComponent(0)
	},
	getEmpStatusField:function(){
		return this.getTBar().getComponent(1);
	}
});


Ext.define('People.employee.Selector',{
	extend:'Ext.window.Window',
	alias:'widget.employeeselector',
	require:['Ext.form.*', 'Ext.tab.*'],

	initComponent:function(){
		var me = this;
		Ext.define('Filtermodel',{
			extend:'Ext.data.Model',
			fields:[
				'filterkey', 'operator','value'
			]
		});

		var row_editor = Ext.create('Ext.grid.plugin.RowEditing', {clicksToMoveEditor:1, autoCancel:false});

		Ext.apply(me, {
			title:'Select Employees',
			minWidth:600,
			width:900,
			modal:true,
			border:true,
			frame:true,
			autoWidth:true,
			layout:{
				align:'stretch',
				type:'vbox'
			},
			items:[
				{
					xtype:'panel',
					autoHeight:true,
					autoWidth:true,
					minWidth:750,
					width:750,
					margin:'10 5 5 5',
					minHeight:350,
					frame:false,
					border:false,
					bodyStyle:'background-color:transparent;',
					padding:'0 5 5 5',
					layout:{
						type:'hbox'
					},
					items:[
						{
							xtype:'tabpanel',
							width:'47%',
							height:'100%',
							minHeight:250,
							items:[
								{
									title:'Filter',
									xtype:'gridpanel',
									plugins:[row_editor],
									forceFit:true,
									store:Ext.create('Ext.data.Store',{
										model:'Filtermodel',
										data:[],
										proxy:{
											type:'memory'
										}
									}),
									columns:[
										{
											text:'Field',
											dataIndex:'filterkey', 
											editor:{
												editable:false,
												allowBlank:false,
												xtype:'combobox',
												store:['Location Code','ID Number','Lastname'],
												triggerAction:'all'
											} 
											
										},
										{dataIndex:'operator',text:'Operator',editor:{readOnly:true}},
										{dataIndex:'value', editor:{xtype:'textfield', allowBlank:false},text:'Value'}
									],
									dockedItems:[
										{
											dock:'top',
											xtype:'toolbar',
											items:[
												{
													iconCls:'add-icon',
													tooltip:'Add',
													handler:function(){
														row_editor.cancelEdit();
														var new_filter = Ext.create('Filtermodel',{
															filterkey:'',
															operator:'=',
															value:''
														});
														me.getFilterGrid().store.insert(0,new_filter);
														row_editor.startEdit(0,0);
													}
												},
												{
													iconCls:'delete-icon',
													tooltip:'Delete',
													handler:function(){
														var selection = me.getFilterGrid().getSelectionModel().getSelection();
														me.getFilterGrid().store.remove(selection);
													}
												},
												{
													text:'Delete all',
													iconCls:'delete-all-icon',
													tooltip:'Delete All',
													handler:function(){
														me.getFilterGrid().store.removeAll();
													}
												}
											]
										},
										{
											dock:'bottom',
											xtype:'toolbar',
											padding:0,
											defaults:{
												margin:0
											},
											items:[
												{
													text:'Extract Filter',
													handler:function(){
														var selection_grid = me.getEmployeeSelectionGrid();
														var condition_records = me.getFilterGrid().store.getRange();
														var conditions = [];

														Ext.each(condition_records, function(condition){
															conditions.push({
																'filterkey': condition.get('filterkey'),
																'operator':condition.get('operator'),
																'value':condition.get('value')
															});
														});


														selection_grid.store.load({
															params:{
																conditions:Ext.JSON.encode(conditions),
																selector:true
															},
															callback:function(record, operation){
																selection_grid.getDockedComponent(1).getComponent(0).update('Extracted ('+record.length+')');
																me.getFilterTab().setActiveTab(1);
																me.removeSelectedEmployeeFromResult();
															}
														});
													}
												},
												{
													text:'Extract All',
													handler:function(){
														var selection_grid = me.getEmployeeSelectionGrid();
														selection_grid.store.load({
															params:{
																selector:true
															},
															callback:function(record, operation){
																selection_grid.getDockedComponent(1).getComponent(0).update('Extracted ('+record.length+')');
																me.getFilterTab().setActiveTab(1);
																me.removeSelectedEmployeeFromResult();
															}
														});
													}
												}
											]
										}	
									]
								},
								{
									title:'Result',
									xtype:'employeelist',
									id:'employee-result-grid',
									selModel:{
										mode:'SIMPLE',
										allowDeselect:true
									},
									store:me.resultStore,
									id:'employee_selection_grid',
									height:'100%',
									tbar:[
										{
											dock:'top',
											xtype:'box',
											width:'100%',
											style:'text-align:center',
											html:'Extracted (0)'
										}
									],
									listeners:{
										itemdblclick:function(model, record){
											me.getSelectedEmployeeGrid().store.add(record);
											me.resultStore.remove(record);
										}
									}
								}
							]
						},
						{
							xtype:'container',
							layout:'vbox',
							defaultType:'button',
							padding:'50 5 5 5',
							defaults:{
								margin:'5'
							},
							items:[
								{
									iconCls:'include-icon',
									tooltip:'Include Selection',
									handler:function(){
										var selection = me.getEmployeeSelectionGrid().getSelectionModel().getSelection();
										
										me.getSelectedEmployeeGrid().store.add(selection);

										me.getEmployeeSelectionGrid().store.remove(selection);
									}
								},
								{
									iconCls:'exclude-icon',
									tooltip:'Exclude Selection',
									handler:function(){
										var selection = me.getSelectedEmployeeGrid().getSelectionModel().getSelection();
										
										me.getEmployeeSelectionGrid().store.add(selection);

										me.getSelectedEmployeeGrid().store.remove(selection);
									}
								},
								{
									iconCls:'include-all-icon',
									tooltip:'Include All',
									handler:function(){
										var records = me.getEmployeeSelectionGrid().store.getRange();
										
										me.getSelectedEmployeeGrid().store.add(records);

										me.getEmployeeSelectionGrid().store.remove(records);
									}
								},
								{
									iconCls:'exclude-all-icon',
									tooltip:'Exclude All',
									handler:function(){
										var records = me.getSelectedEmployeeGrid().store.getRange();
										
										me.getEmployeeSelectionGrid().store.add(records);

										me.getSelectedEmployeeGrid().store.remove(records);
									}
								}
							]
						},
						{
							title:'Selected Employee/s',
							xtype:'employeelist',
							height:'100%',
							store:me.selectedStore,
							margin:'0 10 0 0',
							selModel:{
								mode:'SIMPLE',
								allowDeselect:true
							},
							width:'47%',
							tbar:[
								{
									xtype:'box',
									html:'Selected (0)',
									width:'100%',
									style:'text-align:center'
								}
							],
							listeners:{
								itemdblclick:function(model, record){
									me.getSelectedEmployeeGrid().store.remove(record);
									me.resultStore.add(record);
								}
							}
						}
					]
				}
			],
			tbar:[
				{
					iconCls:'save-icon',
					tooltip:'Save Changes',
					handler:function(){
						me.saveFn(me);
					}
				}
			],
			listeners:{
				show:function(){
					me.doLayout();
                    me.center();
                    me.getSelectedEmployeeGrid().store.load();
				}
			}
		});
		me.callParent(arguments);
	},
	constructor:function(configs){
		this.callParent(arguments);
		this.initConfig(configs);
	},
	removeSelectedEmployeeFromResult:function(){
		var me = this;
		var selected_employees = me.getSelectedEmployeeGrid().store.getRange();
		var selection_store = me.getEmployeeSelectionGrid().store;
		Ext.each(selected_employees,function(employee){
			var selection_index = selection_store.findExact('id',employee.get('id'));
			console.log(selection_index);
			selection_store.removeAt(selection_index);
		});
	},
	getEmployeeSelectionGrid:function(){
		return this.getComponent(0).getComponent(0).getComponent(1);
	},
	getEmployeeSelectionModel:function(){
		return this.getEmployeeSelectionGrid().getSeLectionModel();
	},
	getSelectedEmployeeGrid:function(){
		return this.getComponent(0).getComponent(2);
	},
	getSelectedEmployeeModel:function(){
		return this.getSelectedEmployeeGrid().getSeLectionModel();
	},
	getEmployeeSelectionGridStore:function(){
		return this.getEmployeeSelectionGrid().getStore();
	},
	getFilterGrid:function(){
		return this.getFilterTab().getComponent(0);
	},
	getFilterTab:function(){
		return this.getComponent(0).getComponent(0);
	}
});