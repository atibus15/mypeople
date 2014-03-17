var no_work_night_diff_tab = {
    title:'Night Differential',
    layout:'hbox',
    items:[
        {
            xtype:'fieldset',
            title:'Regular Night Differential',
            items:[
                {
                    xtype:'checktimerange',
                    boxLabel:'Compute Night Differential during Non-Working Days',
                    layout:'vbox',
                    checkboxName:'policy[nn_computendiff]',
                    startName:'policy[nn_ndiff_starttime]',
                    endName:'policy[nn_ndiff_endtime]'
                }
            ]
        }
    ]
};