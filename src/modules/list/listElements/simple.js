define([
    "automizy/modules/list/listElement"
], function () {

    var SimpleListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        t.d.text = '';

        if (typeof obj !== 'undefined') {
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.bold !== 'undefined') {
                t.bold(obj.bold);
            }
        }

        t.widget().addClass('automizy-type-simple');

    };
    SimpleListElement.prototype = Object.create($A.m.ListElement.prototype);
    SimpleListElement.prototype.constructor = SimpleListElement;

    var p = SimpleListElement.prototype;

    p.text = function(text){
        var t = this;
        if(typeof text !== 'undefined'){
            t.d.text = text;
            t.widget().html(t.d.text);
            return t;
        }
        return t.d.text;
    };

    p.bold = function(bold){
        var t = this;
        if(bold){
            t.widget().css('font-weight', 'bold');
        }else{
            t.widget().css('font-weight', 'normal');
        }
        return t;
    };

    $A.initBasicFunctions(SimpleListElement, "SimpleListElement", []);

});