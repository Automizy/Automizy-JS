define([
    'automizy/core',
    'automizy/functions/registerLocalEvents'
], function () {
    $A.initBasicFunctions = function (module, moduleName, moduleEvents) {
        var module = module || false;
        if (module === false) {
            return false;
        }
        var moduleName = moduleName || false;
        if (moduleName === false) {
            return false;
        }
        var moduleEvents = moduleEvents || [];

        var moduleNameLower = moduleName.toLowerCase();
        var moduleNameLowerFirst = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);

        var p = module.prototype;
        p.init = p.init || function () {
                var t = this;
                if (typeof t.d.permission === 'undefined') {
                    t.d.permission = true;
                }
                if (typeof t.d.create === 'undefined') {
                    t.d.create = function () {
                    };
                }
                if (typeof t.d.createFunctions === 'undefined') {
                    t.d.createFunctions = [];
                }
                if (typeof t.d.remove === 'undefined') {
                    t.d.remove = function () {
                    };
                }
                if (typeof t.d.showFunction === 'undefined') {
                    t.d.showFunction = function () {};
                }
                if (typeof t.d.hideFunction === 'undefined') {
                    t.d.hideFunction = function () {};
                }
                if (typeof t.d.margin === 'undefined') {
                    t.d.margin = false;
                }
                if (typeof t.d.returnValue === 'undefined') {
                    t.d.returnValue = true;
                }

                for (var i in t.d) {
                    if (typeof $A.default[moduleNameLowerFirst][i] !== 'undefined') {
                        if ($A.default[moduleNameLowerFirst][i] instanceof jQuery) {
                            $A.default[moduleNameLowerFirst][i] = $A.default[moduleNameLowerFirst][i].clone();
                        }
                        t.d[i] = $A.default[moduleNameLowerFirst][i];
                    }
                }
            };
        p.initParameter = p.initParameter || function (obj) {
                var t = this;
                if (typeof obj.id === 'string' || typeof obj.id === 'number') {
                    t.id(obj.id);
                }
                if (typeof obj.create === 'function') {
                    t.create(obj.create);
                }
                if (typeof obj.remove === 'function') {
                    t.remove(obj.remove);
                }
                if (typeof obj.buttons === 'array' || typeof obj.buttons === 'object') {
                    t.buttons(obj.buttons);
                }
                if (typeof obj.margin !== 'undefined') {
                    t.margin(obj.margin);
                }
                if (typeof obj.target !== 'undefined') {
                    t.drawTo(obj.target);
                }
                if (typeof obj.data !== 'undefined') {
                    t.data(obj.data);
                }
                if (typeof obj.skin !== 'undefined') {
                    t.skin(obj.skin);
                }
                if (typeof obj.permission !== 'undefined') {
                    t.permission(obj.permission);
                }
            };
        p.create = p.create || function (func) {
                var t = this;
                if (typeof func === 'function') {
                    t.d.create = func;
                } else {
                    if(!t.permission()){
                        return t;
                    }
                    return t.d.create.apply(t, [t, t.d.$widget]);
                }
                return t;
            };
        p.widget = p.widget || function () {
                return this.d.$widget;
            };
        p.skin = p.skin || function (skin) {
                var t = this;
                if (typeof skin !== 'undefined') {
                    t.d.skin = skin;
                    t.d.$widget.removeClassPrefix('automizy-skin-');
                    t.d.$widget.addClass('automizy-skin-' + skin);
                    return t;
                }
                return t.d.skin;
            };


        p.drawAfter = p.insertAfter = p.drawAfter || function($target){
                var t = this;
                var $target = $target || $('body');
                return p.drawTo($target, 'after');
            };

        p.drawBefore = p.insertBefore = p.drawBefore || function($target){
                var t = this;
                var $target = $target || $('body');
                return p.drawTo($target, 'before');
            };

        p.drawTo = p.appendTo = p.drawTo || function (target, where) {
                var t = this;
                var target = target || $('body');
                if(typeof target.widget === 'function') {
                    target = target.widget();
                }
                var where = where || 'in';
                var $elem = t.d.$widget;
                if(where === 'after'){
                    $elem.insertAfter(target);
                }else if(where === 'before'){
                    $elem.insertBefore(target);
                }else{
                    $elem.appendTo(target);
                }
                t.d.hasObject = true;
                if(!t.permission()){
                    return t;
                }
                setTimeout(function () {
                    for (var i = 0; i < t.d.createFunctions.length; i++) {
                        t.d.createFunctions[i]();
                    }
                    t.create();
                    $A.runFunctions($A.events[moduleNameLower].functions.complete, t, [t]);
                }, 50);
                return t;
            };
        p.draw = p.drawTo || p.appendTo;

        p.show = p.show || function (func) {
                var t = this;
                if (typeof func === 'function') {
                    t.d.showFunction = func;
                    return t;
                }
                if (!t.d.hasObject) {
                    t.draw();
                }
                t.d.$widget.ashow();
                t.d.showFunction.apply(t, [t, t.d.$widget]);
                return t;
            };
        p.margin = p.margin || function (margin) {
                var t = this;
                if (typeof margin !== 'undefined') {
                    t.d.margin = margin;
                    t.d.$widget.css('margin', t.d.margin);
                    return t;
                }
                return t.d.margin;
            };
        p.hide = p.hide || function (func) {
                var t = this;
                if (typeof func === 'function') {
                    t.d.hideFunction = func;
                    return t;
                }
                $A.setWindowScroll(true, t.id());
                if (typeof t.d.close === 'function') {
                    t.d.close(t, t.d.$widget);
                }
                if (typeof t.hash === 'function' && t.hash() !== false) {
                    $A.hashChange(t.hash(), false);
                }
                t.d.$widget.ahide();
                t.d.hideFunction.apply(t, [t, t.d.$widget]);
                return t;
            };
        p.remove = p.remove || function (func) {
                var t = this;
                if (typeof func === 'function') {
                    t.d.remove = func;
                    return t;
                }
                if (!t.d.hasObject) {
                    t.d.$widget.appendTo($('body:first'));
                }
                if (typeof t.d.removeAnimation === 'function') {
                    t.d.removeAnimation.apply(t, [t, t.d.$widget]);
                } else {
                    var parent = t.d.$widget[0].parentElement;
                    if (typeof parent !== 'undefined' && parent !== null && typeof parent.removeChild === 'function') {
                        parent.removeChild(t.d.$widget[0]);
                    }
                }
                $A.setWindowScroll(true, t.id());
                delete $A.d[moduleNameLower + "s"][t.id()];
                t.d.remove.apply(t, [t, t.d.$widget]);
                return true;
            };
        p.id = p.id || function (id) {
                var t = this;
                if (typeof id === 'number' || typeof id === 'string') {
                    if ($A.setWindowScroll(true, t.d.id)) {
                        $A.setWindowScroll(false, id);
                    }
                    $A.d[moduleNameLower + "s"].renameProperty(t.d.id, id);
                    t.d.$widget.attr('id', id);
                    t.d.id = id;
                    return t;
                }
                if (typeof t.d.id === 'undefined') {
                    t.d.id = t.widget().attr('id') || 'automizy-' + moduleNameLower + '-' + $A.getUniqueString();
                    t.id(t.d.id);
                }
                return t.d.id;
            };
        p.data = p.data || function (data, value) {
                var t = this;
                if (typeof t.d.data === 'undefined') {
                    t.d.data = {};
                }
                t.d.$widget[0].automizyData = {};
                if (typeof data === 'undefined') {
                    return t.d.data;
                }
                if (typeof data === 'array' || typeof data === 'object') {
                    for (var i in data) {
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
                if (typeof t.d.buttons === 'undefined') {
                    return t;
                }
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
                if (typeof t.d.buttons === 'undefined') {
                    return t;
                }
                if (typeof button === 'string') {
                    for (var i = 0; i < t.d.buttons.length; i++) {
                        if (t.d.buttons[i].id === button) {
                            t.d.buttons[i].remove();
                        }
                    }
                } else if (typeof button === 'object') {
                    button.remove();
                }
                return t;
            };
        p.buttons = p.buttons || function (buttons) {
                var t = this;
                if (typeof t.d.buttons === 'undefined') {
                    t.d.buttons = [];
                }
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
        p.returnValue = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.returnValue = value;
                return t;
            }
            return t.d.returnValue;
        };


        p.addFunction = function (functionName, func, name, life) {
            var t = this;
            if (typeof t.f[functionName] === 'undefined') {
                t.f[functionName] = {};
            }
            t.f[functionName][name || $A.getUniqueString()] = {
                func: func,
                life: (typeof life !== 'undefined') ? life : -1
            };
        };
        p.runFunctions = function (functionName, thisParameter, parameters) {
            var t = this;
            return [
                $A.runFunctions(t.f[functionName], thisParameter || t, parameters || [t, t.d.$widget]),
                $A.runFunctions($A.events[moduleNameLower].functions[functionName], thisParameter || t, parameters || [t, t.d.$widget])
            ];
        };
        p.on = function (events, func, name) {
            var t = this;
            var events = events || [];
            if (typeof events === 'string') {
                events = events.split(' ');
            }
            for (var i = 0; i < events.length; i++) {
                t[events[i]].apply(t, [func, name || $A.getUniqueString(), -1]);
            }
            return t;
        };
        p.one = function (events, func) {
            var t = this;
            var events = events || [];
            if (typeof events === 'string') {
                events = events.split(' ');
            }
            for (var i = 0; i < events.length; i++) {
                t[events[i]].apply(t, [func, $A.getUniqueString(), 1]);
            }
            return t;
        };
        p.off = function (events, name) {
            var t = this;
            var events = events || [];
            if (typeof events === 'string') {
                events = events.split(' ');
            }
            if (events.length <= 0) {
                for (var i in t.f) {
                    for (var j in t.f[i]) {
                        delete t.f[i][j];
                    }
                }
            } else {
                for (var i = 0; i < events.length; i++) {
                    if(typeof t.f !== 'undefined' && typeof t.f[events[i]] !== 'undefined' && typeof t.f[events[i]][name] !== 'undefined') {
                        delete t.f[events[i]][name];
                    }
                }
            }
            return t;
        };
        p.permission = function(value){
            var t = this;
            if (typeof value !== 'undefined') {
                var currentPermission = t.permission();
                t.d.permission = $A.parseBoolean(value);
                if(!t.d.permission && currentPermission){
                    t.widget().addClass('automizy-permission-trap');
                }else if(t.d.permission && !currentPermission){
                    t.widget().removeClass('automizy-permission-trap');
                }
                return t;
            }
            return t.d.permission;
        };


        $A.events[moduleNameLower] = {};
        //if ($.inArray('complete', moduleEvents) < 0) {
        if(moduleEvents.indexOf('complete') < 0){
            moduleEvents.push('complete');
        }
        $A.registerLocalEvents($A.events[moduleNameLower], moduleEvents);

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
            if (typeof elem.remove !== 'undefined') {
                return elem.remove();
            }
            return true;
        };
        $A["removeAll" + moduleName] = function () {
            for (var i in $A["getAll" + moduleName]()) {
                $A["remove" + moduleName](i);
            }
            return true;
        };
        $A[moduleNameLowerFirst] = function (obj) {
            if (typeof obj === 'undefined') {
                return $A["new" + moduleName]();
            } else if (typeof obj === 'string' || typeof obj === 'number') {
                return $A["get" + moduleName](obj) || $A["new" + moduleName]().id(obj);
            } else {
                if (obj instanceof HTMLElement) {
                    obj = $(obj);
                }
                if (obj instanceof jQuery) {
                    return $A["get" + moduleName](obj.attr('id')) || $A["new" + moduleName](obj);
                }
            }
            return $A["new" + moduleName](obj);
        };
        /*
         if(typeof $A.events[moduleNameLower] === 'undefined'){
         $A.events[moduleNameLower] = {
         functions:[]
         };
         }

         $A.events[moduleNameLower] = $A.events[moduleNameLower] || {};
         $A.registerLocalEvents($A.events[moduleNameLower], ['complete']);
         */
    };
});