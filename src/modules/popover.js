define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/functions/getUniqueString',
    'automizy/images/icons'
], function () {

    var Popover = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-popover"></div>'),
            $container: $('<div class="automizy-popover-container"></div>'),
            $arrow: $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.08 51.08" class="automizy-popover-arrow"><rect x="7.98" y="7.98" width="35.12" height="35.12" transform="translate(25.54 -10.58) rotate(45)" style="fill:#fff;stroke:#ccc;stroke-miterlimit:10;stroke-width:2px"/></svg>'),
            $innerContainer: $('<div class="automizy-popover-inner-container"></div>'),
            $title: $('<div class="automizy-popover-title"></div>'),
            $content: $('<div class="automizy-popover-content"></div>'),
            $buttons: $('<div class="automizy-popover-buttons"></div>'),

            target: false,
            opened:false,
            padding:'8px',

            position: 'auto',
            gravity: 'auto',
            width: 'auto',
            maxHeight: '800px',
            offsetTop: 0,
            offsetLeft: 0,

            id: 'automizy-popover-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$widget.appendTo('body');
        t.d.$container.appendTo(t.d.$widget);
        t.d.$arrow.appendTo(t.d.$container);
        t.d.$innerContainer.appendTo(t.d.$container);
        t.d.$title.appendTo(t.d.$innerContainer);
        t.d.$content.appendTo(t.d.$innerContainer);
        t.d.$buttons.appendTo(t.d.$innerContainer);

        if (typeof obj !== 'undefined') {
            if (typeof obj.target !== 'undefined') {
                t.target(obj.target);
            }
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }
            if (typeof obj.position !== 'undefined') {
                t.position(obj.position);
            }
            if (typeof obj.gravity !== 'undefined') {
                t.gravity(obj.gravity);
            }
            if (typeof obj.offsetTop !== 'undefined') {
                t.offsetTop(obj.offsetTop);
            }
            if (typeof obj.offsetLeft !== 'undefined') {
                t.offsetLeft(obj.offsetLeft);
            }
            if (typeof obj.open !== 'undefined') {
                t.open(obj.open);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.padding !== 'undefined') {
                t.padding(obj.padding);
            }
            t.initParameter(obj);
        }

    };

    var p = Popover.prototype;


    p.target = function (target) {
        var t = this;
        if (typeof target !== 'undefined') {
            if (typeof target === 'string' || typeof target === 'number') {
                target = $('#' + target);
            }
            t.d.target = $(target);
            t.d.target.addClass('automizy-popovered');
            return t;
        }
        return t.d.target;
    };
    p.appendTo = function (appendTo) {
        var t = this;
        if (typeof appendTo !== 'undefined') {
            t.d.appendTo = appendTo;
            t.d.$widget.appendTo(t.d.appendTo);
            return t;
        }
        return t.d.appendTo;
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
    p.maxHeight = function (maxHeight) {
        var t = this;
        if (typeof maxHeight !== 'undefined') {
            t.d.maxHeight = maxHeight;
            t.d.$widget.css('max.height', maxHeight);
            return t;
        }
        return t.d.maxHeight;
    };
    p.position = function (position) {
        var t = this;
        if (typeof position !== 'undefined') {
            t.d.position = position;
            return t;
        }
        return t.d.position;
    };
    p.gravity = function (gravity) {
        var t = this;
        if (typeof gravity !== 'undefined') {
            t.d.gravity = gravity;
            return t;
        }
        return t.d.gravity;
    };
    p.offsetTop = function (offsetTop) {
        var t = this;
        if (typeof offsetTop !== 'undefined') {
            t.d.offsetTop = parseInt(offsetTop) || 0;
            return t;
        }
        return t.d.offsetTop;
    };
    p.offsetLeft = function (offsetLeft) {
        var t = this;
        if (typeof offsetLeft !== 'undefined') {
            t.d.offsetLeft = parseInt(offsetLeft) || 0;
            return t;
        }
        return t.d.offsetLeft;
    };

    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            if (t.d.title === false) {
                t.d.$title.prependTo($A.$tmp);
            } else {
                t.d.$title.html(title);
                t.d.$title.prependTo(t.d.$widget);
            }
            return t;
        }
        return t.d.title;
    };
    p.padding = function (padding) {
        var t = this;
        if (typeof padding !== 'undefined') {
            t.d.padding = padding;
            t.d.$content.css('padding', padding);
            return t;
        }
        return t.d.padding;
    };

    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            if (t.d.$content.contents() instanceof jQuery) {
                t.d.$content.contents().appendTo($A.$tmp);
            }
            t.d.$content.empty();
            t.d.content = content;
            if (t.d.content instanceof jQuery) {
                t.d.content.appendTo(t.d.$content);
            } else if (typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$content);
            } else {
                t.d.$content.html(t.d.content);
            }
            t.loadingOff();
            return t;
        }
        return t.d.content;
    };

    p.loadingOn = p.loadingStart = function () {
        var t = this;
        t.widget().addClass('automizy-loading');
        return t;
    };
    p.loadingOff = p.loadingStop = function () {
        var t = this;
        t.widget().removeClass('automizy-loading');
        return t;
    };

    p.open = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction.apply(t, ['open', func, name, life]);
            return t;
        }
        t.d.opened = true;
        t.widget().ashow();
        t.setPosition();
        t.runFunctions('open');
        return t;
    };
    p.setPosition = function () {
        var t = this;

        if(!t.d.opened){
            return t;
        }

        var position = t.position();
        var gravity = t.gravity();
        var targetOffset = t.target().offset();
        var targetOffsetTop = targetOffset.top + t.offsetTop();
        var targetOffsetLeft = targetOffset.left + t.offsetLeft();
        var targetHeight = t.target().outerHeight();
        var targetWidth = t.target().outerWidth();
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var popoverHeight = t.widget().height();
        var popoverWidth = t.widget().outerWidth();
        var boxCss = {
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
            top: 'auto'
        };
        var arrowCss = {
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
            top: 'auto'
        };

        if (position === 'auto') {
            if (targetOffsetTop + targetHeight + popoverHeight >= windowHeight) {
                position = 'top';
            } else {
                position = 'bottom';
            }
        }
        if (gravity === 'auto') {
            if (position === 'top' || position === 'bottom') {
                gravity = 'left';
            } else {
                gravity = 'top';
            }
        }

        if (position === 'top') {
            boxCss = {
                bottom: (windowHeight - targetOffsetTop) + 'px',
                left: targetOffsetLeft + 'px',
                right: 'auto',
                top: 'auto'
            };
            arrowCss = {
                bottom: '-10px',
                left: '10px',
                right: 'auto',
                top: 'auto'
            };
        } else if (position === 'bottom') {
            boxCss.top = (targetOffsetTop + targetHeight) + 'px';
            arrowCss.top = '-10px';
            if (gravity === 'right') {
                boxCss.right = windowWidth - targetOffsetLeft - targetWidth + 'px';
                arrowCss.right = '10px';
            } else {
                boxCss.left = targetOffsetLeft + 'px';
                arrowCss.left = '10px';
            }
        } else if (position === 'left') {
            boxCss = {
                bottom: 'auto',
                left: 'auto',
                right: windowWidth - targetOffsetLeft + 11 + 'px',
                top: targetOffsetTop - 17 + 'px'
            };
            arrowCss = {
                bottom: 'auto',
                left: 'auto',
                right: '-10px',
                top: '10px'
            };
        } else if (position === 'right') {
            boxCss = {
                bottom: 'auto',
                left: 'auto',
                right: windowWidth - targetOffsetLeft + 11 + 'px',
                top: targetOffsetTop - 17 + 'px'
            };
            arrowCss = {
                bottom: 'auto',
                left: 'auto',
                right: '-10px',
                top: '10px'
            };
        }

        t.widget().css(boxCss);
        t.d.$arrow.css(arrowCss);

        return t;
    };
    p.reset = function () {
        var t = this;

        t.target(false);
        t.position('auto');
        t.gravity('auto');
        t.width('auto');
        t.maxHeight('800px');
        t.content('');
        t.offsetTop(0);
        t.offsetLeft(0);
        t.buttons([]);

        return t;
    };
    p.close = function () {
        var t = this;
        t.d.opened = false;
        t.widget().ahide();
        return t;
    };

    $A.popover = function (obj) {
        if (typeof obj === 'undefined') {
            return $A.globalPopoverModule;
        }

        if (typeof obj.popover === 'undefined') {
            obj.popover = $A.globalPopoverModule;
        }
        obj.popover.target(obj.target);

        if (typeof obj.title !== 'undefined') {
            obj.popover.title(obj.title);
        } else {
            obj.popover.title('');
        }

        if (typeof obj.content !== 'undefined') {
            obj.popover.content(obj.content);
        } else {
            obj.popover.content('');
        }

        if (typeof obj.buttons !== 'undefined') {
            obj.popover.buttons(obj.buttons);
        } else {
            obj.popover.buttons([]);
        }

        if (typeof obj.width !== 'undefined') {
            obj.popover.width(obj.width);
        } else {
            obj.popover.width('auto');
        }

        if (typeof obj.position !== 'undefined') {
            obj.popover.position(obj.position);
        } else {
            obj.popover.position('auto');
        }

        if (typeof obj.gravity !== 'undefined') {
            obj.popover.gravity(obj.gravity);
        } else {
            obj.popover.gravity('auto');
        }

        if (typeof obj.offsetTop !== 'undefined') {
            obj.popover.offsetTop(obj.offsetTop);
        } else {
            obj.popover.offsetTop(0);
        }

        if (typeof obj.offsetLeft !== 'undefined') {
            obj.popover.offsetLeft(obj.offsetLeft);
        } else {
            obj.popover.offsetLeft(0);
        }

        if (typeof obj.padding !== 'undefined') {
            obj.popover.padding(obj.padding);
        } else {
            obj.popover.padding('8px');
        }

        if (typeof obj.appendTo !== 'undefined') {
            obj.popover.appendTo(obj.appendTo);
        } else {
            obj.popover.appendTo('body');
        }

        obj.popover.off('open');
        if (typeof obj.open === 'function') {
            obj.popover.on('open', obj.open);
        }


        return obj.popover;

    };


    $A.initBasicFunctions(Popover, "Popover", ['open', 'close']);

    $A.globalPopoverModule = $A.newPopover();
    $A.globalPopoverModule.close();

    $A.closeAllPopover = function () {
        var popovers = $A.getAllPopover();
        for (var i in popovers) {
            popovers[i].close();
        }
    };

    $(document).on('mouseup', function (event) {
        if (!$(event.target).closest('.automizy-popover, .automizy-popovered, .ui-datepicker').length) {
            $A.closeAllPopover();
        }
    });

});
