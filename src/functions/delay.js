define([
    'automizy/core'
], function () {

    $A.delay = (function(){
        var timer = {
            default:0
        };
        return function(callback, ms, name){
            name = name || 'default';
            if(typeof timer[name] === 'undefined'){
                timer[name] = 0;
            }
            clearTimeout (timer[name]);
            timer[name] = setTimeout(callback, ms);
        };
    })();

});