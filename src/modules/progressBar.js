define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var ProgressBar = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-progress"></div>'),
            $barBox: $('<div class="automizy-progress-bar-box"></div>'),
            $bar: $('<div class="automizy-progress-bar"></div>'),
            $percentBox: $('<div class="automizy-progress-percent-box"></div>'),
            $percent: $('<span class="automizy-progress-percent">0</span>'),

            percentPosition:'inner',
            percent:0,

            id: 'automizy-progressbar-' + $A.getUniqueString()
        };
        t.init();

        t.d.$barBox.appendTo(t.d.$widget);
        t.d.$bar.appendTo(t.d.$barBox);
        t.d.$percentBox.appendTo(t.d.$bar);
        t.d.$percent.appendTo(t.d.$percentBox);
        t.d.$percentBox.append('%');

        if (typeof obj !== 'undefined') {

            if (typeof obj.html !== 'undefined') {
                t.html(obj.html);
            }
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }

            t.initParameter(obj);
        }

    };

    var p = ProgressBar.prototype;
    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.$bar.html(html);
            return t;
        }
        return t.d.$bar.html();
    };
    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.$bar.text(text);
            return t;
        }
        return t.d.$bar.text();
    };
    p.percent = function (percent) {
        var t = this;
        if (typeof percent !== 'undefined') {
            var oldPercent = t.d.percent || 0;
            t.d.percent = percent;
            t.d.$bar.stop().animate({
                width: t.d.percent + '%'
            }, 250);
            t.d.$percent.prop('counter', oldPercent).stop().animate({
                counter: t.d.percent
            }, {
                duration: 250,
                easing: 'swing',
                step: function (now) {
                    t.d.$percent.text(Math.ceil(now));
                }
            });
            return t;
        }
        return t.d.percent;
    };
    p.percentPosition = function (position) {
        var t = this;
        if (typeof position !== 'undefined') {
            t.d.percentPosition = position;
            switch(t.d.percentPosition) {
                case 'top':
                    t.d.$percentBox.insertBefore(t.d.$barBox).css({textAlign:'right'});
                    break;
                case 'bottom':
                    t.d.$percentBox.insertAfter(t.d.$barBox).css({textAlign:'right'});
                    break;
                case 'inner':
                    t.d.$percentBox.appendTo(t.d.$bar).css({textAlign:'center'});
                    break;
            }
            return t;
        }
        return t.d.percentPosition;
    };



    $A.initBasicFunctions(ProgressBar, "ProgressBar", []);


});
