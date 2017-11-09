define([
    "automizy/modules/list/listElement"
], function () {

    var BoxListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        t.d.$title = $('<div class="automizy-list-element-title"></div>').appendTo(t.d.$widget);
        t.d.$subTitle = $('<div class="automizy-list-element-subtitle"></div>').appendTo(t.d.$widget);
        t.d.$info = $('<div class="automizy-list-element-info"></div>').appendTo(t.d.$widget);
        t.d.$badge = $('<div class="automizy-list-element-badge"></div>').appendTo(t.d.$widget);

        t.d.title = false;
        t.d.subTitle = false;
        t.d.info = false;
        t.d.badge = false;

        if (typeof obj !== 'undefined') {
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.subTitle !== 'undefined') {
                t.subTitle(obj.subTitle);
            }
            if (typeof obj.info !== 'undefined') {
                t.info(obj.info);
            }
            if (typeof obj.badge !== 'undefined') {
                t.badge(obj.badge);
            }
        }

        t.widget().addClass('automizy-type-box');

    };
    BoxListElement.prototype = Object.create($A.m.ListElement.prototype);
    BoxListElement.prototype.constructor = BoxListElement;

    var p = BoxListElement.prototype;

    p.title = function(title){
        var t = this;
        if(typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(t.d.title);
            return t;
        }
        return t.d.title;
    };
    p.subTitle = function(subTitle){
        var t = this;
        if(typeof subTitle !== 'undefined') {
            t.d.subTitle = subTitle;
            t.d.$subTitle.html(t.d.subTitle);
            return t;
        }
        return t.d.subTitle;
    };
    p.info = function(info){
        var t = this;
        if(typeof info !== 'undefined') {
            t.d.info = info;
            t.d.$info.html(t.d.info);
            return t;
        }
        return t.d.info;
    };
    p.badge = function(badge){
        var t = this;
        if(typeof badge !== 'undefined') {
            t.d.badge = badge;
            t.d.$badge.html(t.d.badge);
            return t;
        }
        return t.d.badge;
    };

    $A.initBasicFunctions(BoxListElement, "BoxListElement", []);

});