Ext.define('People.pysummary.Grid',{
	extend:'Ext.grid.GridPanel',
	alias:'widget.pysummarygrid',
	initComponent:function(){
		var me = this;

		Ext.apply(me, {
			
			store:[]
		});
		me.callParent(arguments);
	},
	constructor:function(configs){
		var me = this;
		me.callParent(arguments);
		me.initConfig(configs);
	}
});