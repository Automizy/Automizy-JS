define([
    'automizy/core'
], function () {

    var $widget = $('<div id="automizy-instructions-notification"></div>');
    var $cover = $('<div id="automizy-instructions-notification-cover"></div>').appendTo($widget);
    var $contentBox = $('<div id="automizy-instructions-notification-content-box"></div>').appendTo($widget);
    var $content = $('<div id="automizy-instructions-notification-content"></div>').appendTo($contentBox);
    var $arrow = $('<div id="automizy-instructions-notification-arrow"></div>').appendTo($content);
    var $textBox = $('<div id="automizy-instructions-notification-text-box"></div>').appendTo($content);
    var $table = $('<table cellpadding="0" cellspacing="0" border="0" id="automizy-instructions-notification-content-table"></table>').appendTo($textBox);
    var $tr = $('<tr></tr>').appendTo($table);
    var $td1 = $('<td id="automizy-instructions-notification-content-table-td1"></td>').appendTo($tr);
    var $td2 = $('<td id="automizy-instructions-notification-content-table-td2"></td>').appendTo($tr);
    var $img = $('<img id="automizy-instructions-notification-content-image" />').appendTo($td1);
    var $title = $('<div id="automizy-instructions-notification-content-title"></div>').appendTo($td2);
    var $text = $('<div id="automizy-instructions-notification-content-text"></div>').appendTo($td2);
    var $buttons = $('<div id="automizy-instructions-notification-content-buttons"></div>').appendTo($content);
    var $style = $('<style></style>').appendTo($widget);
    var cancel = $A.newButton({
        target:$buttons,
        width:'100px',
        margin:'0 12px 0 0'
    });
    var ok = $A.newButton({
        skin:'simple-orange',
        width:'100px',
        target:$buttons
    });

    var module = {
        $widget:$widget,
        $cover:$cover,
        $content:$content,
        $table:$table,
        $tr:$tr,
        $td1:$td1,
        $td2:$td2,
        $img:$img,
        $title:$title,
        $text:$text,
        $buttons:$buttons,
        cancelButton:cancel,
        okButton:ok
    };

    $A.instructionsNotification = function (obj) {
        if(typeof obj === 'undefined'){
            return module;
        }
        obj = obj || {};
        if(obj === 'close'){
            $widget.hide();
            return $A;
        }

        $widget.appendTo('body:eq(0)');
        $cover.hide();
        $arrow.hide();
        ok.hide();
        cancel.hide();
        $title.removeAttr('style');
        $content.removeAttr('style');
        $content.removeClass('automizy-position');

        var data = {
            cancel:false,
            cancelText:$A.translate('Cancel'),
            ok:false,
            okText:$A.translate('OK'),
            title:'',
            content:'',
            img:false,
            cover:false,
            position:false,
            positionTop:false,
            positionLeft:false,
            arrowPosition:false,
            arrowOffset:false,
            contentAnimate:false
        };
        if (typeof obj.cancel === 'function') {
            data.cancel = obj.cancel;
        }
        if (typeof obj.cancelText !== 'undefined') {
            data.cancelText = obj.cancelText;
        }
        if (typeof obj.ok === 'function') {
            data.ok = obj.ok;
        }
        if (typeof obj.okText !== 'undefined') {
            data.okText = obj.okText;
        }
        if (typeof obj.title !== 'undefined') {
            data.title = obj.title;
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
        if (typeof obj.height !== 'undefined') {
            data.height = obj.height;
        }
        if (typeof obj.arrowPosition !== 'undefined') {
            data.arrowPosition = obj.arrowPosition
        }
        if (typeof obj.arrowOffset !== 'undefined') {
            data.arrowOffset = obj.arrowOffset
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
        if (typeof obj.contentAnimate !== 'undefined') {
            data.contentAnimate = obj.contentAnimate
        }

        if(data.cover){
            $cover.show();
        }
        if(data.cancel !== false){
            cancel.off().click(data.cancel);
            cancel.text(data.cancelText);
            cancel.show();
        }
        if(data.ok !== false){
            ok.off().click(data.ok);
            ok.text(data.okText);
            ok.show();
        }
        if(data.img !== false){
            $img.attr({
                src:data.img
            });
        }else{
            $img.attr({
                src:'images/mizy-head-55x55.gif'
            });
        }
        if(data.width !== false){
            $contentBox.width(data.width);
        }
        if(data.height !== false){
            $content.height(data.height);
        }
        if(data.position !== false){
            $contentBox.css({
                top:data.position.top,
                left:data.position.left,
                right:data.position.right,
                bottom:data.position.bottom
            });
        }
        if(data.positionTop !== false){
            $contentBox.css({
                top:data.positionTop
            });
        }
        if(data.positionLeft !== false){
            $contentBox.css({
                left:data.positionLeft
            });
        }
        if(data.positionRight !== false){
            $contentBox.css({
                right:data.positionRight
            });
        }
        if(data.positionBottom !== false){
            $contentBox.css({
                bottom:data.positionBottom
            });
        }
        if(data.arrowPosition !== false){
            $arrow.show();
        }
        if(data.arrowOffset !== false){
            var styleHtml = '#automizy-instructions-notification-arrow{';
            if(data.arrowPosition === 'top') {
                styleHtml += 'top: -25px; left: '+data.arrowOffset;
            }else if(data.arrowPosition === 'right') {
                styleHtml += 'right: -25px; top: '+data.arrowOffset;
            }else if(data.arrowPosition === 'bottom') {
                styleHtml += 'bottom: -25px; left: '+data.arrowOffset;
            }else if(data.arrowPosition === 'left') {
                styleHtml += 'left: -25px; top: '+data.arrowOffset;
            }
            styleHtml += '}';
            $style.html(styleHtml);
        }
        $title.html(data.title);
        $text.html(data.content);
        if(data.contentAnimate !== false){
            $A.convertElementLetterToLetter($text);
            $A.animateElementLetterToLetter($text, data.contentAnimate);
        }

        $widget.show();

        return $A;
    };

});