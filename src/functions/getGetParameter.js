define([
    'automizy/core'
], function () {
    $A.getGetParameter = function (param) {
        var vars = {};
        var href = window.location.href;
        var indexOfValue = href.indexOf("#");
        if(indexOfValue >= 0){
            href = href.substring(0, indexOfValue);
        }
        href.replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function( m, key, value ) {
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    };
});