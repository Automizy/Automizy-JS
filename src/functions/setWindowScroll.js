define([
    'automizy/core'
], function () {
    $A.d.lastWindowScroll = {top: 0, left: 0};
    $A.d.windowScrollIds = [];
    $A.d.hasScroll = [];
    $A.setWindowScroll = function (a, id) {
        if (typeof a === "undefined") {
            return $A.d.hasScroll;
        }
        var id = id || false;
        var ret = false;
        if (id !== false) {
            var index = $A.d.windowScrollIds.indexOf(id);
            var inArray = (index > -1);
            if (a === true) {
                if (inArray) {
                    $A.d.windowScrollIds.splice(index, 1);
                    ret = true;
                }
            } else {
                if (!inArray) {
                    $A.d.windowScrollIds.push(id);
                    ret = true;
                }
            }
        }else{
            if(a === true){
                $A.d.windowScrollIds = [];
                ret = true;
            }
        }
        if ($A.d.windowScrollIds.length > 0) {
            $A.d.hasScroll = false;
            $A.d.lastWindowScroll.top = $(window).scrollTop();
            $A.d.lastWindowScroll.left = $(window).scrollLeft();
                    return true;
        } else {
            $A.d.hasScroll = a;
            if (!a) {
                $A.d.lastWindowScroll.top = $(window).scrollTop();
                $A.d.lastWindowScroll.left = $(window).scrollLeft();
            }
        }
        return ret;
    };
    $(window).scroll(function () {
        if (!$A.d.hasScroll) {
            $(window).scrollTop($A.d.lastWindowScroll.top);
            $(window).scrollLeft($A.d.lastWindowScroll.left);
        }
    });
});