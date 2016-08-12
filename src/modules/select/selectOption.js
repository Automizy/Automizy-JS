define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var SelectOption = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-select-option"></div>'),
            $widgetTable: $('<table border="none" cellpadding="0" cellspacing="0" class="automizy-select-option-table"></table>'),
            $widgetTr: $('<tr class="automizy-select-option-tr"></tr>'),
            $widgetTdIcon: $('<td class="automizy-select-option-td-icon"></td>'),
            $widgetTdContent: $('<td class="automizy-select-option-td-content"></td>'),
            $widgetTdCheck: $('<td class="automizy-select-option-td-check"></td>'),
            $option:$('<option></option>'),
            selectModule:false,
            selectOptionBoxModule:false,
            value: '',
            html:'',
            textValue:false,
            group:'',
            disabled: false,
            selected:false,
            id: 'automizy-select-option-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();


        t.d.$widgetTable.appendTo(t.d.$widget);
        t.d.$widgetTr.appendTo(t.d.$widgetTable);
        t.d.$widgetTdIcon.appendTo(t.d.$widgetTr);
        t.d.$widgetTdContent.appendTo(t.d.$widgetTr);
        t.d.$widgetTdCheck.appendTo(t.d.$widgetTr);


        if (typeof obj !== 'undefined') {
            if (typeof obj.value !== 'undefined') {
                t.value(obj.value);
            }
            if (typeof obj.textValue !== 'undefined') {
                t.textValue(obj.textValue);
            }
            if (typeof obj.html !== 'undefined') {
                t.html(obj.html);
            }
            if (typeof obj.group !== 'undefined') {
                t.group(obj.group);
            }
            if (typeof obj.disabled !== 'undefined') {
                t.disabled(obj.disabled);
            }
            if (typeof obj.selected !== 'undefined') {
                t.selected(obj.selected);
            }
            t.initParameter(obj);
        }

        t.widget().click(function(){
            if(t.disabled()){
                return t;
            }
            if(t.selectModule().multiple()){
                t.toggleSelect();
            }else{
                t.selectModule().unselectAll().close();
                t.toggleSelect();
            }
            return t;
        })
    };

    var p = SelectOption.prototype;

    p.selectModule = function (selectModule) {
        var t = this;
        if (typeof selectModule !== 'undefined') {
            t.d.selectModule = selectModule;
            var $select = t.d.selectModule.originalInput();
            if(typeof $select.input === 'function'){
                $select = originalInput.input();
            }
            t.d.$option.appendTo($select);
            return t;
        }
        return t.d.selectModule;
    };
    p.selectOptionBoxModule = function (selectOptionBoxModule) {
        var t = this;
        if (typeof selectOptionBoxModule !== 'undefined') {
            t.d.selectOptionBoxModule = selectOptionBoxModule;
            t.drawTo(t.d.selectOptionBoxModule.d.$options);
            return t;
        }
        return t.d.selectOptionBoxModule;
    };
    p.val = p.value = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.value = value;
            if(t.textValue() === false){
                t.textValue(t.d.value);
            }
            return t;
        }
        return t.d.value;
    };
    p.textValue = function (textValue) {
        var t = this;
        if (typeof textValue !== 'undefined') {
            t.d.textValue = textValue;
            return t;
        }
        return t.d.textValue;
    };
    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            t.d.$widgetTdContent.html(t.d.html);
            return t;
        }
        return t.d.html;
    };
    p.group = function (group) {
        var t = this;
        if (typeof group !== 'undefined') {
            if(group === false){
                t.widget().appendTo(t.selectOptionBoxModule().d.$options);
                t.selectModule().cleanGroups();
            }
            t.d.group = group;
            var groups = t.selectModule().d.groups;
            if(typeof groups[t.d.group] === 'undefined'){
                groups[t.d.group] = {
                    $widget:$('<div class="automizy-select-group"></div>'),
                    $title:$('<div class="automizy-select-group-title"></div>'),
                    $box:$('<div class="automizy-select-group-box"></div>')
                };
                groups[t.d.group].$widget.appendTo(t.selectOptionBoxModule().d.$options);
                groups[t.d.group].$title.appendTo(groups[t.d.group].$widget);
                groups[t.d.group].$box.appendTo(groups[t.d.group].$widget);
            }
            t.widget().appendTo(groups[t.d.group].$box);
            return t;
        }
        return t.d.group;
    };
    p.disabled = function (disabled) {
        var t = this;
        if (typeof disabled !== 'undefined') {
            t.d.disabled = $A.parseBoolean(disabled);
            if(t.d.disabled === true){
                t.widget().addClass('automizy-disabled');
            }else{
                t.widget().removeClass('automizy-disabled');
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
    p.selected = function (selected) {
        var t = this;
        if (typeof selected !== 'undefined') {
            t.d.selected = $A.parseBoolean(selected);
            var selectModule = t.selectModule();
            if(t.d.selected === true){
                t.widget().addClass('automizy-selected');
                t.d.$option.prop("selected", true);
            }else{
                t.widget().removeClass('automizy-selected');
                t.d.$option.prop("selected", false);
            }
            selectModule.refreshValue();
            selectModule.originalInput().change();
            return t;
        }
        return t.d.selected;
    };
    p.toggleSelect = function () {
        return this.selected(!this.selected());
    };
    p.select = function () {
        return this.selected(true);
    };
    p.unselect = function () {
        return this.selected(false);
    };


    p.iconVisibile = function(){

    };
    p.iconHide = function(){
        return this.iconVisibile(false);
    };
    p.iconShow = function(){
        return this.iconVisibile(true);
    };



    p.remove = function(){
        var t = this;
        if (typeof func === 'function') {
            t.d.remove = func;
            return this;
        }
        t.d.remove.apply(t, [t, t.d.$widget]);
        t.widget().remove();
        delete $A.getSelectOption[t.id()];
        return true;
    };


    $A.initBasicFunctions(SelectOption, "SelectOption", []);


});
