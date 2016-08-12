define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons',
    'automizy/modules/select/selectOptionBox',
    'automizy/modules/select/selectOption'
], function () {
    var Select = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-select" style="background-color:#ffffff; display:inline-block"></div>'),
            $widgetTable: $('<table border="0" cellpadding="0" cellspacing="0" class="automizy-select-table"></table>'),
            $widgetTr: $('<tr class="automizy-select-tr"></tr>'),
            $widgetTd: $('<td class="automizy-select-td-icon"></td>'),
            originalInput: $('<select></select>').data('automizy-select-remove', true),
            optionBox:$A.newSelectOptionBox().selectModule(t),
            options:[],
            groups:{},
            value: '',
            content:false,
            multiple:false,
            disabled: false,
            width: 'auto',
            height: 'auto',
            id: 'automizy-select-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();


        t.d.$widgetTable.appendTo(t.d.$widget);
        t.d.$widgetTr.appendTo(t.d.$widgetTable);
        t.d.$widgetTd.appendTo(t.d.$widgetTr);


        if (typeof obj !== 'undefined') {
            t.initParameter(obj);
        }

        t.widget().click(function(){
            t.open();
        })
    };

    var p = Select.prototype;

    p.originalInput = function (originalInput) {
        var t = this;
        if (typeof originalInput !== 'undefined') {
            if(t.d.originalInput.data('automizy-select-remove') == true){
                t.d.originalInput.remove();
            }
            t.d.originalInput = originalInput;
            var $elem;
            if(t.width() === 'auto'){
                t.width(t.d.originalInput.width());
            }
            if(t.height() === 'auto'){
                t.height(t.d.originalInput.height());
            }
            if(typeof t.d.originalInput.input === 'function'){
                $elem = t.d.originalInput.input();
            }else{
                $elem = t.d.originalInput;
            }
            t.widget().insertAfter($elem);
            $elem.hide();
            $elem.data('automizy-select', t);
            t.d.originalInput.data('automizy-select', t);
            return t;
        }
        return t.d.originalInput;
    };
    p.optionBox = function () {
        return this.d.optionBox;
    };
    p.val = p.value = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.value = value;
            if(t.d.content === false){
                t.content(t.d.value);
            }
            t.d.originalInput.val(t.d.value);
            return t;
        }
        return t.d.value;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            t.d.$widgetTd.html(t.d.content);
            return t;
        }
        return t.d.content;
    };
    p.multiple = function (multiple) {
        var t = this;
        if (typeof multiple !== 'undefined') {
            t.d.multiple = $A.parseBoolean(multiple);
            if(typeof t.d.originalInput.multiple !== 'undefined'){
                t.d.originalInput.multiple(t.d.multiple);
            }else{
                t.d.originalInput.attr('multiple', t.d.multiple);
            }

            if(t.d.multiple === true){
                t.widget().addClass('automizy-multiple');
            }else{
                t.widget().removeClass('automizy-multiple');
            }

            return t;
        }
        return t.d.multiple;
    };
    p.disabled = function (disabled) {
        var t = this;
        if (typeof disabled !== 'undefined') {
            t.d.disabled = $A.parseBoolean(disabled);
            if(typeof t.d.originalInput.disabled !== 'undefined'){
                t.d.originalInput.disabled(t.d.disabled);
            }else{
                t.d.originalInput.attr('disabled', disabled);
            }
            return t;
        }
        return t.d.disabled;
    };
    p.disable = function () {
        return this.disabled(true);
    };
    p.enable = function () {
        return this.disabled(false);
    };
    p.unselectAll = function () {
        var t = this;
        for(var i = 0; i < t.d.options.length; i++){
            t.d.options[i].unselect();
        }
        return t;
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
    p.height = function (height) {
        var t = this;
        if (typeof height !== 'undefined') {
            t.d.height = height;
            t.widget().css('height', t.d.height);
            return t;
        }
        return t.d.height;
    };
    p.refreshValue = function () {
        var t = this;
        var options = t.d.options;
        var values = [];
        for(var i = 0; i < options.length; i++){
            if(options[i].selected()){
                values.push(options[i].textValue());
            }
        }
        t.content(values.join(', '));
        return t;
    };
    p.cleanGroups = function () {
        var t = this;
        var groups = t.d.groups;
        var usableGroups = [];
        var options = t.d.options;
        for(var i = 0; i < options.length; i++){
            var group = options[i].group();
            if(usableGroups.indexOf(group) < 0){
                usableGroups.push(group);
            }
        }
        for(var i in groups){
            if(usableGroups.indexOf(i) < 0){
                groups[i].$box.remove();
                groups[i].$title.remove();
                groups[i].$widget.remove();
                delete groups[i];
            }
        }
        return t;
    };


    p.removeOptions = function () {
        var t = this;
        for(var i = 0; i < t.d.options.length; i++){
            t.d.options[i].remove();
        }
        t.cleanGroups();
        return t;
    };
    p.addOption = function(option){
        return this.addOptions([option]);
    };
    p.options = function (options) {
        var t = this;
        if (typeof options !== 'undefined') {
            t.removeOptions();
            t.addOptions(options);
            return t;
        }
        return t.d.options;
    };
    p.addOptions = function(options, before){
        var t = this;
        var val = t.val();
        var before = before || false;
        for(var i = 0; i < options.length; i++){
            var option = $A.newSelectOption(options[i]).selectModule(t).selectOptionBoxModule(t.optionBox());
            t.d.options.push(option);
        }
        return t;
    };


    p.beforeOpen = function (func, name, life) {
        return this.d.optionBox.beforeOpen.apply(this.d.optionBox, [func, name, life]);
    };
    p.beforeClose = function (func, name, life) {
        return this.d.optionBox.beforeClose.apply(this.d.optionBox, [func, name, life]);
    };
    p.open = function (func, name, life) {
        return this.d.optionBox.open.apply(this.d.optionBox, [func, name, life]);
    };
    p.close = function (func, name, life) {
        return this.d.optionBox.close.apply(this.d.optionBox, [func, name, life]);
    };

    $A.initBasicFunctions(Select, "Select", []);


});
