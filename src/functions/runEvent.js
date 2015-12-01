define([
    'automizy/functions/runFunctions'
], function () {
    $A.runEvent = function(eventName, thisParameter, parameterArray){
        return $A.runFunctions($A.customEvents.functions[eventName], thisParameter || $A, parameterArray || []);
    };
});