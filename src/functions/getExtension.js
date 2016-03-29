define([
    "automizy/core"
], function () {
    $A.getExtension = function (fname) {
        return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2).toLowerCase();
    };
});