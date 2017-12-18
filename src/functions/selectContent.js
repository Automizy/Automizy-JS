define([
    'automizy/core'
], function () {
    $A.selectContent = function(el) {
        if(el instanceof jQuery){
            el = el[0];
        }

        var sel, range;
        if (window.getSelection && document.createRange) { //Browser compatibility
            sel = window.getSelection();
            if(sel.toString() == ''){ //no text selection
                window.setTimeout(function(){
                    range = document.createRange(); //range object
                    range.selectNodeContents(el); //sets Range
                    sel.removeAllRanges(); //remove all ranges from selection
                    sel.addRange(range);//add Range to a Selection.
                },1);
            }
        }else if (document.selection) { //older ie
            sel = document.selection.createRange();
            if(sel.text == ''){ //no text selection
                range = document.body.createTextRange();//Creates TextRange object
                range.moveToElementText(el);//sets Range
                range.select(); //make selection.
            }
        }
    }
});