var no_work_break_tab = {
    title:'Break',
    layout:'hbox',
    items:[
        {
            xtype:'container',
            items:[
                {
                    xtype:'fieldset',
                    title:'First Break',
                    items:[
                        {
                            xtype:'policybreak',
                            boxLabel:'With 1st Break',
                            checkboxName:'nb_with1stbrk',
                            namePrefix:'nb_1stbrk'
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    title:'Second Break',
                    items:[
                        {
                            xtype:'policybreak',
                            boxLabel:'With 2nd Break',
                            checkboxName:'nb_with2ndbrk',
                            namePrefix:'nb_2ndbrk'
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    title:'Third Break',
                    items:[
                        {
                            xtype:'policybreak',
                            boxLabel:'With 3rd Break',
                            checkboxName:'nb_with3rdbrk',
                            namePrefix:'nb_3rdbrk'
                        }
                    ]
                }
            ]
        },
        {
            margin:'0 0 0 25',
            xtype:'container',
            items:[
                {
                    xtype:'fieldset',
                    title:'Fourth Break',
                    items:[
                        {
                            xtype:'policybreak',
                            boxLabel:'With 4th Break',
                            checkboxName:'nb_with4thbrk',
                            namePrefix:'nb_4thbrk'
                        }
                    ]
                },
                {
                    xtype:'fieldset',
                    title:'Fifth Break',
                    items:[
                        {
                            xtype:'policybreak',
                            boxLabel:'With 5th Break',
                            checkboxName:'nb_with5thbrk',
                            namePrefix:'nb_5thbrk'
                        }
                    ]
                }
            ]
        }
    ]
};