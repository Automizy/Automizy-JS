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
            content:'',
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
            t.d.$deviceImage.attr('src', 'images/mockup/default-tablet-portrait.svg');
            return t;
        }
        return t.d.deviceType;
    };
    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            setTimeout(function(){
                t.iframeDocument().html(t.d.content);
            }, 10);
            return t;
        }
        return t.d.content;
    };
    p.iframeDocument = function () {
        var t = this;
        return $('body', t.d.$iframe[0].contentWindow.document);
    };
    p.scrolling = function (scrolling) {
        var t = this;
        if(typeof scrolling !== 'undefined'){
            t.d.scrolling = $A.parseBoolean(scrolling);
            if(t.d.scrolling){
                t.d.$iframe.attr('scrolling', 'yes');
            }else{
                t.d.$iframe.attr('scrolling', 'no');
            }
            return t;
        }
        return t.d.scrolling;
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
