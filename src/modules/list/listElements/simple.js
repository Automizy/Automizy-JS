define([
    "automizy/modules/list/listElement"
], function () {

    var SimpleListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        if (typeof obj !== 'undefined') {
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
        }

        t.widget().addClass('automizy-type-simple');

    };
    SimpleListElement.prototype = Object.create($A.m.ListElement.prototype);
    SimpleListElement.prototype.constructor = SimpleListElement;

    var p = SimpleListElement.prototype;

    p.text = function(text){
        var t = this;
        t.widget().html(text);
        return t;
    };

    $A.initBasicFunctions(SimpleListElement, "SimpleListElement", []);

});