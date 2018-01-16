define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Panel = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-panel"></div>'),
            $title: $('<div class="automizy-panel-title"></div>'),
            $navigator: $('<div class="automizy-panel-navigator"></div>'),
            $content: $('<div class="automizy-panel-content"></div>'),
            $navigatorContents: $('<div class="automizy-panel-navigator-contents"></div>'),

            title:'',
            content:'',
            nowrap:false,
            padding:'15px 20px',
            navigators:{},
            id: 'automizy-panel-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$navigator.appendTo(t.d.$widget);
        t.d.$content.appendTo(t.d.$widget);
        t.d.$navigatorContents.appendTo(t.d.$widget);
        if (typeof obj !== 'undefined') {

            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.padding !== 'undefined') {
                t.padding(obj.padding);
            }
            if (typeof obj.nowrap !== 'undefined') {
                t.nowrap(obj.nowrap);
            }
            if (typeof obj.navigators !== 'undefined') {
                t.navigators(obj.navigators);
            }
            if (typeof obj.maxWidth !== 'undefined') {
                t.maxWidth(obj.maxWidth);
            }

            t.initParameter(obj);
        }

    };

    var p = Panel.prototype;
    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(title);
            t.d.$title.prependTo(t.d.$widget);
            return t;
        }
        return t.d.title;
    };
    p.maxWidth = function (maxWidth) {
        var t = this;
        if (typeof maxWidth !== 'undefined') {
            t.d.maxWidth = maxWidth;
            t.d.$content.css('max-width', t.d.maxWidth);
            return t;
        }
        return t.d.maxWidth;
    };
    p.padding = function (padding) {
        var t = this;
        if (typeof padding !== 'undefined') {
            t.d.padding = padding;
            t.d.$content.css('padding', t.d.padding);
            return t;
        }
        return t.d.padding;
    };
    p.nowrap = function (nowrap) {
        var t = this;
        if (typeof nowrap !== 'undefined') {
            t.d.nowrap = $A.parseBoolean(nowrap);
            if(t.d.nowrap){
                t.d.$content.css('white-space', 'nowrap');
            }else{
                t.d.$content.css('white-space', 'normal');
            }
            return t;
        }
        return t.d.nowrap;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            $A.setContent(t.d.content, t.d.$content);
            return t;
        }
        return t.d.content;
    };
    p.navigators = function (navigators) {
        var t = this;
        if (typeof navigators !== 'undefined') {
            t.d.$navigator.empty();
            t.d.$navigatorContents.empty();
            t.d.navigators = {};
            navigators.forEach(function(navigator){
                t.addNavigator(navigator)
            });
            return t;
        }
        return t.d.navigators;
    };
    p.addNavigator = function (navigator) {
        var t = this;
        var navigatorObj = {};
        navigatorObj.text = navigator.text || '-';
        navigatorObj.name = navigator.name || navigator.text;
        navigatorObj.content = navigator.content || '';
        navigatorObj.activate = navigator.activate || function(){};
        navigatorObj.$element = $('<div class="automizy-panel-navigator-element"></div>').appendTo(t.d.$navigator).data('navigator', navigatorObj).text(navigatorObj.text).click(function(){
            var navigator = $(this).data('navigator');
            for(var i in t.d.navigators){
                t.d.navigators[i].$element.removeClass('automizy-active');
                t.d.navigators[i].$content.ahide();
            }
            navigator.$element.addClass('automizy-active');
            navigator.$content.ashow();
            navigator.activate.apply(navigator, []);
        });
        navigatorObj.$content = $('<div class="automizy-panel-navigator-content"></div>').appendTo(t.d.$navigatorContents).ahide();
        $A.setContent(navigatorObj.content, navigatorObj.$content);

        t.d.navigators[navigatorObj.name] = navigatorObj;
        return t;
    };
    p.setNavigatorContent = function (content, name) {
        var t = this;
        if(typeof t.d.navigators[name] === 'undefined'){
            return t;
        }
        $A.setContent(content, t.d.navigators[name].$content);
        return t;
    };
    p.activateNavigator = function (name) {
        var t = this;
        if(typeof t.d.navigators[name] === 'undefined'){
            return t;
        }
        t.d.navigators[name].$element.click();
        return t;
    };


    $A.initBasicFunctions(Panel, "Panel", []);


});
