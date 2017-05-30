define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Content = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-content"></div>'),
            $navigationBox: $('<div class="automizy-content-navigation-box"></div>'),
            $navigationBoxButton1: $('<div class="automizy-content-navigation-box-button"></div>'),
            $content1: $('<div class="automizy-content-content-1"></div>'),
            $content2: $('<div class="automizy-content-content-2"></div>'),

            title:'',
            content:'',
            id: 'automizy-panel-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$content.appendTo(t.d.$widget);
        if (typeof obj !== 'undefined') {

            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }

            t.initParameter(obj);
        }

    };

    var p = Panel.prototype;
    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(title);
            t.d.$title.prependTo(t.d.$widget);
            return t;
        }
        return t.d.title;
    };
    p.maxWidth = function (maxWidth) {
        var t = this;
        if (typeof maxWidth !== 'undefined') {
            t.d.maxWidth = maxWidth;
            t.d.$content.css('max-width', t.d.maxWidth);
            return t;
        }
        return t.d.maxWidth;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            if (t.d.$content.contents() instanceof jQuery) {
                t.d.$content.contents().appendTo($A.$tmp);
            }
            t.d.$content.empty();
            t.d.content = content;
            if (t.d.content instanceof jQuery) {
                t.d.content.appendTo(t.d.$content);
            } else if(typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$content);
            } else {
                t.d.$content.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };


    $A.initBasicFunctions(Panel, "Panel", []);


});
