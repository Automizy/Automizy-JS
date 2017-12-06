define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var Mockup = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-mockup"></div>'),
            $device: $('<div class="automizy-mockup-device"></div>'),
            $deviceImage: $('<img src="" class="automizy-mockup-device-image" />'),
            $loading:$('<div class="automizy-mockup-loading"></div>'),
            $iframe: $('<iframe class="automizy-mockup-iframe" scrolling="no"></iframe>'),

            deviceType: 'default-tablet-portrait',
            scrolling:false,
            zoom:false,
            minHeight:'auto',
            minWidth:'auto',
            content:'',
            emptyContent:'',
            oldScrollTop:0,
            actuallyScrollTop:0,
            id: 'automizy-mockup-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$device.appendTo(t.d.$widget);
        t.d.$deviceImage.appendTo(t.d.$device);
        t.d.$iframe.appendTo(t.d.$device);
        t.d.$loading.appendTo(t.d.$device);
        t.loadingOff();
        if (typeof obj !== 'undefined') {
            if (typeof obj.deviceType !== 'undefined') {
                t.deviceType(obj.deviceType);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.emptyContent !== 'undefined') {
                t.emptyContent(obj.emptyContent);
            }
            if (typeof obj.zoom !== 'undefined') {
                t.zoom(obj.zoom);
            }
            if (typeof obj.scrolling !== 'undefined') {
                t.scrolling(obj.scrolling);
            }
            if (typeof obj.minWidth !== 'undefined') {
                t.minWidth(obj.minWidth);
            }
            if (typeof obj.minHeight !== 'undefined') {
                t.minHeight(obj.minHeight);
            }
            if (typeof obj.ratioForWidth !== 'undefined') {
                if(obj.ratioForWidth){
                    t.ratioForWidth();
                }else{
                    t.ratioForHeight();
                }
            }
            t.initParameter(obj);
        }

    };

    var p = Mockup.prototype;
    p.deviceType = function (deviceType) {
        var t = this;
        if (typeof deviceType !== 'undefined') {
            t.d.deviceType = deviceType;
            t.widget().removeClassPrefix('automizy-mockup-device-type-').addClass('automizy-mockup-device-type-' + deviceType);
            t.d.$deviceImage.attr('src', 'images/mockup/'+deviceType+'.svg');
            return t;
        }
        return t.d.deviceType;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            var style = 'body,html{margin:0;padding:0} ';
            if(t.zoom() !== false){
                var zoom = t.zoom();
                var width = 100/zoom;
                style += 'body{transform-origin: top left;width:'+width+'%;transform: scale('+zoom+');} ';
            }
            setTimeout(function(){
                if(t.d.content.trim().length <= 0){
                    t.iframeDocument().html('<!DOCTYPE html>' + t.emptyContent() + '<style>body,html{margin:0;padding:0}</style>');
                }else {
                    t.iframeDocument().html('<!DOCTYPE html>' + t.d.content + '<style>' + style + '</style>');
                    $(t.contentWindow()).on('mousewheel', function(event){
                        if(!t.scrolling()){
                            return;
                        }
                        var $t = $(this);
                        var scrollTop = $t.scrollTop();
                        var scrollStep = 45;
                        if(event.originalEvent.wheelDelta /120 > 0) {
                            scrollTop -= scrollStep;
                        } else{
                            scrollTop += scrollStep;
                        }
                        $t.scrollTop(scrollTop);

                        t.d.actuallyScrollTop = $t.scrollTop();
                        if(t.d.actuallyScrollTop !== t.d.oldScrollTop){
                            event.preventDefault();
                        }
                        t.d.oldScrollTop = $t.scrollTop();
                    });
                }
            }, 10);
            return t;
        }
        return t.d.content;
    };
    p.emptyContent = function (emptyContent) {
        var t = this;
        if (typeof emptyContent !== 'undefined') {
            t.d.emptyContent = emptyContent;
            return t;
        }
        return t.d.emptyContent;
    };
    p.contentWindow = function () {
        var t = this;
        return t.d.$iframe[0].contentWindow;
    };
    p.iframeDocument = function () {
        var t = this;
        return $('body', t.contentWindow().document);
    };
    p.scrolling = function (scrolling) {
        var t = this;
        if(typeof scrolling !== 'undefined'){
            t.d.scrolling = $A.parseBoolean(scrolling);
            return t;
        }
        return t.d.scrolling;
    };
    p.zoom = function (zoom) {
        var t = this;
        if(typeof zoom !== 'undefined'){
            t.d.zoom = zoom;
            return t;
        }
        return t.d.zoom;
    };
    p.minWidth = function (minWidth) {
        var t = this;
        if(typeof minWidth !== 'undefined'){
            t.d.minWidth = minWidth;
            t.d.$deviceImage.css('min-width', t.d.minWidth);
            return t;
        }
        return t.d.minWidth;
    };
    p.minHeight = function (minHeight) {
        var t = this;
        if(typeof minHeight !== 'undefined'){
            t.d.minHeight = minHeight;
            t.d.$deviceImage.css('min-height', t.d.minHeight);
            return t;
        }
        return t.d.minHeight;
    };
    p.loadingOn = function () {
        var t = this;
        t.d.$loading.ashow();
        t.d.$iframe.ahide();
        return t;
    };
    p.loadingOff = function () {
        var t = this;
        t.d.$loading.ahide();
        t.d.$iframe.ashow();
        return t;
    };
    p.ratioForWidth = function () {
        var t = this;
        t.widget().addClass('ratio-for-width');
        return t;
    };
    p.ratioForHeight = function () {
        var t = this;
        t.widget().removeClass('ratio-for-width');
        return t;
    };


    $A.initBasicFunctions(Mockup, "Mockup", []);


    $(document).on('mousewheel DOMMouseScroll', function(event) {
        if(!$(event.target).closest('.automizy-button-dropdown-menu').length) {
            $A.closeAllButtonMenu();
        }
    });

});
