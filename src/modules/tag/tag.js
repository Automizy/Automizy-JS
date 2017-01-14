define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Tag = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-tag"></div>'),
            $text: $('<div class="automizy-tag-text"></div>'),
            $icon: $('<div class="automizy-tag-icon"></div>'),
            $remove: $('<div class="automizy-tag-close fa fa-times-circle">'),

            tagger: false,
            text: '',
            icon: 'fa-tag'
        };
        t.f = {};
        t.init();

        if (typeof obj !== 'undefined') {


            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
            if (typeof obj.tagger !== 'undefined') {
                t.tagger(obj.tagger);
            }


            t.initParameter(obj);
        }

        t.d.$icon.appendTo(t.d.$widget);
        t.d.$text.appendTo(t.d.$widget);
        t.d.$remove.appendTo(t.d.$widget);
        t.icon(t.icon());

        t.d.$remove.click(function () {
            t.remove();
        })

    };

    var p = Tag.prototype;

    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.d.$text.html(text);
            return t;
        }
        return t.d.text;
    };

    p.tagger = function (tagger) {
        var t = this;
        if (typeof tagger !== 'undefined') {
            t.d.tagger = tagger;
            return t;
        }
        return t.d.tagger;
    };


    p.remove = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('remove', func, name, life);
        } else {
            var a = t.runFunctions('remove');
            t.returnValue(!(a[0] === false || a[1] === false));
            t.widget().fadeOut('fast', function () {
                this.remove();
            });
            t.tagger().onRemoveTag(t);
            return;
        }
        return t;
    };

    p.icon = function (icon) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.icon = icon;
            t.d.$icon.removeClass(function (index, css) {
                return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
            }).addClass('fa').addClass(icon);
            return t;
        }
        return t.d.icon;
    };


    $A.initBasicFunctions(Tag, "Tag", []);


});
