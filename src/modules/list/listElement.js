define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var ListElement = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-list-element"></div>'),
            listModule:false,
            removed:false,
            enabled:true,
            clickInside:false,
            activateIfClick:true,
            hideBySearch:false,
            search:''
        };
        t.f = {};
        t.init();

        t.d.$widget.click(function(){
            if (t.click().returnValue() === false) {
                return false;
            }
            if(!t.d.clickInside) {
                var listModule = t.listModule();
                listModule.d.elementClick.apply(t, [listModule]);
                if (t.d.activateIfClick) {
                    listModule.inactivateAllElement();
                    t.activate();
                }
            }
            t.d.clickInside = false;
        });

        if (typeof obj !== 'undefined') {
            if (typeof obj.listModule !== 'undefined') {
                t.listModule(obj.listModule);
            }
            if (typeof obj.search !== 'undefined') {
                t.search(obj.search);
            }
            if (typeof obj.click !== 'undefined') {
                t.click(obj.click);
            }
            if (typeof obj.activateIfClick !== 'undefined') {
                t.activateIfClick(obj.activateIfClick);
            }
            if (typeof obj.activate !== 'undefined') {
                if(obj.activate) {
                    t.activate();
                }
            }
            if (typeof obj.selected !== 'undefined') {
                if(obj.selected) {
                    t.select();
                }else{
                    t.unselect();
                }
            }
            if (typeof obj.disabled !== 'undefined') {
                if(obj.disabled) {
                    t.disable();
                }
            }
            if (typeof obj.autoClick !== 'undefined') {
                if(obj.autoClick) {
                    setTimeout(function(){
                        t.widget().click();
                    }, 50);
                }
            }
            t.initParameter(obj);
        }

    };


    var p = ListElement.prototype;

    p.listModule = function (listModule) {
        var t = this;
        if(typeof listModule !== 'undefined'){
            t.d.listModule = listModule;
            return t;
        }
        return t.d.listModule;
    };
    p.search = function (search) {
        var t = this;
        if(typeof search !== 'undefined'){
            t.d.search = search;
            return t;
        }
        return t.d.search;
    };
    p.activateIfClick = function (activateIfClick) {
        var t = this;
        if(typeof activateIfClick !== 'undefined'){
            t.d.activateIfClick = activateIfClick;
            return t;
        }
        return t.d.activateIfClick;
    };
    p.remove = function () {
        var t = this;
        t.widget().remove();
        t.d.removed = true;
        var listModule = t.listModule();
        if(!listModule.d.isMoreOpened){
            listModule.refreshVisibleElements();
        }
        return t;
    };
    p.activate = function () {
        var t = this;
        t.widget().addClass('automizy-active');
        return t;
    };
    p.inactivate = function () {
        var t = this;
        t.widget().removeClass('automizy-active');
        return t;
    };
    p.disable = function () {
        var t = this;
        t.d.enabled = false;
        t.widget().addClass('automizy-disable');
        return t;
    };
    p.enable = function () {
        var t = this;
        t.d.enabled = true;
        t.widget().removeClass('automizy-disable');
        return t;
    };
    p.selected = function (selected) {
        var t = this;
        if(typeof selected !== 'undefined'){
            if(selected){
                t.select();
            }else{
                t.unselect();
            }
            return t;
        }
        return t.d.selected;
    };
    p.select = function () {
        var t = this;
        t.d.selected = true;
        t.widget().addClass('automizy-selected');
        return t;
    };
    p.unselect = function () {
        var t = this;
        t.d.selected = false;
        t.widget().removeClass('automizy-selected');
        return t;
    };
    p.click = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('click', func, name, life);
        } else {
            if(!t.d.enabled){
                return t;
            }
            var a = t.runFunctions('click');
            t.returnValue(!(a[0] === false || a[1] === false));
        }
        return t;
    };


    $A.initBasicFunctions(ListElement, "ListElement", ['click']);

});