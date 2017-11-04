define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var SelectOptionBox = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<span class="automizy-select-option-box-widget automizy-has-check"></span>'),
            $searchBox: $('<div class="automizy-select-search-box"></div>'),
            searchInput: $A.newInput({
                type:'text',
                width:'100%',
                placeholder:$A.translate('Search for ...'),
                keyup:function(){
                    if(t.selectModule() !== false){
                        t.selectModule().search(this.val());
                    }
                }
            }),
            $optionBox: $('<div class="automizy-select-option-box"></div>'),
            $options:$('<table border="0" cellpadding="0" cellspacing="0" class="automizy-select-option-table"></table>'),
            selectModule:false,
            hasCheck:true,
            maxHeight: '250px',
            position:'auto',
            id: 'automizy-select-option-box-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$searchBox.appendTo(t.d.$widget).hide();
        t.d.searchInput.drawTo(t.d.$searchBox);
        t.d.$optionBox.appendTo(t.d.$widget);
        t.d.$options.appendTo(t.d.$optionBox);

        if (typeof obj !== 'undefined') {
            t.initParameter(obj);
        }
    };

    var p = SelectOptionBox.prototype;

    p.selectModule = function (selectModule) {
        var t = this;
        if (typeof selectModule !== 'undefined') {
            t.d.selectModule = selectModule;
            return t;
        }
        return t.d.selectModule;
    };
    p.maxHeight = function (maxHeight) {
        var t = this;
        if (typeof maxHeight !== 'undefined') {
            t.d.maxHeight = maxHeight;
            t.widget().css('max-height', t.d.maxHeight);
            t.rePositioning();
            return t;
        }
        return t.d.maxHeight;
    };
    p.position = function (position) {
        var t = this;
        if (typeof position !== 'undefined') {
            t.d.position = position;
            t.rePositioning();
            return t;
        }
        return t.d.position;
    };
    p.rePositioning = function(){
        var t = this;

        var position = t.position();
        var maxHeight = parseInt(t.maxHeight());
        var $input = t.selectModule().widget();
        var inputOffset = $input.offset();
        var inputOffsetTop = inputOffset.top;
        var inputOffsetLeft = inputOffset.left;
        var inputHeight = $input.height();
        var inputWidth = $input.outerWidth();
        var windowHeight = window.innerHeight;

        if(position === 'auto'){
            if(inputOffsetTop + inputHeight + maxHeight >= windowHeight){
                position = 'top';
            }else{
                position = 'bottom';
            }
        }

        if(position === 'top'){
            t.widget().css({
                bottom:(windowHeight - inputOffsetTop) + 'px',
                left:inputOffsetLeft + 'px',
                top:'auto',
                width:inputWidth + 'px'
            })
        }else{
            t.widget().css({
                bottom:'auto',
                left:inputOffsetLeft + 'px',
                top:(inputOffsetTop + inputHeight) + 'px',
                width:inputWidth + 'px'
            })
        }

        return t;
    };



    p.beforeOpen = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('beforeOpen', func, name, life);
        } else {
            var a = t.runFunctions('beforeOpen');
            t.returnValue(!(t.selectModule().disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.beforeClose = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('beforeClose', func, name, life);
        } else {
            var a = t.runFunctions('beforeClose');
            t.returnValue(!(t.selectModule().disabled() === true || a[0] === false || a[1] === false));
        }
        return t;
    };
    p.open = function (func, name, life) {
        var t = this;
        $A.closeAllSelectBox();
        $A.activeSelectBox = t;
        if(t.d.opened){
            return t;
        }
        t.d.opened = true;
        if (typeof func === 'function') {
            t.addFunction('open', func, name, life);
        } else {
            if (t.beforeOpen().returnValue() !== false) {
                t.rePositioning();
                t.show();
                t.runFunctions('open');
                t.selectModule().widget().addClass('automizy-active');
                if(t.selectModule().searchable()){
                    t.d.searchInput.input().focus();
                }
                t.widget().toggleClass('automizy-has-check', t.selectModule().hasCheck());
            }
        }
        return t;
    };
    p.close = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('close', func, name, life);
        } else {
            $A.activeSelectBox = false;
            if(!t.d.opened){
                return t;
            }
            t.d.opened = false;
            if (t.beforeClose().returnValue() !== false) {
                t.hide();
                t.runFunctions('close');
                t.selectModule().widget().removeClass('automizy-active');
            }
        }
        return t;
    };


    $A.activeSelectBox = false;
    $A.initBasicFunctions(SelectOptionBox, "SelectOptionBox", ['beforeOpen', 'beforeClose', 'open', 'close']);
    $A.closeAllSelectBox = function(){
        $A.activeSelectBox = false;
        var boxes = $A.getAllSelectOptionBox();
        for(var i in boxes){
            boxes[i].close();
        }
    };
    $A.resizeAllSelectBox = function(){
        var boxes = $A.getAllSelectOptionBox();
        for(var i in boxes){
            boxes[i].rePositioning();
        }
    };


    $(window).on('resize', function(){
        $A.resizeAllSelectBox();
    });
    $(document).on('click', function(event) {
        if(!$(event.target).closest('.automizy-select-option-box-widget, .automizy-select').length) {
            $A.closeAllSelectBox();
        }
    });
    $(document).on('mousewheel DOMMouseScroll', function(event) {
        if(!$(event.target).closest('.automizy-select-option-box-widget').length) {
            $A.closeAllSelectBox();
        }
    });


});
