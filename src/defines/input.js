define([
    'automizy/core',
], function () {
    $A.d.defines.input = {};

    $A.d.defines.input.setupSelectObj = {
        multiple: false,
        header: false,
        selectedList: 1,
        create: function (event, ui) {
            var $t = $(this);
            $t.removeAttr('multiple');
            var ddbox = $t.multiselect("widget");
            var span = ddbox.find(".ui-multiselect-checkboxes span");
            span.each(function () {
                $(this).html($(this).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
            });

            var box = $t.parent().find(".ui-multiselect");
            box.find(".ui-icon").removeClass("ui-icon-triangle-2-n-s");
            setTimeout(function(){
                box.css({maxWidth:$t.width()});
            }, 1);
        },
        open: function (event, ui) {
            var ddbox = $(this).multiselect("widget");
            ddbox.width($(this).parent().find(".ui-multiselect").width() + 8);
            ddbox.find(".ui-corner-all").removeClass("ui-corner-all");
            if (ddbox.find(".ui-multiselect-checkboxes li:first").find("span").html().length <= 0) {
                ddbox.find(".ui-multiselect-checkboxes li:first").css({
                    "height": "0",
                    "margin": "0",
                    "padding": "0",
                    "border": "none",
                    "opacity": "0",
                    "pointer-events": "none"
                });
            }
            //$(this).multiselect("widget").find(".ui-multiselect-checkboxes").getNiceScroll().show();
        },
        close: function (event, ui) {
            //$(this).multiselect("widget").find(".ui-multiselect-checkboxes").getNiceScroll().hide();
        },
        click: function (event, ui) {
            //$(this).trigger('change');
        }
    };

    $A.d.defines.input.setupSelectListObj = {
        multiple: false,
        height: 150,
        header: false,
        selectedList: 1,
        create: function (event, ui) {
            var $t = $(this);
            $t.attr('multiple', 'multiple');
            var ddbox = $t.multiselect("widget");
            var span = ddbox.find(".ui-multiselect-checkboxes span");
            span.each(function () {
                $(this).html($(this).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
            });
            var box = $t.parent().find(".ui-multiselect");
            box.find(".ui-icon").removeClass("ui-icon-triangle-2-n-s");
            setTimeout(function(){
                box.css({maxWidth:$t.width()});
            }, 1);
            $t.multiselect("open");
        },
        open: function (event, ui) {
            var box = $(this).parent().find(".ui-multiselect");
            var ddbox = $(this).multiselect("widget");
            ddbox.width($(this).parent().find(".ui-multiselect").width() + 8);
            ddbox.find(".ui-corner-all").removeClass("ui-corner-all");
            if (ddbox.find(".ui-multiselect-checkboxes li:first").find("span").html().length <= 0) {
                ddbox.find(".ui-multiselect-checkboxes li:first").css({
                    "height": "0",
                    "margin": "0",
                    "padding": "0",
                    "border": "none",
                    "opacity": "0",
                    "pointer-events": "none"
                });
            }
            ddbox.find(".ui-multiselect-checkboxes").css({
                backgroundColor: "#f7f8f0"
            })
            box.css({
                display: "none"
            });
            $(function () {
                ddbox.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    zIndex: 0
                }).appendTo(box.parent());
            });

        },
        beforeclose: function (event, ui) {
            return false;
        },
        click: function (event, ui) {
            $(this).trigger('change');
        }
    };

    $A.d.defines.input.setupSelectSearchCheckObj = {
        multiple: true,
        header: '',
        selectedList: 1,
        noneSelectedText: '',
        selectedText: '# selected',
        create: function (event, ui) {
            var $t = $(this);
            $t.attr('multiple', 'multiple');
            $t.multiselect("uncheckAll").multiselectfilter({label: "Filter: "});
            var ddbox = $t.multiselect("widget");
            var span = ddbox.find(".ui-multiselect-checkboxes span");

            var box = $t.parent().find(".ui-multiselect");
            setTimeout(function(){
                box.css({maxWidth:$t.width()});
            }, 1);
            span.each(function () {
                $(this).html($(this).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
            });
        },
        beforeopen: function () {
            var ddbox = $(this).multiselect("widget");
            var $h = ddbox.find('.ui-widget-header');
            ddbox.find(".ui-multiselect-filter").contents().filter(function () {
                return this.nodeType != 1;
            }).remove();
            if ($h.find('svg').length < 1) {
                $('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="float:right; margin:2px 4px 0 0"><g transform="scale(0.03)"><path fill="none" stroke="#999" stroke-width="36" stroke-linecap="round"d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"/></g></svg>').appendTo($h);
            }
            $A.setWindowScroll(false, 'multiselect');
        },
        beforeclose: function () {
            $A.setWindowScroll(true, 'multiselect');
        }
    }
    
    $A.d.defines.input.upAndDownControl = {
        create: function (tp_inst, obj, unit, val, min, max, step) {
            $('<input class="ui-timepicker-input" value="' + val + '" maxlength="' + max.toString().length + '" style="width:50%">')
                    .appendTo(obj)
                    .jStepper({
                        minValue: min,
                        maxValue: max,
                        allowDecimals: false
                    })
                    .spinner({
                        min: min,
                        max: max,
                        step: step,
                        change: function (e, ui) {
                            if (e.originalEvent !== undefined)
                                tp_inst._onTimeChange();
                            tp_inst._onSelectHandler();
                        },
                        spin: function (e, ui) {
                            tp_inst.control.value(tp_inst, obj, unit, ui.value);
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler();
                        }
                    });
            return obj;
        },
        options: function (tp_inst, obj, unit, opts, val) {
            if (typeof (opts) == 'string' && val !== undefined)
                return obj.find('.ui-timepicker-input').spinner(opts, val);
            return obj.find('.ui-timepicker-input').spinner(opts);
        },
        value: function (tp_inst, obj, unit, val) {
            if (val !== undefined)
                return obj.find('.ui-timepicker-input').spinner('value', val);
            return obj.find('.ui-timepicker-input').spinner('value');
        },
        click: function (event, ui) {
            $(this).trigger('change');
        }
    };
});