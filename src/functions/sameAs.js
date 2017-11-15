define([
    'automizy/core'
], function () {
    $A.sameAs = function(s1, s2){
        var a = false;
        if(s1 == s2){
            return true;
        }

        s1 = String(s1);
        s2 = String(s2);
        if(s1 == s2){
            return true;
        }

        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        if(s1 == s2){
            return true;
        }

        s1 = s1.replace(/[_-]|\s/gi, '');
        s2 = s2.replace(/[_-]|\s/gi, '');
        if(s1 == s2){
            return true;
        }

        return false;
    }
});