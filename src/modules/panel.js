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
            nowrap:false,
            padding:'15px 20px',
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
            if (typeof obj.padding !== 'undefined') {
                t.padding(obj.padding);
            }
            if (typeof obj.nowrap !== 'undefined') {
                t.nowrap(obj.nowrap);
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
    p.padding = function (padding) {
        var t = this;
        if (typeof padding !== 'undefined') {
            t.d.padding = padding;
            t.d.$content.css('padding', t.d.padding);
            return t;
        }
        return t.d.padding;
    };
    p.nowrap = function (nowrap) {
        var t = this;
        if (typeof nowrap !== 'undefined') {
            t.d.nowrap = $A.parseBoolean(nowrap);
            if(t.d.nowrap){
                t.d.$content.css('white-space', 'nowrap');
            }else{
                t.d.$content.css('white-space', 'normal');
            }
            return t;
        }
        return t.d.nowrap;
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
