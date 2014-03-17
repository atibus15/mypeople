var selections = createLocalDataFromServer('/client/default_selections');
var currency_renderer = function(v){
    var f_val = parseFloat(v);
    if(v < 0){
        return '('+String(Ext.util.Format.number(Math.abs(f_val),'0,000.00'))+')';
    }else{
        return String(Ext.util.Format.number(f_val,'0,000.00'));
    }
}
Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
        layout: 'border',
        autoRender:'my-render-area',
        items:[
        	{
        		region:'west',
        		title:'Payroll Files',
        		width:350,
        		split:true,
        		collapsible:true, 
        		xtype:'listgrid',
        		tbar:[
        			{
        				fieldLabel:'Company',
        				xtype:'combobox',
        				displayField:'desc',
        				valueField:'id',
        				queryMode:'local',
        				triggerAction:'all',
        				editable:false,
        				labelWidth:65,
        				width:250,
        				store:createLocalStore(selections.companies)
        			},
        			{
        				iconCls:'search-icon'
        			},
                    {
                        iconCls:'add-icon',
                        handler:function(){
                            Ext.create('People.pyeditor.Window').show();
                        }
                    },
                    {
                        iconCls:'update-icon'
                    },
                    {
                        iconCls:'delete-icon'
                    }
        		],
        		columns:[
        			{text:'File Code', dataIndex:'field1'},
        			{text:'Description', dataIndex:'field2'},
        			{text:'Posted', dataIndex:'field3'}
        		],
                store:[['20140115','NOKIA INC.', 'NOKIA INC. January 15 Payroll']],
                bbar:[
                    {
                        fieldLabel:'Search',
                        xtype:'textfield',
                        width:'90%',
                        labelWidth:50
                    },
                    {
                        iconCls:'search-icon'
                    }
                ]
        	},
	        {
	        	region:'center',
	        	title:'Employees',
	        	xtype:'gridpanel',
	        	// split:true,
	        	width:500,
	        	// forceFit:true,
	        	store:createJsonStore('/employee/list.json', 'empidno', true, 'total_employee'),
	        	columns:[
			        {text:'ID No.', dataIndex:'empidno', width:75},
                    {text:'Full Name', dataIndex:'empfullnamelfm', width:150},
			        {text:'Date Hired', dataIndex:'datehired', renderer:function(v){return Ext.util.Format.date(v, 'm/d/Y')}, width:150},
			        {text:'Company', dataIndex:'company_desc', width:150},
			        {text:'Department', dataIndex:'department_desc', width:150},
			        {text:'Position', dataIndex:'position_desc', width:150}
		        ]
	        },
	        {
	        	region:'east',
	        	xtype:'tabpanel',
	        	collapsible:true,
	        	colapseMode:'header',
	        	split:true,
	        	width:'50%',
	        	minWidth:150,
	        	collapsed:false,
	        	autoScroll:true,
	        	title:'Payroll Details',
	        	items:[
	        		{
	        			title:'Summary',
	        			xtype:'gridpanel',
                        columns:[
                            { text:'PY Code', dataIndex:'pycode', summaryRenderer:function(){return '<b>TOTAL:</b>'}},
                            { text:'Description',dataIndex:'description'},
                            { text:'Amount', dataIndex:'amount', summaryType:'sum' , renderer:currency_renderer,
                                summaryRenderer:function(v){
                                    return '<b>'+currency_renderer(v)+'</b>';
                                }
                            },
                            {text:'Remarks', dataIndex:'remarks'}
                        ],
                        features:[Ext.create('Ext.grid.feature.GroupingSummary',{groupHeaderTpl:'{name} : {rows.length} Item/s'})],
                        forceFit:true,
                        height:150,
                        width:'100%',
                        store:Ext.create('Ext.data.Store',{
                            fields:[{name:'group'},{name:'pycode'},{name:'description'},{name:'amount'}],
                            data:[
                                { group: 'Basic Earnings', pycode:'BASICPAY', description:'BASIC PAY',amount:12000.00},
                                { group: 'Basic Earnings', pycode:'TARDY',    description:'TARDY', amount:-31.63},
                                { group: 'Basic Earnings', pycode:'OTSP',   description:'OT SPECIAL', amount:90.57},
                                { group: 'Basic Earnings', pycode:'OTLG', description:'OT LEGAL', amount:766.72},         
                                { group: 'Statutory Deductions', pycode:'SSS',  description:'SSS PREMIUM',amount:-399.70},
                                { group: 'Statutory Deductions', pycode:'PAG',   description:'HDMF PREMIUM',amount:-100.00},
                                { group: 'Statutory Deductions', pycode:'PHLT', description:'PHILHEALTH PREMIUM', amount:-125.00},
                                { group: 'Other Deduction', pycode:'EMPSHARE', description:'Employee Share', amount:-250.00},
                                { group: 'Other Deduction', pycode:'HDMFLOAN', description:'PagIbig Loan', amount:-875.25},
                                { group: 'Other Deduction', pycode:'COMPLOAN', description:'Company Loan', amount:-485.55}
                            ],
                            listeners:{
                                load:function(){
                                    this.group('group');
                                }
                            }
                        }),
                        listeners:{
                            afterrender:function(){
                                console.log(this.store);
                            },
                            itemclick:function(vie, s){
                                console.log(s);
                            }
                        },
                        dockedItems:[
                            {
                                dock:'right',
                                xtype:'panel',
                                title:'Totals',
                                width:150,
                                defaultType:'textfield',
                                defaults:{
                                    margin:'10 10 0 15',
                                    labelAlign:'top',
                                    labelStyle:'margin:15 0 -25 0; padding:0; font-weight:bolder;',
                                    readOnly:true
                                },
                                items:[
                                    {
                                        fieldLabel:'GROSS TAXABLE',
                                        value:'12,825.66',
                                        fieldStyle:'background-image:none; background-color:#FF8533; color:#fff; font-weight:bold;'
                                    },
                                    {
                                        fieldLabel:'NET TAXABLE',
                                        value:'12,200.96',
                                        fieldStyle:'background-image:none; background-color:#FF6600; color:#fff;  font-weight:bold;'
                                    },
                                    {
                                        fieldLabel:'WITHHOLDING TAX',
                                        value:'769.36',
                                        fieldStyle:'background-image:none; background-color:#FFFF66; color:#000;  font-weight:bold;'
                                    },
                                    {
                                        fieldLabel:'TOTAL DEDUCTIONS',
                                        value:'1,394.06',
                                        fieldStyle:'background-image:none; background-color:#FFD119; color:#000;  font-weight:bold;'
                                    },
                                    {
                                        fieldLabel:'TOTAL GROSS',
                                        value:'10,806.90',
                                        fieldStyle:'background-image:none; background-color:#98CCFF; color:#000;  font-weight:bold;'

                                    },
                                    {
                                        fieldLabel:'NET PAY',
                                        value:'10,806.90',
                                        fieldStyle:'background-image:none; background-color:#70C670; color:#000;  font-weight:bold;'
                                    }
                                ]
                            }   
                        ]
	        		},
	        		{
	        			title:'Attendance',
	        			xtype:'listgrid',
	        			columns:[
	        				{dataIndex:'field1',text:'Date'},
	        				{dataIndex:'field2',text:'Item Code'},
	        				{dataIndex:'field3',text:'Description'},
	        				{dataIndex:'field4',text:'Item Value'},
	        				{dataIndex:'',text:'Remarks'}
	        			],
                        store:[
                            ['1/3/2014', 'HRSWORK', 'HOURS WORKED',7.92],             
                            ['1/3/2014', 'TARDY',  'TARDY', 0.08],
                            ['1/6/2014', 'HRSWORK', 'HOURS WORKED', 8.00],
                            ['1/7/2014', 'HRSWORK', 'HOURS WORKED', 8.00],
                            ['1/8/2014', 'HRSWORK', 'HOURS WORKED', 8.00],
                            ['1/9/2014', 'HRSWORK', 'HOURS WORKED', 8.00],
                            ['1/10/2014','HRSWORK', 'HOURS WORKED', 8.00],  
                        ]
	        		},
	        		{
	        			title:'Emp. Benefits',
	        			xtype:'listgrid',
	        			columns:[
	        				{text:'Benefit Code'},
	        				{text:'Description'},
	        				{text:'Amount'},
	        				{text:'Start Date'},
	        				{text:'End Date'},
	        				{text:'Taxable?'},
	        				{text:'Subject To AUT?'}
	        			]
	        		},
                    {
                        title:"Emp. Loans",
                        xtype:'listgrid',
                        columns:[
                            {text:'Loan Code'},
                            {text:'Description'},
                            {text:'Loan Balance'},
                            {text:'Loan Payment'},
                            {text:'Remarks'}

                        ]
                    },
	        		{
	        			title:'Trans-Recurring',
	        			xtype:'listgrid',
	        			columns:[
	        				{text:'Item Code'},
	        				{text:'Description'},
	        				{text:'Amount'},
	        				{text:'Remarks'}
	        			]
	        		},
	        		{
	        			title:'Trans-Adjustment',
	        			xtype:"listgrid",
	        			columns:[
	        				{text:'Item Code'},
	        				{text:'Description'},
	        				{text:'Hours'},
	        				{text:'Amount'},
	        				{text:'Remarks'}
	        			]
	        		},
	        		{
	        			title:'Trans-One-Time',
	        			xtype:"listgrid",
	        			columns:[
	        				{text:'Item Code'},
	        				{text:'Description'},
	        				{text:'Amount'},
	        				{text:'Remarks'}
	        			]
	        		}
	        	]
	        },
	        {
	        	region:'south',
	        	title:'<font color="red">Exceptions</font>',
	        	split:true,
	        	collapsible:true,
                forceFit:true,
	        	xtype:'gridpanel',
	        	height:100,
	        	minHeight:100,
	        	store:[],
	        	columns:[
	        		{text:'ID No.', maxWidth:100},
	        		{text:'Name', minWidth:200},
	        		{text:'Remarks'}
	        	]
	        }
        ]
    });
});