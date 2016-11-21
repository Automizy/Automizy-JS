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
            $alertBoxClose: $('<a href="#" title="Close" class="automizy-alert-close fa-icon fa-icon-remove"></a>'),
            $alertBoxIcon: $('<div class="automizy-alert-icon">'),
            $alertBoxContent: $('<div class="automizy-alert-content">'),
            $alertBoxTitle: $('<h4 class="automizy-alert-title">'),
            $alertBoxHtml: $('<p>&nbsp;</p>'),

            title: '',
            content: '',
            type: '',
            target: '',
            closable: true,
            forceHidden: false,
            onCloseIconClick: function () {
            },
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
            if (typeof obj.onCloseIconClick === 'function') {
                t.onCloseIconClick(obj.onCloseIconClick);
            }
            if (typeof obj.closable !== 'undefined') {
                t.closable(obj.closable);
            }
            if (typeof obj.target !== 'undefined') {
                t.target(obj.target);
            }
            if (typeof obj.forceHidden !== 'undefined') {
                t.forceHidden(obj.forceHidden);
            }
            t.initParameter(obj);
        }

        t.d.$alertBoxClose.click(function () {
            t.onCloseIconClick();
            t.close();
        });

        var automizyForceHiddenAlerts = $A.store.get('automizyForceHiddenAlerts');
        if(typeof automizyForceHiddenAlerts !== 'undefined' && typeof automizyForceHiddenAlerts[t.id()] !== 'undefined'){
            t.forceHidden(automizyForceHiddenAlerts[t.id()]);
        }


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
            t.d.$alertBoxHtml.html(html);
            t.d.text = t.d.$alertBoxHtml.text();
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

    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            if (t.d.$alertBoxHtml.contents() instanceof jQuery) {
                t.d.$alertBoxHtml.contents().appendTo($A.$tmp);
            }
            t.d.$alertBoxHtml.empty();
            t.d.content = content;
            if (t.d.content instanceof jQuery) {
                t.d.content.appendTo(t.d.$alertBoxHtml);
            } else if(typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$alertBoxHtml);
            } else {
                t.d.$alertBoxHtml.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };

    p.open = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction.apply(t, ['open', func, name, life]);
        } else {
            if(t.forceHidden() === false){
                t.d.$widget.fadeIn(function () {
                    t.show();
                    t.runFunctions('open');
                });
                $A.runFunctions($A.events.alert.functions.open, this, [this, this.d.$widget]);
            }
        }
        return t;
    };

    p.onCloseIconClick = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('onCloseIconClick', func, name, life);
        }
        else {
            t.runFunctions('onCloseIconClick');
        }
        return t;
    };

    p.close = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('close', func, name, life);
        } else {
            t.d.$widget.fadeOut(function () {
                t.hide();
                t.runFunctions('close');
            });
        }
        return t;
    };

    /*If set to true, the box won't appear anymore after closing with the close button*/
    p.forceHidden = function (forceHidden) {
        var t = this;
        if (typeof forceHidden !== 'undefined') {
            forceHidden = $A.parseBoolean(forceHidden);
            t.d.forceHidden = forceHidden;

            var automizyForceHiddenAlerts = $A.store.get('automizyForceHiddenAlerts') || $A.store.set('automizyForceHiddenAlerts', {});
            if (forceHidden) {
                automizyForceHiddenAlerts[t.id()] = true;
                $A.store.set('automizyForceHiddenAlerts', automizyForceHiddenAlerts);
            }
            else {
                automizyForceHiddenAlerts[t.id()] = false;
                $A.store.set('automizyForceHiddenAlerts', automizyForceHiddenAlerts);
            }
        }
        else {
            return t.d.forceHidden
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
                    t.d.$widget.attr('class', 'automizy-alert alert alert-close alert-success');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-green');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-check"></i>');
                    if (t.d.title === '')
                        t.d.$alertBoxTitle.text($A.translate('Success!'));
                    break;
                case "info":
                    t.d.$widget.attr('class', 'automizy-alert alert alert-close alert-notice');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-blue');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-info"></i>');
                    if (t.d.title === '')
                        t.d.$alertBoxTitle.text($A.translate('Info'));
                    break;
                case "warning":
                    t.d.$widget.attr('class', 'automizy-alert alert alert-close alert-warning');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-orange');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-warning"></i>');
                    if (t.d.title === '')
                        t.d.$alertBoxTitle.text($A.translate('Warning!'));
                    break;
                case "error":
                    t.d.$widget.attr('class', 'automizy-alert alert alert-close alert-danger');
                    t.d.$alertBoxIcon.attr('class', 'alert-icon bg-red');
                    t.d.$alertBoxIcon.html('<i class="glyph-icon icon-times"></i>');
                    if (t.d.title === '')
                        t.d.$alertBoxTitle.text($A.translate('Error!'));
                    break;
            }

            return t;
        }
        return t.d.type;
    };

    $A.initBasicFunctions(Alert, "Alert", ['close']);


});
