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
            $widget: $('<div class="automizy-input2 automizy-newrow"></div>'),
            $labelTopBox: $('<div class="automizy-input2-top-label-box automizy-hide"></div>'),
            $buttonTopBox: $('<div class="automizy-input2-top-button-box automizy-hide"></div>'),

            $labelBeforeBox: $('<div class="automizy-input2-td automizy-input2-label-before-box automizy-hide"></div>'),

            $inputTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-input2-table"></table>'),

            $inputRow: $('<tr class="automizy-input2-tr"></tr>'),
            $inputButtonLeftCell: $('<td class="automizy-input2-td automizy-input2-button-left-cell automizy-hide"></td>'),
            $inputIconLeftCell: $('<td class="automizy-input2-td automizy-input2-icon-left-cell automizy-hide"></td>'),
            $inputCell: $('<td class="automizy-input2-td automizy-input2-input-cell"></td>'),
            $loadingCell: $('<td class="automizy-input2-td automizy-input2-input-loading-cell automizy-hide"></td>'),
            $spinnerCell: $('<td class="automizy-input2-td automizy-input2-spinner-cell automizy-hide"></td>'),
            $colorPickerCell: $('<td class="automizy-input2-td automizy-input2-colorpicker-input-cell automizy-hide">&nbsp;</td>'),
            $inputIconRightCell: $('<td class="automizy-input2-td automizy-input2-icon-right-cell automizy-hide"></td>'),
            $inputButtonRightCell: $('<td class="automizy-input2-td automizy-input2-button-right-cell automizy-hide"></td>'),
            $labelAfterCell: $('<td class="automizy-input2-td automizy-input2-label-after-cell automizy-hide"></td>'),
            $helpIconCell: $('<td class="automizy-input2-td automizy-input2-help-icon-cell automizy-hide"></td>'),

            $bottomRow: $('<tr class="automizy-input2-bottom-tr"></tr>'),

            $inputButtonLeftCellShadow: $('<td class="automizy-input2-td automizy-hide"></td>'),
            $inputIconLeftCellShadow: $('<td class="automizy-input2-td automizy-hide"></td>'),
            $inputCellShadow: $('<td class="automizy-input2-td"></td>'),

            $errorBox: $('<div class="automizy-input2-error-box"></div>'),
            $buttonBottomBox: $('<div class="automizy-input2-bottom-button-box automizy-hide"></div>'),
            $contentBottomBox: $('<div class="automizy-input2-bottom-content-box automizy-hide"></div>'),
            $labelBottomBox: $('<div class="automizy-input2-bottom-label-box automizy-hide"></div>'),

            $labelTop: $('<label class="automizy-input2-label-top"></label>'),
            $labelBefore: $('<label class="automizy-input2-label-before"></label>'),
            $input: $('<input type="text" class="automizy-input2-input" />'),
            $inputInnerIconLeft: $('<span class="automizy-input2-input-inner-icon-left"></span>'),
            $inputInnerIconRight: $('<span class="automizy-input2-input-inner-icon-right"></span>'),
            $colorPickerInput: $('<input type="color" class="automizy-input2-colorpicker-input" />').change(function(){
                var value = $(this).val();
                t.data('colorpickerValue', value);
                if(t.d.connectColorPickerToInputField){
                    t.val(value);
                }
                t.colorPickerChange();
            }),
            $labelAfter: $('<label class="automizy-input2-label-after"></label>'),
            $helpIcon: $('<span class="automizy-input2-help fa fa-question-circle"></span>'),
            $labelBottom: $('<label class="automizy-input2-label-bottom"></label>'),

            $spinnerUp: $('<div class="automizy-input2-spinner-up fa fa-chevron-up">'),
            $spinnerDown: $('<div class="automizy-input2-spinner-down fa fa-chevron-down">'),

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
            buttonLeft: false,
            buttonRight: false,
            buttonTop: false,
            buttonBottom: false,
            contentBottom: false,
            tabindex: false,
            activeAutomizyChange:false,
            labelBeforeWidth: '',
            value: '',
            placeholder: '',
            name: '',
            inputWidth:'auto',
            width: '100%',
            labelTop: '',
            labelBefore: '',
            labelAfter: '',
            labelBottom: '',
            accept: [],
            colorPickerEnabled: false,
            enableCustomSpinner: false,
            validate: function () {
            },
            validationEvents: '',
            createFunctions: [],
            automizySelect: false,
            automizyRadio: false,
            inlineEditable: false,
            id: 'automizy-input-' + $A.getUniqueString(),
            inputId: 'automizy-input-' + $A.getUniqueString() + '-input',
            colorPickerChange:function(){},
            change: function () {
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
        t.d.$buttonTopBox.appendTo(t.d.$widget);
        t.d.$labelBeforeBox.appendTo(t.d.$widget);

        t.d.$inputTable.appendTo(t.d.$widget);

        t.d.$inputRow.appendTo(t.d.$inputTable);
        t.d.$inputButtonLeftCell.appendTo(t.d.$inputRow);
        t.d.$inputIconLeftCell.appendTo(t.d.$inputRow);
        t.d.$inputCell.appendTo(t.d.$inputRow);
        t.d.$loadingCell.appendTo(t.d.$inputRow);
        t.d.$spinnerCell.appendTo(t.d.$inputRow);
        t.d.$spinnerUp.appendTo(t.d.$spinnerCell);
        t.d.$spinnerDown.appendTo(t.d.$spinnerCell);
        t.d.$colorPickerCell.appendTo(t.d.$inputRow);
        t.d.$colorPickerInput.appendTo(t.d.$colorPickerCell);
        t.d.$inputIconRightCell.appendTo(t.d.$inputRow);
        t.d.$inputButtonRightCell.appendTo(t.d.$inputRow);
        t.d.$labelAfterCell.appendTo(t.d.$inputRow);
        t.d.$helpIconCell.appendTo(t.d.$inputRow);

        t.d.$bottomRow.appendTo(t.d.$inputTable);
        t.d.$inputButtonLeftCellShadow.appendTo(t.d.$bottomRow);
        t.d.$inputIconLeftCellShadow.appendTo(t.d.$bottomRow);
        t.d.$inputCellShadow.appendTo(t.d.$bottomRow);
        t.d.$errorBox.appendTo(t.d.$inputCellShadow);
        t.d.$buttonBottomBox.appendTo(t.d.$inputCellShadow);
        t.d.$contentBottomBox.appendTo(t.d.$inputCellShadow);

        t.d.$labelBottomBox.appendTo(t.d.$widget);


        t.d.$labelTop.appendTo(t.d.$labelTopBox).attr('for', t.d.inputId);
        t.d.$labelBefore.appendTo(t.d.$labelBeforeBox).attr('for', t.d.inputId);
        t.d.$input.appendTo(t.d.$inputCell).attr('id', t.d.inputId);
        t.d.$inputInnerIconLeft.appendTo(t.d.$inputCell);
        t.d.$inputInnerIconRight.appendTo(t.d.$inputCell);
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
            if (typeof obj.min !== 'undefined') {
                t.min(obj.min);
            }
            if (typeof obj.max !== 'undefined') {
                t.max(obj.max);
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
            if (typeof obj.colorPickerEnabled !== 'undefined') {
                t.colorPickerEnabled(obj.colorPickerEnabled);
            }
            if (typeof obj.colorPickerValue !== 'undefined') {
                t.colorPickerValue(obj.colorPickerValue);
            }
            if (typeof obj.colorPickerChange === 'function') {
                t.colorPickerChange(obj.colorPickerChange);
            }
            if (typeof obj.connectColorPickerToInputField !== 'undefined') {
                t.connectColorPickerToInputField(obj.connectColorPickerToInputField);
            }
            if (typeof obj.enableCustomSpinner !== 'undefined') {
                t.enableCustomSpinner(obj.enableCustomSpinner);
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
            if (typeof obj.margin !== 'undefined') {
                t.margin(obj.margin);
            }
            if (typeof obj.padding !== 'undefined') {
                t.padding(obj.padding);
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
            if (typeof obj.inputWidth !== 'undefined') {
                t.inputWidth(obj.inputWidth);
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
            if (typeof obj.blur === 'function') {
                t.blur(obj.blur);
            }
            if (typeof obj.automizyChange === 'function') {
                t.automizyChange(obj.automizyChange);
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
            if (typeof obj.validationEvents !== 'undefined') {
                t.validationEvents(obj.validationEvents);
            }
            if (typeof obj.focus !== 'undefined') {
                t.focus(obj.focus);
            }
            if (typeof obj.measure !== 'undefined') {
                t.measure(obj.measure);
            }
            if (typeof obj.buttonLeft !== 'undefined') {
                t.buttonLeft(obj.buttonLeft);
            }
            if (typeof obj.buttonRight !== 'undefined') {
                t.buttonRight(obj.buttonRight);
            }
            if (typeof obj.buttonTop !== 'undefined') {
                t.buttonTop(obj.buttonTop);
            }
            if (typeof obj.buttonBottom !== 'undefined') {
                t.buttonBottom(obj.buttonBottom);
            }
            if (typeof obj.contentBottom !== 'undefined') {
                t.contentBottom(obj.contentBottom);
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
            if (typeof obj.innerIconLeft !== 'undefined') {
                t.innerIconLeft(obj.innerIconLeft);
            }
            if (typeof obj.innerIconLeftClick === 'function') {
                t.innerIconLeftClick(obj.innerIconLeftClick);
            }
            if (typeof obj.innerIconRight !== 'undefined') {
                t.innerIconRight(obj.innerIconRight);
            }
            if (typeof obj.innerIconRightClick === 'function') {
                t.innerIconRightClick(obj.innerIconRightClick);
            }
            if (typeof obj.automizySelect !== 'undefined') {
                t.d.automizySelect = obj.automizySelect;
            }
            if (typeof obj.automizyRadio !== 'undefined') {
                t.d.automizyRadio = obj.automizyRadio;
            }
            if (typeof obj.labelAfter !== 'undefined') {
                t.labelAfter(obj.labelAfter);
            }
            if (typeof obj.placeholder !== 'undefined') {
                t.placeholder(obj.placeholder);
            }
            if (typeof obj.tabindex !== 'undefined') {
                t.tabindex(obj.tabindex);
            }
            if (typeof obj.autocomplete !== 'undefined') {
                t.autocomplete(obj.autocomplete);
            }
            if (typeof obj.autocorrect !== 'undefined') {
                t.autocorrect(obj.autocorrect);
            }
            if (typeof obj.autocapitalize !== 'undefined') {
                t.autocapitalize(obj.autocapitalize);
            }
            if (typeof obj.spellcheck !== 'undefined') {
                t.spellcheck(obj.spellcheck);
            }
            t.initParameter(obj);
        }

        //additional initializations after parameter object is parsed

        //initializing automizySelect if necessary
        if (t.d.automizySelect) {
            t.automizySelect();
        }
        //initializing automizyRadio if necessary
        if (t.d.automizyRadio) {
            t.automizyRadio();
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
        }).on('keyup change click mousewheel', function () {
            if(t.d.activeAutomizyChange) {
                (function(input, module){
                    setTimeout(function () {
                        var $input = $(input);
                        if ($input.data('old-value') !== input.value) {
                            $input.data('old-value', input.value);
                            module.automizyChange.apply(module, [input]);
                        }
                    }, 1)
                })(this, t);
            }
        }).data('old-value', t.d.$input[0].value);
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
    p.max = function (max) {
        var t = this;
        if (typeof max !== 'undefined') {
            t.input().attr('max', max);
            return t;
        }
        return t.input().attr('max');
    };
    p.min = function (min) {
        var t = this;
        if (typeof min !== 'undefined') {
            t.input().attr('min', min);
            return t;
        }
        return t.input().attr('min');
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
        if (t.type() === 'radio') {
            var radio = t.automizyRadio();
            radio.change.apply(radio, arguments || []);
            return t;
        }
        if (typeof func === 'function') {
            t.addFunction('change', func, name, life);
        } else {
            var a = t.runFunctions('change');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
            if(t.d.connectColorPickerToInputField){
                t.colorPickerValue(t.val());
            }
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
    p.select = function () {
        var t = this;
        t.input().select();
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
    p.automizyChange = function(func, name, life){
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('automizyChange', func, name, life);
            t.d.activeAutomizyChange = true;
        } else {
            var a = t.runFunctions('automizyChange');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };

    p.disable = function () {
        var t = this;
        t.d.$input.prop('disabled', true);
        return t;
    };
    p.enable = function () {
        var t = this;
        t.d.$input.prop('disabled', false);
        return t;
    };
    p.checked = function (checked) {
        var t = this;
        if (typeof checked !== 'undefined') {
            checked = $A.parseBoolean(checked);
            t.input().prop('checked', checked);
            return t;
        }
        return t.input().is(':checked');
    };
    p.check = function () {
        var t = this;
        t.input().prop('checked', true).trigger('change');
        return t;
    };
    p.uncheck = function () {
        var t = this;
        t.input().prop('checked', false).trigger('change');
        return t;
    };


    p.labelTop = function (labelTop) {
        var t = this;
        if (typeof labelTop !== 'undefined') {
            t.d.labelTop = labelTop;
            if (typeof t.d.labelTop.drawTo === 'function') {
                t.d.labelTop.drawTo(t.d.$labelTop.empty());
            } else if (typeof t.d.labelTop.appendTo === 'function') {
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
            } else if (typeof t.d.labelBefore.appendTo === 'function') {
                t.d.labelBefore.appendTo(t.d.$labelBefore.empty());
            } else {
                t.d.$labelBefore.html(t.d.labelBefore);
            }
            t.widget().addClass('automizy-input2-has-left-label');
            t.d.$labelBeforeBox.removeClass('automizy-hide');
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
            } else if (typeof t.d.labelAfter.appendTo === 'function') {
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
            } else if (typeof t.d.labelBottom.appendTo === 'function') {
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
            if (t.type() === 'file') {
                t.input().data('value', value);
            } else if (t.type() === 'html') {
                t.input().html(value);
            } else if (t.type() === 'radio') {
                var radio = t.automizyRadio();
                radio.val.apply(radio, arguments || []);
                return t;
            } else if (t.type() === 'select') {
                var select = t.automizySelect();
                select.val.apply(select, arguments || []);
                return t;
            } else {
                t.input().val(value);
            }
            return t;
        }

        if (t.type() === 'html') {
            return t.input().html();
        }else if (t.type() === 'radio') {
            return t.automizyRadio().val();
        }
        return t.input().val();
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            if (t.type() === 'radio') {
                t.automizyRadio().name(t.d.name);
            }else {
                t.input().attr('name', t.d.name);
            }
            return t;
        }

        if (t.type() === 'radio') {
            return t.automizyRadio().name();
        }
        return t.d.$input.attr('name');
    };
    p.tabindex = function (tabindex) {
        var t = this;
        if (typeof tabindex !== 'undefined') {
            t.d.tabindex = parseInt(tabindex);
            t.input().attr('tabindex', t.d.tabindex);
            return t;
        }
        return t.d.$input.attr('tabindex');
    };

    p.autocomplete = function (autocomplete) {
        var t = this;
        if (typeof autocomplete !== 'undefined') {
            t.d.autocomplete = $A.parseBoolean(autocomplete);
            if (t.d.autocomplete) {
                t.input().removeAttr('autocomplete');
            } else {
                t.input().attr('autocomplete', 'off')
            }
            return t;
        }
        return t.d.autocomplete;
    };
    p.autocorrect = function (autocorrect) {
        var t = this;
        if (typeof autocorrect !== 'undefined') {
            t.d.autocorrect = $A.parseBoolean(autocorrect);
            if (t.d.autocorrect) {
                t.input().removeAttr('autocorrect');
            } else {
                t.input().attr('autocorrect', 'off')
            }
            return t;
        }
        return t.d.autocorrect;
    };
    p.autocapitalize = function (autocapitalize) {
        var t = this;
        if (typeof autocapitalize !== 'undefined') {
            t.d.autocapitalize = $A.parseBoolean(autocapitalize);
            if (t.d.autocapitalize) {
                t.input().removeAttr('autocapitalize');
            } else {
                t.input().attr('autocapitalize', 'off')
            }
            return t;
        }
        return t.d.autocapitalize;
    };
    p.spellcheck = function (spellcheck) {
        var t = this;
        if (typeof spellcheck !== 'undefined') {
            t.d.spellcheck = $A.parseBoolean(spellcheck);
            if (t.d.spellcheck) {
                t.input().removeAttr('spellcheck');
            } else {
                t.input().attr('spellcheck', 'false')
            }
            return t;
        }
        return t.d.spellcheck;
    };

    p.placeholder = function (placeholder) {
        var t = this;
        if (typeof placeholder !== 'undefined') {
            t.d.placeholder = placeholder;
            t.input().attr('placeholder', placeholder);
            return t;
        }
        return t.d.placeholder;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.widget().css('width', t.d.width);
            return t;
        }
        return t.d.width;
    };
    p.inputWidth = function (inputWidth) {
        var t = this;
        if (typeof inputWidth !== 'undefined') {
            t.d.inputWidth = inputWidth;
            t.d.$inputCell.css('width', t.d.inputWidth);
            return t;
        }
        return t.d.inputWidth;
    };
    p.margin = function (margin) {
        var t = this;
        if (typeof margin !== 'undefined') {
            t.d.margin = margin;
            t.widget().css('margin', t.d.margin);
            return t;
        }
        return t.d.margin;
    };
    p.padding = function (padding) {
        var t = this;
        if (typeof padding !== 'undefined') {
            t.d.padding = padding;
            t.widget().css('padding', t.d.padding);
            return t;
        }
        return t.d.padding;
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
                t.d.$inputClone = $('<select></select>');
            } else if (t.d.type === 'textarea') {
                t.d.$inputClone = $('<textarea></textarea>');
            } else if (t.d.type === 'html') {
                t.d.$inputClone = $('<span></span>');
            } else {
                t.d.$inputClone = $('<input/>').attr('type', t.d.type);
            }
            t.widget().attr('data-type', t.d.type);
            t.d.$inputClone.attr(attributes);
            t.d.$inputClone.insertAfter(t.d.$input);
            t.d.$input.remove();
            t.d.$input = t.d.$inputClone;
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
            } else if (type === 'number') {
                if (isNaN(parseInt(t.val()))) {
                    t.val(0);
                }
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
                if (typeof t.d.validator === 'undefined') {
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
                    if (typeof t.validationEvents() === 'undefined' || t.validationEvents() === '') {
                        t.validationEvents('keyup change paste');
                    }
                } else {
                    t.hideError();
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

            function validateNow() {
                t.validate();
                t.change();
            }

            t.input().off(t.d.validationEvents, validateNow);
            t.d.validationEvents = validationEvents;
            t.input().on(t.d.validationEvents, validateNow);

            return t;
        }
        return t.d.validationEvents;
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
        t.widget().addClass('automizy-has-error');
        return t;
    };
    p.hideError = function () {
        var t = this;
        t.widget().removeClass('automizy-has-error');
        return t;
    };
    p.errorBox = function () {
        return this.d.$errorBox;
    };
    p.loadingOn = function () {
        var t = this;
        t.d.$inputCell.ahide();
        t.d.$loadingCell.ashow();
        return t;
    };
    p.loadingOff = function () {
        var t = this;
        t.d.$loadingCell.ahide();
        t.d.$inputCell.ashow();
        return t;
    };
    p.buttonLeft = function (buttonLeft) {
        var t = this;
        if (typeof buttonLeft !== 'undefined') {
            if (t.d.buttonLeft !== false && t.d.buttonLeft.remove === 'function') {
                t.d.buttonLeft.remove();
            }
            t.d.buttonLeft = buttonLeft;
            if (t.d.buttonLeft === false) {
                t.d.$widget.removeClass('automizy-input2-has-left-button');
                t.d.$inputButtonLeftCell.addClass('automizy-hide');
                t.d.$inputButtonLeftCellShadow.addClass('automizy-hide');
            } else {
                t.d.$widget.addClass('automizy-input2-has-left-button');
                t.d.$inputButtonLeftCell.removeClass('automizy-hide');
                t.d.$inputButtonLeftCellShadow.removeClass('automizy-hide');
                if (typeof t.d.buttonLeft.drawTo !== 'function') {
                    t.d.buttonLeft = $A.newButton(t.d.buttonLeft);
                } else {
                }
                t.d.buttonLeft.drawTo(t.d.$inputButtonLeftCell);
            }
            return t;
        }
        return t.d.buttonLeft;
    };
    p.buttonRight = function (buttonRight) {
        var t = this;
        if (typeof buttonRight !== 'undefined') {
            if (t.d.buttonRight !== false && t.d.buttonRight.remove === 'function') {
                t.d.buttonRight.remove();
            }
            t.d.buttonRight = buttonRight;
            if (t.d.buttonRight === false) {
                t.d.$widget.removeClass('automizy-input2-has-right-button');
                t.d.$inputButtonRightCell.addClass('automizy-hide');
            } else {
                t.d.$widget.addClass('automizy-input2-has-right-button');
                t.d.$inputButtonRightCell.removeClass('automizy-hide');
                if (typeof t.d.buttonRight.drawTo !== 'function') {
                    t.d.buttonRight = $A.newButton(t.d.buttonRight);
                } else {
                }
                t.d.buttonRight.drawTo(t.d.$inputButtonRightCell);
            }
            return t;
        }
        return t.d.buttonRight;
    };
    p.buttonTop = function (buttonTop) {
        var t = this;
        if (typeof buttonTop !== 'undefined') {
            if (t.d.buttonTop !== false && t.d.buttonTop.remove === 'function') {
                t.d.buttonTop.remove();
            }
            t.d.buttonTop = buttonTop;
            if (t.d.buttonTop === false) {
                t.d.$widget.removeClass('automizy-input2-has-top-button');
                t.d.$buttonTopBox.addClass('automizy-hide');
            } else {
                t.d.$widget.addClass('automizy-input2-has-top-button');
                t.d.$buttonTopBox.removeClass('automizy-hide');
                if (typeof t.d.buttonTop.drawTo !== 'function') {
                    t.d.buttonTop = $A.newButton(t.d.buttonTop);
                } else {
                }
                t.d.buttonTop.drawTo(t.d.$buttonTopBox);
            }
            return t;
        }
        return t.d.buttonTop;
    };
    p.buttonBottom = function (buttonBottom) {
        var t = this;
        if (typeof buttonBottom !== 'undefined') {
            if (t.d.buttonBottom !== false && t.d.buttonBottom.remove === 'function') {
                t.d.buttonTop.remove();
            }
            t.d.buttonBottom = buttonBottom;
            if (t.d.buttonBottom === false) {
                t.d.$widget.removeClass('automizy-input2-has-bottom-button');
                t.d.$buttonBottomBox.addClass('automizy-hide');
            } else {
                t.d.$widget.addClass('automizy-input2-has-bottom-button');
                t.d.$buttonBottomBox.removeClass('automizy-hide');
                if (typeof t.d.buttonBottom.drawTo !== 'function') {
                    t.d.buttonBottom = $A.newButton(t.d.buttonBottom);
                } else {
                }
                t.d.buttonBottom.drawTo(t.d.$buttonBottomBox);
            }
            return t;
        }
        return t.d.buttonBottom;
    };
    p.contentBottom = function (contentBottom) {
        var t = this;
        if (typeof contentBottom !== 'undefined') {
            if (contentBottom === false) {
                t.d.$widget.removeClass('automizy-input2-has-bottom-content');
                t.d.$contentBottomBox.ahide();
                return t;
            }else{
                t.d.$widget.addClass('automizy-input2-has-bottom-content');
                t.d.$contentBottomBox.ashow();
            }
            t.d.$contentBottomBox.empty();
            if (contentBottom instanceof jQuery) {
                contentBottom.appendTo(t.d.$contentBottomBox);
            } else if (typeof contentBottom === "object" && typeof contentBottom.draw === "function") {
                contentBottom.draw(t.d.$contentBottomBox);
            } else {
                t.d.$contentBottomBox.html(contentBottom);
            }
            return t;
        }
        return t.d.$contentBottomBox;
    };
    p.iconLeft = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.iconLeft = icon;
            if (t.d.iconLeft === false) {
                t.d.$inputIconLeftCell.ahide();
                t.d.$inputIconLeftCellShadow.ahide();
                t.d.$widget.removeClass('automizy-input2-has-left-icon');
            } else {
                t.d.$widget.addClass('automizy-input2-has-left-icon');
                if (t.d.iconLeft === true) {
                    t.d.$inputIconLeftCell.ashow();
                    t.d.$inputIconLeftCellShadow.ashow();
                } else {
                    t.d.$inputIconLeftCell.ashow();
                    t.d.$inputIconLeftCellShadow.ashow();
                    var iconType = iconType || 'fa';
                    if (iconType === 'fa') {
                        t.d.$inputIconLeftCell.empty();
                        var icons = t.d.iconLeft.split(" ");
                        for (var i = 0; i < icons.length; i++) {
                            t.d.$inputIconLeftCell.append('<span class="fa ' + icons[i] + '"></span>');
                        }
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
                t.d.$widget.removeClass('automizy-input2-has-right-icon');
            } else {
                t.d.$widget.addClass('automizy-input2-has-right-icon');
                if (t.d.iconRight === true) {
                    t.d.$inputIconRightCell.ashow();
                } else {
                    t.d.$inputIconRightCell.ashow();
                    var iconType = iconType || 'fa';
                    if (iconType === 'fa') {
                        t.d.$inputIconRightCell.empty();
                        var icons = t.d.iconRight.split(" ");
                        for (var i = 0; i < icons.length; i++) {
                            t.d.$inputIconRightCell.append('<span class="fa ' + icons[i] + '"></span>');
                        }
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
    p.innerIconLeft = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.innerIconLeft = icon;
            if (t.d.innerIconLeft === false) {
                t.d.$widget.removeClass('automizy-input2-has-inner-left-icon');
            } else {
                t.d.$widget.addClass('automizy-input2-has-inner-left-icon');
                if (t.d.innerIconLeft !== true) {
                    t.d.$inputInnerIconLeft.ashow();
                    iconType = iconType || 'fa';
                    if (iconType === 'fa') {
                        t.d.$inputInnerIconLeft.removeClassPrefix('fa').addClass(t.d.innerIconLeft);
                    }
                }
            }
            return t;
        }
        return t.d.icon || false;
    };
    p.innerIconLeftClick = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.$inputInnerIconLeft.addClass('automizy-clickable').click(function () {
                func.call(t, [t]);
            });
            return t;
        }
        t.d.$inputInnerIconLeft.click();
        return t;
    };
    p.innerIconRight = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.innerIconRight = icon;
            if (t.d.innerIconRight === false) {
                t.d.$widget.removeClass('automizy-input2-has-inner-right-icon');
            } else {
                t.d.$widget.addClass('automizy-input2-has-inner-right-icon');
                if (t.d.innerIconRight !== true) {
                    t.d.$inputInnerIconRight.ashow();
                    iconType = iconType || 'fa';
                    if (iconType === 'fa') {
                        t.d.$inputInnerIconRight.removeClassPrefix('fa').addClass(t.d.innerIconRight);
                    }
                }
            }
            return t;
        }
        return t.d.icon || false;
    };
    p.innerIconRightClick = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.$inputInnerIconRight.addClass('automizy-clickable').click(function () {
                func.call(t, [t]);
            });
            return t;
        }
        t.d.$inputInnerIconRight.click();
        return t;
    };
    p.options = function () {
        var t = this;
        if(t.type() === 'radio'){
            var radio = t.automizyRadio();
            radio.options.apply(radio, arguments || []);
        }else {
            var select = t.automizySelect();
            select.options.apply(select, arguments || []);
        }
        return t;
    };
    p.addOption = function () {
        var t = this;
        if(t.type() === 'radio'){
            var radio = t.automizyRadio();
            radio.addOption.apply(radio, arguments || []);
        }else {
            var select = t.automizySelect();
            select.addOption.apply(select, arguments || []);
        }
        return t;
    };
    p.addOptions = function () {
        var t = this;
        if(t.type() === 'radio'){
            var radio = t.automizyRadio();
            radio.addOptions.apply(radio, arguments || []);
        }else {
            var select = t.automizySelect();
            select.addOptions.apply(select, arguments || []);
        }
        return t;
    };
    p.removeOption = function () {
        var select = this.automizySelect();
        select.removeOption.apply(select, arguments || []);
        return this;
    };
    p.removeOptions = function () {
        var select = this.automizySelect();
        select.removeOptions.apply(select, arguments || []);
        return this;
    };
    p.multiple = function () {
        var select = this.automizySelect();
        select.multiple.apply(select, arguments || []);
        return this;
    };
    p.automizySelect = function () {
        this.d.automizySelect = this.input().automizySelect();
        return this.d.automizySelect;
    };
    p.automizyRadio = function () {
        var t = this;
        if(t.d.automizyRadio === false) {
            t.input().remove();
            t.d.automizyRadio = $A.newRadio().drawTo(t.d.$inputCell);
            if(!!t.d.name){
                t.d.automizyRadio.name(t.d.name);
            }
        }
        return t.d.automizyRadio;
    };
    p.inlineEditable = function () {
        this.d.inlineEditable = $A.newInlineEditable(this);
        return this.d.inlineEditable;
    };

    p.measure = function (measure) {
        var t = this;
        if (typeof measure !== 'undefined') {
            t.d.measure = measure;
            t.d.$inputCell.attr('data-measure', t.d.measure);
            return t;
        }
        return t.d.measure;
    };

    p.showColorPicker = function () {
        var t = this;
        t.d.colorPickerEnabled = true;
        t.d.$widget.addClass('automizy-input2-has-colorpicker');
        t.d.$colorPickerCell.removeClass('automizy-hide');
        return t;
    };

    p.hideColorPicker = function () {
        var t = this;
        t.d.colorPickerEnabled = false;
        t.d.$widget.removeClass('automizy-input2-has-colorpicker');
        t.d.$colorPickerCell.addClass('automizy-hide');
        return t;
    };

    p.connectColorPickerToInputField = function(value){
        var t = this;
        if(typeof value !== 'undefined') {
            t.d.connectColorPickerToInputField = $A.parseBoolean(value);
            return t;
        }
        return t.d.connectColorPickerToInputField;
    };
    p.colorPickerEnabled = function(value){
        var t = this;
        if(typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if(value){
                t.showColorPicker();
            }else{
                t.hideColorPicker();
            }
            return t;
        }
        return t.d.colorPickerEnabled;
    };


    p.colorPickerValue = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.colorPickerInput().val(value);
            return t;
        }
        return t.colorPickerInput().val();
    };
    p.colorPickerChange = function(func){
        var t = this;
        if(typeof func === 'function') {
            t.d.colorPickerChange = func;
            return t;
        }
        return t.d.colorPickerChange.apply(t, []);
    };
    p.colorPickerInput = function(){
        var t = this;
        return t.d.$colorPickerInput;
    };





    p.enableCustomSpinner = function (enable) {
        var t = this;
        if (typeof enable !== 'undefined') {
            enable = $A.parseBoolean(enable);

            if (enable !== t.d.enableCustomSpinner) {
                t.d.enableCustomSpinner = enable;

                if (enable) {
                    t.d.$widget.addClass('automizy-input2-has-custom-spinner');
                    t.d.$spinnerCell.removeClass('automizy-hide');

                    t.d.$spinnerUp.on('click', spinnerUpFunction);
                    t.d.$spinnerDown.on('click', spinnerDownFunction);

                }
                else {
                    t.d.$widget.removeClass('automizy-input2-has-custom-spinner');
                    t.d.$spinnerCell.addClass('automizy-hide');


                    t.d.$spinnerUp.off('click', spinnerUpFunction);
                    t.d.$spinnerDown.off('click', spinnerDownFunction);

                }

                function spinnerUpFunction() {
                    t.value(parseInt(t.value()) + 1)
                }

                function spinnerDownFunction() {
                    t.value(parseInt(t.value()) - 1)
                }
            }

            return t;
        }
        return t.d.enableCustomSpinner;
    };





    $A.initBasicFunctions(Input2, "Input2", ["change", "keyup", "enter", "focus", "blur", "click", "automizyChange"]);
});
