define([
    'automizy/core'
], function () {

    $A.escapeJQuerySelector = function (selector, enclouser) {
        var text = String(selector).replace( /(:|\.|\[|\]|,|=)/g, "\\$1" );
        if(typeof enclouser !== 'undefined'){
            if(enclouser === '"'){
                text = text.replace( /"/g, '\\"' );
            }else if(enclouser === "'"){
                text = text.replace( /'/g, "\\'" );
            }
        }
        return text;
    };

});