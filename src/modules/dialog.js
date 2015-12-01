define([
    'automizy/core',
    'automizy/modules/button',
    'automizy/functions/setWindowScroll',
    'automizy/addons/jqueryAddOns',
    'automizy/addons/objectAddOns',
    'automizy/functions/getUniqueString',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/functions/runFunctions'
], function () {
    var Dialog = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-dialog"></table>'),
            $cell: $('<td class="automizy-dialog-cell"></td>'),
            $box: $('<div class="automizy-dialog-box"></div>'),
            $head: $('<div class="automizy-dialog-head"></div>'),
            $buttons: $('<div class="automizy-dialog-buttons"></div>'),
            $content: $('<div class="automizy-dialog-content"></div>'),
            buttons: [],
            positionX: 'center',
            positionY: 'middle',
            title: 'My Dialog',
            width: '60%',
            maxWidth: '100%',
            minWidth: '250px',
            minHeight:'0px',
            zIndex: 2501,
            isClose: true,
            hasObject: false,
            hash: false,
            closable:true,
            buttonsBox:true,
            id: 'automizy-dialog-' + $A.getUniqueString(),
            openFunctions: [],
            beforeOpenFunctions: [],
            closeFunctions: [],
            create: function () {
            }
        };
        t.init();

        var $tr = $('<tr></tr>');
        t.d.$cell.appendTo($tr);
        $tr.appendTo(t.d.$widget);
        t.d.$box.click(function () {
            t.d.isClose = false;
        }).appendTo(t.d.$cell);
        t.d.$widget.attr('id', t.id()).click(function () {
            if (t.d.isClose)
                t.close();
            else
                t.d.isClose = true;
        });
        t.d.$head.appendTo(t.d.$box);
        t.d.$content.appendTo(t.d.$box);
        t.d.$buttons.appendTo(t.d.$box);

        if (typeof obj !== 'undefined') {
            if (typeof obj.title !== 'undefined')
                t.title(obj.title);
            if (typeof obj.displayHeader !== 'undefined')
                t.displayHeader(obj.displayHeader);
            if (typeof obj.positionX !== 'undefined')
                t.positionX(obj.positionX);
            if (typeof obj.positionY !== 'undefined')
                t.positionY(obj.positionY);
            if (typeof obj.position !== 'undefined')
                t.position(obj.position);
            if (typeof obj.width !== 'undefined')
                t.width(obj.width);
            if (typeof obj.maxWidth !== 'undefined')
                t.maxWidth(obj.maxWidth);
            if (typeof obj.minWidth !== 'undefined')
                t.minWidth(obj.minWidth);
            if (typeof obj.maxWidth !== 'undefined')
                t.maxWidth(obj.maxWidth);
            if (typeof obj.minHeight !== 'undefined')
                t.minHeight(obj.minHeight);
            if (typeof obj.zIndex !== 'undefined')
                t.zIndex(obj.zIndex);
            if (typeof obj.closable !== 'undefined')
                t.closable(obj.closable);
            if (typeof obj.buttonsBox !== 'undefined')
                t.buttonsBox(obj.buttonsBox);
            if (typeof obj.open === 'function')
                t.open(obj.open);
            if (typeof obj.beforeOpen === 'function')
                t.beforeOpen(obj.beforeOpen);
            if (typeof obj.close === 'function')
                t.close(obj.close);
            if (typeof obj.content !== 'undefined')
                t.content(obj.content);
            if (typeof obj.hash !== 'undefined')
                t.hash(obj.hash);
            t.initParameter(obj);
        }
    };

    var p = Dialog.prototype;

    p.title = function (newTitle) {
        var t = this;
        if (typeof newTitle !== 'undefined') {
            t.d.title = newTitle;
            t.d.$head.html(newTitle);
            return t;
        }
        return t.d.title;
    };
    p.displayHeader = function (displayHeader) {
        var t = this;
        if (typeof displayHeader !== 'undefined') {
            t.d.displayHeader = $A.parseBoolean(displayHeader);
            if(t.d.displayHeader){
                t.d.$head.hide();
            }else{
                t.d.$head.hide();
            }
            return t;
        }
        return t.d.displayHeader;
    };
    p.hash = function (hash) {
        var t = this;
        if (typeof hash !== 'undefined') {
            t.d.hash = hash;
            return t;
        }
        return t.d.hash;
    };
    p.buttonsBox = function (buttonsBox) {
        var t = this;
        if (typeof buttonsBox !== 'undefined') {
            t.d.buttonsBox = $A.parseBoolean(buttonsBox);
            if(!t.d.buttonsBox){
                t.d.$buttons.hide();
            }
            return t;
        }
        return t.d.buttonsBox;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.$content.empty();
            if (content instanceof jQuery) {
                content.appendTo(t.d.$content);
            } else if (typeof content === "object" && typeof content.draw === "function") {
                content.draw(t.d.$content);
            } else {
                t.d.$content.html(content);
            }
            return t;
        }
        return t.d.$content;
    };
    p.positionX = function (x) {
        var t = this;
        if (typeof x !== 'undefined') {
            $cell = t.d.$cell;
            if (x === 'left') {
                $cell.css({textAlign: 'left', textIndent: 0});
            } else if (x === 'right') {
                $cell.css({textAlign: 'right', textIndent: 0});
            } else if (x === 'center' || x === 'middle') {
                x = 'center';
                $cell.css({textAlign: 'center', textIndent: 0});
            } else {
                $cell.css({textAlign: 'left', textIndent: x});
            }
            t.d.positionX = x;
            return t;
        }
        return t.d.positionX;
    };
    p.positionY = function (y) {
        var t = this;
        if (typeof y !== 'undefined') {
            $cell = t.d.$cell;
            if (y === 'top') {
                $cell.css({verticalAlign: 'top', paddingTop: 0, paddingBottom: 0});
            } else if (y === 'bottom') {
                $cell.css({verticalAlign: 'bottom', paddingTop: 0, paddingBottom: 0});
            } else if (y === 'center' || y === 'middle') {
                y = 'middle';
                $cell.css({verticalAlign: 'middle', paddingTop: 0, paddingBottom: 0});
            } else {
                /*
                if ($(t.d.$box).height()+parseInt(y)>$(window).height()){
                    $(t.d.$content).height($(t.d.$content).height()+($(window).height()-$(t.d.$box).height()-parseInt(y)));
                }
                */
               
                $cell.css({verticalAlign: 'top', paddingTop: y, paddingBottom: y});
            }
            t.d.positionY = y;
            t.setMaxHeight();
            return t;
        }
        return t.d.positionY;
    };
    p.position = function (xy) {
        var t = this;
        if (typeof xy === 'string') {
            var pos = xy.split(" ");
            t.positionX(pos[0]);
            t.positionY(pos[1]);
            t.d.positionX=pos[0];
            t.d.positionY=pos[1];
            t.setMaxHeight();
            return t;
        } else if (typeof xy !== 'undefined') {
            console.warn('Bad parameter type.', xy);
        }
        return t.d.positionX + ' ' + t.d.positionY;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.d.$box.width(width);
            return t;
        }
        return t.d.width;
    };
    p.maxWidth = function (maxWidth) {
        var t = this;
        if (typeof maxWidth !== 'undefined') {
            t.d.maxWidth = maxWidth;
            t.d.$box.css('maxWidth', maxWidth);
            return t;
        }
        return t.d.maxWidth;
    };
    p.minWidth = function (minWidth) {
        var t = this;
        if (typeof minWidth !== 'undefined') {
            t.d.minWidth = minWidth;
            t.d.$box.css('minWidth', minWidth);
            return t;
        }
        return t.d.minWidth;
    };
    p.minHeight = function (minHeight) {
        var t = this;
        if (typeof minHeight !== 'undefined') {
            t.d.minHeight = minHeight;
            t.d.$box.css('min-height', minHeight);
            t.d.$content.css('min-height', parseInt(t.d.$box.css('min-height')) - 108 + 'px');
            t.setMaxHeight();
            return t;
        }
        return t.d.minHeight;
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
    p.show = function (func) {
        var t = this;
        $A.setWindowScroll(false, this.d.id);
        if (!t.d.hasObject) {
            t.draw();
        }
        this.d.$widget.ashow();        
        t.setMaxHeight();
        return this;
    };
    p.open = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.openFunctions.push(func);
        } else {
            t.beforeOpen();
            if($A.runFunctions($A.events.dialog.functions.beforeOpen, this, [this, this.d.$widget]) === false){
                return false;
            }
            if($A.runFunctions(t.d.openFunctions, this, [this, this.d.$widget]) !== false){
                if (t.hash() !== false)
                    $A.hashChange(t.hash());
                t.show();
            }
            $A.runFunctions($A.events.dialog.functions.open, this, [this, this.d.$widget]);
        }
        t.setMaxHeight();
        return t;
    };
    p.beforeOpen = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.beforeOpenFunctions.push(func);
        } else {
            $A.runFunctions(t.d.beforeOpenFunctions, this, [this, this.d.$widget]);
        }
        return t;
    };
    p.closable = function (closable) {
        var t = this;
        if (typeof closable !== 'undefined') {
            t.d.closable = closable;
        } else {
            return t.d.closable;
        }
        return t;
    };
    p.close = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.closeFunctions.push(func);
        } else {
            if(t.d.closable){
                if($A.runFunctions(t.d.closeFunctions, this, [this, this.d.$widget]) !== false){
                    t.hide();
                }
            }
        }
        return t;
    };
        
    p.setMaxHeight = function(){
        var t = this;
        var buttonBoxHeight = 0;
        if(t.buttonsBox()){
            buttonBoxHeight = t.d.$buttons.outerHeight();
        }
        var maxHeight = $(window).height() - buttonBoxHeight - t.d.$head.outerHeight();
        if (!isNaN(parseInt(t.d.positionY))){
            maxHeight -= parseInt(t.d.positionY);
        }
        t.d.$content.css({
            maxHeight:maxHeight
        });
        return maxHeight;
    };

    $A.events.dialog = {};
    $A.registerLocalEvents($A.events.dialog, ['open', 'beforeOpen']);

    $A.initBasicFunctions(Dialog, "Dialog");

});