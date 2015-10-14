define([
    'automizy/core',
    'automizy/defines/input',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/getUniqueString',
    'automizy/functions/parseBoolean',
    'automizy/functions/initBasicFunctions',
    'automizy/modules/validator',
    'automizy/images/icons'
], function () {
    var Input = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<span class="automizy-input new-row"></span>'),
            $widgetInput: $('<input type="text" />'),
            $widgetInputBox: $('<span class="automizy-input-box"></span>'),
            $widgetInputBoxError: $('<span class="automizy-input-box-error"></span>'),
            $widgetLabel: $('<label></label>'),
            $widgetLabelAfter: $('<span></span>'),
            $widgetHelp: $('<img src="'+$A.images.helpIcon+'" class="automizy-input-help" />'),
            $widgetHelpContent: $('<div class="automizy-input-help-content"><img src="'+$A.images.helpArrow+'" class="automizy-input-help-content-arrow" /></div>'),
            $widgetHelpContentInner: $('<span></span>'),
            $input: $('<input />'),
            $textarea: $('<textarea></textarea>'),
            $select: $('<select></select>'),
            specialElements: [],
            type: 'text',
            skin: 'simple-automizy',
            multiple: false,
            multiselect: false,
            readonly: false,
            hasObject: false,
            isDatepicker: false,
            newRow: true,
            breakInput: false,
            needModify:false,
            labelPosition:'left',
            labelWidth:'',
            value: '',
            placeholder: '',
            name: '',
            width: '300px',
            height: 'auto',
            label: '',
            labelAfter: '',
            accept: [],
            items: {},
            validator: $A.newValidator(),
            validate: function () {
            },
            createFunctions: [],
            id: 'automizy-input-' + $A.getUniqueString(),
            click: function () {
            },
            change: function () {
            },
            enter: function () {
            },
            create: function () {
            }
        };
        t.init();

        t.d.$input.addClass('automizy-input');
        t.d.$textarea.addClass('automizy-input');
        t.d.$select.addClass('automizy-input');
        t.d.$widgetLabel.appendTo(t.d.$widget).attr('for', t.d.id + '-input').ahide();
        t.d.$widgetInput.appendTo(t.d.$widgetInputBox).attr('id', t.d.id + '-input');
        t.d.$widgetInput.click(function () {
            t.click();
        });
        t.d.$widgetInputBox.appendTo(t.d.$widget);
        t.d.$widgetLabelAfter.appendTo(t.d.$widget).ahide();
        t.d.$widgetInputBoxError.appendTo(t.d.$widget);
        t.d.$widgetHelpContentInner.appendTo(t.d.$widgetHelpContent);
        t.d.$widgetHelpContent.appendTo('body:first');
        t.d.$widgetHelp.appendTo(t.d.$widget).on('mouseenter click', function () {
            t.d.$widgetHelp.stop().fadeTo(250, 1);
            var posX = t.d.$widgetHelp.offset().left + 40;
            var posY = t.d.$widgetHelp.offset().top - 16;
            t.d.$widgetHelpContent.css({
                left: posX + 'px',
                top: posY + 'px'
            }).stop().fadeIn();
        }).mouseout(function () {
            t.d.$widgetHelpContent.stop().fadeOut();
            t.d.$widgetHelp.stop().fadeTo(250, 0.5);
        }).ahide();
        t.d.$widgetInputBoxError.appendTo(t.d.$widget);
        t.d.$widget.attr('type', 'text').attr('id', t.id()).addClass('automizy-skin-' + t.d.skin);
        t.d.$widgetInput.on('change keyup paste', function () {
            t.change();
        }).blur(function(){
            t.validate();
        }).keypress(function(e) {
            if (e.which == 13) {
                t.enter();
            }
        });
        if (typeof obj !== 'undefined') {
            if (typeof obj.label !== 'undefined')
                t.label(obj.label);
            if (typeof obj.labelAfter !== 'undefined')
                t.labelAfter(obj.labelAfter);
            if (typeof obj.type !== 'undefined')
                t.type(obj.type);
            if (typeof obj.disable !== 'undefined') {
                if (obj.disable)
                    t.disable();
                else
                    t.enable();
            }
            if (typeof obj.enable !== 'undefined') {
                if (obj.enable)
                    t.enable();
                else
                    t.disable();
            }
            if (typeof obj.checked !== 'undefined')
                t.checked(obj.checked);
            if (typeof obj.click !== 'undefined')
                t.click(obj.click);
            if (typeof obj.help !== 'undefined')
                t.help(obj.help);
            if (typeof obj.height !== 'undefined')
                t.height(obj.height);
            if (typeof obj.name !== 'undefined')
                t.name(obj.name);
            if (typeof obj.multiple !== 'undefined')
                t.multiple(obj.multiple);
            if (typeof obj.datepicker !== 'undefined')
                t.datepicker(obj.datepicker);
            if (typeof obj.multiselect !== 'undefined' && obj.multiselect !== false)
                t.multiselect(obj.multiselect);
            if (typeof obj.options !== 'undefined')
                t.options(obj.options);
            if (typeof obj.accept !== 'undefined')
                t.accept(obj.accept);
            if (typeof obj.readonly !== 'undefined')
                t.readonly(obj.readonly);
            if (typeof obj.newRow !== 'undefined')
                t.newRow(obj.newRow);
            if (typeof obj.width !== 'undefined')
                t.width(obj.width);
            if (typeof obj.placeholder !== 'undefined')
                t.placeholder(obj.placeholder);
            if (typeof obj.breakInput !== 'undefined')
                t.breakInput(obj.breakInput);
            if (typeof obj.labelPosition !== 'undefined')
                t.labelPosition(obj.labelPosition);
            if (typeof obj.labelWidth !== 'undefined')
                t.labelWidth(obj.labelWidth);
            if (typeof obj.change === 'function')
                t.change(obj.change);
            if (typeof obj.enter === 'function')
                t.enter(obj.enter);
            if (typeof obj.needModify !== 'undefined')
                t.needModify(obj.needModify);
            if (typeof obj.val !== 'undefined' || typeof obj.value !== 'undefined')
                t.val(obj.val || obj.value);
            if (typeof obj.validator !== 'undefined')
                t.validator(obj.validator);
            if (typeof obj.validate !== 'undefined')
                t.validate(obj.validate);
            if (typeof obj.focus !== 'undefined')
                t.focus(obj.focus);
            t.initParameter(obj);
        }
    };

    var p = Input.prototype;
    p.change = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.change = func;
        } else {
            t.d.change.apply(this, [this, this.d.$widget]);
        }
        return t;
    };
    p.enter = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.enter = func;
        } else {
            t.d.enter.apply(this, [this, this.d.$widget]);
        }
        return t;
    };
    p.focus = function () {
        var t = this;
        t.d.$widgetInput.focus();
        return t;
    };
    p.disable = function () {
        var t = this;
        t.d.$widgetInput.prop('disabled', true);
        if (t.d.multiselect)
            t.multiselect('disable');
        return t;
    };
    p.enable = function () {
        var t = this;
        t.d.$widgetInput.prop('disabled', false);
        if (t.d.multiselect)
            t.multiselect('enable');
        return t;
    };
    p.checked = function (checked) {
        var t = this;
        if (typeof checked !== 'undefined') {
            checked = $A.parseBoolean(checked);
            if (t.d.hasObject){
                t.d.$widgetInput.prop('checked', checked);
            }else {
                t.d.createFunctions.push(function () {
                    t.d.$widgetInput.prop('checked', checked);
                });
            }
            return t;
        }
        return t.input().is(':checked');
    };
    p.check = function () {
        var t = this;
        t.d.$widgetInput.prop('checked', true).trigger('change');
        return t;
    };
    p.uncheck = function () {
        var t = this;
        t.d.$widgetInput.prop('checked', false).trigger('change');
        return t;
    };
    p.label = function (label) {
        var t = this;
        if (typeof label !== 'undefined') {
            t.d.label = label;
            t.d.$widgetLabel.html(label).ashow();
            return t;
        }
        return t.d.label;
    };
    p.labelAfter = function (labelAfter) {
        var t = this;
        if (typeof labelAfter !== 'undefined') {
            t.d.labelAfter = labelAfter;
            t.d.$widgetLabelAfter.html(labelAfter).ashow();
            return t;
        }
        return t.d.labelAfter;
    };
    p.needModify = function (needModify) {
        var t = this;
        if (typeof needModify !== 'undefined') {
            t.d.needModify = $A.parseBoolean(needModify);
            return t;
        }
        return t.d.needModify;
    };
    p.labelPosition = function (labelPosition) {
        var t = this;
        if (typeof labelPosition !== 'undefined') {
            t.d.labelPosition = labelPosition;
            //t.d.$widgetLabel.html(label).ashow();
            if(t.d.labelPosition === 'left'){
                t.d.$widgetLabel.insertBefore(t.d.$widgetInput);
            }else{
                t.d.$widgetLabel.insertAfter(t.d.$widgetInput);
            }
            return t;
        }
        return t.d.labelPosition;
    };
    p.labelWidth = function (labelWidth) {
        var t = this;
        if (typeof labelWidth !== 'undefined') {
            t.d.labelWidth = labelWidth;
            t.d.$widgetLabel.css('width', labelWidth);
            return t;
        }
        return t.d.labelWidth;
    };
    p.help = function (help) {
        var t = this;
        if (typeof help !== 'undefined') {
            t.d.help = help;
            t.d.$widgetHelpContentInner.html(help);
            t.d.$widgetHelp.ashow();
            
            /*Sizing input if it has help icon*/
            t.d.$widgetInputBox.addClass('automizy-input-has-help');
            
            return t;
        }
        return t.d.help;
    };
    p.val = p.value = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.value = value;
            if (t.d.type === 'file')
                t.input().data('value', value);
            else if(t.d.type === 'html')
                t.input().html(value);
            else
                t.input().val(value);
            if(t.d.multiselect){
                t.input().multiselect('refresh');
            }
            if(t.d.needModify){
                t.input().data('originalValue', value);
            }
            return t;
        }
        if(t.d.type === 'html'){
            return t.input().html();
        }
        return t.input().val();
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            t.d.$widgetInput.attr('name', name);
            return t;
        }
        return t.d.$widgetInput.attr('name');
    };
    p.placeholder = function (placeholder) {
        var t = this;
        if (typeof placeholder !== 'undefined') {
            t.d.placeholder = placeholder;
            t.d.$widgetInput.attr('placeholder', placeholder);
            return t;
        }
        return t.d.placeholder;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            if (t.type() === 'file') {
                t.widget().add(t.d.$widgetInputBox).width('100%');
                t.input().data('table').width(width);
            } else {
                t.widget().width('auto');
                t.input().add(t.d.$widgetInputBox).width(width);
                if(t.d.multiselect){
                    t.input().next().css({maxWidth:width});
                }
            }
            return t;
        }
        return t.d.width;
    };
    p.height = function (height) {
        var t = this;
        if (typeof height !== 'undefined') {
            t.d.height = height;
            t.widget().height('auto');
            t.input().add(t.d.$widgetInputBox).height(height);
            return t;
        }
        return t.d.height;
    };
    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            type = type.toLowerCase();
            t.d.type = type;
            var attributes = t.d.$widgetInput.getAttributes();
            delete attributes.type;
            delete attributes.checked;
            if (t.d.type === 'select') {
                t.d.$widgetInput = $('<select></select>');
            } else if (t.d.type === 'textarea') {
                t.d.$widgetInput = $('<textarea></textarea>');
            } else if (t.d.type === 'html') {
                t.d.$widgetInput = $('<span></span>');
            } else if (t.d.type === 'date') {
                t.datepicker();
            } else if (t.d.type === 'datetime') {
                t.datetimepicker();
            } else {
                t.d.$widgetInput = $('<input/>').attr('type', t.d.type);
            }
            t.d.$widgetInputBox.ashow().empty();
            t.d.$widgetInput.attr(attributes).show();
            t.d.$widgetInput.appendTo(t.d.$widgetInputBox);
            t.d.$widgetInput.on('change keyup paste', function () {});
            setTimeout(function(){
                t.d.$widgetInput.on('change keyup paste', function () {
                    t.validate();
                    t.change();
                }).keypress(function(e) {
                    if (e.which == 13) {
                        t.enter();
                    }
                });
            }, 10);
            t.d.$widgetInput.click(function () {
                t.click();
            });
            if (t.d.type === 'hidden' && t.d.label.length < 1) {
                t.d.createFunctions.push(function () {
                    t.widget().ahide();
                });
            } else if (type === 'file') {
                t.d.createFunctions.push(function () {
                    $A.skin(t);
                });
            } else if (type === 'slider') {
                t.d.createFunctions.push(function () {
                    $A.skin(t);
                });
            }
            return t;
        }
        return t.d.type;
    };
    p.datepicker = function () {
        var t = this;
        if (!require.defined('jqueryUI')) {
            console.warn('Missing plugin!');
            return t;
        }
        t.d.isDatepicker = true;
        var $w = t.d.$widgetInput;

        var freturn = $w.datepicker.apply($w, arguments);
        return (freturn !== $w) ? freturn : t;
    };
    p.datetimepicker = function () {
        var t = this;
        if (!require.defined('jqueryUI', 'timepicker')) {
            console.warn('Missing plugin!');
            return t;
        }
        t.d.isDatetimepicker = true;
        var $w = t.d.$widgetInput;

        var freturn = $w.datetimepicker.apply($w, arguments);
        return (freturn !== $w) ? freturn : t;
    };
    p.timepicker = function () {
        var t = this;
        if (!require.defined('jqueryUI', 'timepicker')) {
            console.warn('Missing plugin!');
            return t;
        }
        t.d.isTimepicker = true;
        var $w = t.d.$widgetInput;

        var freturn = $w.timepicker.apply($w, arguments);
        return (freturn !== $w) ? freturn : t;
    };
    p.multiple = function (multiple) {
        var t = this;
        if (typeof multiple !== 'undefined') {
            multiple = $A.parseBoolean(multiple);
            if (multiple)
                t.d.$widgetInput.attr('multiple', 'multiple');
            else
                t.d.$widgetInput.removeAttr('multiple');
            t.d.multiple = multiple;
            return t;
        }
        t.d.$widgetInput.attr('multiple', 'multiple');
        t.d.multiple = true;

        return t.d.multiple;
    };
    p.multiselect = function () {
        var t = this;
        var args = arguments;
        if (typeof $().multiselect === "undefined") {
            console.warn('Missing plugin!');
            return t;
        }
        if (!t.d.hasObject) {
            t.d.createFunctions.push(function () {
                p.multiselect.apply(t, args);
                t.width(t.d.width);
            });
            return t;
        }
        t.d.multiselect = true;
        var $w = t.d.$widgetInput;
        setTimeout(function () {
            $w.multiselect('refresh');
        }, 1);
        if (args.length <= 0 || args[0] === true) {
            if (t.d.multiple) {
                args[0] = $A.d.defines.input.setupSelectSearchCheckObj;
            } else {
                args[0] = $A.d.defines.input.setupSelectObj;
            }
        }

        var freturn = $w.multiselect.apply($w, args);

        return (freturn !== $w) ? freturn : t;
    };

    p.options = p.items = function (arr) {
        var t = this;
        if (typeof arr !== 'undefined') {
            t.d.$widgetInput.find('option').remove();
            t.addItems(arr);
            return t;
        }
        return t.d.items;
    };

    p.addOptions = p.addItems = function (arr, before) {
        var t = this;
        var val = t.val();
        var before = before || false;
        if (t.d.type !== 'select') {
            console.warn('Bad type!');
        } else if (typeof arr === 'undefined') {
            console.warn('Bad parameters!');
        } else if (typeof arr === 'object' || typeof arr === 'array') {
            if (!$.isArray(arr)) {
                var na = [];
                for (var i in arr) {
                    na.push([i, arr[i]]);
                }
                arr = na;
            }
            if ($.isArray(arr)) {
                var values = [];
                for (var i = 0; i < arr.length; i++) {
                    var $option = $('<option></option>');

                    var value = arr[i];
                    if(typeof value !== 'string' && typeof value !== 'number'){
                        value = arr[i][0];
                    }

                    var text = arr[i];
                    if(typeof text !== 'string' && typeof text !== 'number'){
                        text = arr[i][1] || arr[i][0];
                    }

                    $option.attr('value', value);
                    $option.html(text);
                    if (typeof arr[i] !== 'string' && typeof arr[i] !== 'number' && typeof arr[i][2] !== 'undefined' && $A.parseBoolean(arr[i][2]))
                        values.push(arr[i][0]);
                    if (before) {
                        var $of = t.d.$widgetInput.find('option:first');
                        if ($of.val() == 0)
                            $option.insertAfter($of);
                        else
                            $option.prependTo(t.d.$widgetInput);
                    } else {
                        $option.appendTo(t.d.$widgetInput);
                    }
                    t.d.items[value] = text;
                }
                //t.d.$widgetInput.val(values);
            }
        }
        if (t.d.multiselect)
            t.multiselect('refresh');
        t.val(values || val);
        return t;
    };
    p.option = p.addOption = p.addItem = function (key, value) {
        var t = this;
        return t.addOptions([[key, (value || key)]]);
    };
    p.addOptionBefore = p.addItemBefore = function (key, value) {
        var t = this;
        return t.addOptions([[key, (value || key)]], true);
    };
    p.accept = function (arr) {
        var t = this;
        if (typeof arr !== 'undefined') {
            if (typeof arr === 'string') {
                t.d.accept = arr.split(',');
                t.d.$widgetInput.attr('accept', arr);
            } else {
                t.d.accept = arr;
                t.d.$widgetInput.attr('accept', arr.join(','));
            }
            return t;
        }
        return t.d.accept;
    };
    p.readonly = function (readonly) {
        var t = this;
        if (typeof readonly !== 'undefined') {
            readonly = $A.parseBoolean(readonly);
            t.d.readonly = readonly;
            t.d.$widgetInput.attr('readonly', readonly);
            return t;
        }
        return t.d.readonly;
    };
    p.newRow = function (newRow) {
        var t = this;
        if (typeof newRow !== 'undefined') {
            newRow = $A.parseBoolean(newRow);
            t.d.newRow = newRow;
            if (newRow) {
                t.d.$widget.addClass('new-row');
            } else {
                t.d.$widget.removeClass('new-row');
            }
            return t;
        }
        return t.d.newRow;
    };
    p.validator = function (validator) {
        var t = this;
        if (typeof validator !== 'undefined') {
            if (validator instanceof $A.m.Validator) {
                t.d.validator = validator;
            } else {
                t.d.validator.set(validator);
            }
            return t;
        }
        return t.d.validator;
    };
    p.validate = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.validate = func;
        } else {
            var a = t.validator().execute(t.val());
            if (!a) {
                t.d.$widgetInputBoxError.html(t.validator().errors().join('<br/>'));
                t.d.$widget.addClass('error');
            } else {
                t.d.$widget.removeClass('error');
            }
            t.d.validate.apply(this, [a, this, this.d.$widget]);
            return a;
        }
        return t;
    };

    p.breakInput = function (breakInput) {
        var t = this;
        if (typeof breakInput !== 'undefined') {
            breakInput = $A.parseBoolean(breakInput);
            t.d.breakInput = breakInput;
            if (breakInput) {
                t.d.$widgetInputBox.addClass('new-row');
            } else {
                t.d.$widgetInputBox.removeClass('new-row');
            }
            return t;
        }
        return t.d.breakInput;
    };
    p.click = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.click = func;
        } else {
            t.d.click.apply(this, [this, this.d.$widget]);
        }
        return t;
    };
    p.input = function () {
        var t = this;
        return t.d.$widgetInput;
    };
    p.errorBox = function () {
        var t = this;
        return t.d.$widgetInputBoxError;
    };

    $A.initBasicFunctions(Input, "Input");
});
