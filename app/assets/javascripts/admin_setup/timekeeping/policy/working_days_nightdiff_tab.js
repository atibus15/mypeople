

var working_days_nightdiff_tab = {
    title:'Night Differential',
    layout:'hbox',
    padding:0,
    minHeight:400,
    layout:'fit',
    items:[
        {
            margin:15,
            xtype:'container',
            layout:'hbox',
            items:[
                {
                    xtype:'fieldset',
                    title:'Regular Night Differential',
                    width:350,
                    height:259,
                    margin:'0 25 0 0',
                    items:[
                        {
                            xtype:'checktimerange',
                            boxLabel:'During Regular Working Hour',
                            checkboxName:'policy[wn_duringregworkhr]',
                            startName:'policy[wn_duringregworkhr_starttime]',
                            endName:'policy[wn_duringregworkhr_endtime]'
                        },
                        {
                            xtype:'checktimerange',
                            boxLabel:'On valid Overtime before Time-In',
                            checkboxName:'policy[wn_onvalidotbti]',
                            startName:'policy[wn_onvalidotbti_starttime]',
                            endName:'policy[wn_onvalidotbti_endtime]'
                        },
                        {
                            xtype:'checktimerange',
                            boxLabel:'On valid Overtime After Time-Out',
                            checkboxName:'policy[wn_onvalidotato]',
                            startName:'policy[wn_onvalidotato_starttime]',
                            endName:'policy[wn_onvalidotato_endtime]'
                        }
                    ]
                }
            ]
        }
    ]
};