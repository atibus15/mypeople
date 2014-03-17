
Ext.define('People.time.Field',{
    extend:'Ext.form.field.Time',
    alias:'widget.peopletimefield',
    initComponent:function(){
        var me = this;
        Ext.apply(me,{
            hideTrigger:true,
            allowBlank:false,
            emptyText:'Time',
            listConfig:{
                maxHeight:0,
                resizable:false,
                shadow:false,
                width:0,
                allowBlank:false
            }
        });
        me.callParent(arguments);
    }
});

Ext.define('People.checkbox.Field',{
    extend:'Ext.form.field.Checkbox',
    alias:'widget.peoplecheckbox',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            uncheckedValue:0,
            value:1,
            inputValue:1,
            allowBlank:false
        });
        me.callParent(arguments);
    }
   
});

Ext.define('People.number.Field',{
    extend:'Ext.form.field.Number',
    alias:'widget.peoplenumberfield',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            hideTrigger:true,
            keyNavEnabled:false,
            mouseWheelEnabled:false,
            allowBlank:false
        });
        me.callParent(arguments);
    }
});

Ext.define('People.money.Field',{
    extend:'Ext.form.field.Text',
    alias:'widget.moneyfield',
    initComponent:function(){
        var me = this;
        Ext.apply(me, {
            maskRe:/[\d.,]/,
            allowBlank:false,
            selectOnFocus:true
        });
        me.on('blur',function(){
            me.setValue(me.getFormattedValue());
        });
        me.on('focus',function(){
            me.setValue(me.getDecimalValue());
            me.selectText();
        });
        me.callParent(arguments);
    },
    getDecimalValue:function(){
        var current_val = this.getValue() || 0;
        var decimal_val = parseFloat(String(current_val).split(',').join(''));
        return decimal_val;
    },
    getFormattedValue:function(){
        return Ext.util.Format.number(this.getDecimalValue(), '0,000.00');
    }
});