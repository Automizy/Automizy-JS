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

            percentPosition: 'inner',
            showPercent: true,
            thick: false,
            color: 'blue',
            speed: 250,
            easing: 'swing',
            percent: 0,

            id: 'automizy-progressbar-' + $A.getUniqueString(),

            onPercentChange: function () {

            }
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
            if (typeof obj.speed !== 'undefined') {
                t.speed(obj.speed);
            }
            if (typeof obj.easing !== 'undefined') {
                t.easing(obj.easing);
            }
            if (typeof obj.showPercent !== 'undefined') {
                t.showPercent(obj.showPercent);
            }
            if (typeof obj.thick !== 'undefined') {
                t.thick(obj.thick);
            }
            if (typeof obj.color !== 'undefined') {
                t.color(obj.color);
            }
            if (typeof obj.onPercentChange === 'function') {
                t.onPercentChange(obj.onPercentChange);
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
    p.speed = function (speed) {
        var t = this;
        if (typeof speed !== 'undefined') {
            t.d.speed = speed;
            return t;
        }
        return t.d.speed;
    };
    p.easing = function (easing) {
        var t = this;
        if (typeof easing !== 'undefined') {
            t.d.easing = easing;
            return t;
        }
        return t.d.easing;
    };
    p.percent = function (percent) {
        var t = this;
        if (typeof percent !== 'undefined') {
            var oldPercent = t.d.percent || 0;

            t.d.percent = percent;
            t.d.$bar.stop().animate({
                width: t.d.percent + '%'
            }, t.speed(), t.easing());
            t.d.$percent.prop('counter', oldPercent).stop().animate({
                counter: t.d.percent
            }, {
                duration: t.speed(),
                easing: t.easing(),
                step: function (now) {
                    t.d.$percent.text(Math.ceil(now));
                }
            });

            if (percent !== oldPercent) {
                t.onPercentChange();
            }

            return t;
        }
        return t.d.percent;
    };
    p.percentPosition = function (position) {
        var t = this;
        if (typeof position !== 'undefined') {
            t.d.percentPosition = position;
            switch (t.d.percentPosition) {
                case 'top':
                    t.d.$percentBox.insertBefore(t.d.$barBox).css({textAlign: 'right'});
                    break;
                case 'bottom':
                    t.d.$percentBox.insertAfter(t.d.$barBox).css({textAlign: 'right'});
                    break;
                case 'inner':
                    t.d.$percentBox.appendTo(t.d.$bar).css({textAlign: 'center'});
                    break;
            }
            return t;
        }
        return t.d.percentPosition;
    };

    p.onPercentChange = function (func) {
        var t = this;
        if (typeof func !== 'undefined') {
            if (typeof func === 'function') {
                t.d.onPercentChange = func;
            }
            else {
                t.d.onPercentChange(func);
            }
            return t;
        }
        t.d.onPercentChange();
    };


    p.showPercent = function (showPercent) {
        var t = this;
        if (typeof showPercent !== 'undefined') {
            showPercent = $A.parseBoolean(showPercent);
            if (showPercent) {
                t.d.$percentBox.removeClass('automizy-hide');
            }
            else {
                t.d.$percentBox.addClass('automizy-hide');
            }
            return t;
        }
        return t.d.showPercent;
    };

    p.thick = function (thick) {
        var t = this;
        if (typeof thick !== 'undefined') {
            thick = $A.parseBoolean(thick);
            if (thick) {
                t.d.$widget.addClass('automizy-progress-bar-thick');
            }
            else {
                t.d.$widget.removeClass('automizy-progress-bar-thick');
            }
            return t;
        }
        return t.d.thick;
    };

    p.color = function (color) {
        var t = this;
        if (typeof color !== 'undefined') {
            t.d.color = color;
            t.d.$widget.removeClass(function (index, css) {
                return (css.match(/(^|\s)automizy-progress-bar-color-\S+/g) || []).join(' ');
            }).addClass('automizy-progress-bar-color-' + color);

            return t;
        }
        return t.d.color;
    };

    $A.initBasicFunctions(ProgressBar, "ProgressBar", []);


});
