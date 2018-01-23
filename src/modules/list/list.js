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
            $errorContent:$('<div class="automizy-list-error-content"></div>'),
            $emptySearchContent:$('<div class="automizy-list-empty-search-content"></div>'),
            $loading:$('<div class="automizy-list-loading"></div>'),
            moreButton:$A.newButton({
                skin:'nobox-blue',
                click:function(){
                    this.hide();
                    t.elements().forEach(function(element){
                        if(!element.d.hideBySearch) {
                            element.show();
                        }
                    });
                    t.d.isMoreOpened = true;
                }
            }),

            title: false,
            type: 'simple',
            maxHeight:'100%',
            minHeight:0,

            maxVisibleElement:false,
            isMoreOpened:false,
            moreText:$A.translate('%s more'),

            elements: [],

            elementClick:function(){}
        };
        t.f = {};
        t.init();

        t.d.$title.appendTo(t.d.$widget);
        t.d.$errorContent.appendTo(t.d.$widget).ahide();
        t.d.$emptySearchContent.appendTo(t.d.$widget).ahide();
        t.d.$elements.appendTo(t.d.$widget);
        t.d.moreButton.appendTo(t.d.$widget).hide();
        t.d.$loading.appendTo(t.d.$widget);
        t.loadingOff();

        if (typeof obj !== 'undefined') {
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.maxHeight !== 'undefined') {
                t.maxHeight(obj.maxHeight);
            }
            if (typeof obj.minHeight !== 'undefined') {
                t.minHeight(obj.minHeight);
            }
            if (typeof obj.type !== 'undefined') {
                t.type(obj.type);
            }
            if (typeof obj.errorContent !== 'undefined') {
                t.errorContent(obj.errorContent);
            }
            if (typeof obj.emptySearchContent !== 'undefined') {
                t.emptySearchContent(obj.emptySearchContent);
            }
            if (typeof obj.maxVisibleElement !== 'undefined') {
                t.maxVisibleElement(obj.maxVisibleElement);
            }
            if (typeof obj.moreText !== 'undefined') {
                t.moreText(obj.moreText);
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
            //t.widget().css('max-height', t.d.maxHeight);
            t.d.$elements.css('max-height', t.d.maxHeight);
            return t;
        }
        return t.d.maxHeight;
    };
    p.minHeight = function (minHeight) {
        var t = this;
        if (typeof minHeight !== 'undefined') {
            t.d.minHeight = minHeight;
            t.widget().css('min-height', t.d.minHeight);
            //t.d.$elements.css('min-height', t.d.minHeight);
            return t;
        }
        return t.d.minHeight;
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
                element.show();
                element.d.hideBySearch = false;
                searchCount++;
            } else {
                element.d.hideBySearch = true;
                element.hide();
            }
        });
        t.refreshVisibleElements();
        if(searchCount <= 0){
            t.showEmptySearchContent();
        }else{
            t.hideEmptySearchContent();
        }
        return searchCount;
    };
    p.emptySearchContent = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            $A.setContent(content, t.d.$emptySearchContent);
            return t;
        }
        return t;
    };
    p.showEmptySearchContent = function () {
        var t = this;
        t.d.$emptySearchContent.ashow();
        return t;
    };
    p.hideEmptySearchContent = function () {
        var t = this;
        t.d.$emptySearchContent.ahide();
        return t;
    };
    p.errorContent = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            $A.setContent(content, t.d.$errorContent);
            return t;
        }
        return t;
    };
    p.showErrorContent = function () {
        var t = this;
        t.d.$errorContent.ashow();
        return t;
    };
    p.hideErrorContent = function () {
        var t = this;
        t.d.$errorContent.ahide();
        return t;
    };
    p.type = function (type) {
        var t = this;
        if (typeof type !== 'undefined') {
            t.d.type = type;
            return t;
        }
        return t.d.type;
    };
    p.maxVisibleElement = function (maxVisibleElement) {
        var t = this;
        if (typeof maxVisibleElement !== 'undefined') {
            t.d.maxVisibleElement = maxVisibleElement;
            return t;
        }
        return t.d.maxVisibleElement;
    };
    p.moreText = function (moreText) {
        var t = this;
        if (typeof moreText !== 'undefined') {
            t.d.moreText = moreText;
            t.refreshMore();
            return t;
        }
        return t.d.moreText;
    };
    p.refreshMore = function (count) {
        var t = this;
        var maxVisibleElement = t.maxVisibleElement();
        if(maxVisibleElement === false){
            t.d.moreButton.hide();
            t.d.isMoreOpened = true;
            return t;
        }
        if(typeof count === 'undefined'){
            count = t.d.elements.length;
        }
        var moreCount = (count) - t.maxVisibleElement();
        if(moreCount <= 0){
            t.d.moreButton.hide();
            t.d.isMoreOpened = true;
        }else{
            t.d.moreButton.text(t.moreText().replace("%s", moreCount)).show();
            t.d.isMoreOpened = false;
        }
        return t;
    };
    p.refreshVisibleElements = function (count) {
        var t = this;
        var maxVisibleElement = t.maxVisibleElement();
        if(maxVisibleElement === false){
            return t;
        }
        var elementsLength = 0;
        t.activeElements().forEach(function(element){
            if(!element.d.hideBySearch){
                elementsLength++;
                if(elementsLength > maxVisibleElement){
                    element.hide();
                }else{
                    element.show();
                }
            }
        });
        t.refreshMore(elementsLength);

        return t;
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
                t.addElement(element);
            });
            return t;
        }
        return t.d.elements;
    };
    p.activeElements = function () {
        var t = this;
        var elements = [];
        t.d.elements.forEach(function (element) {
            if(!element.d.removed){
                elements.push(element);
            }
        });
        return elements;
    };
    p.addElement = function (element, where) {
        var t = this;
        if(typeof element !== 'undefined') {
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
                } else if (element.type === 'row') {
                    elementModule = $A.newRowListElement(element);
                }
                t.d.elements.push(elementModule);
                if(typeof where !== 'undefined'){
                    elementModule.drawTo(t.d.$elements, where);
                }else {
                    elementModule.drawTo(t.d.$elements);
                }

                t.refreshVisibleElements();

            }
        }
        return t;
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
