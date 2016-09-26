define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Alert = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-alert alert alert-close">'),
            $alertBoxClose: $('<a href="#" title="Close" class="automizy-alert-close glyph-icon alert-close-btn icon-remove">X</a>'),
            $alertBoxIcon: $('<div class="automizy-alert-icon bg-green alert-icon">'),
            $alertBoxContent: $('<div class="automizy-alert-content alert-content">'),
            $alertBoxTitle: $('<h4 class="automizy-alert-title alert-title">'),
            $alertBoxHtml: $('<p>&nbsp;</p>'),

            title: '',
            content: '',
            type: '',
            closable: true,
            create: function () {
            },
            id: 'automizy-alert-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$alertBoxClose.appendTo(t.d.$widget);
        t.d.$alertBoxIcon.appendTo(t.d.$widget);
        t.d.$alertBoxContent.appendTo(t.d.$widget);
        t.d.$alertBoxTitle.appendTo(t.d.$alertBoxContent);
        t.d.$alertBoxHtml.appendTo(t.d.$alertBoxContent);

        if (typeof obj !== 'undefined') {
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.html !== 'undefined') {
                t.html(obj.html);
            }
            if (typeof obj.type !== 'undefined') {
                t.type(obj.type);
            }
            if (typeof obj.open === 'function') {
                t.open(obj.open);
            }
            if (typeof obj.close === 'function') {
                t.close(obj.close);
            }
            if (typeof obj.closable !== 'undefined'){
                t.closable(obj.closable);
            }
            t.initParameter(obj);
        }

        t.d.$alertBoxClose.click(function () {
            t.close();
            t.remove();
        })
    };

    var p = Alert.prototype;

    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$alertBoxTitle.html(title);
            return t;
        }
        return t.d.title;
    };

    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            t.d.text = $(html).text();
            t.d.$alertBoxHtml.html(html);
            return t;
        }
        return t.d.html;
    };

    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.d.html = text;
            t.d.$alertBoxHtml.html('').text(text);
            return t;
        }
        return t.d.text;
    };

    p.open = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction.apply(t, ['open', func, name, life]);
        } else {
                t.show();
                t.runFunctions('open');

            $A.runFunctions($A.events.alert.functions.open, this, [this, this.d.$widget]);
        }
        return t;
    };

    p.close = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('close', func, name, life);
        } else {
            t.hide();
            t.runFunctions('close');
        }
        return t;
    };

    p.closable = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.closable = $A.parseBoolean(value);
            if (value) {
                t.d.$alertBoxClose.show();
            }
            else {
                t.d.$alertBoxClose.hide();
            }
        } else {
            return t.d.closable;
        }
        return t;
    };

    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            t.d.type = type;

            switch (type) {
                case "success":
                    t.d.$widget.attr('class', 'alert alert-close alert-success');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-green');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-check"></i>');
                    t.d.$alertBoxTitle.text($A.translate('Success!'));
                    break;
                case "info":
                    t.d.$widget.attr('class', 'alert alert-close alert-notice');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-blue');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-info"></i>');
                    t.d.$alertBoxTitle.text($A.translate('Info'));
                    break;
                case "warning":
                    t.d.$widget.attr('class', 'alert alert-close alert-warning');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-orange');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-warning"></i>');
                    t.d.$alertBoxTitle.text($A.translate('Warning!'));
                    break;
                case "error":
                    t.d.$widget.attr('class', 'alert alert-close alert-danger');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-red');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-times"></i>');
                    t.d.$alertBoxTitle.text($A.translate('Error!'));
                    break;
            }

            return t;
        }
        return t.d.type;
    };

    $A.initBasicFunctions(Alert, "Alert", ['close']);


});
