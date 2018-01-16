define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var List = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-list"></div>'),
            $title: $('<div class="automizy-list-title"></div>'),
            $elements: $('<div class="automizy-list-elements"></div>'),
            $loading:$('<div class="automizy-list-loading"></div>'),

            title: false,
            type: 'simple',
            maxHeight:'100%',

            elements: [],

            elementClick:function(){}
        };
        t.f = {};
        t.init();

        t.d.$title.appendTo(t.d.$widget);
        t.d.$elements.appendTo(t.d.$widget);
        t.d.$loading.appendTo(t.d.$widget);
        t.loadingOff();

        if (typeof obj !== 'undefined') {
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.maxHeight !== 'undefined') {
                t.maxHeight(obj.maxHeight);
            }
            if (typeof obj.type !== 'undefined') {
                t.type(obj.type);
            }
            if (typeof obj.elements !== 'undefined') {
                t.elements(obj.elements);
            }
            if (typeof obj.elementClick !== 'undefined') {
                t.elementClick(obj.elementClick);
            }
            t.initParameter(obj);
        }

    };

    var p = List.prototype;

    p.maxHeight = function (maxHeight) {
        var t = this;
        if (typeof maxHeight !== 'undefined') {
            t.d.maxHeight = maxHeight;
            t.widget().css('max-height', t.d.maxHeight);
            t.d.$elements.css('max-height', t.d.maxHeight);
            return t;
        }
        return t.d.maxHeight;
    };
    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            if(typeof title === 'boolean'){
                t.widget().toggleClass('automizy-has-title', title);
                return t;
            }
            t.widget().addClass('automizy-has-title');
            t.d.title = title;
            t.d.$title.html(title);
            return t;
        }
        return t.d.title;
    };
    p.search = function (searchValue) {
        var t = this;
        if(typeof searchValue === 'undefined'){
            searchValue = '';
        }else if(typeof searchValue === 'boolean' || typeof searchValue === 'object'){
            searchValue = '';
        }
        var re = new RegExp(searchValue.trim(), "gi");
        var searchCount = 0;
        t.elements().forEach(function (element) {
            if (element.search().search(re) >= 0) {
                element.widget().show();
                searchCount++;
            } else {
                element.widget().hide();
            }
        });
        return searchCount;
    };
    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            t.d.type = type;
            return t;
        }
        return t.d.type;
    };
    p.elementClick = function (elementClick) {
        var t = this;
        if (typeof elementClick !== 'undefined') {
            t.d.elementClick = elementClick;
            return t;
        }
        return t.d.elementClick;
    };
    p.inactivateAllElement = function () {
        var t = this;
        t.elements().forEach(function(element){
            element.inactivate();
        });
        return t.d.type;
    };
    p.removeAllElement = function () {
        var t = this;
        t.elements().forEach(function(element){
            element.remove();
        });
        return t.d.type;
    };
    p.elements = function (elements) {
        var t = this;
        if(typeof elements !== 'undefined') {
            t.removeAllElement();
            t.d.elements = [];
            elements.forEach(function (element) {
                var elementModule;
                if(element === 'separator'){
                    $('<div class="automizy-list-element-separator"></div>').appendTo(t.d.$elements);
                }else {
                    element.listModule = t;
                    element.type = element.type || t.type() || 'simple';
                    if (element.type === 'simple') {
                        elementModule = $A.newSimpleListElement(element);
                    } else if (element.type === 'title-and-subtitle') {
                        elementModule = $A.newTitleAndSubTitleListElement(element);
                    } else if (element.type === 'box') {
                        elementModule = $A.newBoxListElement(element);
                    } else if (element.type === 'iconed') {
                        elementModule = $A.newIconedListElement(element);
                    }
                    t.d.elements.push(elementModule);
                    elementModule.drawTo(t.d.$elements);
                }
            });
            return t;
        }
        return t.d.elements;
    };

    p.loadingOn = function () {
        var t = this;
        t.d.$loading.ashow();
        t.d.$elements.ahide();
        return t;
    };
    p.loadingOff = function () {
        var t = this;
        t.d.$loading.ahide();
        t.d.$elements.ashow();
        return t;
    };


    $A.initBasicFunctions(List, "List", []);


});
