define([
    'automizy/core'
], function () {
    $A.insertAtCaret = function(input,text) {
        var txtarea = input;
        if(txtarea instanceof $A.m.Input)txtarea = txtarea.input();
        if(txtarea instanceof $A.m.Input2)txtarea = txtarea.input();
        if(txtarea instanceof jQuery)txtarea = txtarea[0];
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false ) );
        if (br == "ie") { 
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                strPos = range.text.length;
        }
        else if (br == "ff") strPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0,strPos);  
        var back = (txtarea.value).substring(strPos,txtarea.value.length); 
        txtarea.value=front+text+back;
        strPos = strPos + text.length;
        if (br == "ie") { 
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                range.moveStart ('character', strPos);
                range.moveEnd ('character', 0);
                range.select();
        }
        else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
        $(txtarea).trigger('change');
    }
});