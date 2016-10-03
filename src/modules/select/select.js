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
            $widget: $('<div class="automizy-select automizy-has-arrow automizy-empty"></div>'),
            $loadingBox: $('<div class="automizy-select-loading-box">'+$A.translate('loading...')+'</div>'),
            $emptyBox: $('<div class="automizy-select-empty-box"></div>'),
            $widgetTable: $('<table border="0" cellpadding="0" cellspacing="0" class="automizy-select-table"></table>'),
            $widgetTr: $('<tr class="automizy-select-tr"></tr>'),
            $widgetTdIcon: $('<td class="automizy-select-td-icon"></td>'),
            $widgetTdContent: $('<td class="automizy-select-td-content"></td>'),
            $widgetTdContentDiv: $('<div class="automizy-select-td-content-div"></div>'),
            $widgetTdArrow: $('<td class="automizy-select-td-arrow"></td>'),
            $widgetTdArrowIcon: $('<span class="automizy-icon automizy-icon-select-arrow"></span>'),
            $icon: $('<span class="automizy-icon"></span>'),
            originalInput: $('<select></select>').data('automizy-select-remove', true),
            optionBox:$A.newSelectOptionBox().selectModule(t),
            options:[],
            groups:{},
            tmpValue: null,
            value: null,
            content:false,
            multiple:false,
            disabled: false,
            loading:false,
            empty:false,
            searchable:false,
            showMessageIfEmpty:false,
            emptyText:$A.translate('Select an option'),
            selectedText:$A.translate('# items selected'),
            maxVisibleItems:2,
            width: 'auto',
            height: 'auto',
            id: 'automizy-select-' + $A.getUniqueString(),

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


        t.d.$widgetTable.appendTo(t.d.$widget);
        t.d.$loadingBox.appendTo(t.d.$widget);
        t.d.$emptyBox.appendTo(t.d.$widget);
        t.d.$widgetTr.appendTo(t.d.$widgetTable);
        t.d.$widgetTdIcon.appendTo(t.d.$widgetTr);
        t.d.$icon.appendTo(t.d.$widgetTdIcon);
        t.d.$widgetTdContent.appendTo(t.d.$widgetTr);
        t.d.$widgetTdContentDiv.appendTo(t.d.$widgetTdContent).html(t.d.emptyText);
        t.d.$widgetTdArrow.appendTo(t.d.$widgetTr);
        t.d.$widgetTdArrowIcon.appendTo(t.d.$widgetTdArrow);


        if (typeof obj !== 'undefined') {
            t.initParameter(obj);
        }

        t.widget().click(function(){
            if(t.d.loading === true || t.d.empty){
                return false;
            }
            if(t.widget().hasClass('automizy-active')){
                $A.closeAllSelectBox();
            }else {
                t.open();
            }
        });

        t.setupJQueryEvents();
    };

    var p = Select.prototype;


    p.setupJQueryEvents = function(){
        var t = this;
        t.originalInput().unbind('change', t.d.change).bind('change', t.d.change);
    };

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
            /*if(t.height() === 'auto'){
                t.height(t.d.originalInput.height());
            }*/
            if(typeof t.d.originalInput.input === 'function'){
                $elem = t.d.originalInput.input();
            }else{
                $elem = t.d.originalInput;
            }
            (function(t){setTimeout(function(){
                t.widget().insertAfter($elem);
            }, 10)})(t);
            $elem.hide();
            $elem.data('automizy-select', t);
            t.d.originalInput.data('automizy-select', t);
            t.setupJQueryEvents();
            return t;
        }
        return t.d.originalInput;
    };
    p.optionBox = function () {
        return this.d.optionBox;
    };
    p.confirmValue = function(){
        var t = this;

        t.unselectAll();
        var hasValue = false;

        console.log(t.d.value);
        if(typeof t.d.value === 'object' || typeof t.d.value === 'array'){
            for(var i = 0; i < t.d.options.length; i++){
                for(var j = 0; j < t.d.value.length; j++){
                    if(t.d.options[i].val() == t.d.value[j]){
                        t.d.options[i].select(false, true);
                        hasValue = true;
                    }
                }
            }
            t.refreshValue();
        }else{
            for(var i = 0; i < t.d.options.length; i++){
                if(t.d.options[i].val() == t.d.value){
                    t.d.options[i].select();
                    hasValue = true;
                    break;
                }
            }
        }

        if(!hasValue){
            t.content(t.emptyText());
            t.widget().addClass('automizy-empty');
        }else{
            t.widget().removeClass('automizy-empty');
        }
        console.log(t.d.value);
        t.d.originalInput.val(t.d.value).trigger('change');

        return t;
    };
    p.val = p.value = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.value = value;
            if(t.d.loading){
                t.d.tmpValue = t.d.value;
            }else {
                t.confirmValue();
            }
            return t;
        }
        return t.d.value;
    };
    p.selectedOptions = function () {
        var t = this;

        var options = [];
        for(var i = 0; i < t.d.options.length; i++){
            if(t.d.options[i].selected()){
                options.push(t.d.options[i]);
            }
        }

        return options;
    };
    p.selectedOption = function () {
        var t = this;

        var option = false;
        for(var i = 0; i < t.d.options.length; i++){
            if(t.d.options[i].selected()){
                option = t.d.options[i];
                break;
            }
        }

        return option;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            t.d.$widgetTdContentDiv.html(t.d.content);
            return t;
        }
        return t.d.content;
    };


    p.icon = function(o){
        var t = this;
        if (typeof o !== 'undefined') {
            if(o === false){
                t.hasIcon(false);
            } else if(typeof o === 'string'){
                t.d.icon = o;
                t.d.$icon.removeClass().addClass('automizy-icon automizy-icon-'+o);
                t.hasIcon(true);
            } else {
                var icon = {
                    url: '',
                    width: '14px',
                    height: '14px',
                    bgPositionX: 'center',
                    bgPositionY: 'center',
                    align: 'center',
                    valign: 'middle'
                };

                for (var i in icon) {
                    if (typeof o[i] !== 'undefined') {
                        icon[i] = o[i];
                    }
                    t.d.icon[i] = icon[i];
                }
                t.hasIcon(true);
            }
            return t;
        }

        return t.d.icon;
    };
    p.hasIcon = function(hasIcon){
        var t = this;
        if (typeof hasIcon !== 'undefined') {
            t.d.hasIcon = $A.parseBoolean(hasIcon);
            if(t.d.hasIcon === true){
                t.widget().addClass('automizy-has-icon');
            }else{
                t.widget().removeClass('automizy-has-icon');
            }
            return t;
        }
        return t.d.hasIcon;
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
            disabled = $A.parseBoolean(disabled);
            if(disabled){
                $A.closeAllSelectBox();
                t.widget().addClass('automizy-disabled');
            }else{
                t.widget().removeClass('automizy-disabled');
            }
            t.d.disabled = disabled;
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
    p.unselectAll = function (triggerChange) {
        var t = this;
        var triggerChange = triggerChange || false;
        for(var i = 0; i < t.d.options.length; i++){
            t.d.options[i].unselect(false, true);
        }
        if(triggerChange === true){
            t.originalInput().trigger('change');
        }
        return t;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.widget().css('width', t.d.width);
            setTimeout(function() {
                //t.d.$widgetTdContentDiv.css('max-width', t.widget().width() - 12 + 'px');
            }, 10);
            return t;
        }
        return t.d.width;
    };
    /*p.height = function (height) {
        var t = this;
        if (typeof height !== 'undefined') {
            t.d.height = height;
            t.d.$widgetTable.css('height', t.d.height);
            return t;
        }
        return t.d.height;
    };*/
    p.refreshValue = function () {
        var t = this;
        var options = t.d.options;
        var textValues = [];
        var values = [];
        var selectedOptionCount = 0;
        var icon = false;

        for(var i = 0; i < options.length; i++){
            if(options[i].selected()){
                selectedOptionCount++;
                textValues.push(options[i].textValue());
                values.push(options[i].val());
                if(options[i].hasIcon()){
                    icon = options[i].icon();
                }
            }
        }

        if(selectedOptionCount === 1){
            t.icon(icon);
        }else {
            t.icon(false);
        }

        if(textValues.length <= 0){
            t.content(t.emptyText());
            t.widget().addClass('automizy-empty');
        }else {
            if(textValues.length > t.maxVisibleItems()){
                t.content(t.selectedText().replace("#", textValues.length));
            }else {
                t.content(textValues.join(', '));
            }
            t.widget().removeClass('automizy-empty');
        }

        if(values.length > 0) {
            if (t.multiple()) {
                t.d.value = values;
            } else {
                t.d.value = values[0];
            }
            t.originalInput().val(t.d.value);
        }else{
            t.d.value = null;
            t.originalInput().prop("selectedIndex", -1);
        }

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
                groups[i].$titleTd.remove();
                groups[i].$separatorTd.remove();
                groups[i].$titleTr.remove();
                groups[i].$separatorTr.remove();
                delete groups[i];
            }
        }
        return t;
    };
    p.emptyText = function(emptyText){
        var t = this;
        if (typeof emptyText !== 'undefined') {
            t.d.emptyText = emptyText;
            return t;
        }
        return t.d.emptyText;
    };
    p.selectedText = function(selectedText){
        var t = this;
        if (typeof selectedText !== 'undefined') {
            t.d.selectedText = selectedText;
            return t;
        }
        return t.d.selectedText;
    };
    p.maxVisibleItems = function(maxVisibleItems){
        var t = this;
        if (typeof maxVisibleItems !== 'undefined') {
            t.d.maxVisibleItems = parseInt(maxVisibleItems);
            return t;
        }
        return t.d.maxVisibleItems;
    };


    p.removeOptions = function () {
        var t = this;
        for(var i = 0; i < t.d.options.length; i++){
            t.d.options[i].remove();
        }
        t.d.options = [];
        t.cleanGroups();
        return t;
    };
    p.removeOption = function (value) {
        var t = this;
        for(var i = 0; i < t.d.options.length; i++){
            if(t.d.options[i].val() == value){
                t.d.options[i].remove();
            }
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
            if(t.d.showMessageIfEmpty) {
                if (options.length <= 0) {
                    t.widget().addClass('automizy-empty-select');
                    t.d.empty = true;
                } else {
                    t.widget().removeClass('automizy-empty-select');
                    t.d.empty = false;
                }
            }
            return t;
        }
        return t.d.options;
    };
    p.addOptions = function(options, before){
        var t = this;
        var val = t.val();
        var before = before || false;
        var options = options || [];
        for(var i = 0; i < options.length; i++){
            if(options[i] instanceof Array){
                options[i] = {
                    value:options[i][0] || 0,
                    html:options[i][1] || options[i][0],
                    selected:$A.parseBoolean(options[i][2] || false)
                };
            }
            options[i].selectModule = t;
            options[i].selectOptionBoxModule = t.optionBox();
            if(options[i].selected === true){
                hasSelected = true;
            }
            var option = $A.newSelectOption(options[i], false);
            t.d.options.push(option);
        }
        t.refreshValue();
        t.originalInput().change();
        return t;
    };
    p.loadingStart = function(){
        var t = this;
        t.widget().addClass('automizy-loading');
        t.d.tmpValue = t.val() || false;
        t.d.loading = true;
        return t;
    };
    p.loadingStop = function(){
        var t = this;
        t.widget().removeClass('automizy-loading');
        t.d.loading = false;
        return t;
    };
    p.loadingComplete = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('loadingComplete', func, name, life);
        } else {
            var a = t.runFunctions('loadingComplete');
            t.returnValue(!(t.disabled() === true || a[0] === false || a[1] === false));
            t.loadingStop();
            if(t.d.tmpValue !== false){
                t.val(t.d.tmpValue);
                t.d.tmpValue = false;
            }
        }
        return t;
    };

    p.emptyMessage = function(msg){
        var t = this;
        t.d.showMessageIfEmpty = true;

        if (typeof msg !== 'undefined') {
            t.d.$emptyBox.html(msg);
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

    p.remove = function (func) {
        if (typeof func === 'function') {
            this.d.remove = func;
            return this;
        }
        delete $A.d["selects"][this.id()];
        this.d.remove.apply(this, [this, this.d.$widget]);
        this.d.optionBox.remove();
        for(var i = 0; i < this.d.options.length; i++){
            this.d.options[i].remove();
        }
        this.originalInput().remove();
        this.d.$widget.remove();
        return true;
    };

    p.drawTo = p.draw = p.appendTo = function ($target) {
        var t = this;
        var $target = $target || $('body');

        t.originalInput().appendTo($target);
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
    p.searchable = function (value) {
        var t = this;
        if(typeof value !== 'undefined'){
            t.d.searchable = $A.parseBoolean(value);
            if(t.d.searchable){
                t.d.optionBox.d.$searchBox.show();
            }else{
                t.d.optionBox.d.$searchBox.hide();
            }
            return t;
        }
        return t.d.searchable;
    };
    p.search = function (text) {
        var t = this;
        var text = text || '';
        var options = t.options();
        if(text.length <= 0){
            for(var i = 0; i < options.length; i++) {
                options[i].show();
            }
        }else{
            for (var i = 0; i < options.length; i++) {
                var str = '';
                str += options[i].val();
                str += ' ' + options[i].textValue();
                str += ' ' + $('<p>' + options[i].html() + '</p>').text();
                if (str.toLowerCase().search(text.toLowerCase()) > -1) {
                    options[i].show();
                } else {
                    options[i].hide();
                }
            }
        }
        return t;
    };



    $A.initBasicFunctions(Select, "Select", ['change', 'loadingComplete', 'manualChange']);


    $.fn.automizySelect = function () {
        var lastElement = false;
        if(typeof this.data('automizy-select') !== 'undefined'){
            return this.data('automizy-select');
        }
        this.each(function(){
            var selectModule = $A.newSelect();
            var $t = $(this);

            if($t.prop("tagName").toLowerCase() !== 'select'){
                var $newElem = $('<select></select>');
                $.each(this.attributes, function() {
                    $newElem.attr(this.name, this.value);
                });
                $t.replaceWith($newElem);
                $t = $newElem;
            }


            selectModule.multiple($t.is("[multiple]")).originalInput($t);

            var options = [];
            $t.find('option').each(function(){
                var $to = $(this);
                var option = {
                    value:$to.attr('value'),
                    html:$to.html(),
                    disabled:$to.is(':disabled'),
                    selected:$to.is(':selected')
                };
                var optgroup = $to.closest('optgroup');
                if(optgroup.length >= 0){
                    option.group = optgroup.attr('label');
                }

                options.push(option);
            });
            selectModule.options(options);

            $t.data('automizy-select', selectModule);

            lastElement = selectModule;
        });
        return lastElement;
    };


});
