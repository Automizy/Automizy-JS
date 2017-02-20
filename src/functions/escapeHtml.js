define([
    'automizy/core'
], function () {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    $A.escapeHtml = function(str){
        return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    };

});