define([
    'automizy/core'
], function () {
    $A.getUniqueString = function(){
        var str = (Math.random() + 1).toString(36).substring(2);
        if($.inArray(str, $A.d.uniques) >= 0){
            return $A.getUniqueString();
        }
        $A.d.uniques.push(str);
        return str;
    }
});