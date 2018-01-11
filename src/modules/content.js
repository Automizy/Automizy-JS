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
            $content: $('<div class="automizy-content-content"></div>'),

            title:'',
            content:'',
            width:'auto',
            id: 'automizy-content-' + $A.getUniqueString()
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

    var p = Content.prototype;
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.d.$content.css('max-width', t.d.width);
            return t;
        }
        return t.d.width;
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


    $A.initBasicFunctions(Content, "Content", []);


});
