define([
    'automizy/core'
], function () {

    $A.delay = function (a) {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    };

});