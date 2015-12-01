define([
    'automizy/core'
], function () {
    $A.registerLocalEvents = function(obj, eventNames){
        if (typeof obj.functions === 'undefined') {
            obj.functions = {};
        }
        if (typeof obj.on === 'undefined') {
            obj.on = {};
        }
        if (typeof obj.off === 'undefined') {
            obj.off = {};
        }
        if (typeof obj.one === 'undefined') {
            obj.one = {};
        }
        for(var i = 0; i < eventNames.length; i++) {
            var eventName = eventNames[i];
            if ($.inArray(eventName, ['function', 'on', 'off', 'one']) >= 0) {
                return false;
            }
            if (typeof obj.functions[eventName] === 'undefined') {
                obj.functions[eventName] = {};
            }
            obj[eventName] = obj.on[eventName] = function (func, name) {
                if (typeof func === 'function') {
                    obj.functions[eventName][name || $A.getUniqueString()] = {
                        func: func,
                        life: -1
                    };
                }
            };
            obj.off[eventName] = function (name) {
                delete obj.functions[eventName][name];
            };
            obj.one[eventName] = function (func) {
                obj.functions[eventName][$A.getUniqueString()] = {
                    func: func,
                    life: 1
                };
            };
        }
    };
});