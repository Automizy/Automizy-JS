define([
    'automizy/core'
], function () {
    $A.iphoneStyle = function(input){
        var input = input || $(':checkbox.iphone');
        input.each(function () {
            var $t = $(this);
            var counter = 0;
            if ($t.hasClass("inited")) {
                $t.siblings().remove();
                if ($t.parent().hasClass("iPhoneCheckContainer")) {
                    $t.unwrap();
                }
                var $clone = $t.clone();
                $t.after($clone);
                $t.remove();
                $t = $clone;
            }
            $t.iphoneStyle({
                checkedLabel: '&nbsp;&nbsp;&nbsp;',
                uncheckedLabel: '&nbsp;&nbsp;&nbsp;',
                resizeContainer: false,
                resizeHandle: false,
                onChange: function (elem, value) {
                    var box = this.container[0];
                    var $box = $(box);
                    var $input = $box.find("input");
                    var $handler = $box.find(".iPhoneCheckHandleCenter");
                    var stringOn = $input.attr("data-on") || $input.data('on') || $A.translate('On');
                    var stringOff = $input.attr("data-off") || $input.data('off') || $A.translate('Off');
                    if (value) {
                        $handler.html(stringOn);
                        $box.removeClass("off")
                    } else {
                        $handler.html(stringOff);
                        $box.addClass("off");
                    }
                    var target = $input.attr("data-target");
                    if (target) {
                        var targetElement = $box.closest("form").find('[name="' + target + '"]');
                        targetElement.prop("disabled", !value);
                    }
                    $input.trigger("forceChange", [counter]);
                    counter++;
                }
            });
            if ($t.hasClass("inline")) {
                $t.parent().css({'display': 'inline-block', 'vertical-align': 'middle'});
            }
            if (!$t.is(":checked")) {
                $t.parent().addClass("off");
            }
            $t.addClass("inited");

            $(this).parent().parent().removeClass('automizy-input-has-help');
        });
        input.parent().css({display: 'inline-block', verticalAlign: 'middle'});
        $(".iPhoneCheckHandleCenter").html(function () {
            var $container = $(this).closest(".iPhoneCheckContainer");
            if ($container.find("input").is(":checked")) {
                return $container.find("input").attr("data-on");
            } else {
                return $container.find("input").attr("data-off");
            }
        });

        input.iphoneStyle("refresh");
    }
});