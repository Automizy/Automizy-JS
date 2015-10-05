define([
    'automizy/core'
], function () {
    $A.rand = function(min, max){
        var min = min || 0;
        var max = max || Number.MAX_SAFE_INTEGER || Number.MAX_VALUE;
        if(min > max){
            var a = max;
            max = min;
            min = a;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});