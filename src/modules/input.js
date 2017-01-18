define([
    'automizy/core',
    'automizy/defines/input',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/getUniqueString',
    'automizy/functions/parseBoolean',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
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
            $widgetLabelAfter: $('<label class="automizy-input-label-after"></label>'),
            $widgetHelp: $('<img src="' + $A.images.helpIcon + '" class="automizy-input-help" />'),
            $widgetHelpContent: $('<div class="automizy-input-help-content"><img src="' + $A.images.helpArrow + '" class="automizy-input-help-content-arrow" /></div>'),
            $widgetHelpContentInner: $('<span></span>'),
            $widgetInputIcon: $('<span class="automizy-input-icon"></span>'),
            $input: $('<input />'),
            $textarea: $('<textarea></textarea>'),
            $select: $('<select></select>'),
            $loadingBox: $('<div class="automizy-input-loading-box"></div>'),
            specialElements: [],
            type: 'text',
            skin: 'simple-automizy',
            triggers: {
                enter: 0,
                change: 0,
                focus: 0,
                blur: 0,
                click: 0
            },
            icon: false,
            iconPosition: 'right',
            multiple: false,
            multiselect: false,
            readonly: false,
            hasObject: false,
            isDatepicker: false,
            newRow: true,
            breakInput: false,
            breakLabel:false,
            needModify: false,
            disabled: false,
            float: 'none',
            labelPosition: 'left',
            labelWidth: '',
            value: '',
            placeholder: '',
            name: '',
            width: '100%',
            height: 'auto',
            label: '',
            labelAfter: '',
            accept: [],
            items: {},
            itemsArray: [],
            groups: {},
            activeGroup: false,
            validate: function () {
            },
            validationEvents: '',
            enableShowSuccess: false,
            createFunctions: [],
            automizySelect: false,
            id: 'automizy-input-' + $A.getUniqueString(),

            change: function () { //change keyup paste
                if (t.change().returnValue() === false) {
                    return false;
                }
            },
            focus: function () {
                if (t.focus().returnValue() === false) {
                    return false;
                }
            }
        };
        t.f = {};
        t.init();

        t.d.$input.addClass('automizy-input');
        t.d.$textarea.addClass('automizy-input');
        t.d.$select.addClass('automizy-input');
        t.d.$widgetLabel.appendTo(t.d.$widget).attr('for', t.d.id + '-input').ahide();
        t.d.$widgetInput.appendTo(t.d.$widgetInputBox).attr('id', t.d.id + '-input');
        t.d.$loadingBox.appendTo(t.d.$widgetInputBox).html($A.d.elements.$loading.clone());
        t.d.$widgetInputBox.appendTo(t.d.$widget);
        t.d.$widgetInputIcon.appendTo(t.d.$widgetInputBox);
        t.d.$widgetLabelAfter.appendTo(t.d.$widgetInputBox).attr('for', t.d.id + '-input').ahide();
        t.d.$widgetInputBoxError.appendTo(t.d.$widgetInputBox);
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
        t.d.$widget.attr('type', 'text').attr('id', t.id()).addClass('automizy-skin-' + t.d.skin);
        t.setupJQueryEvents();

        if (typeof obj !== 'undefined') {
            if (typeof obj.label !== 'undefined') {
                t.label(obj.label);
            }
            if (typeof obj.type !== 'undefined') {
                t.type(obj.type);
            }
            if (typeof obj.disable !== 'undefined') {
                if (obj.disable) {
                    t.disable();
                } else {
                    t.enable();
                }
            }
            if (typeof obj.enable !== 'undefined') {
                if (obj.enable) {
                    t.enable();
                } else {
                    t.disable();
                }
            }
            if (typeof obj.checked !== 'undefined') {
                t.checked(obj.checked);
            }
            if (typeof obj.click !== 'undefined') {
                t.click(obj.click);
            }
            if (typeof obj.help !== 'undefined') {
                t.help(obj.help);
            }
            if (typeof obj.height !== 'undefined') {
                t.height(obj.height);
            }
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.multiple !== 'undefined') {
                t.multiple(obj.multiple);
            }
            if (typeof obj.datepicker !== 'undefined') {
                t.datepicker(obj.datepicker);
            }
            if (typeof obj.multiselect !== 'undefined' && obj.multiselect !== false) {
                t.multiselect(obj.multiselect);
            }
            if (typeof obj.options !== 'undefined') {
                t.options(obj.options);
            }
            if (typeof obj.accept !== 'undefined') {
                t.accept(obj.accept);
            }
            if (typeof obj.readonly !== 'undefined') {
                t.readonly(obj.readonly);
            }
            if (typeof obj.newRow !== 'undefined') {
                t.newRow(obj.newRow);
            }
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }
            if (typeof obj.placeholder !== 'undefined') {
                t.placeholder(obj.placeholder);
            }
            if (typeof obj.breakInput !== 'undefined') {
                t.breakInput(obj.breakInput);
            }
            if (typeof obj.breakLabel !== 'undefined') {
                t.breakLabel(obj.breakLabel);
            }
            if (typeof obj.labelPosition !== 'undefined') {
                t.labelPosition(obj.labelPosition);
            }
            if (typeof obj.labelWidth !== 'undefined') {
                t.labelWidth(obj.labelWidth);
            }
            if (typeof obj.float !== 'undefined') {
                t.float(obj.float);
            }
            if (typeof obj.change === 'function') {
                t.change(obj.change);
            }
            if (typeof obj.keyup === 'function') {
                t.keyup(obj.keyup);
            }
            if (typeof obj.enter === 'function') {
                t.enter(obj.enter);
            }
            if (typeof obj.focus === 'function') {
                t.focus(obj.focus);
            }
            if (typeof obj.blur === 'function') {
                t.blur(obj.blur);
            }
            if (typeof obj.disabled === 'boolean') {
                t.disabled(obj.disabled);
            }
            if (typeof obj.needModify !== 'undefined') {
                t.needModify(obj.needModify);
            }
            if (typeof obj.val !== 'undefined' || typeof obj.value !== 'undefined') {
                t.val(obj.val || obj.value);
            }
            if (typeof obj.validator !== 'undefined') {
                t.validator(obj.validator);
            }
            if (typeof obj.validate !== 'undefined') {
                t.validate(obj.validate);
            }
            if (typeof obj.validationEvents !== 'undefined'){
                t.validationEvents(obj.validationEvents);
            }
            if (typeof obj.enableShowSuccess !== 'undefined') {
                t.enableShowSuccess(obj.enableShowSuccess);
            }
            if (typeof obj.focus !== 'undefined') {
                t.focus(obj.focus);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
            if (typeof obj.iconPosition !== 'undefined') {
                t.iconPosition(obj.iconPosition);
            }
            if (typeof obj.iconClick === 'function') {
                t.iconClick(obj.iconClick);
            }
            if(typeof obj.automizySelect !== 'undefined'){
                t.d.automizySelect = obj.automizySelect;
            }
            if (typeof obj.labelAfter !== 'undefined') {
                t.labelAfter(obj.labelAfter);
            }
            t.initParameter(obj);
        }
        if(t.d.automizySelect){
            t.automizySelect();
        }
    };

    var p = Input.prototype;
    p.setupJQueryEvents = function () {
        var t = this;
        t.d.$widgetInput
            .unbind('change', t.d.change).bind('change', t.d.change)
            .unbind('focus', t.d.focus).bind('focus', t.d.focus)
            .blur(function () {
            if (t.blur().returnValue() === false) {
                return false;
            }
        }).keypress(function (e) {
            if (e.which == 13) {
                if (t.enter().returnValue() === false) {
                    return false;
                }
            }
        }).keyup(function (e) {
            if (t.keyup().returnValue() === false) {
                return false;
            }
        }).click(function () {
            if (t.click().returnValue() === false) {
                return false;
            }
        });
    };
    p.disabled = function (disabled) {
        var t = this;
        if (typeof disabled !== 'undefined') {
            t.d.disabled = $A.parseBoolean(disabled);
            t.input().prop('disabled', t.d.disabled);
            t.d.$widget.toggleClass('disabled', t.d.disabled);
            return t;
        }
        return t.d.disabled;
    };
    p.enter = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('enter', func, name, life);
        } else {
            var a = t.runFunctions('enter');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.change = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('change', func, name, life);
        } else {
            var a = t.runFunctions('change');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.keyup = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('keyup', func, name, life);
        } else {
            var a = t.runFunctions('keyup');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.focus = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('focus', func, name, life);
        } else {
            var a = t.runFunctions('focus');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.blur = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('blur', func, name, life);
        } else {
            var a = t.runFunctions('blur');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.click = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('click', func, name, life);
        } else {
            var a = t.runFunctions('click');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };

    p.disable = function () {
        var t = this;
        t.d.$widgetInput.prop('disabled', true);
        if (t.d.multiselect) {
            t.multiselect('disable');
        }
        return t;
    };
    p.enable = function () {
        var t = this;
        t.d.$widgetInput.prop('disabled', false);
        if (t.d.multiselect) {
            t.multiselect('enable');
        }
        return t;
    };
    p.checked = function (checked) {
        var t = this;
        if (typeof checked !== 'undefined') {
            checked = $A.parseBoolean(checked);
            if (t.d.hasObject) {
                t.d.$widgetInput.prop('checked', checked);
            } else {
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
            if (label instanceof $A.m.Button || label instanceof $A.m.Input) {
                label.drawTo(t.d.$widgetLabelAfter.empty());
            }else if (label instanceof jQuery) {
                label.appendTo(t.d.$widgetLabel.empty());
            } else {
                t.d.$widgetLabel.html(label);
            }
            t.d.$widgetLabel.ashow();
            return t;
        }
        return t.d.label;
    };
    p.labelAfter = function (labelAfter) {
        var t = this;
        if (typeof labelAfter !== 'undefined') {
            t.d.labelAfter = labelAfter;
            if (labelAfter instanceof $A.m.Button || labelAfter instanceof $A.m.Input) {
                labelAfter.drawTo(t.d.$widgetLabelAfter.empty());
            }else if (labelAfter instanceof jQuery) {
                labelAfter.appendTo(t.d.$widgetLabelAfter.empty());
            } else {
                t.d.$widgetLabelAfter.html(labelAfter);
            }
            t.d.$widgetLabelAfter.ashow();
            setTimeout(function () {
                if(t.icon() !== false && t.iconPosition() === 'right'){
                    t.input().css('max-width','calc(100% - 34px - '+t.d.$widgetLabelAfter.outerWidth()+'px)');
                }
                else{
                    t.input().css('max-width','calc(100% - '+t.d.$widgetLabelAfter.outerWidth()+'px)');
                }

            },10)
            return t;
        }
        return t.d.labelAfter;
    };
    p.float = function (float) {
        var t = this;
        if (typeof float !== 'undefined') {
            t.d.float = float;
            t.d.$widget.css('float', float);
            return t;
        }
        return t.d.float;
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
            if (t.d.labelPosition === 'left') {
                t.d.$widgetLabel.insertBefore(t.d.$widgetInput);
            } else {
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
            if (typeof value === 'function') {
                value = value.call(t, [t]);
            }
            t.d.value = value;
            if (t.d.type === 'file') {
                t.input().data('value', value);
            } else if (t.d.type === 'html') {
                t.input().html(value);
            } else {
                t.input().val(value);
            }
            if (t.d.multiselect) {
                t.input().multiselect().multiselect('refresh');
            }
            if (t.d.needModify) {
                t.input().data('originalValue', value);
            }
            return t;
        }
        if (t.d.type === 'html') {
            return t.input().html();
        }
        return t.input().val();
    };
    p.valEq = function (value) {
        var t = this;
        if (t.d.itemsArray.length < value) {
            return t;
        }
        if (typeof t.d.itemsArray[value] === 'undefined') {
            return t;
        }
        var value = t.d.itemsArray[value][0];
        t.val(value);
        return t;
    };
    p.optionValue = p.optionVal = function () {
        return this.options()[this.val()];
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
                if (t.d.multiselect) {
                    t.input().next().css({maxWidth: width});
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
            if (t.d.type === 'select' || t.d.type === 'automizy-select') {
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
            t.widget().attr('type',t.d.type);
            t.d.$loadingBox.appendTo($A.d.elements.$tmp);
            t.d.$widgetInputBox.ashow().empty();
            t.d.$widgetInput.attr(attributes).show();
            t.d.$widgetInput.appendTo(t.d.$widgetInputBox);
            t.d.$widgetInputBoxError.appendTo(t.d.$widgetInputBox);
            t.d.$loadingBox.appendTo(t.d.$widgetInputBox);
            t.d.$widgetInputIcon.appendTo(t.d.$widgetInputBox);
            t.d.$widgetLabelAfter.appendTo(t.d.$widgetInputBox)
            setTimeout(function () {
                t.setupJQueryEvents();
            }, 10);
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
    p.displayType = function (type, settings) {
        var t = this;
        var input = t.input();
        var type = type || false;
        if (!type) {
            return t;
        }
        var settings = settings || false;
        var thisType = t.type();
        if (thisType === 'select' || thisType === 'automizy-select') {
            t.d.multiselect = false;
            t.multiple(false);
        }
        if (t.input().hasClass('hasDatepicker')) {
            t.input().datepicker("destroy");
            t.input().removeClass("hasDatepicker");
        }
        type = type.toLowerCase();
        if (type === 'text' || type === 'string') {
            t.type('text');
        } else if (type === 'number' || type === 'integer') {
            t.type('number');
        } else if (type === 'datetime') {
            t.type('text');
            t.input().datetimepicker(settings || {
                    dateFormat: 'yy-mm-dd',
                    timeFormat: 'HH:mm:ss',
                    changeYear: true,
                    changeMonth: true,
                    showOtherMonths: true,
                    selectOtherMonths: false,
                    yearRange: '1900:c',
                    showButtonPanel: true,
                    showSecond: true,
                    showMillisec: false,
                    showMicrosec: false,
                    showTimezone: false,
                    showTime: true,
                    controlType: 'slider',
                    currentText: $A.translate('Now'),
                    closeText: $A.translate('Save')
                });
        } else if (type === 'select' || type === 'automizy-select') {
            t.type('select');
        } else if (type === 'multiple_choices') {
            t.type('select').multiple(true).multiselect(true);
        }
        return t;
    };
    p.datepicker = function () {
        var t = this;
        if (typeof $.ui === 'undefined') {
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
        if (typeof $.ui === 'undefined' || typeof $().timepicker === 'undefined') {
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
        if (typeof $.ui === 'undefined' || typeof $().timepicker === 'undefined') {
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
            if (multiple) {
                t.d.$widgetInput.attr('multiple', 'multiple');
            } else {
                t.d.$widgetInput.removeAttr('multiple');
            }
            t.d.multiple = multiple;
            return t;
        }
        t.d.$widgetInput.attr('multiple', 'multiple');

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
            $w.multiselect().multiselect('refresh');
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
            t.d.items = {};
            t.d.itemsArray = [];
            t.removeOptions();
            t.addOptions(arr);
            return t;
        }
        return t.d.items;
    };

    p.removeOptions = function () {
        var t = this;
        t.d.$widgetInput.find('option, optgroup').remove();
        return t;
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
                    var inVal = arr[i];
                    var inSelected = false;
                    if ((typeof inVal === 'object' || typeof inVal === 'array') && !$.isArray(inVal)) {
                        inSelected = inVal.selected;
                        inVal = inVal.value;
                    }
                    na.push([i, inVal, inSelected]);
                }
                arr = na;
            }
            if ($.isArray(arr)) {
                var values = [];
                for (var i = 0; i < arr.length; i++) {
                    var $option = $('<option></option>');

                    var value = arr[i];
                    if (typeof value !== 'string' && typeof value !== 'number') {
                        value = arr[i][0];
                    }

                    var text = arr[i];
                    if (typeof text !== 'string' && typeof text !== 'number') {
                        text = arr[i][1] || arr[i][0];
                    }

                    $option.attr('value', value);
                    $option.html(text);
                    if (typeof arr[i] !== 'string' && typeof arr[i] !== 'number' && typeof arr[i][2] !== 'undefined' && $A.parseBoolean(arr[i][2])) {
                        values.push(arr[i][0]);
                    }
                    if (before) {
                        var $container = t.d.$widgetInput;
                        if (!$.isEmptyObject(t.d.groups) && t.d.activeGroup !== false && typeof t.d.groups[t.d.activeGroup] !== 'undefined') {
                            $container = t.d.groups[t.d.activeGroup];
                        }
                        var $of = $container.find('option:first');
                        if ($of.val() == 0) {
                            $option.insertAfter($of);
                        } else {
                            $option.prependTo($container);
                        }
                    } else {
                        if ($.isEmptyObject(t.d.groups) || t.d.activeGroup === false || typeof t.d.groups[t.d.activeGroup] === 'undefined') {
                            $option.appendTo(t.d.$widgetInput);
                        } else {
                            $option.appendTo(t.d.groups[t.d.activeGroup]);
                        }
                    }
                    t.d.items[value] = text;
                }
                //t.d.$widgetInput.val(values);
                t.d.itemsArray = arr;
            }
        }
        if (t.d.multiselect) {
            t.multiselect().multiselect('refresh');
        }
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
    p.group = function (groupName) {
        var t = this;

        if (typeof groupName !== 'undefined') {
            if (groupName === false) {
                t.d.activeGroup = false;
            } else if (typeof t.d.groups[groupName] !== 'undefined') {
                t.d.activeGroup = groupName;
            } else {
                t.d.groups[groupName] = $('<optgroup label="' + groupName + '"></optgroup>').appendTo(t.d.$widgetInput);
                t.d.activeGroup = groupName;
            }
            return t;
        }

        return t.d.activeGroup;
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
            if (validator === false) {
                delete t.d.validator;
            } else if (validator instanceof $A.m.Validator) {
                t.d.validator = validator;
            } else {
                if(typeof t.d.validator === 'undefined'){
                    t.d.validator = $A.newValidator();
                }
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
            var a = true;
            if (typeof t.d.validator !== 'undefined' && t.d.validator !== false) {
                a = t.validator().execute(t.val());
                if (!a) {
                    t.showError(t.validator().errors().join('<br/>'));
                    if(typeof t.validationEvents() === 'undefined' || t.validationEvents() === ''){
                    t.validationEvents('keyup change paste');
                        t.enableShowSuccess(true);
                    }
                } else {
                    t.hideError();
                    if(t.enableShowSuccess()){
                    t.showSuccess();
                }
                    t.enableShowSuccess(false);
                }
                t.d.validate.apply(this, [a, this, this.d.$widget]);
            }
            return a;
        }
        return t;
    };

    p.validationEvents = function (validationEvents) {
        var t = this;
        if (typeof validationEvents !== 'undefined') {

            /*Turning off old validation events*/
            var oldValidationEvents = t.d.validationEvents;
            t.d.$widgetInput.off(oldValidationEvents, validateNow);

            /*Setting new validation events*/
            t.d.validationEvents = validationEvents;
            t.d.$widgetInput.on(validationEvents, validateNow);

            function validateNow() {
                t.validate();
                t.change();
            }

            return this;
        }
        return this.d.validationEvents;
    };

    p.breakLabel = function (breakLabel) {
        var t = this;
        if (typeof breakLabel !== 'undefined') {
            breakLabel = $A.parseBoolean(breakLabel);
            t.d.breakLabel = breakLabel;
            if (breakLabel) {
                t.d.$widgetLabel.addClass('new-row');
            } else {
                t.d.$widgetLabel.removeClass('new-row');
            }
            return t;
        }
        return t.d.breakLabel;
    };
    p.breakInput = function (breakInput) {
        var t = this;
        if (typeof breakInput !== 'undefined') {
            breakInput = $A.parseBoolean(breakInput);
            t.d.breakInput = breakInput;
            if (breakInput) {
                t.d.$widgetInputBox.addClass('new-row');
                t.d.$widgetLabel.addClass('new-row');
            } else {
                t.d.$widgetInputBox.removeClass('new-row');
                t.d.$widgetLabel.removeClass('new-row');
            }
            return t;
        }
        return t.d.breakInput;
    };
    p.input = function () {
        var t = this;
        return t.d.$widgetInput;
    };
    p.showError = p.error = function (msg) {
        var t = this;
        if (typeof msg !== 'undefined') {
            t.errorBox().html(msg);
        }
        t.hideSuccess();
        t.widget().addClass('error');
        return t;
    };
    p.hideError = function () {
        var t = this;
        t.widget().removeClass('error');
        return t;
    };

    p.showSuccess = function(){
        var t = this;
        t.hideError();
        t.widget().addClass('valid');
        return t;
    };

    p.hideSuccess = function(){
        var t = this;
        t.widget().removeClass('valid');
        return t;
    };

    p.enableShowSuccess = function (enable){
        var t = this;
        if(typeof enable !== 'undefined'){
            var enable = $A.parseBoolean(enable);
            t.d.enableShowSuccess = enable;
        }
        return t.d.enableShowSuccess;

    }

    p.errorBox = function () {
        return this.d.$widgetInputBoxError;
    };
    p.rowSpacing = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.widget().css('padding-bottom', value);
            return t;
        }
        return t.widget().css('padding-bottom');
    };
    p.loadingOn = function () {
        var t = this;
        t.d.$loadingBox.show();
        return t;
    };
    p.loadingOff = function () {
        var t = this;
        t.d.$loadingBox.hide();
        return t;
    };
    p.thin = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-input-thin');
                return t;
            }
        }
        t.widget().addClass('automizy-input-thin');
        return t;
    };
    p.noPadding = function () {
        var t = this;
        t.widget().css({
            padding:0
        });
        return t;
    };
    p.icon = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            if (value === false) {
                t.d.$widgetInputIcon.css('display', 'none');
                t.d.$widgetInputBox.removeClass('automizy-icon-left');
                t.d.$widgetInputBox.removeClass('automizy-icon-right');
            } else if (value === true) {
                t.d.$widgetInputIcon.css('display', 'inline-block');
                t.iconPosition(t.d.iconPosition || "right");
            } else {
                t.d.icon = value;
                t.d.$widgetInputIcon.addClass(value);
                t.d.$widgetInputIcon.css('display', 'inline-block');
                t.iconPosition(t.d.iconPosition || "right");
            }
            return t;
        }

        return t.d.icon;
    };
    p.iconPosition = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = value.toLowerCase();
            if (value === 'left') {
                t.d.iconPosition = 'left';
                t.d.$widgetInputBox.addClass('automizy-icon-left');
                t.d.$widgetInputBox.removeClass('automizy-icon-right');
            } else {
                t.d.iconPosition = 'right';
                t.d.$widgetInputBox.removeClass('automizy-icon-left');
                t.d.$widgetInputBox.addClass('automizy-icon-right');
            }
            return t;
        }
        return t.d.iconPosition;
    };
    p.iconClick = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.$widgetInputBox.addClass('automizy-icon-clickable');
            t.d.$widgetInputIcon.click(function () {
                func.call(t, [t]);
            });
            return t;
        }
        t.d.$widgetInputIcon.click();
        return t;
    };
    p.automizySelect = function () {
        return this.input().automizySelect();
    };


    $A.initBasicFunctions(Input, "Input", ["change", "keyup", "enter", "focus", "blur", "click"]);
});
