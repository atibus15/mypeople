var working_days_shiftdiff_tab = {
    title:'Shift Differential',
    layout:'hbox',
    padding:0,
    minHeight:400,
    layout:'fit',
    items:[
        {
            margin:15,
            xtype:'fieldset',
            title:'Compute Shift Differential',
            width:350,
            height:259,
            margin:'0 25 0 0',
            items:[
                {
                    xtype:'checktimerange',
                    boxLabel:'During Regular Working Hour',
                    checkboxName:'policy[ws_duringregworkhr]',
                    startName:'policy[ws_duringregworkhr_starttime]',
                    endName:'policy[ws_duringregworkhr_endtime]'
                },
                {
                    xtype:'checktimerange',
                    boxLabel:'On valid Overtime before Time-In',
                    checkboxName:'policy[ws_onvalidotbti]',
                    startName:'policy[ws_onvalidotbti_starttime]',
                    endName:'policy[ws_onvalidotbti_endtime]'
                },
                {
                    xtype:'checktimerange',
                    boxLabel:'On valid Overtime After Time-Out',
                    checkboxName:'policy[ws_onvalidotato]',
                    startName:'policy[ws_onvalidotato_starttime]',
                    endName:'policy[ws_onvalidotato_endtime]'
                }
            ]
        }
    ]
};