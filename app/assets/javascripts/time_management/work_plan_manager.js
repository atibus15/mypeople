//= require components/combo_modal
//= require_self
var selections = createLocalDataFromServer('/client/default_selections.json');
var work_patterns = createLocalDataFromServer('/workskedpatterns/setupList.json');

Ext.define('People.workplan.Grid',{
	extend:'Ext.grid.GridPanel',
	alias:'widget.workplangrid',
	require:['Ext.window.*'],
	initComponent:function(){
		var me = this;
		Ext.apply(me, {
			columns:[
				{dataIndex:'skeddatein', 	text:'Date In'},
				{dataIndex:'dayin', 		text:'Day In'},
				{dataIndex:'dayintype', 	text:'Day In Type'},
				{dataIndex:'skedtimein', 	text:'Time In'},
				{hidden:true,dataIndex:'flexiearliestin', text:'Earliest In'},
				{dataIndex:'skeddateout', 	text:'Date Out'},
				{dataIndex:'dayout', 		text:'Day Out'},
				{dataIndex:'dayouttype', 	text:'Day Out Type'},
				{dataIndex:'skedtimeout', 	text:'Time Out'},
				{hidden:true,dataIndex:'flexilatestin', text:'Latest In'},
				{dataIndex:'workskedcategory_id', text:'Category Code'},
				{dataIndex:'policy_code', 	text:'Policy Code'}
			],
			tbar:[
				{
					xtype:'datefield',
					fieldLabel:'Start Date',
					width:200,
					labelWidth:60,
					listeners:{
						change:function(obj, new_date){
							me.setStartDate(new_date);
						}
					}
				},
				{
					xtype:'datefield',
					fieldLabel:'End Date',
					width:200,					
					labelWidth:60,
					listeners:{
						change:function(obj, new_date){
							me.setEndDate(new_date);
						}
					}
				},
				{
					iconCls:'search-icon',
					tooltip:'Search',
					handler:function(){
						me.loadWorkPlans();
					}
				},
				{
					iconCls:'update-icon',
					tooltip:'Update Selections',
					handler:function(){
						me.showEditor();
					}
				}
			]
		});
		me.callParent(arguments);	
	},
	loadWorkPlans:function(){
		var me = this;
		var start_date = me.start_date,
		end_date = me.end_date,
		company_id = me.company_id,
		id_number = me.id_number;
		if(!company_id || !id_number){
			notify('Please select Employee.', 'warning');
			return false;
		}
		if(!start_date || !end_date){
			notify('Please Set Date Range.', 'warning');
			return false;
		}

		me.store.load({
			params:{
				company_id:company_id,
				id_number:id_number,
				start_date:start_date,
				end_date:end_date
			},
			callback:function(records){
				me.pushRecordByDateRange(records);
			}
		});

		
	},
	pushRecordByDateRange:function(records){
		var employee = this.employee;
		var my_store = this.store;
		var start_date = new Date(this.start_date);
		var end_date = new Date(this.end_date);
		
		
		Ext.define('Workplan',{
			extend:'Ext.data.Model',
			fields:[
				{name:'company_id'},
				{name:'createdby'},
				{name:'createddate'},
				{name:'dayin'},
				{name:'dayintype'},
				{name:'dayout'},
				{name:'dayouttype'},
				{name:'empidno'},
				{name:'id'},
				{name:'lastupdateby'},
				{name:'lastupdatedate'},
				{name:'mypclient_id'},
				{name:'skeddatein'},
				{name:'skeddateout'},
				{name:'skedtimein'},
				{name:'flexiearliestin'},
				{name:'skedtimeout'},
				{name:'flexilatestin'},
				{name:'w_sked_pattern_id'},
				{name:'workskedcategory_id'},
				{name:'workskedpolicy_id'},
				{name:'policy_code'}
			]
		});

		new_records = new Array();
		while(!Ext.Date.isEqual(start_date, end_date)){
			var date_in 	= Ext.util.Format.date(start_date, 'm/d/Y');

			if(my_store.find('skeddatein', date_in) < 0)
			{
				var day_in_name = Ext.util.Format.date(new Date(date_in), 'l');
				var day_in_type = employee.get(day_in_name.toLowerCase());
				var time_in 	= Ext.util.Format.date(employee.get('requiredtimein'),'g:i A');
				var time_out 	= Ext.util.Format.date(employee.get('requiredtimeout'),'g:i A');
				var time_in_24 	= parseInt(Ext.util.Format.date(employee.get('requiredtimein'),'G'));
				var time_out_24 = parseInt(Ext.util.Format.date(employee.get('requiredtimeout'),'G'));

				if(time_out_24 < time_in_24){
					date_out = Ext.Date.add(new Date(date_in), Ext.Date.DAY, 1);
					day_out_name = Ext.util.Format.date(new Date(date_out), 'l');
					day_out_type = employee.get(day_out_name.toLowerCase());
				}else{
					date_out = date_in;
					day_out_name = day_in_name;
					day_out_type = day_in_type
				}

				var new_model = Ext.create('Workplan',{
					company_id			:employee.get('company_id'),
					dayin 				:day_in_name,
					dayintype			:day_in_type,
					dayout 				:day_out_name,
					dayouttype			:day_out_type,
					empidno				:employee.get('empidno'),
					mypclient_id 		:employee.get('mypclient_id'),
					skeddatein 			:date_in,
					skeddateout 		:date_out,
					skedtimein 			:time_in,
					skedtimeout 		:time_out,
					flexiearliestin 	:Ext.util.Format.date(new Date(employee.get('flexiearliestin')), 'g:i A'),
					flexilatestin 		:Ext.util.Format.date(new Date(employee.get('flexilatestin')), 'g:i A'),
					w_sked_pattern_id	:employee.get('w_sked_pattern_id'),
					workskedcategory_id :employee.get('workskedcategory_id'),
					workskedpolicy_id 	:employee.get('workskedpolicy_id'),
					policy_code 		:employee.get('policycode')
				});

				new_records.push(new_model);
			}
			
			start_date = Ext.Date.add(new Date(start_date), Ext.Date.DAY, 1);
		}
		my_store.add(new_records);
	},
	setEmployee:function(new_employeee){
		this.employee = new_employeee;
		this.company_id = this.employee.get('company_id');
		this.id_number = this.employee.get('empidno');
		this.workskedcategory_id = this.employee.get('workskedcategory_id');

		this.reconfigureGridColumns();
	},
	reconfigureGridColumns:function(){
		var grid_columns = this.getDockedComponent(1);
		if(this.workskedcategory_id == 'FLX'){
			grid_columns.getHeaderAtIndex(4).show();
			grid_columns.getHeaderAtIndex(9).show();
			grid_columns.getHeaderAtIndex(3).hide();
			grid_columns.getHeaderAtIndex(5).hide();
			grid_columns.getHeaderAtIndex(6).hide();
			grid_columns.getHeaderAtIndex(7).hide();
			grid_columns.getHeaderAtIndex(8).hide();
		}else{
			grid_columns.getHeaderAtIndex(4).hide();
			grid_columns.getHeaderAtIndex(9).hide();
			grid_columns.getHeaderAtIndex(3).show();
			grid_columns.getHeaderAtIndex(5).show();
			grid_columns.getHeaderAtIndex(6).show();
			grid_columns.getHeaderAtIndex(7).show();
			grid_columns.getHeaderAtIndex(8).show();
		}
	},
	setStartDate:function(new_start_date){
		this.start_date = String(Ext.util.Format.date(new_start_date,'m/d/Y'));
	},
	setEndDate:function(new_end_date){
		this.end_date = String(Ext.util.Format.date(new_end_date,'m/d/Y'));
	},
	setPattern:function(pattern){
		this.sked_pattern = pattern;
	},
	setDayType:function(new_day_type){
		this.day_type = new_day_type;
	},
	constructor:function(configs){
		var me = this;
		me.callParent(arguments);
		me.initConfig(configs);

		me.on('itemdblclick',function(model, record){
			if(me.isAdmin){
				model.select(record);
				me.showEditor();
			}
		});
	},
	consolidateWorkPlan:function(){
		var 
		me = this,
		new_work_plans 	= [],
		selections 		= me.getSelectionModel().getSelection(),
		pattern  		= me.sked_pattern;
		pattern_id 		= pattern.get('id'),
		pattern_code 	= pattern.get('patterncode'),
		time_in 		= pattern.get('timein'),
		time_out 		= pattern.get('timeout'),
		time_in_24 		= parseInt(Ext.util.Format.date(Ext.Date.parse(time_in, 'g:i A'), 'G')),
		time_out_24 	= parseInt(Ext.util.Format.date(Ext.Date.parse(time_out, 'g:i A'), 'G'));


		Ext.each(selections, function(work_plan){
			var date_in 	= work_plan.get('skeddatein');
			var day_in_name = Ext.util.Format.date(new Date(date_in), 'l');
			var day_in_type = me.employee.get(day_in_name.toLowerCase());

			if(time_out_24 < time_in_24){
				date_out 	 = Ext.Date.add(new Date(date_in), Ext.Date.DAY, 1);
				day_out_name = Ext.util.Format.date(new Date(date_out), 'l');
				day_out_type = me.employee.get(day_out_name.toLowerCase());
			}else{
				date_out 	 = date_in;
				day_out_name = day_in_name;
				day_out_type = day_in_type;
			}

			var new_plan = {
				'id' 				: work_plan.get('id'),
				'company_id'		: me.company_id,
				'empidno' 			: me.id_number,
				'w_sked_pattern_id' : pattern_id,
				'skeddatein' 		: new Date(date_in),
				'dayintype' 		: day_in_type,
				'skedtimein' 		: time_in,
				'skeddateout' 		: new Date(date_out),
				'dayouttype' 		: day_out_type,
				'skedtimeout' 		: time_out,
				'workskedcategory_id': work_plan.get('workskedcategory_id'),
				'workskedpolicy_id'	: work_plan.get('workskedpolicy_id')
			};
			new_work_plans.push(new_plan);
		});
		return new_work_plans;
		
	},
	saveWorkPlan:function(){
		var me = this;
		var work_plan_model;
		if(!me.sked_pattern) return notify('Please select new Work Pattern.','warning');
		// if(!me.day_type) return notify('Please select Day Type', 'warning');

		var new_work_plans = me.consolidateWorkPlan();


		Ext.Ajax.request({
			url:'/work_plan_manager/update_work_plan.json',
			method:'POST',
			params:{
				authenticity_token:authToken(),
				workplans:Ext.JSON.encode(new_work_plans)
			},
			callback:function(success, opt, result){
				var response = Ext.JSON.decode(result.responseText);
				if(response.success){
					notify(response.notice ,'success');

					Ext.each(new_work_plans, function(work_plan){
						work_plan_model = me.store.findRecord('skeddatein', Ext.util.Format.date(work_plan.skeddatein, 'm/d/Y'));
						$.map(work_plan, function(value,key){
							work_plan_model.set(key, value);
						});
					});
				}
				else{
					return notify(response.errormsg, 'warning');
				}
			}
		})
	},
	showEditor:function(){
		
		var me = this;
		
		var selected_models = me.getSelectionModel().getSelection();
		
		var patterns = filterStoreData(work_patterns, {'company_id':me.company_id, 'workskedcategory_id':me.workskedcategory_id});

		var pattern_store = createLocalStore(patterns);

		var date = (selected_models.length > 1) ? 'Multiple Dates' : selected_models[0].get('skeddatein');

		me.editor_window = Ext.create('Ext.window.Window',{
			title:'Work Schedule Editor',
			width:300,
			autoHeight:true,
			layout:'fit',
			frame:true,
			border:true,
			modal:true,
			tbar:[
				{
					iconCls:'save-icon',
					tooltip:'Update records',
					handler:function(){
						me.saveWorkPlan();
					}
				}
			],
			items:[
				{
					xtype:'container',
					layout:'form',
					padding:10,
					items:[
						{
							xtype:'displayfield',
							fieldLabel:'Date',
							value:date
						},
						{
							fieldLabel:'Schedule Pattern',
							xtype:'combomodal',
							store:pattern_store,
							valueField:'id',
							displayField:'description',
							codeField:'patterncode',
							changeFn:function(cmp, new_value){
								var new_pattern = cmp.findRecordByValue(new_value);
								me.setPattern(new_pattern);
							}
						},
						{
							fieldLabel:'Day Type',
							xtype:'combobox',
							valueField:'id',
							displayField:'description',
							editable:false,
							triggerAction:'all',
							store:createJsonStore("/company/"+me.company_id+"/day_types.json", 'id', false),
							listeners:{
								change:function(cmp, new_type){
									me.setDayType(new_type);
								}
							}
						}
					]
				}
				
			]
		});

		me.editor_window.show();
	},
});


Ext.define('People.workplan.Manager',{
	extend:'Ext.panel.Panel',
	alias:'widget.workplanmanager',
	initComponent:function(){
		var me = this;
		Ext.apply(me, {
			layout:'border',
			items:[
				{
					region:'west',
					xtype:'gridpanel',
					title:'Employees',
					store:createJsonStore('/work_plan_manager/employees.json', 'empidno', false, 'total_employee'),
					width:'35%',
					height:'100%',
					collapsible:true,
					split:true,
					forceFit:true,
					columns:[
						{text:'ID No.', dataIndex:'empidno', maxWidth:65},
						{text:'Full Name', dataIndex:'empfullnamelfm'},
						{text:'Schedule Code', dataIndex:'workskedcode'},
						{text:'Policy Code', dataIndex:'policycode'}
					],
					listeners:{
						select:function(model, record, index){
							me.getWorkPlanGrid().setEmployee(record);
						}
					},
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
		                                    var location_cmp = ci.findParentByType('toolbar').getComponent(2);
		                                    location_cmp.bindStore(createLocalStore(new_location_data));
		                                    location_cmp.setValue(null);
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
		                            	var emp_grid = this.findParentByType('gridpanel');
		                            	var my_toolbar = this.findParentByType('toolbar');
		                                var status = my_toolbar.getComponent(1).getValue() ? 1 : 0;
		                                var company_id = my_toolbar.getComponent(0).getValue();
		                                var location_id = my_toolbar.getComponent(2).getValue();
		                                emp_grid.store.load({
		                                    params:{
		                                        company_id:company_id,
		                                        location_id:location_id,
		                                        status:status
		                                    }
		                                });
		                            }
		                        }
		                    ]
		                },
		                {
			                xtype:'pagingtoolbar',
			                store: me.store,   
			                dock: 'bottom',
			                displayInfo: true
			            }
		            ]
				},
				{
					xtype:'workplangrid',
					title:'Work Plan',
					region:'center',
					autoScroll:true,
					forceFit:true,
					isAdmin:true,
					selModel:{
						mode:'SIMPLE',
						allowDeselect:true
					},
					store:createJsonStore('/work_plan_manager/employee_work_plan.json','id',false),
				}
			]
		});
		me.callParent(arguments);
	},
	constructor:function(configs){
		this.callParent(arguments);
		this.initConfig(configs);
	},
	getWorkPlanGrid:function(){
		return this.getComponent(2);
	}
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items: [
            {
                region:'center',
                title:'Work Plan Manager',
                xtype:'workplanmanager'
            }
        ]
    });
});