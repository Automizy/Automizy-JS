define([
    'automizy/core'
], function () {
    $A.runFunctions = function(functions, functionThis, functionParameters){
        var returnValue = true;
        if($.isArray(functions)) {
            for (var i = 0; i < functions.length; i++) {
                if (functions[i].apply(functionThis, functionParameters) === false) {
                    returnValue = false;
                }
            }
        }else{
            for (var i in functions) {
                if(functions[i].life !== 0) {
                    functions[i].life--;
                    if (functions[i].func.apply(functionThis, functionParameters) === false) {
                        returnValue = false;
                    }
                }
            }
        }
        return returnValue;
    }
});