define([
    'automizy/core'
], function () {

    $A.convertElementLetterToLetter = function ($el) {
        var html = $el.html();
        var convertedHtml = '';
        var char;
        var convertActive = true;
        for(var i = 0; i < html.length; i++){
            char = html[i];
            if(char === '<'){
                convertActive = false;
            }
            if(convertActive){
                convertedHtml += '<span class="automizy-letter-to-letter">' + char + '</span>';
            }else{
                convertedHtml += char;
            }
            if(char === '>'){
                convertActive = true;
            }
        }
        $el.html(convertedHtml);
    };

});