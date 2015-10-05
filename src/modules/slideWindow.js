define([
    'automizy/core',
    'automizy/modules/button',
    'automizy/modules/form',
    'automizy/modules/input',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/getUniqueString',
    'automizy/functions/initBasicFunctions'
], function () {

    SlideWindow = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-slide-window"></div>'),
            $head: $('<div class="automizy-slide-window-head"></div>'),
            $buttons: $('<div class="automizy-slide-window-buttons"></div>'),
            $content: $('<div class="automizy-slide-window-content"></div>'),
            $tab: $('<div class="automizy-slide-window-tab"></div>'),
            buttons: [],
            positionY: 'bottom',
            positionX: 'center',
            position: 'right',
            title: 'My SlideWindow',
            hash: '',
            tab: {
                text: 'Click this!',
                html: $('<span></span>'),
                width: 'auto',
                pos: 'right'
            },
            width: 600,
            zIndex: 3000,
            isOpened: false,
            isCloseable: true,
            autoClose: true,
            hasObject: false,
            id: 'automizy-slide-window-' + $A.getUniqueString(),
            animation: {
                open: 'swing',
                close: 'swing',
                openTime: 200,
                closeTime: 200
            },
            createFunctions: [],
            open: function () {
            },
            close: function () {
            },
            animationOpen: function () {
                var animation = {};
                switch (t.d.position) {
                    case "right":
                        animation = {right: 0};
                        break;
                    case "left":
                        animation = {left: 0};
                        break;
                    case "top":
                        animation = {top: 0};
                        break;
                    case "bottom":
                        animation = {bottom: 0};
                        break;
                    default:
                        animation = {right: -t.d.$widget.width()};
                        break;
                }
                return animation;
            },
            animationClose: function () {
                var animation = {};
                switch (t.d.position) {
                    case "right":
                        animation = {right: -t.d.$widget.outerWidth()};
                        break;
                    case "left":
                        animation = {left: -t.d.$widget.outerWidth()};
                        break;
                    case "top":
                        animation = {top: -t.d.$widget.outerHeight()};
                        break;
                    case "bottom":
                        animation = {bottom: -t.d.$widget.outerHeight()};
                        break;
                    default:
                        animation = {right: 0};
                        break;
                }
                return animation;
            }
        };
        t.init();

        t.d.$widget.attr('id', t.id());
        t.d.$tab.text(t.d.tab.text);
        t.d.$head.text(t.d.title);
        t.d.$tab.appendTo(t.d.$widget);
        t.d.$head.appendTo(t.d.$widget);
        t.d.$content.appendTo(t.d.$widget);
        t.d.$buttons.appendTo(t.d.$widget);
        t.d.$widget.css({visibility:'hidden'});
        t.d.createFunctions.push(function () {
            t.position(t.d.position);
            t.d.$widget.stop().animate(t.d.animationClose(), 0, 'swing', function(){
                t.d.$widget.css({visibility:'visible'});
            });
            t.show();
        });
        t.d.$tab.click(function () {
            if (t.d.isOpened === true) {
                t.close();
            } else {
                t.open();
            }
        });
        t.d.$widget.click(function () {
            if (t.d.autoClose === true)
                t.d.isCloseable = false;
        });
        $(window).click(function () {
            if (t.d.isCloseable === true && t.d.autoClose === true) {
                t.close();
            }
            t.d.isCloseable = true;
        });

        if (typeof obj !== 'undefined') {
            if (typeof obj.tab !== 'undefined')
                t.tab(obj.tab);
            if (typeof obj.title !== 'undefined')
                t.title(obj.title);
            if (typeof obj.position !== 'undefined')
                t.position(obj.position);
            if (typeof obj.positionY !== 'undefined')
                t.positionY(obj.positionY);
            if (typeof obj.positionX !== 'undefined')
                t.positionX(obj.positionX);
            if (typeof obj.width !== 'undefined')
                t.width(obj.width);
            if (typeof obj.zIndex !== 'undefined')
                t.zIndex(obj.zIndex);
            if (typeof obj.animation !== 'undefined')
                t.animation(obj.animation);
            if (typeof obj.open === 'function')
                t.open(obj.open);
            if (typeof obj.close === 'function')
                t.close(obj.close);
            if (typeof obj.autoClose !== 'undefined')
                t.autoClose(obj.autoClose);
            if (typeof obj.content !== 'undefined')
                t.content(obj.content);
            t.initParameter(obj);
        }
    };
    var p = SlideWindow.prototype;

    p.show = function (func) {
        var t = this;
        $A.setWindowScroll(false, this.d.id);
        if (!t.d.hasObject) {
            t.draw();
        }
        this.d.$widget.ashow();
        return this;
    };
    p.hash = function (hash) {
        var t = this;
        if (typeof hash !== 'undefined') {
            t.d.hash = hash;
            return t;
        }
        return t.d.hash;
    };
    p.close = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.close = func;
        } else {
            t.d.isOpened = false;
            t.d.$widget.stop().animate(t.d.animationClose(), t.d.animation.closeTime, t.d.animation.close, function () {
                t.d.close.apply(t, [t, t.d.$widget]);
            });
        }
        return t;
    };
    p.open = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.open = func;
        } else {
            t.d.isOpened = true;
            if (t.hash() !== false) {
                $A.hashChange(t.hash());
            }
            t.d.$widget.stop().animate(t.d.animationOpen(), t.d.animation.openTime, t.d.animation.open, function () {
                t.d.open.apply(t, [t, t.d.$widget]);
                t.show();
            });
        }
        return t;
    };
    p.autoClose = function (bool) {
        var t = this;
        if (typeof bool !== 'undefined') {
            t.d.autoClose = bool;
            return t;
        }
        return t.d.autoClose;
    };
    
    p.title = function (newTitle) {
        var t = this;
        if (typeof newTitle !== 'undefined') {
            t.d.title = newTitle;
            t.d.$head.html(newTitle);
            return t;
        }
        return t.d.title;
    };
    p.tab = function (tab) {
        var t = this;
        if (typeof tab === 'undefined')
            return t.d.tab;
        var tab = tab || {};
        t.d.tab.text = tab.text || t.d.tab.text;
        t.d.$tab.text(t.d.tab.text);
        t.d.tab.html = tab.html || t.d.tab.html;
        if(!t.d.tab.html instanceof jQuery){
            t.d.tab.html = $(t.d.tab.html);
        }
        t.d.tab.html.appendTo(t.d.$tab);
        return t;
    };

    p.tabPos = function (pos) {
        var t = this;
        if (typeof pos === 'undefined')
            return t.d.tab.pos;
        else {
            if (pos === 'right' || pos === 'left' || pos === 'center')
                t.d.tab.pos = pos;
            var hd = t.d.$tab.outerWidth();
            var hg = t.d.$tab.outerHeight();
            var halfWd = hd / 2;
            var halfHg = hg / 2;
            switch (t.d.position) {
                case 'right':
                    t.d.$tab.css({
                        left: -halfHg - halfWd,
                        top: (hd * 0.5) - (hg * 0.5) -(parseInt(t.widget().css('border-top-width')))
                    });
                    t.d.$content.css({'min-height': t.d.$tab.width() - t.d.$head.height() - t.d.$buttons.height()});
                    break;
                case 'left':
                    t.d.$tab.css({
                        left: -halfHg - halfWd + t.widget().outerWidth() + t.d.$tab.outerHeight() -parseInt(t.widget().css('border-right-width')) -parseInt(t.widget().css('border-left-width')),
                        top: (hd * 0.5) - (hg * 0.5) -(parseInt(t.widget().css('border-top-width')))
                    });
                    t.d.$content.css({'min-height': t.d.$tab.width() - t.d.$head.height() - t.d.$buttons.height()});
                    break;
                case 'bottom':
                    t.d.$tab.css({
                        top: -parseInt(t.d.$tab.outerHeight())
                    });
                    break;
                case 'top':
                    t.d.$tab.css({
                        top: t.d.$widget.outerHeight() -parseInt(t.widget().css('border-top-width'))
                    });
                    break;
            }
            switch (pos) {
                case 'center':
                    if (t.d.position === 'bottom' || t.d.position === 'top')
                        t.d.$tab.css({
                            left: (parseInt(t.d.$widget.outerWidth()) - parseInt(t.d.$tab.outerWidth())) / 2 -parseInt(t.widget().css('border-left-width'))
                        });
                    if (t.d.position === 'left' || t.d.position === 'right')
                        t.d.$tab.css({
                            top: ((t.d.$widget.outerHeight() - t.d.$tab.outerHeight()) / 2 -(parseInt(t.widget().css('border-top-width'))))
                        });
                    break;
                case 'right':
                    if (t.d.position === 'bottom' || t.d.position === 'top')
                        t.d.$tab.css({
                            left: t.widget().outerWidth() - t.d.$tab.outerWidth()
                        });
                    if (t.d.position === 'left' || t.d.position === 'right')
                        t.d.$tab.css({
                            top: (hd * 0.5) - (hg * 0.5) -(parseInt(t.widget().css('border-top-width')))
                        });
                    break;
                case 'left':
                    if (t.d.position === 'bottom' || t.d.position === 'top')
                        t.d.$tab.css({
                            left: -1
                        });
                    if (t.d.position === 'left' || t.d.position === 'right')
                        t.d.$tab.css({
                            top: t.widget().outerHeight() - t.d.$tab.outerWidth() / 2 - hg / 2
                        });
                    break;
            }
            return t;
        }
    };

    p.tabWidth = function (width) {
        var t = this;
        if (typeof width === 'undefined')
            return t.d.tab.width;
        t.d.tab.width = width;
        if (width === '100%') {
            if (t.d.position === 'left' || t.d.position === 'right') {
                t.d.$tab.css({'padding-left': (parseInt(t.d.$widget.outerHeight()) - t.d.$tab.width()) / 2 -parseInt(t.d.$tab.css('border-left-width'))+parseInt(t.widget().css('border-bottom-width'))});
                t.d.$tab.css({'padding-right': (parseInt(t.d.$widget.outerHeight()) - t.d.$tab.width()) / 2 -parseInt(t.d.$tab.css('border-right-width')+parseInt(t.widget().css('border-top-width')))});
            }
            else {
                t.d.$tab.css({'padding-left': (parseInt(t.d.$widget.outerWidth()) - t.d.$tab.width()) / 2 -parseInt(t.d.$tab.css('border-left-width'))});
                t.d.$tab.css({'padding-right': (parseInt(t.d.$widget.outerWidth()) - t.d.$tab.width()) / 2 -parseInt(t.d.$tab.css('border-right-width'))});
            }
            t.tabPos('center');
            t.d.tab.pos = 'center';
            return t;
        }
        if (width === 'auto') {
            t.d.$tab.css({padding: '3px 6px'});
            t.tabPos(t.d.tab.pos);
            return t;
        }
        else {
            width = parseInt(width);
            if (width < t.d.$tab.width()) {
                console.warn('Not wide enough! Min. width is:' + t.d.$tab.width());
            }
            else {
                t.d.$tab.css({'padding-left': (width - t.d.$tab.width()) / 2 -parseInt(t.d.$tab.css('border-left-width'))});
                t.d.$tab.css({'padding-right': (width - t.d.$tab.width() / 2 -parseInt(t.d.$tab.css('border-right-width')))});
                t.tabPos(t.d.tab.pos);
            }
            return t;
        }
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            if (content instanceof jQuery) {
                content.appendTo(t.d.$content.html(''));
            } else if (content instanceof $A.m.Form) {
                content.drawTo(t.d.$content.html(''));
            } else {
                t.d.$content.html(content);
            }
            return t;
        }
        return t.d.$content;
    };
    p.positionY = function (y) {
        var t = this;
        if (t.d.position === "bottom" || t.d.position === "top") {
            console.warn("Only defined if slide window widget is positioned to the right or to the left.");
            if (typeof y !== 'undefined')
                return t;
        }
        if (typeof y !== 'undefined') {
            t.d.positionY = y;
            if (y === 'top')
                t.d.$widget.css({bottom:'auto', top:0});
            else if (y==='bottom')
                t.d.$widget.css({top:'auto', bottom:0});
            else if (y==='middle')
                t.widget().css({bottom: 'auto', top:(parseInt($('body').outerHeight()) - parseInt(t.widget().outerHeight()))/2});
            else
            t.d.$widget.css({'top': t.d.positionY});
            return t;
        }
        return t.d.positionY;
    };
    p.positionX = function (x) {
        var t = this;
        if (!(t.d.position === "bottom" || t.d.position === "top")) {
            console.warn("Only defined if slide window widget is positioned to the top or on the bottom.");
            if (typeof x !== 'undefined')
                return t;
        }
        if (typeof x !== 'undefined') {
            t.d.positionX = x;
            if (x === 'right')
                t.d.$widget.css({left:'auto', right:0});
            else if (x==='left')
                t.d.$widget.css({right:'auto', left:0});
            else if (x==='center')
                t.d.$widget.css({right: 'auto', left: ($('body').outerWidth() - t.d.$widget.width()) / 2});
            else
            t.d.$widget.css({'left': t.d.positionX});
            return t;
        }
        return t.d.positionX;
    };
    p.position = function (pos) {
        var t = this;
        if (typeof pos !== 'undefined') {
            if (pos === 'left' || pos === 'right' || pos === 'bottom' || pos === 'top'){
                t.d.$widget.removeClass('slideWindow-position-right');
                t.d.$widget.removeClass('slideWindow-position-left');
                t.d.$widget.removeClass('slideWindow-position-top');
                t.d.$widget.removeClass('slideWindow-position-bottom');
                t.d.position = pos;
                t.d.isOpened = false;
                t.d.isCloseable = true;
                switch (pos) {
                    case 'left':
                        t.d.$widget.addClass('slideWindow-position-left');
                        t.positionY(t.d.positionY);
                        t.d.positionX = -t.d.width;
                        t.d.$widget.css({left: t.d.positionX, right: 'auto', bottom: 'auto'});
                        t.tabWidth(t.d.tab.width);
                        break;
                    case 'right':
                        t.d.$widget.addClass('slideWindow-position-right');
                        t.positionY(t.d.positionY);
                        t.d.positionX = -t.d.width;
                        t.d.$widget.css({right: t.d.positionX, left: 'auto', bottom: 'auto'});
                        t.tabWidth(t.d.tab.width);
                        break;
                    case 'top':
                        t.d.$widget.addClass('slideWindow-position-top');
                        t.d.$widget.css({top: -t.d.$widget.outerHeight()});
                        t.d.positionX = ($('body').outerWidth() - t.d.$widget.width()) / 2;
                        t.d.$widget.css({bottom: 'auto'});
                        t.d.$widget.css({left: t.d.positionX});
                        t.tabWidth(t.d.tab.width);
                        t.d.$content.css({'min-height': 'auto'});
                        break;
                    case 'bottom':
                        t.d.$widget.addClass('slideWindow-position-bottom');
                        t.d.$widget.css({bottom: -t.d.$widget.outerHeight()});
                        t.positionX(t.d.positionX);
                        t.d.$widget.css({top: 'auto'});
                        t.d.$widget.css({left: t.d.positionX});
                        t.tabWidth(t.d.tab.width);
                        t.d.$content.css({'min-height': 'auto'});
                        break;
                }
                return t;
            }
            else
                console.warn("Only the following arguments are accepted: 'left' | 'right' | 'top' | 'bottom'.");
        }
        else
            return t.d.position;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.d.$widget.width(width);
            return t;
        }
        return t.d.width;
    };
    p.animation = function (animation) {
        var t = this;
        if (typeof animation !== 'undefined') {
            if (typeof animation === 'object' && animation.hasOwnProperty('open') && animation.hasOwnProperty('close') && animation.hasOwnProperty('openTime') && animation.hasOwnProperty('closeTime') && Object.keys(animation).length === 4) {
                animation.closeTime = parseInt(animation.closeTime);
                animation.openTime = parseInt(animation.openTime);
                this.d.animation = animation;
                return t;
            }
            else
                console.warn('Bad parameters!');
        } else
            return t.d.animation;
    };
    p.zIndex = function (zIndex) {
        var t = this;
        if (typeof zIndex !== 'undefined' && Number(zIndex) === zIndex && zIndex % 1 === 0) {
            t.d.zIndex = zIndex;
            t.d.$widget.css({zIndex: zIndex});
            return t;
        } else {
            console.warn('Bad parameter type.', zIndex);
        }
        return t.d.zIndex;
    };
    
    $A.initBasicFunctions(SlideWindow, "SlideWindow");
});
