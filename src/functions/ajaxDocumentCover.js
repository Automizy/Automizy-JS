define([
    'automizy/core',
    'automizy/functions/parseBoolean'
], function () {

    $A.d.ajaxDocumentCoverForceStop = false;
    $A.ajaxDocumentCover = function (a, b, c) {
        if(typeof a === 'undefined'){
            var a = false;
        }
        if(typeof b === 'undefined'){
            var b = ['auto', 'auto', 'auto'];
        }
        if(typeof c !== 'undefined' && c === true){
            $A.d.ajaxDocumentCoverForceStop = true;
        }

        if(typeof b[0] === 'undefined'){
            b[0] = {
                text:'',
                time:0
            }
        }else if(b[0] === 'auto'){
            b[0] = {
                text:'',
                time:3000
            };
        }
        if(typeof b[1] === 'undefined'){
            b[1] = {
                text:'',
                time:0
            }
        }else if(b[1] === 'auto'){
            b[1] = {
                text:$A.translate("Still working."),
                time:5000
            };
        }
        if(typeof b[2] === 'undefined'){
            b[2] = {
                text:'',
                time:0
            }
        }else if(b[2] === 'auto'){
            b[2] = {
                text:$A.translate("Little more patience please, I'm still working."),
                time:15000
            };
        }

        if ($A.parseBoolean(a) === true) {
            clearTimeout($A.d.ajaxDocumentCoverFalseTimeout);
            var $oldCover = $("#automizy-document-cover");
            var $cover = $('<div id="automizy-document-cover"></div>');
            var $text = $('<div id="automizy-document-cover-text"></div>');
            $text.appendTo($cover);
            $cover.prependTo('body:first');
            $oldCover.remove();

            $text.html(b[0].text);
            $A.d.ajaxDocumentCoverTimeout = setTimeout(function () {
                $text.html(b[1].text);
                $A.d.ajaxDocumentCoverTimeout = setTimeout(function () {
                    $text.html(b[2].text);
                    $A.d.ajaxDocumentCoverTimeout = setTimeout(function () {
                        $A.ajaxDocumentCover(0);
                    }, b[2].time);
                }, b[1].time);
            }, b[0].time);

        }else{
            if(a === 'FORCE_STOP'){
                $A.d.ajaxDocumentCoverForceStop = false;
            }
            if($A.d.ajaxDocumentCoverForceStop){
                return;
            }
            $A.d.ajaxDocumentCoverFalseTimeout = setTimeout(function(){
                clearTimeout($A.d.ajaxDocumentCoverTimeout);
                $("#automizy-document-cover").remove();
            }, 50);
        }
    };

});