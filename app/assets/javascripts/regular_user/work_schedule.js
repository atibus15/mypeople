Ext.define('People.work.Schedule',{
    extend:'Ext.grid.GridPanel',
    xtype:'workschedule',
    title:'Work Schedule',
    columns:[
        {dataIndex:'skeddatein',    text:'Date In'},
        {dataIndex:'dayintype',     text:'Day In Type'},
        {dataIndex:'skedtimein',    text:'Time In'},
        {dataIndex:'skeddateout',   text:'Date Out'},
        {dataIndex:'dayout',        text:'Day Out'},
        {dataIndex:'skedtimeout',   text:'Time Out'},
        {hidden:true,dataIndex:'flexiearliestin', text:'Earliest In'},
        {hidden:true,dataIndex:'flexilatestin', text:'Latest In'}
    ],
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            
            tbar:[
                {
                    xtype:'datefield',
                    fieldLabel:'Start Date',
                    width:200,
                    labelWidth:60,
                    listeners:{
                        change:function(obj, new_date){
                            me.start_date = new_date;
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
                            me.end_date = new_date;
                        }
                    }
                },
                {
                    iconCls:'search-icon',
                    tooltip:'Search',
                    handler:function(){
                        me.loadStore();
                    }
                }
            ]
        });
        me.callParent(arguments);   
    },
    loadStore:function(){
        var me =this;
        me.store.load({
            params:{
                start_date:me.start_date,
                end_date:me.end_date
            }
        });
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
    }
});

Ext.onReady(function(){
    Ext.create('Ext.container.Viewport',{
        layout:'border',
        items:[
            {
                region:'center',
                forceFit:true,
                xtype:'workschedule',
                store:[]
            }
        ]
    })
})