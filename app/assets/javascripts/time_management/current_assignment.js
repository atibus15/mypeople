
Ext.define('People.currentassignment.Grid',{
    extend:'Ext.grid.GridPanel',
    xtype:'currentassignmentgrid',
    forceFit:true,
    columns:[
        {maxWidth:75,text:'ID No.', dataIndex:'empidno'},
        {text:'Name', dataIndex:'empfullnamelfm'},
        {text:'Badge No.', dataIndex:'empbadgeno', hidden:true},
        {text:'Location', dataIndex:'location'}
    ],
    initComponent:function(){
        var me = this;

        Ext.apply(me, {
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    layout:{type:'table', columns:2},
                    items:[
                        {
                            colspan:2,
                            id:'current-assignment-company',
                            fieldLabel:'Company',
                            xtype:'combobox',
                            valueField:'code',
                            displayField:'desc',
                            labelWidth:65,
                            width:300,
                            store:createJsonStore('/companies/admin_selection','id',true)
                        },
                        {
                            id:'current-assignment-name',
                            fieldLabel:'Search',
                            xtype:'textfield',
                            labelWidth:65,
                            width:300,
                            enableKeyEvents:true,
                            listeners:{
                                keyup:function(){
                                    var name = this.getValue();
                                    var company = Ext.getCmp('current-assignment-company').getValue();
                                    if(name.length >= 3 && company){
                                        me.loadStore();
                                    }
                                }
                            }
                        },
                        {
                            iconCls:'view-icon',
                            tooltip:'View Currently Assigned Employee per Company',
                            handler:function(){
                                me.loadStore();
                            }
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    },
    loadStore:function(){
        var me = this;
        var company_id = Ext.getCmp('current-assignment-company').getValue();
        var name = Ext.getCmp('current-assignment-name').getValue();
        if(!company_id) return notify('Please select Company.', 'warning');
        me.store.load({
            params:{
                company_id :company_id,
                name:name
            },
            callback:function(){

            }
        });
    }
});