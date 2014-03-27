Ext.define('People.attendance.Transactions',{
    extend:'Ext.grid.GridPanel',
    require:['Ext.form.*', 'Ext.grid.*'],
    alias:'widget.attendancetrans',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            dockedItems:[
                {
                    dock:'left',
                    border:false,
                    frame:false,
                    xtype:'gridpanel',
                    viewConfig:{
                        overItemCls:'selection_over'
                    },
                    store:Ext.create('Ext.data.Store',{
                        fields:['code', 'source'],
                        data:{
                            'data':[
                                {'code':'ot', 'source':'Overtime'},
                                {'code':'loa', 'source':'LOA'},
                                {'code':'dirlog', 'source':'DIR LOG'}
                            ]
                        },
                        proxy:{
                            type:'memory',
                            reader:{
                                type:'json',
                                root:'data'
                            }
                        }
                    }),
                    columns:[
                        {text:'<b>Selections</b>', dataIndex:'source', width:150}
                    ]
                }
            ],
            store:[],
            columns:[],
        });
        me.callParent(arguments);
    },
    constructor:function(configs){
        this.callParent(arguments);
        this.initConfig(configs);
    }
});


Ext.define('People.timecard.Manager',{
    extend:'Ext.grid.GridPanel',
    alias:'widget.timecardmanager',
    require:['Ext.grid.*'],
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            width:'65%', 
            height:'100%',
            forceFit:true,
            columns:[
                {text:'Ref. ID', dataIndex:'id'},
                {text:'Log Date', dataIndex:'logdate'},
                {text:'Log Time', dataIndex:'logtime'},
                {text:'Processed', dataIndex:'processed', renderer:icon_status},
                {text:'Processed By', dataIndex:'processedby'},
                {text:'Processed Stamp', dataIndex:'processedstamp'},
                {text:'Device ID', dataIndex:'deviceid'},
                {text:'Log Source', dataIndex:'logsource'}
            ],
            store:createJsonStore('/dtr/logs.json', 'id', false, 'totalProperty'),
            dockedItems:[
                {
                    dock:'top',
                    xtype:'toolbar',
                    layout:{type:'table', columns:3},
                    items:[
                        {
                            colspan:3,
                            xtype:'combobox',
                            store:[['dtr','DTR LOGS'],['raw','RAW LOGS']],
                            fieldLabel:'Type',
                            labelWidth:65,
                            width:200,
                            value:'dtr',
                            editable:false,
                            typeAhead:false
                        },
                        {
                            fieldLabel:'Date Start',
                            xtype:'datefield',
                            maxValue:_today_date,
                            format:'m/d/Y',
                            id:'time-logs-start-date',
                            value:_today_date,
                            labelWidth:65,
                            width:200
                        },
                        {
                            fieldLabel:'Date End',
                            xtype:'datefield',
                            maxValue:_today_date,
                            id:'time-logs-end-date',
                            value:_today_date,
                            format:'m/d/Y',
                            labelWidth:65,
                            width:200,
                            margin:'0 15 0 15'
                        },
                        {
                            iconCls:'search-icon',
                            tooltip:'Search',
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
    constructor:function(configs){
        var me =this;
        me.callParent(arguments);
        me.initConfig(configs);
    },
    loadStore:function(){
        var me = this;
        me.badge_no = '1181';
        me.client_id = 'MERCU';
        var badge_no = me.badge_no;
        if(!badge_no) return notify('Please select employee.', 'warning'); 

        me.store.load({
            params:{
                date_start: Ext.util.Format.date(Ext.getCmp('time-logs-start-date').getValue(),'m/d/Y'),
                date_end:Ext.util.Format.date(Ext.getCmp('time-logs-end-date').getValue(),'m/d/Y'),
                badge_no:me.badge_no,
                client_id:me.client_id
            }
        });
    },
    setEmployee:function(new_employee){
        me = this;
        me.employee = new_employee;
        me.badge_no = '';
        me.client_id = '';
    }
});
