define([
    "automizy/modules/list/listElement"
], function () {

    var IconedListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        t.d.$icon = $('<span class="automizy-list-element-icon fa"></span>').appendTo(t.d.$widget).click(function(){
            if(t.d.activeIconClick) {
                t.d.clickInside = true;
                t.iconClick();
            }
        });
        t.d.$text = $('<span class="automizy-list-element-text"></span>').appendTo(t.d.$widget);

        t.d.text = false;
        t.d.icon = false;
        t.d.iconPosition = 'left';
        t.d.iconClick = function(){};
        t.d.activeIconClick = false;

        if (typeof obj !== 'undefined') {
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
            if (typeof obj.iconPosition !== 'undefined') {
                t.iconPosition(obj.iconPosition);
            }
            if (typeof obj.iconClick !== 'undefined') {
                t.iconClick(obj.iconClick);
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
    p.iconPosition = function(iconPosition){
        var t = this;
        if(typeof iconPosition !== 'undefined') {
            t.d.iconPosition = iconPosition;
            if(t.d.iconPosition === 'right'){
                t.d.$icon.addClass('automizy-position-right').appendTo(t.d.$widget);
            }else{
                t.d.$icon.removeClass('automizy-position-right').prependTo(t.d.$widget);
            }
            return t;
        }
        return t.d.icon;
    };
    p.iconClick = function(iconClick){
        var t = this;
        if(typeof iconClick !== 'undefined') {
            if(t.d.iconClick === false){
                t.d.iconClick = function(){};
                t.d.activeIconClick = false;
                t.d.$icon.removeClass('automizy-clickable');
                return t;
            }
            t.d.iconClick = iconClick;
            t.d.activeIconClick = true;
            t.d.$icon.addClass('automizy-clickable');
            return t;
        }
        t.d.iconClick.apply(t, []);
        return t;
    };

    $A.initBasicFunctions(IconedListElement, "IconedListElement", []);

});