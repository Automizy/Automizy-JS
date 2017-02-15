define([
    'automizy/core'
], function () {

    var $widget = $('<div id="automizy-instructions-notification"></div>');
    var $cover = $('<div id="automizy-instructions-notification-cover"></div>').appendTo($widget);
    var $content = $('<div id="automizy-instructions-notification-content"></div>').appendTo($widget);
    var $table = $('<table cellpadding="0" cellspacing="0" border="0" id="automizy-instructions-notification-content-table"></table>').appendTo($content);
    var $tr = $('<tr></tr>').appendTo($table);
    var $td1 = $('<td id="automizy-instructions-notification-content-table-td1"></td>').appendTo($tr);
    var $td2 = $('<td id="automizy-instructions-notification-content-table-td2"></td>').appendTo($tr);
    var $img = $('<img src="images/mizy-head-55x55.gif" id="automizy-instructions-notification-content-image" />').appendTo($td1);
    var $text = $('<div id="automizy-instructions-notification-content-text"></div>').appendTo($td2);
    var $buttons = $('<div id="automizy-instructions-notification-content-buttons"></div>').appendTo($content);
    var ok = $A.newButton({
        skin:'simple-orange',
        target:$buttons
    });

    $A.instructionsNotification = function (obj) {
        obj = obj || {};
        if(obj === 'close'){
            $widget.hide();
            return $A;
        }

        $widget.appendTo('body:eq(0)');
        $cover.hide();
        ok.hide();
        $content.removeAttr('style');

        var data = {
            ok:false,
            okText:$A.translate('OK'),
            content:'',
            img:false,
            cover:false,
            position:false,
            positionTop:false,
            positionLeft:false
        };
        if (typeof obj.ok === 'function') {
            data.ok = obj.ok;
        }
        if (typeof obj.okText !== 'undefined') {
            data.okText = obj.okText;
        }
        if (typeof obj.content !== 'undefined') {
            data.content = obj.content;
        }
        if (typeof obj.img !== 'undefined') {
            data.img = obj.img;
        }
        if (typeof obj.cover !== 'undefined') {
            data.cover = $A.parseBoolean(obj.cover);
        }
        if (typeof obj.width !== 'undefined') {
            data.width = obj.width;
        }
        if (typeof obj.position !== 'undefined') {
            data.position = obj.position
        }
        if (typeof obj.positionTop !== 'undefined') {
            data.positionTop = obj.positionTop
        }
        if (typeof obj.positionLeft !== 'undefined') {
            data.positionLeft = obj.positionLeft
        }
        if (typeof obj.positionRight !== 'undefined') {
            data.positionRight = obj.positionRight
        }
        if (typeof obj.positionBottom !== 'undefined') {
            data.positionBottom = obj.positionBottom
        }

        if(data.cover){
            $cover.show();
        }
        if(data.ok !== false){
            ok.click(data.ok);
            ok.text(data.okText);
            ok.show();
        }
        if(data.img !== false){
            $img.attr({
                src:data.img
            });
        }
        if(data.width !== false){
            $content.width(data.width);
        }
        if(data.position !== false){
            $content.css({
                top:data.position.top,
                left:data.position.left,
                right:data.position.right,
                bottom:data.position.bottom
            });
        }
        if(data.positionTop !== false){
            $content.css({
                top:data.positionTop
            });
        }
        if(data.positionLeft !== false){
            $content.css({
                left:data.positionLeft
            });
        }
        if(data.positionRight !== false){
            $content.css({
                right:data.positionRight
            });
        }
        if(data.positionBottom !== false){
            $content.css({
                bottom:data.positionBottom
            });
        }
        $text.html(data.content);

        $widget.show();

        return $A;
    };

});