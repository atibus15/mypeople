function leaveSetupList()
{
    Ext.create('People.editor.Window',{
        title:'Leave Benefits List',
        items:[
            {
                xtype:'crudgrid',
                width:750,
                store:[],
                columns:[
                    {dataIndex:'',text:'Type of Leave Benefits'},
                    {dataIndex:'',text:'No. of Days Entitled'},
                    {dataIndex:'',text:'Effective Start Date'},
                    {dataIndex:'',text:'Effective End Date'}
                ],
                addBtnHandler:function(){
                    loadScript('/assets/allowance_benefits/leave_editor.js');
                    leaveSetupEditor();
                },
                editBtnHandler:function(){
                    loadScript('/assets/allowance_benefits/leave_editor.js');
                    leaveSetupEditor();
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