define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var CustomFieldFilter = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-custom-field-filter"></div>'),
            $filterButtons: $('<div class="automizy-custom-field-filter-filter-buttons"></div>'),
            $customFieldSelect: $('<div class="automizy-custom-field-filter-custom-field-select-box"></div>'),
            $customFieldSelectInputBox: $('<div class="automizy-custom-field-filter-custom-field-select-input-box"></div>'),
            $customFieldSelectLabel: $('<div class="automizy-custom-field-filter-custom-field-select-label"></div>'),
            $relationAndValue: $('<div class="automizy-custom-field-filter-relation-and-value"></div>'),
            $relationInput: $('<div class="automizy-custom-field-filter-relation"></div>'),
            $valueInput: $('<div class="automizy-custom-field-filter-value"></div>'),
            id: 'automizy-custom-field-filter-' + $A.getUniqueString(),

            type:false,

            relations:{
                text:[
                    ['EQ', $A.translate('is')],
                    ['NE', $A.translate('is not')],
                    ['IN', $A.translate('contains')],
                    ['NI', $A.translate('does not contain')]
                ],
                date:[
                    ['EQ', $A.translate('on the')],
                    ['NE', $A.translate('not on')],
                    ['GT', $A.translate('before')],
                    ['LT', $A.translate('after')]
                ],
                number:[
                    ['EQ', $A.translate('equals')],
                    ['NE', $A.translate('not equals')],
                    ['GT', $A.translate('less than')],
                    ['LT', $A.translate('greater than')]
                ]
            },
            customFields:[],

            customFieldSelect:$A.newInput2({
                type:'select',
                change:function(){
                    t.type(this.automizySelect().selectedOption().data('type'));
                }
            }),

            relationSelect:$A.newInput2({
                type:'select',
                width:'180px'
            }),

            valueInputText:$A.newInput2({
                type:'text'
            }),

            valueInputDate:$A.newInput2({
                type:'text',
                create:function(){
                    if (typeof $.ui !== 'undefined') {
                        this.input().datepicker({

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

        t.d.$filterButtons.appendTo(t.d.$widget);
        t.d.$customFieldSelect.appendTo(t.d.$widget);
        t.d.$customFieldSelectInputBox.appendTo(t.d.$customFieldSelect);
        t.d.$customFieldSelectLabel.appendTo(t.d.$customFieldSelect);

        t.d.$relationAndValue.appendTo(t.d.$widget);
        t.d.$relationInput.appendTo(t.d.$relationAndValue);
        t.d.$valueInput.appendTo(t.d.$relationAndValue);

        t.d.customFieldSelect.drawTo(t.d.$customFieldSelectInputBox);
        t.d.relationSelect.drawTo(t.d.$relationInput);
        t.d.valueInputText.drawTo(t.d.$valueInput);
        t.d.valueInputDate.drawTo(t.d.$valueInput);
        t.d.valueInputNumber.drawTo(t.d.$valueInput);

        t.d.relationSelect.automizySelect().hasCheck(false);

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

    var p = CustomFieldFilter.prototype;

    p.customFieldId = function (customFieldId) {
        var t = this;
        if (typeof customFieldId !== 'undefined') {
            t.d.customFieldId = customFieldId;
            t.d.customFieldSelect.automizySelect().val(t.d.customFieldId);
            return t;
        }
        return t.d.customFieldSelect.automizySelect().val();
    };
    p.customFields = function (customFields) {
        var t = this;
        if (typeof customFields !== 'undefined') {
            t.d.customFields = customFields;
            var options = [];
            t.d.customFields.forEach(function(cf){
                options.push({
                    value:cf.value,
                    html:cf.text,
                    data:{
                        type:cf.type
                    }
                });
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
    p.relation = function (relation) {
        var t = this;
        if (typeof relation !== 'undefined') {
            t.d.relation = relation;
            t.d.relationSelect.automizySelect().val(t.d.relation);
            return t;
        }
        return t.d.relationSelect.automizySelect().val();
    };
    p.relationOptions = function (relationOptions) {
        var t = this;
        if (typeof relation !== 'undefined') {
            t.d.relationSelect.automizySelect().options(relationOptions);
            return t;
        }
        return t.d.relationSelect.automizySelect().options();
    };
    p.val = p.value = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            var type = t.type();
            if(type === 'text'){
                t.d.valueInputText.val(t.d.value);
            }else if(type === 'date'){
                t.d.valueInputDate.val(t.d.value);
            }else if(type === 'number'){
                t.d.valueInputNumber.val(t.d.value);
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
            t.d.relationSelect.show();

            if(t.d.type === 'text'){
                t.d.valueInputText.show();
                t.d.relationSelect.options(t.d.relations.text);
                t.d.$customFieldSelectLabel.text($A.translate('custom field'));
            }else if(t.d.type === 'date'){
                t.d.valueInputDate.show();
                t.d.relationSelect.options(t.d.relations.date);
                t.d.$customFieldSelectLabel.text($A.translate('custom field is'));
            }else if(t.d.type === 'number'){
                t.d.valueInputNumber.show();
                t.d.relationSelect.options(t.d.relations.number);
                t.d.$customFieldSelectLabel.text($A.translate('custom field is'));
            }else if(!t.d.type){
                t.d.relationSelect.hide();
                t.d.$customFieldSelectLabel.text($A.translate('custom field'));
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


    $A.initBasicFunctions(CustomFieldFilter, "CustomFieldFilter", ['change']);


});
