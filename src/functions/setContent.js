define([
    'automizy/core'
], function () {
    $A.setContent = function (content, target) {
        if (target.contents() instanceof jQuery) {
            target.contents().appendTo($A.$tmp);
        }
        target.empty();
        if (content instanceof jQuery) {
            content.appendTo(target);
        } else if(typeof content.drawTo === 'function') {
            content.drawTo(target);
        } else {
            target.html(content);
        }
        return $A;
    };
});