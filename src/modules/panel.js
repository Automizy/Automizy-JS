define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Panel = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-panel"></div>'),
            $title: $('<div class="automizy-panel-title"></div>'),
            $content: $('<div class="automizy-panel-content"></div>'),

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
            t.d.$title.appendTo(t.d.$widget);
            return t;
        }
        return t.d.title;
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
