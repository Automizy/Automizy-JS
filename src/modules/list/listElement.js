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
            search:''
        };
        t.f = {};
        t.init();

        t.d.$widget.click(function(){
            if (t.click().returnValue() === false) {
                return false;
            }
            var listModule = t.listModule();
            listModule.d.elementClick.apply(t, [listModule]);
            listModule.inactivateAllElement();
            t.activate();
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
    p.remove = function () {
        var t = this;
        t.widget().remove();
        t.d.removed = true;
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
    p.click = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('click', func, name, life);
        } else {
            var a = t.runFunctions('click');
            t.returnValue(!(a[0] === false || a[1] === false));
        }
        return t;
    };


    $A.initBasicFunctions(ListElement, "ListElement", ['click']);

});
