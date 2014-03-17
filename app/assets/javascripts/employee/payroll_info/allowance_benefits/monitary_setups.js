function monitarySetupList()
{
    Ext.create('People.editor.Window',{
        title:'Monetary Benefits List',
        items:[
            {
                xtype:'crudgrid',
                width:750,
                store:[],
                columns:[
                    {dataIndex:'',text:'Type of Monitary Benefit'},
                    {dataIndex:'',text:'No. of Days Entitled'},
                    {dataIndex:'',text:'Effective Start Date'},
                    {dataIndex:'',text:'Effective End Date'}
                ],
                addBtnHandler:function(){
                    loadScript('/assets/allowance_benefits/monitary_editor.js');
                    monitarySetupEditor();
                },
                editBtnHandler:function(){
                    loadScript('/assets/allowance_benefits/monitary_editor.js');
                    monitarySetupEditor();
                },
                deleteBtnHandler:function(btn){
                    if(btn == 'yes'){
                        alert('delete');
                    }
                }
            }
        ]
    }).show();
}