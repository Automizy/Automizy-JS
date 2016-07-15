define(['automizy/core'], function () {
    var originalDocumentTitle = document.title;
    var step = 0;
    var characters = ['☰', '☱', '☳', '☷', '☶', '☴'];
    //var characters = ['➫', '➩', '➬', '➩'];
    var titleInterval = false;
    var isPageVisibilityInterval = false;

    $A.isPageVisibility = function (doc) {
        if(typeof doc === 'undefined'){
            var doc = document;
        }

        var isHidden = false;
        if (typeof doc.hidden !== "undefined") {
            isHidden = doc.hidden;
        } else if (typeof doc.mozHidden !== "undefined") {
            isHidden = doc.mozHidden;
        } else if (typeof doc.msHidden !== "undefined") {
            isHidden = doc.msHidden;
        } else if (typeof doc.webkitHidden !== "undefined") {
            isHidden = doc.webkitHidden;
        }

        if(isHidden){
            isPageVisibilityInterval = setInterval(function() {
                if (!isHidden) {
                    $A.isPageVisibility();
                    return false;
                }
            }, 1000);
            /*
            if(characters.indexOf(document.title[0]) < 0){
                originalDocumentTitle = document.title;
                step = 0;
                titleInterval = setInterval(function(){
                    document.title = characters[step] + ' ' + originalDocumentTitle;
                    step++;
                    if(step >= characters.length){
                        step = 0;
                    }
                }, 1000);
            }
            document.title = characters[step] + ' ' + originalDocumentTitle;
            */
        }else{
            /*
            if(characters.indexOf(document.title[0]) >= 0){
                clearInterval(titleInterval);
                document.title = originalDocumentTitle;
            }
            */
        }

        return !isHidden;
    };
});