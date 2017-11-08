define([
    "automizy/modules/list/listElement"
], function () {

    var TitleAndSubTitleListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        t.d.$title = $('<div class="automizy-list-element-title"></div>').appendTo(t.d.$widget);
        t.d.$subTitle = $('<div class="automizy-list-element-subtitle"></div>').appendTo(t.d.$widget);

        t.d.title = false;
        t.d.subTitle = false;

        if (typeof obj !== 'undefined') {
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.subTitle !== 'undefined') {
                t.subTitle(obj.subTitle);
            }
        }

        t.widget().addClass('automizy-type-title-and-subtitle');

    };
    TitleAndSubTitleListElement.prototype = Object.create($A.m.ListElement.prototype);
    TitleAndSubTitleListElement.prototype.constructor = TitleAndSubTitleListElement;

    var p = TitleAndSubTitleListElement.prototype;

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
            t.d.$subTitle.html('(' + t.d.subTitle + ')');
            return t;
        }
        return t.d.subTitle;
    };

    $A.initBasicFunctions(TitleAndSubTitleListElement, "TitleAndSubTitleListElement", []);

});