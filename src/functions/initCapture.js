define([
    "js/core"
], function () {
    Automizy.initCapture = function(f){
        $A.ajaxDocumentCover(true);
        $('<link rel="stylesheet" type="text/css" href="' + AutomizyAnalytics.url.analytics + '/css/capture-dialog.css" />').appendTo('head:first');
        $('<link rel="stylesheet" type="text/css" href="' + AutomizyAnalytics.url.analytics + '/css/colpick.css" />').appendTo('head:first');
        Automizy.data.automizyAnalyticsXhr = $.getScript(AutomizyAnalytics.url.analytics + "/js/automizy-capture.js", function () {
            setTimeout(function () {
                if (typeof AutomizyCapturePageInit !== 'undefined') {
                    //AutomizyAnalytics.$.fn.iphoneStyle = $.fn.iphoneStyle;
                    //AutomizyCapturePageInit();
                    //Automizy.iphoneStyle(AutomizyCapturePage.i.confirmationRowCheckInput);

                    AutomizyAnalytics.loader();

                    function loop(){
                        if(typeof AutomizyCapturePage === 'undefined'){
                            setTimeout(function(){
                                loop();
                            }, 10);
                        }else{
                            Automizy.initAutomizyCaptureAddon();
                            f();
                        }
                    }
                    loop();
                }
            }, 10);
        });
    };
});