define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Radio = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-radio"></div>'),
            options: [],
            id: 'automizy-radio-' + $A.getUniqueString(),
            name: 'automizy-radio-' + $A.getUniqueString(),

            change: function () {
                if (t.change().returnValue() === false) {
                    return false;
                }
            },
            manualChange: function () {
                if (t.manualChange().returnValue() === false) {
                    return false;
                }
            }
        };
        t.f = {};
        t.init();


        if (typeof obj !== 'undefined') {
            t.initParameter(obj);
        }
    };

    var p = Radio.prototype;

    p.val = p.value = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.value = value;
            for(var i = 0; i < t.d.options.length; i++){
                if(t.d.options[i].value == t.d.value){
                    t.d.options[i].$input.prop('checked', true);
                }
            }
            return t;
        }
        return t.d.$widget.find('input:checked').val();
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            for(var i = 0; i < t.d.options.length; i++){
                t.d.options[i].$input.attr('name', t.d.name);
            }
            return t;
        }
        return t.d.name;
    };
    p.addOption = function (option) {
        return this.addOptions([option]);
    };
    p.options = function (options) {
        var t = this;
        if (typeof options !== 'undefined') {
            //t.removeOptions();
            t.addOptions(options);
            return t;
        }
        return t.d.options;
    };
    p.addOptions = function (options) {
        var t = this;
        options = options || [];

        for (var i = 0; i < options.length; i++) {
            options[i].radio = t;
            options[i].$box = $('<label class="automizy-radio-option-box"></label>').appendTo(t.widget());
            options[i].$labelBefore = $('<span class="automizy-radio-option-label-before"></span>').appendTo(options[i].$box).ahide();
            options[i].$input = $('<input type="radio" class="automizy-radio-option" />').data('automizy-radio-option', options[i]).attr({
                name: t.name(),
                value: options[i].value
            }).appendTo(options[i].$box).change(function(){
                t.change.apply(t, []);
            });
            options[i].$labelAfter = $('<span class="automizy-radio-option-label-after"></span>').appendTo(options[i].$box).ahide();

            if(typeof options[i].labelBefore !== 'undefined'){
                options[i].$labelBefore.html(options[i].labelBefore).ashow();
            }
            if(typeof options[i].labelAfter !== 'undefined'){
                options[i].$labelAfter.html(options[i].labelAfter).ashow();
            }

            t.d.options.push(options[i]);
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
    p.manualChange = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('manualChange', func, name, life);
        } else {
            var a = t.runFunctions('manualChange');
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


    $A.initBasicFunctions(Radio, "Radio", ['change', 'manualChange']);


});
