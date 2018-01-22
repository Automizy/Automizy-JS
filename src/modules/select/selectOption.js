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
            $widget: $('<tr class="automizy-select-option-tr automizy-has-select"></tr>'),
            $widgetTdIcon: $('<td class="automizy-select-option-td-icon"></td>'),
            $widgetTdContent: $('<td class="automizy-select-option-td-content"></td>'),
            $widgetTdCheck: $('<td class="automizy-select-option-td-check"></td>'),
            $icon: $('<span class="automizy-icon"></span>'),
            $option:$('<option></option>'),
            selectModule:false,
            before:false,
            selectOptionBoxModule:false,
            value: '',
            html:'',
            textValue:false,
            group:'',
            disabled: false,
            selected:false,
            hasSelect:false,
            id: 'automizy-select-option-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$widgetTdIcon.appendTo(t.d.$widget);
        t.d.$icon.appendTo(t.d.$widgetTdIcon);
        t.d.$widgetTdContent.appendTo(t.d.$widget);
        t.d.$widgetTdCheck.appendTo(t.d.$widget);


        if (typeof obj !== 'undefined') {
            if (typeof obj.selectModule !== 'undefined') {
                t.selectModule(obj.selectModule);
            }
            if (typeof obj.before !== 'undefined') {
                t.before(obj.before);
            }
            if (typeof obj.selectOptionBoxModule !== 'undefined') {
                t.selectOptionBoxModule(obj.selectOptionBoxModule);
            }
            if (typeof obj.value !== 'undefined') {
                t.value(obj.value);
            }
            if (typeof obj.textValue !== 'undefined') {
                t.textValue(obj.textValue);
            }
            if (typeof obj.html !== 'undefined') {
                t.html(obj.html);
            }
            if (typeof obj.disabled !== 'undefined') {
                t.disabled(obj.disabled);
            }
            if (typeof obj.selected !== 'undefined') {
                t.selected(obj.selected);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
            if (typeof obj.group !== 'undefined') {
                t.group(obj.group);
            }
            if (typeof obj.data !== 'undefined') {
                t.data(obj.data);
            }
            t.initParameter(obj);
        }

        t.widget().click(function(){
            if(t.disabled()){
                return t;
            }
            if(t.selectModule().multiple()){
                t.toggleSelect(true);
            }else{
                t.selectModule().unselectAll().close();
                t.toggleSelect(true);
            }
            t.selectModule().manualChange();
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
            var value = t.d.$option.attr('value');
            var $options = $select.find('option[value="' + $A.escapeJQuerySelector(value, '"') + '"]');
            if($options.length <= 0){
                t.d.$option.appendTo($select);
            }else{
                t.d.$option = $options.eq(0);
            }

            return t;
        }
        return t.d.selectModule;
    };
    p.before = function (before) {
        var t = this;
        if (typeof before !== 'undefined') {
            t.d.before = before;
            return t;
        }
        return t.d.before;
    };
    p.selectOptionBoxModule = function (selectOptionBoxModule) {
        var t = this;
        if (typeof selectOptionBoxModule !== 'undefined') {
            t.d.selectOptionBoxModule = selectOptionBoxModule;
            if(t.before()){
                t.drawTo(t.d.selectOptionBoxModule.d.$options, 'prepend');
            }else {
                t.drawTo(t.d.selectOptionBoxModule.d.$options);
            }
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

            var $select = t.d.selectModule.originalInput();
            if(typeof $select.input === 'function'){
                $select = originalInput.input();
            }
            var $options = $select.find('option[value="' + $A.escapeJQuerySelector(t.d.value, '"') + '"]');
            if($options.length <= 0){
                t.d.$option.attr('value', t.d.value);
            }else{
                t.d.$option.remove();
                t.d.$option = $options.eq(0);
            }

            return t;
        }
        return t.d.value;
    };
    p.textValue = function (textValue) {
        var t = this;
        if (typeof textValue !== 'undefined') {
            t.d.textValue = textValue;
            t.d.$option.html(t.d.textValue);
            return t;
        }
        return t.d.textValue;
    };
    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            if(t.textValue() === false || t.textValue() == t.val()){
                t.textValue(t.d.html);
            }
            t.d.$widgetTdContent.html(t.d.html);
            return t;
        }
        return t.d.html;
    };
    p.group = function (group) {
        var t = this;
        if (typeof group !== 'undefined') {
            var selectModule = t.selectModule();
            if(group === false){
                t.widget().appendTo(t.selectOptionBoxModule().d.$options);
                selectModule.cleanGroups();
            }
            t.d.group = group;
            var groups = selectModule.d.groups;
            if(typeof groups[t.d.group] === 'undefined'){
                groups[t.d.group] = {
                    $titleTr:$('<tr class="automizy-select-group"></tr>'),
                    $titleTd:$('<td colspan="3" class="automizy-select-group-title">'+t.d.group+'</td>'),
                    $separatorTr:$('<tr class="automizy-select-group-separator-tr"></tr>'),
                    $separatorTd:$('<td colspan="3" class="automizy-select-group-separator-td"></td>')
                };
                var $options = t.selectOptionBoxModule().d.$options;
                groups[t.d.group].$titleTr.appendTo($options);
                groups[t.d.group].$titleTd.appendTo(groups[t.d.group].$titleTr);
                groups[t.d.group].$separatorTr.appendTo($options);
                groups[t.d.group].$separatorTd.appendTo(groups[t.d.group].$separatorTr);
            }

            var theGroup = groups[t.d.group];
            t.widget().addClass('automizy-has-group').insertBefore(theGroup.$separatorTr);
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

    p.selected = function (selected, triggerChange, isNotRefreshValue) {
        var t = this;
        var triggerChange = triggerChange || false;
        var isNotRefreshValue = isNotRefreshValue || false;
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

            if(!isNotRefreshValue){
                selectModule.refreshValue();
            }
            if(triggerChange){
                selectModule.originalInput().trigger('change');
            }
            return t;
        }
        return t.d.selected;
    };
    p.toggleSelect = function (triggerChange, isNotRefreshValue) {
        return this.selected(!this.selected(), triggerChange || false, isNotRefreshValue || false);
    };
    p.select = function (triggerChange, isNotRefreshValue) {
        return this.selected(true, triggerChange || false, isNotRefreshValue || false);
    };
    p.unselect = function (triggerChange, isNotRefreshValue) {
        return this.selected(false, triggerChange || false, isNotRefreshValue || false);
    };
    p.hasSelect = function(hasSelect){
        var t = this;
        if (typeof hasSelect !== 'undefined') {
            t.d.hasSelect = $A.parseBoolean(hasSelect);
            if(t.d.hasSelect === true){
                t.widget().addClass('automizy-has-select');
            }else{
                t.widget().removeClass('automizy-has-select');
            }
            return t;
        }
        return t.d.hasSelect;
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

    p.data = function (data, value) {
        var t = this;
        if (typeof t.d.data === 'undefined') {
            t.d.data = {};
        }
        if (typeof data === 'undefined') {
            return t.d.data;
        }
        if (typeof data === 'array' || typeof data === 'object') {
            for (var i in data) {
                t.d.data[i] = data[i];
            }
            return t;
        }
        if (typeof value === 'undefined') {
            return t.d.data[data];
        }

        t.d.data[data] = value;
        return t;
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
