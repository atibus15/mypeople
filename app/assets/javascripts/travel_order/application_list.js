Ext.onReady(function(){
    Ext.create('Ext.grid.GridPanel',{
        title:'Travel Order Applications',
        height:550,
        padding:'25px',
        renderTo:'my-render-area',
        forceFit:true,
        store:[],
        columns:[
            {text:'File Date', width:25},
            {text:'Destination',width:100},
            {text:'Date From', width:25},
            {text:'Date To',width:25}
        ],
        rbar:[
            {
                xtype:'form',
                width:300,
                layout:'form',
                margin:5,
                border:false,
                frame:false,
                bodyStyle:'background-color:transparent;',
                defaultType:'textarea',
                defaults:{
                    labelAlign:'top',
                    labelStyle:'font-weight:bold; padding:0; font-size:11px;',
                    readOnly:true
                },
                items:[
                    {
                        fieldLabel:'Details of Transport'
                    },
                    {
                        fieldLabel:'Purpose of Travel'
                    },
                    {
                        fieldLabel:'Remarks'
                    },
                    {
                        fieldLabel:'Waiting for',
                        xtype:'textfield'
                    }
                ]
            }
        ],
        tbar:[
            {
                fieldLabel:'Status',
                xtype:'combobox',
                name:'ot_status',
                id:'ot_status',
                store:[['P','Pending'],['A','Approve'],['D','Disapproved']],
                value:'P',
                width:200,
                labelWidth:50
            },
            {
                fieldLabel:'Filedate',
                xtype:'datefield',
                name:'filedate_from',
                id:'filedate_from',
                maxValue:_today_date,
                emptyText:'from',
                width:200,
                labelWidth:50
            },
            {
                xtype:'datefield',
                name:'filedate_to',
                id:'filedate_to',
                maxValue:_today_date,
                emptyText:'to',
                width:150
            },
            {
                xtype:'button',
                text:'Show',
                name:'filter',
                id:'filter',
                handler:function(){

                }
            },
            {
                text:'File Travel Order',
                handler:function(){
                    loadScript('/assets/travel_order/new.js');
                    travelOrderApplication();
                }
            }
        ]
    });
});
