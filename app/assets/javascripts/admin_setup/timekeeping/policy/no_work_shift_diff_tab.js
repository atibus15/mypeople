var no_work_shift_diff_tab = {
    title:'Shift Differential',
    layout:'hbox',
    items:[
        {
            xtype:'fieldset',
            title:'Regular Shift Differential',
            items:[
                {
                    xtype:'checktimerange',
                    boxLabel:'Compute Shift Differential during Non-Working Days',
                    layout:'vbox',
                    checkboxName:'policy[ns_computesdiff]',
                    startName:'policy[ns_sdiff_starttime]',
                    endName:'policy[ns_sdiff_endtime]'
                }
            ]
        }
    ]
};