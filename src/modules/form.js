define([
    'automizy/core',
    'automizy/modules/button',
    'automizy/modules/input',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/registerLocalEvents',
    'automizy/functions/getUniqueString'
], function () {
    var Form = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<form class="automizy-form" onsubmit="return false;"></form>'),
            $inputs: $('<div class="automizy-form-inputs"></div>'),
            $buttons: $('<div class="automizy-form-buttons"></div>'),
            $tables: $('<div class="automizy-form-tables"></div>'),
            buttons: [],
            inputs: [],
            tables: [],
            subtitles: [],
            htmls: [],
            groups:[],
            hasObject: false,
            id: 'automizy-form-' + $A.getUniqueString(),
            create: function () {
            },
            submit:function(){},
            method: 'POST',
            enctype: false,
            url: document.location.href
        };
        t.init();

        t.d.$widget.attr('id', t.id());
        t.d.$inputs.appendTo(t.d.$widget);
        t.d.$buttons.appendTo(t.d.$widget);
        t.d.$tables.appendTo(t.d.$widget);

        if (typeof obj !== 'undefined') {
            if (typeof obj.subTitle !== 'undefined')
                t.subTitle(obj.subTitle);
            if (typeof obj.htmls !== 'undefined')
                t.htmls(obj.htmls);
            if (typeof obj.inputs !== 'undefined')
                t.addInputs(obj.inputs);
            if (typeof obj.tables !== 'undefined')
                t.addTables(obj.tables);
            if (typeof obj.buttons !== 'undefined')
                t.addButtons(obj.buttons);
            if (typeof obj.groups !== 'undefined')
                t.groups(obj.groups);
            if (typeof obj.method !== 'undefined')
                t.method(obj.method);
            if (typeof obj.enctype !== 'undefined')
                t.enctype(obj.enctype);
            if (typeof obj.submit === 'function')
                t.submit(obj.submit);
            if (typeof obj.url !== 'undefined' || typeof obj.action !== 'undefined')
                t.url(obj.url || obj.action);
            t.initParameter(obj);
        }
    };

    var p = Form.prototype;
    p.subTitle = p.addSubTitle = function (text) {
        var t = this;
        var id = "automizy-form-subtitle-" + $A.getUniqueString();
        if (typeof text === 'string') {
            var $widget = $('<div id="' + id + '" class="automizy-form-subtitle"></div>');
            t.d.subtitles.push({id: id, text: text, $widget:$widget});
            $widget.html(text).appendTo(t.d.$inputs);
        } else {
            console.warn('Bad parameter type.', text);
        }
        return t;
    };
    p.removeSubTitle = function (subTitle) {
        var t = this;
        if (typeof subTitle === 'string') {
            for (var i = 0; i < t.d.subtitles.length; i++) {
                if (t.d.subtitles[i].id === subTitle)
                    t.d.subtitles[i].remove();
            }
        } else if (typeof subTitle === 'object') {
            subTitle.remove();
        }
    };

    p.button = p.addButton = function (obj) {
        var t = this;
        if (typeof obj !== 'undefined') {
            if (obj instanceof $A.m.Button) {
                obj.drawTo(t.d.$buttons);
                t.d.buttons.push(obj);
            } else {
                obj.target = obj.target || t.d.$buttons;
                var button = $A.newButton(obj);
                t.d.buttons.push(button);
            }
            return t;
        }
        var button = $A.newButton();
        t.d.buttons.push(button);
        button.drawTo(t.d.$buttons);
        return button;
    };
    p.removeButton = function (button) {
        var t = this;
        if (typeof button === 'string') {
            for (var i = 0; i < t.d.buttons.length; i++) {
                if (t.d.buttons[i].id() === button)
                    t.d.buttons[i].remove();
            }
        } else if (typeof button === 'object') {
            button.remove();
        }
    };
    p.addButtons = function (buttons) {
        var t = this;
        if (typeof buttons !== 'undefined') {
            for (var i = 0; i < buttons.length; i++) {
                t.addButton(buttons[i]);
            }
            return t;
        }
        return t.d.buttons;
    };
    
    p.input = p.addInput = function (obj) {
        var t = this;
        if (typeof obj !== 'undefined') {
            if (obj instanceof $A.m.Input) {
                obj.drawTo(t.d.$inputs);
                t.d.inputs.push(obj);
            } else {
                obj.target = obj.target || t.d.$inputs;
                var input = $A.newInput(obj);
                t.d.inputs.push(input);
            }
            return t;
        }
        var input = $A.newInput();
        t.d.inputs.push(input);
        input.drawTo(t.d.$inputs);
        return input;
    };
    p.removeInput = function (input) {
        var t = this;
        if (typeof input === 'string') {
            for (var i = 0; i < t.d.inputs.length; i++) {
                if (t.d.inputs[i].id() === input)
                    t.d.inputs[i].remove();
            }
        } else if (typeof input === 'object') {
            input.remove();
        }
    };
    p.addInputs = function (inputs) {
        var t = this;
        if (typeof inputs !== 'undefined') {
            for (var i = 0; i < inputs.length; i++) {
                t.addInput(inputs[i]);
            }
            return t;
        }
        return t.d.inputs;
    };
    
    p.table = p.addTable = function (obj) {
        var t = this;
        if (typeof obj !== 'undefined') {
            if (obj instanceof $A.m.Table) {
                obj.drawTo(t.d.$tables);
                t.d.tables.push(obj);
            } else {
                obj.target = obj.target || t.d.$tables;
                var table = $A.newTable(obj);
                t.d.tables.push(table);
            }
            return t;
        }
        var table = $A.newTable();
        t.d.tables.push(table);
        table.drawTo(t.d.$tables);
        return table;
    };
    p.removeTable = function (table) {
        var t = this;
        if (typeof table === 'string') {
            for (var i = 0; i < t.d.tables.length; i++) {
                if (t.d.tables[i].id() === table)
                    t.d.tables[i].remove();
            }
        } else if (typeof table === 'object') {
            table.remove();
        }
    };
    p.addTables = function (tables) {
        var t = this;
        if (typeof tables !== 'undefined') {
            for (var i = 0; i < tables.length; i++) {
                t.addTable(tables[i]);
            }
            return t;
        }
        return t.d.tables;
    };

    p.group = p.addGroup = function (obj) {
        var t = this;
        if (typeof obj === 'object' || typeof obj === 'array') {
            var $group = $('<div class="automizy-form-group"></div>');
            var $groupSwitch = $('<div class="automizy-form-group-switch"></div>').text(obj.text || $A.translate('Group')).click(function () {
                $groupSwitch.toggleClass('active');
                $group.toggleClass('active');
            });
            if (obj.width !== 'undefined')
                $groupSwitch.width(obj.width);
            if (typeof obj.inputs !== 'undefined') {
                for (var i = 0; i < obj.inputs.length; i++) {
                    if (obj.inputs[i] instanceof $A.m.Input) {
                        t.d.inputs.push(obj.inputs[i].drawTo($group));
                    } else {
                        obj.inputs[i].target = $group;
                        t.addInput(obj.inputs[i]);
                    }
                }
            }
            if (typeof obj.buttons !== 'undefined') {
                for (var i = 0; i < obj.buttons.length; i++) {
                    obj.buttons[i].target = $group;
                    t.addButton(obj.buttons[i]);
                }
            }
            if (typeof obj.htmls !== 'undefined') {
                for (var i = 0; i < obj.htmls.length; i++) {
                    obj.htmls[i].appendTo($group);
                }
            }
            $groupSwitch.appendTo(t.d.$inputs);
            $group.appendTo(t.d.$inputs);
            t.d.groups.push({
                $group:$group,
                $groupSwitch:$groupSwitch,
                $box:t.d.$inputs,
                id:$A.getUniqueString()
            })
        }
        return t;
    };
    p.removeGroup = function (group) {
        var t = this;
        if (typeof group === 'string') {
            for (var i = 0; i < t.d.groups.length; i++) {
                if (t.d.groups[i].id === group) {
                    t.d.groups[i].$group.remove();
                    t.d.groups[i].$groupSwitch.remove();
                }
            }
        }
    };
    p.groups = p.addGroups = function (groups) {
        var t = this;
        if (typeof groups !== 'undefined') {
            for (var i in groups) {
                t.addGroup(groups[i]);
            }
            return t;
        }
        return t;
    };

    p.method = function (method) {
        var t = this;
        if (typeof method !== 'undefined') {
            t.d.method = method;
            t.widget().attr('method', method);
            return t;
        }
        return t.d.method;
    };
    p.enctype = function (enctype) {
        var t = this;
        if (typeof enctype !== 'undefined') {
            t.d.enctype = enctype;
            t.widget().attr('enctype', enctype);
            return t;
        }
        return t.d.enctype;
    };
    p.url = p.action = function (url) {
        var t = this;
        if (typeof url !== 'undefined') {
            t.d.url = url;
            t.widget().attr('action', url);
            return t;
        }
        return t.d.url;
    };
    p.submit = function (func) {
        var t = this;
        if(typeof func === 'function'){
            t.d.submit = func;
            return t;
        }
        t.d.submit.apply(t, []);
        t.widget().removeAttr('onsubmit').submit();
    };
    p.break = function () {
        var t = this;
        t.d.$inputs.append('<br/>');
        return t;
    };
    p.validate = function (){
        var t = this;
        var validate = true;
        for(var i = 0; i < t.d.inputs.length; i++){
            if(!t.d.inputs[i].validate()){
                validate = false;
            }
        }
        return validate;
    };

    p.htmls = p.addHtmls = function (htmls) {
        var t = this;
        if (typeof htmls !== 'undefined') {
            for (var i in htmls) {
                t.addHtml(htmls[i]);
            }
            return t;
        }
        return t.d.htmls;
    };

    p.html = p.addHtml = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            var id = "automizy-form-html-" + $A.getUniqueString();
            var $htmlBox = $('<span id="' + id + '" class="automizy-form-html"></span>');
            if (html instanceof jQuery) {
                if (t.d.hasObject === false)
                    html.appendTo($htmlBox);
            } else {
                $htmlBox.html(html);
            }
            $htmlBox.appendTo(t.d.$inputs);
            t.d.htmls.push($htmlBox);
            return t;
        }
        return t.d.htmls;
    };
    p.removeHtml = function (html) {
        var t = this;
        if (typeof html === 'string') {
            for (var i = 0; i < t.d.htmls.length; i++) {
                if (t.d.htmls[i].attr('id') === html)
                    t.d.htmls[i].remove();
            }
        } else if (html instanceof jQuery) {
            html.remove();
        }
    };

    p.json = function () {
        return JSON.stringify(this.object());
    };

    p.object = function (dotted) {
        var t = this;

        var result = {};
        var ignoreArray = [];
        if(typeof dotted !== 'undefined'){
            dotted = $A.parseBoolean(dotted);
        }else{
            var dotted = false;
        }
        t.widget().find('input, select, textarea').filter(function(){
            var returnValue = true;
            var $input = $(this);
            if(!$input.attr('name')){
                returnValue = false;
            }else if($input.closest('.automizy-table-box').length > 0){
                returnValue = false;
            }
            return returnValue
        }).each(function () {
            var $t = $(this);
            if (typeof $t.data('originalValue') !== 'undefined' && $t.data('originalValue') == $t.val()) {
                ignoreArray.push($t.attr('name'));
            }

            if($t.is(':disabled')){
                return true;
            }
            var name = $t.attr('name');
            if($.inArray(name, ignoreArray) >= 0){
                return true;
            }
            var value = $t.val();

            if (dotted && name.indexOf('.') > -1) {
                var arr = name.split('.');
                if (typeof result[arr[0]] === 'undefined') {
                    result[arr[0]] = {};
                }
                result[arr[0]][arr[1]] = value;
            } else if (name.slice(-2) === '[]') {
                name = name.slice(0, -2);
                if (typeof result[name] === 'undefined')
                    result[name] = [];
                result[name].push(value);
            } else {
                result[name] = value;
            }

        });

        /*$.each(t.widget().serializeArray(), function () {
            var name = this.name;
            if($.inArray(name, ignoreArray) >= 0){
                return true;
            }
            var value = this.value;

            if (dotted && name.indexOf('.') > -1) {
                var arr = name.split('.');
                if (typeof result[arr[0]] === 'undefined') {
                    result[arr[0]] = {};
                }
                result[arr[0]][arr[1]] = value;
            } else if (name.slice(-2) === '[]') {
                name = name.slice(0, -2);
                if (typeof result[name] === 'undefined')
                    result[name] = [];
                result[name].push(value);
            } else {
                result[name] = value;
            }
        });*/

        return result;
    };

    $A.initBasicFunctions(Form, "Form");
});
