define([
    'automizy/core',
    'automizy/defines/input',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/getUniqueString',
    'automizy/functions/parseBoolean',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/modules/validator'
], function () {
    var Input2 = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-input2"></div>'),
            $labelTopBox: $('<div class="automizy-input2-top-label-box automizy-hide"></div>'),
            $inputTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-input2-table"></table>'),
            $inputRow: $('<tr class="automizy-input2-tr"></tr>'),
            $labelBeforeCell: $('<td class="automizy-input2-td automizy-input2-label-before-cell automizy-hide"></td>'),
            $inputIconLeftCell: $('<td class="automizy-input2-td automizy-input2-icon-left-cell automizy-hide"></td>'),
            $inputCell: $('<td class="automizy-input2-td automizy-input2-input-cell"></td>'),
            $loadingCell: $('<td class="automizy-input2-td automizy-input2-input-loading-cell automizy-hide"></td>'),
            $inputIconRightCell: $('<td class="automizy-input2-td automizy-input2-icon-right-cell automizy-hide"></td>'),
            $labelAfterCell: $('<td class="automizy-input2-td automizy-input2-label-after-cell automizy-hide"></td>'),
            $helpIconCell: $('<td class="automizy-input2-td automizy-input2-help-icon-cell automizy-hide"></td>'),
            $labelBottomBox:$('<div class="automizy-input2-bottom-label-box automizy-hide"></div>'),
            $errorBox: $('<div class="automizy-input2-error-box automizy-hide"></div>'),

            $labelTop: $('<label class="automizy-input2-label-top"></label>'),
            $labelBefore: $('<label class="automizy-input2-label-before"></label>'),
            $input:$('<input type="text" class="automizy-input2-input" />'),
            $loading: $('<div class="automizy-input2-loading"></div>'),
            $labelAfter: $('<label class="automizy-input2-label-after"></label>'),
            $helpIcon: $('<span class="automizy-input2-help fa fa-question-circle"></span>'),
            $labelBottom: $('<label class="automizy-input2-label-bottom"></label>'),
            
            type: 'text',
            triggers: {
                enter: 0,
                change: 0,
                focus: 0,
                blur: 0,
                click: 0
            },
            multiple: false,
            readonly: false,
            newRow: true,
            disabled: false,
            labelBeforeWidth: '',
            value: '',
            placeholder: '',
            name: '',
            width: '100%',
            labelTop: '',
            labelBefore: '',
            labelAfter: '',
            labelBottom: '',
            accept: [],
            validate: function () {
            },
            validationEvents: '',
            createFunctions: [],
            automizySelect: false,
            id: 'automizy-input-' + $A.getUniqueString(),
            inputId: 'automizy-input-' + $A.getUniqueString() + '-input',
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
        
        
        
        t.d.$labelTopBox.appendTo(t.d.$widget);
        t.d.$inputTable.appendTo(t.d.$widget);
        t.d.$inputRow.appendTo(t.d.$inputTable);
        t.d.$labelBeforeCell.appendTo(t.d.$inputRow);
        t.d.$inputIconLeftCell.appendTo(t.d.$inputRow);
        t.d.$inputCell.appendTo(t.d.$inputRow);
        t.d.$loadingCell.appendTo(t.d.$inputRow);
        t.d.$inputIconRightCell.appendTo(t.d.$inputRow);
        t.d.$labelAfterCell.appendTo(t.d.$inputRow);
        t.d.$helpIconCell.appendTo(t.d.$inputRow);
        t.d.$labelBottomBox.appendTo(t.d.$widget);
        t.d.$errorBox.appendTo(t.d.$widget);
        
        
        
        t.d.$labelTop.appendTo(t.d.$labelTopBox).attr('for', t.d.inputId);
        t.d.$labelBefore.appendTo(t.d.$labelBeforeCell).attr('for', t.d.inputId);
        t.d.$input.appendTo(t.d.$inputCell).attr('id', t.d.inputId);
        t.d.$loading.appendTo(t.d.$loadingCell);
        t.d.$labelAfter.appendTo(t.d.$labelAfterCell).attr('for', t.d.inputId);
        t.d.$helpIcon.appendTo(t.d.$helpIconCell);
        t.d.$labelBottom.appendTo(t.d.$labelBottomBox).attr('for', t.d.inputId);
        
        
        
        t.d.$widget.attr('type', 'text').attr('id', t.id()).addClass('automizy-skin-' + t.d.skin);
        t.setupJQueryEvents();

        if (typeof obj !== 'undefined') {
            if (typeof obj.labelTop !== 'undefined') {
                t.labelTop(obj.labelTop);
            }
            if (typeof obj.labelBefore !== 'undefined') {
                t.labelBefore(obj.labelBefore);
            }
            if (typeof obj.labelAfter !== 'undefined') {
                t.labelAfter(obj.labelAfter);
            }
            if (typeof obj.labelBottom !== 'undefined') {
                t.labelBottom(obj.labelBottom);
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
            if (typeof obj.iconLeft !== 'undefined') {
                t.iconLeft(obj.iconLeft);
            }
            if (typeof obj.iconLeftClick === 'function') {
                t.iconLeftClick(obj.iconLeftClick);
            }
            if (typeof obj.iconRight !== 'undefined') {
                t.iconRight(obj.iconRight);
            }
            if (typeof obj.iconRightClick === 'function') {
                t.iconRightClick(obj.iconRightClick);
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

    var p = Input2.prototype;
    p.setupJQueryEvents = function () {
        var t = this;
        t.d.$input
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
            t.d.$widget.toggleClass('automizy-disabled', t.d.disabled);
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
        return t;
    };
    p.enable = function () {
        var t = this;
        t.d.$widgetInput.prop('disabled', false);
        return t;
    };
    p.checked = function (checked) {
        var t = this;
        if (typeof checked !== 'undefined') {
            checked = $A.parseBoolean(checked);
            if (t.d.hasObject) {
                t.input().prop('checked', checked);
            } else {
                t.d.createFunctions.push(function () {
                    t.input().prop('checked', checked);
                });
            }
            return t;
        }
        return t.input().is(':checked');
    };
    p.check = function () {
        var t = this;
        t.d.input().prop('checked', true).trigger('change');
        return t;
    };
    p.uncheck = function () {
        var t = this;
        t.d.input().prop('checked', false).trigger('change');
        return t;
    };


    p.labelTop = function (labelTop) {
        var t = this;
        if (typeof labelTop !== 'undefined') {
            t.d.labelTop = labelTop;
            if (typeof t.d.labelTop.drawTo === 'function') {
                t.d.labelTop.drawTo(t.d.$labelTop.empty());
            }else if (typeof t.d.labelTop.appendTo === 'function') {
                t.d.labelTop.appendTo(t.d.$labelTop.empty());
            } else {
                t.d.$labelTop.html(t.d.labelTop);
            }
            t.d.$labelTopBox.ashow();
            return t;
        }
        return t.d.labelTop;
    };
    p.labelBefore = function (labelBefore) {
        var t = this;
        if (typeof labelBefore !== 'undefined') {
            t.d.labelBefore = labelBefore;
            if (typeof t.d.labelBefore.drawTo === 'function') {
                t.d.labelBefore.drawTo(t.d.$labelBefore.empty());
            }else if (typeof t.d.labelBefore.appendTo === 'function') {
                t.d.labelBefore.appendTo(t.d.$labelBefore.empty());
            } else {
                t.d.$labelBefore.html(t.d.labelBefore);
            }
            t.d.$labelBeforeCell.ashow();
            return t;
        }
        return t.d.labelBefore;
    };
    p.labelAfter = function (labelAfter) {
        var t = this;
        if (typeof labelAfter !== 'undefined') {
            t.d.labelAfter = labelAfter;
            if (typeof t.d.labelAfter.drawTo === 'function') {
                t.d.labelAfter.drawTo(t.d.$labelAfter.empty());
            }else if (typeof t.d.labelAfter.appendTo === 'function') {
                t.d.labelAfter.appendTo(t.d.$labelAfter.empty());
            } else {
                t.d.$labelAfter.html(t.d.labelAfter);
            }
            t.d.$labelAfterCell.ashow();
            return t;
        }
        return t.d.labelAfter;
    };
    p.labelBottom = function (labelBottom) {
        var t = this;
        if (typeof labelBottom !== 'undefined') {
            t.d.labelBottom = labelBottom;
            if (typeof t.d.labelBottom.drawTo === 'function') {
                t.d.labelBottom.drawTo(t.d.$labelBottom.empty());
            }else if (typeof t.d.labelBottom.appendTo === 'function') {
                t.d.labelBottom.appendTo(t.d.$labelBottom.empty());
            } else {
                t.d.$labelBottom.html(t.d.labelBottom);
            }
            t.d.$labelBottomBox.ashow();
            return t;
        }
        return t.d.labelBottom;
    };

    p.help = function (help) {
        var t = this;
        if (typeof help !== 'undefined') {
            t.d.help = help;
            t.d.$helpIconCell.ashow();
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
            return t;
        }
        if (t.d.type === 'html') {
            return t.input().html();
        }
        return t.input().val();
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            t.input().attr('name', name);
            return t;
        }
        return t.d.$widgetInput.attr('name');
    };
    p.placeholder = function (placeholder) {
        var t = this;
        if (typeof placeholder !== 'undefined') {
            t.d.placeholder = placeholder;
            t.d.input().attr('placeholder', placeholder);
            return t;
        }
        return t.d.placeholder;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.widget().css('width', width);
            return t;
        }
        return t.d.width;
    };
    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            type = type.toLowerCase();
            t.d.type = type;
            var attributes = t.input().getAttributes();
            delete attributes.type;
            delete attributes.checked;
            if (t.d.type === 'select' || t.d.type === 'automizy-select') {
                t.d.$input = $('<select></select>');
            } else if (t.d.type === 'textarea') {
                t.d.$input = $('<textarea></textarea>');
            } else if (t.d.type === 'html') {
                t.d.$input = $('<span></span>');
            } else {
                t.d.$input = $('<input/>').attr('type', t.d.type);
            }
            t.widget().attr('type',t.d.type);
            t.d.$input.attr(attributes);
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
    p.multiple = function (multiple) {
        var t = this;
        if (typeof multiple !== 'undefined') {
            multiple = $A.parseBoolean(multiple);
            if (multiple) {
                t.input().attr('multiple', 'multiple');
            } else {
                t.input().removeAttr('multiple');
            }
            t.d.multiple = multiple;
            return t;
        }
        t.input().attr('multiple', 'multiple');

        return t.d.multiple;
    };
    p.accept = function (arr) {
        var t = this;
        if (typeof arr !== 'undefined') {
            if (typeof arr === 'string') {
                t.d.accept = arr.split(',');
                t.input().attr('accept', arr);
            } else {
                t.d.accept = arr;
                t.input().attr('accept', arr.join(','));
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
            t.input().attr('readonly', readonly);
            return t;
        }
        return t.d.readonly;
    };
    p.newRow = function (newRow) {
        var t = this;
        if (typeof newRow !== 'undefined') {
            t.d.newRow = $A.parseBoolean(newRow);
            if (t.d.newRow) {
                t.d.$widget.addClass('automizy-newrow');
            } else {
                t.d.$widget.removeClass('automizy-newrow');
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

    p.input = function () {
        var t = this;
        return t.d.$input;
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
    p.errorBox = function () {
        return this.d.$errorBox;
    };
    p.loadingOn = function () {
        var t = this;
        t.d.$loading.show();
        return t;
    };
    p.loadingOff = function () {
        var t = this;
        t.d.$loading.hide();
        return t;
    };
    p.iconLeft = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.iconLeft = icon;
            if (t.d.iconLeft === false) {
                t.d.$inputIconLeftCell.ahide();
            } else if (t.d.iconLeft === true) {
                t.d.$inputIconLeftCell.ashow();
            } else {
                t.d.$inputIconLeftCell.ashow();
                var iconType = iconType || 'fa';
                if (iconType === 'fa') {
                    t.d.$inputIconLeftCell.empty();
                    var icons = t.d.iconLeft.split(" ");
                    for(var i = 0; i < icons.length; i++){
                        t.d.$inputIconLeftCell.append('<span class="fa ' + icons[i] + '"></span>');
                    }
                }
            }
            return t;
        }
        return t.d.icon || false;
    };
    p.iconRight = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.iconRight = icon;
            if (t.d.iconRight === false) {
                t.d.$inputIconRightCell.ahide();
            } else if (t.d.iconRight === true) {
                t.d.$inputIconRightCell.ashow();
            } else {
                t.d.$inputIconRightCell.ashow();
                var iconType = iconType || 'fa';
                if (iconType === 'fa') {
                    t.d.$inputIconRightCell.empty();
                    var icons = t.d.iconRight.split(" ");
                    for(var i = 0; i < icons.length; i++){
                        t.d.$inputIconRightCell.append('<span class="fa ' + icons[i] + '"></span>');
                    }
                }
            }
            return t;
        }
        return t.d.icon || false;
    };
    p.iconLeftClick = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.$inputIconLeftCell.addClass('automizy-clickable');
            t.d.$inputIconLeftCell.click(function () {
                func.call(t, [t]);
            });
            return t;
        }
        t.d.$inputIconLeftCell.click();
        return t;
    };
    p.iconRightClick = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.$inputIconRightCell.addClass('automizy-clickable');
            t.d.$inputIconRightCell.click(function () {
                func.call(t, [t]);
            });
            return t;
        }
        t.d.$inputIconRightCell.click();
        return t;
    };
    p.automizySelect = function () {
        return this.input().automizySelect();
    };


    $A.initBasicFunctions(Input2, "Input2", ["change", "keyup", "enter", "focus", "blur", "click"]);
});
