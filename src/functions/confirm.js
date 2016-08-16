define([
    'automizy/core'
], function () {

    $A.confirm = function (obj) {
        var obj = obj || {};
        var data = {
            ok:function(){},
            okText:$A.translate('OK'),
            cancel:function(){},
            cancelText:$A.translate('Cancel'),
            content:'',
            title:$A.translate('Please confirm your action.')
        };
        if(typeof obj.ok === 'function'){
            data.ok = obj.ok;
        }
        if(typeof obj.cancel !== 'undefined'){
            data.cancel = obj.cancel;
        }
        if(typeof obj.okText !== 'undefined'){
            data.okText = obj.okText;
        }
        if(typeof obj.cancelText !== 'undefined'){
            data.cancelText = obj.cancelText;
        }
        if(typeof obj.content !== 'undefined'){
            data.content = obj.content;
        }
        if(typeof obj.title !== 'undefined'){
            data.title = obj.title;
        }

        var buttons = [];

        if(data.cancel !== false){
            buttons.push({
                text: data.cancelText,
                click: function () {
                    data.cancel();
                    dialog.close();
                }
            });
        }
        if(data.ok !== false){
            buttons.push({
                text: data.okText,
                skin: 'simple-orange',
                click: function () {
                    data.ok();
                    dialog.close();
                }
            });
        }

        var dialog = $A.newDialog({
            content:data.content,
            width:'500px',
            positionY:'40px',
            title:data.title,
            close:function(){
                this.remove();
            },
            buttons:buttons
        }).open();

    };

});