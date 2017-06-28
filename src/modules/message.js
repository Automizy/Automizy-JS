define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Message = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-message"></div>'),

            $table: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-message-table"></table>'),
            $row: $('<tr class="automizy-message-row"></tr>'),
            $iconCell: $('<td class="automizy-message-icon-cell"></td>'),
            $containerCell: $('<td class="automizy-message-container-cell"></td>'),
            $closeCell: $('<td class="automizy-message-close-cell"></td>'),

            $close: $('<span class="automizy-message-close fa fa-remove"></span>'),
            $icon: $('<div class="automizy-message-icon fa fa-info"></div>'),
            $content: $('<div class="automizy-message-content"></div>'),
            $title: $('<div class="automizy-message-title"></div>'),

            title: $A.translate('Info'),
            content: '',
            type: 'info',
            target: 'body',
            closable: true,
            delay:350,
            id: 'automizy-message-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$table.appendTo(t.d.$widget);
        t.d.$row.appendTo(t.d.$table);
        t.d.$iconCell.appendTo(t.d.$row);
        t.d.$containerCell.appendTo(t.d.$row);
        t.d.$closeCell.appendTo(t.d.$row);

        t.d.$icon.appendTo(t.d.$iconCell);
        t.d.$title.appendTo(t.d.$containerCell);
        t.d.$content.appendTo(t.d.$containerCell);
        t.d.$close.appendTo(t.d.$closeCell);

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
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
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
            if (typeof obj.closable !== 'undefined') {
                t.closable(obj.closable);
            }
            if (typeof obj.target !== 'undefined') {
                t.drawTo(obj.target);
            }
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.delay !== 'undefined') {
                t.delay(obj.delay);
            }
            t.initParameter(obj);
        }

        t.d.$close.click(function () {
            t.close();
        });

    };

    var p = Message.prototype;

    p.name = function(name){
        var t = this;
        if(typeof name !== 'undefined') {
            t.d.name = name;
            if(typeof $A.messagesByName[t.d.name] !== 'undefined'){
                $A.messagesByName[t.d.name].close(0);
            }
            $A.messagesByName[t.d.name] = t;
        }
        return t.d.name;
    };

    p.delay = function (delay) {
        var t = this;
        if (typeof delay !== 'undefined') {
            t.d.delay = delay;
            return t;
        }
        return t.d.delay;
    };

    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(t.d.title);
            return t;
        }
        return t.d.title;
    };

    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            t.d.$content.html(t.d.html);
            return t;
        }
        return t.d.html;
    };

    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.d.$content.text(t.d.text);
            return t;
        }
        return t.d.text;
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
            } else if (typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$content);
            } else {
                t.d.$content.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };


    p.open = function (param1, name, life) {
        var t = this;
        if (typeof param1 === 'function') {
            t.addFunction.apply(t, ['open', param1, name, life]);
        } else {
            var delay = t.delay();
            if (typeof param1 !== 'undefined') {
                delay = param1;
            }
            t.widget().fadeIn(delay, function () {
                t.runFunctions('open');
            });
        }
        return t;
    };

    p.close = function (param1, name, life) {
        var t = this;
        if(!t.closable()){
            return t;
        }
        if (typeof param1 === 'function') {
            t.addFunction.apply(t, ['close', param1, name, life]);
        } else {
            var delay = t.delay();
            if (typeof param1 !== 'undefined') {
                delay = param1;
            }
            t.widget().fadeOut(delay, function () {
                t.runFunctions('close');
            });
        }
        return t;
    };

    p.closable = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.closable = $A.parseBoolean(value);
            if (value === true) {
                t.widget().removeClass('automizy-disable-close');
            } else {
                t.widget().addClass('automizy-disable-close');
            }
            return t;
        }
        return t.d.closable;
    };

    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            t.d.type = type;

            t.widget().removeClass('automizy-message-type-info automizy-message-type-success automizy-message-type-warning automizy-message-type-error');

            switch (type) {
                case "info":
                    t.widget().addClass('automizy-message-type-info');
                    t.icon('fa-info');
                    if (t.title() === false) {
                        t.d.$title.text($A.translate('Info'));
                    }
                    break;
                case "success":
                    t.widget().addClass('automizy-message-type-success');
                    t.icon('fa-check');
                    if (t.title() === false) {
                        t.d.$title.text($A.translate('Success!'));
                    }
                    break;
                case "warning":
                    t.widget().addClass('automizy-message-type-warning');
                    t.icon('fa-warning');
                    if (t.title() === false) {
                        t.d.$title.text($A.translate('Warning!'));
                    }
                    break;
                case "error":
                    t.widget().addClass('automizy-message-type-error');
                    t.icon('fa-times');
                    if (t.title() === false) {
                        t.d.$title.text($A.translate('Error!'));
                    }
                    break;
            }

            return t;
        }
        return t.d.type;
    };

    p.icon = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.icon = icon;
            if (t.d.icon === false) {
                t.widget().removeClass('automizy-has-icon');
            } else if (t.d.icon === true) {
                t.widget().addClass('automizy-has-icon');
            } else {
                t.widget().addClass('automizy-has-icon');
                var iconType = iconType || 'fa';
                if (iconType === 'fa') {
                    t.d.$icon.removeClass(function (index, css) {
                        return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
                    }).addClass('fa').addClass(icon);
                }
            }
            return t;
        }
        return t.d.icon || false;
    };

    $A.messagesByName = {};

    $A.initBasicFunctions(Message, "Message", ['close', 'open']);


});
