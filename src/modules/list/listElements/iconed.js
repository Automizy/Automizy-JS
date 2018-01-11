define([
    "automizy/modules/list/listElement"
], function () {

    var IconedListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        t.d.$icon = $('<span class="automizy-list-element-icon fa"></span>').appendTo(t.d.$widget);
        t.d.$text = $('<span class="automizy-list-element-text"></span>').appendTo(t.d.$widget);

        t.d.text = false;
        t.d.icon = false;

        if (typeof obj !== 'undefined') {
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
        }

        t.widget().addClass('automizy-type-iconed');

    };
    IconedListElement.prototype = Object.create($A.m.ListElement.prototype);
    IconedListElement.prototype.constructor = IconedListElement;

    var p = IconedListElement.prototype;

    p.text = function(text){
        var t = this;
        if(typeof text !== 'undefined') {
            t.d.text = text;
            t.d.$text.html(t.d.text);
            return t;
        }
        return t.d.text;
    };
    p.icon = function(icon){
        var t = this;
        if(typeof icon !== 'undefined') {
            t.d.icon = icon;
            t.d.$icon.addClass(icon);
            return t;
        }
        return t.d.icon;
    };

    $A.initBasicFunctions(IconedListElement, "IconedListElement", []);

});