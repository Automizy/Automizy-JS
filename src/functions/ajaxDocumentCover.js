define([
    'automizy/core',
    'automizy/functions/parseBoolean'
], function () {

    $A.ajaxDocumentCover = function (a, b) {
        if(typeof a === 'undefined')var a = false;
        if(typeof b !== 'array' && typeof b !== 'object')b = [];
        
        var text = [
            b[0] || '',
            b[1] || $A.translate("Still working."),
            b[2] || $A.translate("Little more patience please, I'm still working.")
        ]
        if ($A.parseBoolean(a) === true) {
            clearTimeout($A.d.ajaxDocumentCoverFalseTimeout);
            var $oldCover = $("#automizy-document-cover");
            var $cover = $('<div id="automizy-document-cover"></div>');
            var $text = $('<div id="automizy-document-cover-text"></div>');
            $text.appendTo($cover);
            $cover.prependTo('body:first');
            $oldCover.remove();
            $text.html(text[0]);
            $A.d.ajaxDocumentCoverTimeout = setTimeout(function () {
                $text.html(text[1]);
                $A.d.ajaxDocumentCoverTimeout = setTimeout(function () {
                    $text.html(text[2]);
                    $A.d.ajaxDocumentCoverTimeout = setTimeout(function () {
                        $A.ajaxDocumentCover(0);
                    }, 15000);
                }, 5000);
            }, 3000);
        }else{
            $A.d.ajaxDocumentCoverFalseTimeout = setTimeout(function(){
                clearTimeout($A.d.ajaxDocumentCoverTimeout);
                $("#automizy-document-cover").remove();
            }, 50);
        }
    };

});