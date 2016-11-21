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
            $widget: $('<span class="automizy-panel"></span>'),
            $title: $('<span class="automizy-panel-title"></span>'),
            $content: $('<span class="automizy-panel-content"></span>'),
            id: 'automizy-panel-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$title.appendTo(t.d.$widget);
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
            return t;
        }
        return t.d.title;
    };


    $A.initBasicFunctions(Button, "Button", ['click']);


});
