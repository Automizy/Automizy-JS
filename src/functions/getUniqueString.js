define([
    'automizy/core'
], function () {
    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }
    var index = 0;
    $A.getUniqueString = function(){
        var str = pad(index, 8) + '-' + (Math.random() + 1).toString(36).substring(2);
        if($.inArray(str, $A.d.uniques) >= 0){
            return $A.getUniqueString();
        }
        $A.d.uniques.push(str);
        index++;
        return str;
    }
});