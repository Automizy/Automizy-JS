define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var CustomFieldUpdater = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-custom-field-updater"></div>'),
            $filterButtons: $('<div class="automizy-custom-field-updater-filter-buttons"></div>'),
            $customFieldSelect: $('<div class="automizy-custom-field-updater-custom-field-select-box"></div>'),
            $customFieldSelectInputBox: $('<div class="automizy-custom-field-updater-custom-field-select-input-box"></div>'),
            $customFieldSelectLabel: $('<div class="automizy-custom-field-updater-custom-field-select-label"></div>'),
            $valueLabel: $('<div class="automizy-custom-field-updater-value-label"></div>'),
            $valueBox: $('<div class="automizy-custom-field-updater-value-box"></div>'),
            $valueInput: $('<div class="automizy-custom-field-updater-value"></div>'),
            id: 'automizy-custom-field-updater-' + $A.getUniqueString(),

            type:false,

            customFields:[],

            customFieldSelect:$A.newInput2({
                type:'select',
                change:function(){
                    var selectedOption = this.automizySelect().selectedOption();
                    if(!!selectedOption) {
                        t.type(this.automizySelect().selectedOption().data('type'));
                    }
                }
            }),

            valueInputText:$A.newInput2({
                type:'text'
            }),

            valueInputDate:$A.newInput2({
                type:'text',
                create:function(){
                    if (typeof $.ui !== 'undefined') {
                        this.input().datepicker({
                            dateFormat: 'yy-mm-dd',
                            closeText: $A.translate('Save')
                        })
                    }else{
                        this.type('date');
                    }
                }
            }),

            valueInputNumber:$A.newInput2({
                type:'number'
            }),

            change: function () {
                if (t.change().returnValue() === false) {
                    return false;
                }
            }
        };

        t.d.$customFieldSelect.appendTo(t.d.$widget);
        t.d.$customFieldSelectInputBox.appendTo(t.d.$customFieldSelect);
        t.d.$customFieldSelectLabel.appendTo(t.d.$customFieldSelect).text($A.translate('custom field'));

        t.d.$valueBox.appendTo(t.d.$widget);
        t.d.$valueLabel.appendTo(t.d.$valueBox);
        t.d.$valueInput.appendTo(t.d.$valueBox);

        t.d.customFieldSelect.drawTo(t.d.$customFieldSelectInputBox);
        t.d.valueInputText.drawTo(t.d.$valueInput);
        t.d.valueInputDate.drawTo(t.d.$valueInput);
        t.d.valueInputNumber.drawTo(t.d.$valueInput);

        t.f = {};
        t.init();

        t.type(false);

        if (typeof obj !== 'undefined') {
            if (typeof obj.customFields !== 'undefined') {
                t.customFields(obj.customFields);
            }
            t.initParameter(obj);
        }
    };

    var p = CustomFieldUpdater.prototype;

    p.customFieldId = function (customFieldId) {
        var t = this;
        if (typeof customFieldId !== 'undefined') {
            t.d.customFieldId = customFieldId;
            t.d.customFieldSelect.automizySelect().val(t.d.customFieldId);
            if(!t.d.customFieldId){
                t.d.valueInputText.val('');
                t.d.valueInputDate.val('');
                t.d.valueInputNumber.val(0);
            }
            return t;
        }
        return t.d.customFieldSelect.automizySelect().val();
    };
    p.customFields = function (customFields) {
        var t = this;
        if (typeof customFields !== 'undefined') {
            t.d.customFields = customFields;
            var options = [];
            var option = {};
            t.d.customFields.forEach(function(cf){
                option = {
                    value:cf.value,
                    html:cf.text,
                    data:{
                        type:cf.type
                    }
                };
                if(typeof cf.group !== 'undefined'){
                    option.group = cf.group;
                }
                options.push(option);
            });
            t.d.customFieldSelect.automizySelect().options(options);
            return t;
        }
        return t.d.customFields;
    };
    p.loadingStart = function () {
        var t = this;
        t.type(false);
        t.d.customFieldSelect.automizySelect().loadingStart();
        return t;
    };
    p.loadingStop = function () {
        var t = this;
        t.d.customFieldSelect.automizySelect().loadingStop();
        return t;
    };
    p.val = p.value = function (value) {
        var t = this;
        var type = t.type();
        if (typeof value !== 'undefined') {
            if(type === 'text'){
                t.d.valueInputText.val(value);
            }else if(type === 'date'){
                t.d.valueInputDate.val(value);
            }else if(type === 'number'){
                t.d.valueInputNumber.val(value);
            }
            return t;
        }

        if(type === 'text'){
            return t.d.valueInputText.val();
        }else if(type === 'date'){
            return t.d.valueInputDate.val();
        }else if(type === 'number'){
            return t.d.valueInputNumber.val();
        }

        return false;
    };
    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            t.d.type = type;

            t.d.valueInputText.hide();
            t.d.valueInputDate.hide();
            t.d.valueInputNumber.hide();
            t.d.$valueLabel.show();

            if(t.d.type === 'text'){
                t.d.valueInputText.show();
                t.d.$valueLabel.text('with this text:');
            }else if(t.d.type === 'date'){
                t.d.valueInputDate.show();
                t.d.$valueLabel.text('with this date:');
            }else if(t.d.type === 'number'){
                t.d.valueInputNumber.show();
                t.d.$valueLabel.text('with this number:');
            }else if(!t.d.type){
                t.d.$valueLabel.hide();
            }

            return t;
        }
        return t.d.type;
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

    p.drawTo = p.draw = p.appendTo = function ($target) {
        var t = this;
        $target = $target || $('body');
        t.d.$widget.appendTo($target);
        return t;
    };
    p.show = function () {
        var t = this;
        this.d.$widget.ashow();
        return t;
    };
    p.hide = function () {
        var t = this;
        this.d.$widget.ahide();
        return t;
    };
    p.disabled = function(){
        return false;
    };


    $A.initBasicFunctions(CustomFieldUpdater, "CustomFieldUpdater", ['change']);


});
