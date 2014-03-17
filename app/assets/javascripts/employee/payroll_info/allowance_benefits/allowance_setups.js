function allowanceSetupList()
{
    Ext.create('People.editor.Window',{
        title:'Allowance List',
        items:[
            {
                xtype:'crudgrid',
                width:750,
                store:[],
                columns:[
                    {dataIndex:'',text:'Type of Allowance'},
                    {dataIndex:'',text:'Amount'},
                    {dataIndex:'',text:'Effective Start Date'},
                    {dataIndex:'',text:'Effective End Date'}
                ],
                addBtnHandler:function(){
                    loadScript('/assets/allowance_benefits/allowance_editor.js');
                    allowanceSetupEditor();
                },
                editBtnHandler:function(){
                    loadScript('/assets/allowance_benefits/allowance_editor.js');
                    allowanceSetupEditor();
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