define([
    'automizy/core'
], function () {
    $A.getFunctionStringFromArray = function (f, args) {
        var len = args.length;
        f += '(';
        for(var i = 0; i < len; i++){
            f += 'arguments['+i+']';
            if(i < len-1)f += ', ';
        }
        f += ')';
        return f;
    };
});