define([
    'automizy/core',
    'automizy/functions/registerLocalEvents'
], function () {
    $A.initBasicFunctions = function (module, moduleName) {
        var module = module || false;
        if (module === false)
            return false;
        var moduleName = moduleName || false;
        if (moduleName === false)
            return false;
        var moduleNameLower = moduleName.toLowerCase();
        var moduleNameLowerFirst = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);

        var p = module.prototype;
        p.init = p.init || function(){
            var t = this;
            if(typeof t.d.create === 'undefined'){
                t.d.create = function(){};
            }
            if(typeof t.d.createFunctions === 'undefined'){
                t.d.createFunctions = [];
            }
            if(typeof t.d.remove === 'undefined'){
                t.d.remove = function(){};
            }

            for(var i in t.d){
                if(typeof $A.default[moduleNameLowerFirst][i] !== 'undefined'){
                    if ($A.default[moduleNameLowerFirst][i] instanceof jQuery) {
                        $A.default[moduleNameLowerFirst][i] = $A.default[moduleNameLowerFirst][i].clone();
                    }
                    t.d[i] = $A.default[moduleNameLowerFirst][i];
                }
            }
        };
        p.initParameter = p.initParameter || function(obj){
            var t = this;
            if (typeof obj.id === 'string' || typeof obj.id === 'number')
                t.id(obj.id);
            if (typeof obj.create === 'function')
                t.create(obj.create);
            if (typeof obj.remove === 'function')
                t.remove(obj.remove);
            if (typeof obj.buttons === 'array' || typeof obj.buttons === 'object')
                t.buttons(obj.buttons);
            if (typeof obj.target !== 'undefined')
                t.drawTo(obj.target);
            if (typeof obj.data !== 'undefined')
                t.data(obj.data);
            if (typeof obj.skin !== 'undefined')
                t.skin(obj.skin);
        };
        p.create = p.create || function (func) {
            if (typeof func === 'function') {
                this.d.create = func;
            } else {
                return this.d.create.apply(this, [this, this.d.$widget]);
            }
            return this;
        };
        p.widget = p.widget || function () {
            return this.d.$widget;
        };
        p.skin = p.skin || function (skin) {
            if (typeof skin !== 'undefined') {
                this.d.skin = skin;
                this.d.$widget.removeClassPrefix('automizy-skin-');
                this.d.$widget.addClass('automizy-skin-' + skin);
                return this;
            }
            return this.d.skin;
        };
        p.draw = p.drawTo = p.draw || function ($target) {
            var t = this;
            var $target = $target || $('body');
            t.d.$widget.appendTo($target);
            t.d.hasObject = true;
            setTimeout(function () {
                for (var i = 0; i < t.d.createFunctions.length; i++) {
                    t.d.createFunctions[i]();
                }
                t.create();
                $A.runFunctions($A.events[moduleNameLower].functions.complete, t, [t]);
            }, 50);
            return this;
        };
        p.show = p.show || function () {
            var t = this;
            if (!t.d.hasObject) {
                t.draw();
            }
            this.d.$widget.ashow();
            return this;
        };
        p.hide = p.hide || function () {
            var t = this;
            $A.setWindowScroll(true, this.id());
            if (typeof this.d.close === 'function')
                this.d.close(this, t.d.$widget);
            if (typeof this.hash === 'function' && this.hash() !== false)
                $A.hashChange(this.hash(), false);
            this.d.$widget.ahide();
            return this;
        };
        p.remove = p.remove || function (func) {
            if (typeof func === 'function') {
                this.d.remove = func;
                return this;
            }
            if(!this.d.hasObject){
                this.d.$widget.appendTo($('body:first'));
            }
            if(typeof this.d.removeAnimation === 'function'){
                this.d.removeAnimation.apply(this, [this, this.d.$widget]);
            }else {
                var parent = this.d.$widget[0].parentElement;
                if(typeof parent !== 'undefined' && parent !== null && typeof parent.removeChild === 'function') {
                    parent.removeChild(this.d.$widget[0]);
                }
            }
            $A.setWindowScroll(true, this.id());
            delete $A.d[moduleNameLower + "s"][this.id()];
            this.d.remove.apply(this, [this, this.d.$widget]);
            return true;
        };
        p.id = p.id || function (id) {
            if (typeof id === 'number' || typeof id === 'string') {
                if ($A.setWindowScroll(true, this.d.id)) {
                    $A.setWindowScroll(false, id);
                }
                $A.d[moduleNameLower + "s"].renameProperty(this.d.id, id);
                this.d.$widget.attr('id', id);
                this.d.id = id;
                return this;
            }
            if (typeof this.d.id === 'undefined') {
                this.d.id = this.widget().attr('id') || 'automizy-' + moduleNameLower + '-' + $A.getUniqueString();
                this.id(this.d.id);
            }
            return this.d.id;
        };
        p.data = p.data || function (data, value) {
            var t = this;
            if (typeof t.d.data === 'undefined')
                t.d.data = {};
                t.d.$widget[0].automizyData = {};
            if (typeof data === 'undefined') {
                return t.d.data;
            }
            if(typeof data === 'array' || typeof data === 'object'){
                for(var i in data){
                    t.d.data[i] = data[i];
                    t.d.$widget[0].automizyData[i] = data[i];
                }
                return t;
            }
            if (typeof value === 'undefined') {
                return t.d.data[data];
            }

            t.d.data[data] = value;
            t.d.$widget[0].automizyData[data] = value;
            return t;
        };

        p.addButton = p.addButton || function (obj) {
            var t = this;
            if (typeof t.d.buttons === 'undefined')
                return t;
            if (typeof obj !== 'undefined') {
                if (obj instanceof $A.m.Button || obj instanceof $A.m.Input) {
                    obj.drawTo(t.d.$buttons || t.d.$widget);
                } else {
                    obj.target = obj.target || t.d.$buttons || t.d.$widget;
                    var button = $A.newButton(obj);
                    t.d.buttons.push(button);
                }
                t.d.$widget.addClass('has-button');
                return t;
            }
            var button = $A.newButton();
            t.d.buttons.push(button);
            button.drawTo(t.d.$buttons || t.d.$widget);
            return button;
        };
        p.removeButton = p.removeButton || function (button) {
            var t = this;
            if (typeof t.d.buttons === 'undefined')
                return t;
            if (typeof button === 'string') {
                for (var i = 0; i < t.d.buttons.length; i++) {
                    if (t.d.buttons[i].id === button)
                        t.d.buttons[i].remove();
                }
            } else if (typeof button === 'object') {
                button.remove();
            }
            return t;
        };
        p.buttons = p.buttons || function (buttons) {
            var t = this;
            if (typeof t.d.buttons === 'undefined')
                t.d.buttons = [];
            if (typeof buttons !== 'undefined') {
                for (var i = 0; i < t.d.buttons.length; i++) {
                    t.d.buttons[i].remove();
                }
                for (var i in buttons) {
                    t.addButton(buttons[i]);
                }
                return t;
            }
            return t.d.buttons;
        };

        $A.m[moduleName] = module;
        $A.d[moduleNameLower + "s"] = {};
        $A.default[moduleNameLowerFirst] = $A.default[moduleNameLowerFirst] || {};
        $A["new" + moduleName] = function (obj) {
            var t = new module(obj);
            $A.d[moduleNameLower + "s"][t.id()] = t;
            return t;
        };
        $A["get" + moduleName] = function (id) {
            return $A.d[moduleNameLower + "s"][id];
        };
        $A["getAll" + moduleName] = function () {
            return $A.d[moduleNameLower + "s"];
        };
        $A["remove" + moduleName] = function (id) {
            var elem = $A["get" + moduleName](id) || {};
            if (typeof elem.remove !== 'undefined')
                return elem.remove();
            return true;
        };
        $A["removeAll" + moduleName] = function () {
            for (var i in $A["getAll" + moduleName]()) {
                $A["remove" + moduleName](i);
            }
            return true;
        };
        $A[moduleNameLowerFirst] = function(obj){
            if(typeof obj === 'undefined'){
                return $A["new" + moduleName]();
            }else if(typeof obj === 'string' || typeof obj === 'number'){
                return $A["get" + moduleName](obj) || $A["new" + moduleName]().id(obj);
            }else{
                if(obj instanceof HTMLElement){
                    obj = $(obj);
                }
                if(obj instanceof jQuery){
                    return $A["get" + moduleName](obj.attr('id')) || $A["new" + moduleName](obj);
                }
            }
            return $A["new" + moduleName](obj);
        };

        if(typeof $A.events[moduleNameLower] === 'undefined'){
            $A.events[moduleNameLower] = {
                functions:[]
            };
        }

        $A.events[moduleNameLower] = $A.events[moduleNameLower] || {};
        $A.registerLocalEvents($A.events[moduleNameLower], ['complete']);
    };
});