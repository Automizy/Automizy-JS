define([
    'automizy/core'
], function () {
    $A.registerEvent = function(eventName){
        if($.inArray(eventName, ['function', 'on', 'off', 'one']) >= 0){
            return false;
        }
        if(typeof $A.customEvents.functions[eventName] === 'undefined') {
            $A.customEvents.functions[eventName] = {};
        }
        $A.customEvents[eventName] = $A.customEvents.on[eventName] = function (func, name) {
            if (typeof func === 'function') {
                $A.customEvents.functions[eventName][name || $A.getUniqueString()] = {
                    func: func,
                    life: -1
                };
            }
        };
        $A.customEvents.off[eventName] = function (name) {
            delete $A.customEvents.functions[eventName][name];
        };
        $A.customEvents.one[eventName] = function (func) {
            $A.customEvents.functions[eventName][$A.getUniqueString()] = {
                func: func,
                life: 1
            };
        };
    };
});