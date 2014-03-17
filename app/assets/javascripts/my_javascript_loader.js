/* Author   :   adamson ibus
 * Date     :   11/21/2013
 * Desc     :   Enable Auto Loading of Javascript code dynamicly on demand
 * Copyright:   Business Software and Application Group    
 */

var ENV = 'PROD';

if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt /*, from */){
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if(from < 0) from += len;
        for(; from < len; from++){
            if(from in this && this[from] === elt) return from;
        }
        return -1;
    };
}

var loaded_scripts = [];
function loadScript(url){
    if(loaded_scripts.indexOf(url)>=0){
        return true;
    }
    $.ajaxSetup({
        cache:true,
        async:false,
        beforeSend:function(){
            Ext.getBody().mask('Loading..');
        },
        success:function(){
             Ext.getBody().unmask();
        },
        error:function(){
            Ext.getBody().unmask();
        },
        complete:function(){
            Ext.getBody().unmask();
        }
    });
    
    $.getScript(url)
    .done(function(script, text_status){
        loaded_scripts.push(url);
    })
    .fail(function(jqxhr, settings, exception){
        Ext.MessageBox.show({
            title:'My Javascript Loader',
            msg:'Unable to load javascript.',
            icon:Ext.MessageBox.ERROR,
            buttons:Ext.MessageBox.OK,
            fn:function(){
                console.log(exception, settings);
            }
        });
    });
}