function nonMonitarySetupList()
{
    Ext.create('People.editor.Window',{
        title:'Non Monetary Benefits List',
        items:[
            {
                xtype:'crudgrid',
                width:750,
                store:[],
                columns:[
                    {dataIndex:'',text:'Type of Non Monitary Benefit'},
                    {dataIndex:'',text:'No. of Days Entitled'},
                    {dataIndex:'',text:'Effective Start Date'},
                    {dataIndex:'',text:'Effective End Date'}
                ],
                addBtnHandler:function(){
                    return false;
                },
                editBtnHandler:function(){
                    return false;
                },
                deleteBtnHandler:function(btn){
                   return false;
                },
                addMenu:
                {
                    xtype:'menu',
                    items:
                    [
                        {
                            text:'Medical Insurance(Personal)',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/medical_insurance.js');
                                medicalInsuranceEditor('personal');
                            }
                        },
                        {
                            text:'Medical Insurance(Extended to Family Member/Dependents)',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/medical_insurance.js');
                                medicalInsuranceEditor('extended');
                            }
                        },
                        {
                            text:'Motorcycle Plan',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/motor_car_plan.js?v=012320140229');
                                motorCarPlanEditor('motorcycle_plan');
                            }
                        },
                        {
                            text:'Car Plan',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/motor_car_plan.js?v=012320140229');
                                motorCarPlanEditor('car_plan');
                            }
                        },
                        {
                            text:'Laptop Plan',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/laptop_plan.js');
                                laptopPlanEditor();
                            }
                        },
                        {
                            text:'Fleet Card',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/gas_fleet.js');
                                gasFleetEditor();
                            }
                        },
                        {
                            text:'Repair and Maintenance',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/repair_maintenance.js');
                                repairMaintenanceEditor();
                            }
                        },
                        {
                            text:'Uniform',
                            handler:function(){
                                loadScript('/assets/allowance_benefits/non_monitary/uniform.js');
                                uniformEditor();
                            }
                        }
                    ]
                }
            }
        ]
    }).show();
}