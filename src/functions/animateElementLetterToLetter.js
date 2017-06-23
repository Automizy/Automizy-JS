define([
    'automizy/core'
], function () {

    $A.animateElementLetterToLetter = function ($el, speed) {
        speed = speed || 10;
        $el.find('.automizy-letter-to-letter').each(function(index ){
            (function($item){
                $item[0].style.visibility = 'hidden';
                setTimeout(function(){
                    $item[0].style.visibility = 'visible';
                }, index * speed);
            })($(this));
        })
    };

});