define([
    'automizy/core'
], function () {
    $A.runFunctions = function(arr, functionThis, functionParameters){
        var returnValue = true;
        for(var i = 0; i < arr.length; i++){
            if(arr[i].apply(functionThis, functionParameters) === false){
                returnValue = false;
            }
        }
        return returnValue;
    }
});