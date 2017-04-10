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

            $tableBox:$('<div class="automizy-tag-table-box"></div>'),
            $table:$('<table cellpadding="0" cellspacing="0" border="0" class="automizy-tag-table"></table>'),
            $tr:$('<tr></tr>'),
            $td1:$('<td style="width:29px; max-width:29px"></td>'),
            $td2:$('<td></td>'),
            $td3:$('<td style="width:29px; max-width:29px"></td>'),

            $text: $('<span class="automizy-tag-text"></span>'),
            $icon: $('<span class="automizy-tag-icon"></span>'),
            $remove: $('<span class="automizy-tag-close fa fa-times-circle">'),

            tagger: false,
            text: '',
            icon: 'fa-tag',

            width:'100%'
        };
        t.f = {};
        t.init();

        if (typeof obj !== 'undefined') {

            if (typeof obj === 'string') {
                t.text(obj);
            }
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
            if (typeof obj.tagger !== 'undefined') {
                t.tagger(obj.tagger);
            }
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }


            t.initParameter(obj);
        }

        t.d.$tableBox.appendTo(t.d.$widget);
        t.d.$table.appendTo(t.d.$tableBox);
        t.d.$tr.appendTo(t.d.$table);
        t.d.$td1.appendTo(t.d.$tr);
        t.d.$td2.appendTo(t.d.$tr);
        t.d.$td3.appendTo(t.d.$tr);

        t.d.$icon.appendTo(t.d.$td1);
        t.d.$text.appendTo(t.d.$td2);
        t.d.$remove.appendTo(t.d.$td3);

        t.d.$table.width(t.width());

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
            t.d.$text.html(text).attr('title', text);
            setTimeout(function(){
                t.d.$text.css('max-width', t.d.$tableBox.outerWidth() - 59 + 'px');
            }, 10);
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

    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.d.$tableBox.width(t.d.width);
        }
        return t.d.width;
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

            if (t.tagger() instanceof $A.m.Tagger) {
                t.tagger().onRemoveTag(t);
            }
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

    p.highlight = function () {
        var t = this;
        var $widget = t.d.$widget;
        $widget.addClass(' automizy-tag-highlighted');
        setTimeout(function () {
            $widget.removeClass('automizy-tag-highlighted');
        },1000);
    };


    $A.initBasicFunctions(Tag, "Tag", []);


});
