define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {

    var Popover = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-popover"></div>'),
            $title:$('<div class="automizy-popover-title"></div>'),
            $content:$('<div class="automizy-popover-content"></div>'),
            $buttons:$('<div class="automizy-popover-buttons"></div>'),

            target:false,

            position:'auto',
            width:'auto',
            maxHeight:'800px',

            id: 'automizy-popover-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$widget.appendTo('body');
        t.d.$title.appendTo(t.d.$widget);
        t.d.$content.appendTo(t.d.$widget);
        t.d.$buttons.appendTo(t.d.$widget);

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
            if (typeof obj.open === 'function') {
                t.open(obj.open);
            }
            t.initParameter(obj);
        }

    };

    var p = Popover.prototype;


    p.target = function (target) {
        var t = this;
        if (typeof target !== 'undefined') {
            t.d.target = target;
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
            } else if(typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$content);
            } else {
                t.d.$content.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };

    p.open = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction.apply(t, ['open', func, name, life]);
            return t;
        }
        var position = t.position();
        var targetOffset = t.target().offset();
        var targetOffsetTop = targetOffset.top;
        var targetOffsetLeft = targetOffset.left;
        var targetHeight = t.target().height();
        var targetWidth = t.target().outerWidth();
        var windowHeight = window.innerHeight;
        var popoverHeight = t.widget().height();

        if(position === 'auto'){
            if(targetOffsetTop + targetHeight + popoverHeight >= windowHeight){
                position = 'top';
            }else{
                position = 'bottom';
            }
        }

        if(position === 'top'){
            t.widget().css({
                bottom:(windowHeight - targetOffsetTop) + 'px',
                left:targetOffsetLeft + 'px',
                top:'auto'
            })
        }else{
            t.widget().css({
                bottom:'auto',
                left:targetOffsetLeft + 'px',
                top:(targetOffsetTop + targetHeight) + 'px'
            })
        }

        t.widget().ashow();
        t.runFunctions('open');
        return t;
    };
    p.close = function () {
        var t = this;
        t.widget().ahide();
        return t;
    };

    $A.popover = function (obj) {
        if (typeof obj === 'undefined') {
            return $A.globalPopoverModule;
        }
        if (obj.target instanceof HTMLElement) {
            obj.target = $(obj.target);
        }else if(typeof obj.target.widget === 'function'){
            obj.target = obj.target.widget();
        }

        if(typeof obj.popover === 'undefined'){
            obj.popover = $A.globalPopoverModule;
        }
        obj.popover.target(obj.target);

        if (typeof obj.title !== 'undefined') {
            obj.popover.title(obj.title);
        }else{
            obj.popover.title('');
        }

        if (typeof obj.content !== 'undefined') {
            obj.popover.content(obj.content);
        }else{
            obj.popover.content('');
        }

        if (typeof obj.buttons !== 'undefined') {
            obj.popover.buttons(obj.buttons);
        }else{
            obj.popover.buttons([]);
        }

        if (typeof obj.width !== 'undefined') {
            obj.popover.width(obj.width);
        }else{
            obj.popover.width('auto');
        }

        if (typeof obj.position !== 'undefined') {
            obj.popover.position(obj.position);
        }else{
            obj.popover.position('auto');
        }

        if (typeof obj.appendTo !== 'undefined') {
            obj.popover.appendTo(obj.appendTo);
        }else{
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

    $A.closeAllPopover = function(){
        var popovers = $A.getAllPopover();
        for(var i in popovers){
            popovers[i].close();
        }
    };

    $(document).on('mouseup', function(event) {
        if(!$(event.target).closest('.automizy-popover, .automizy-popovered, .ui-datepicker').length) {
            $A.closeAllPopover();
        }
    });

});
