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
        if(typeof obj.cancel === 'function'){
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

        var dialog = $A.newDialog({
            content:data.content,
            width:'500px',
            positionY:'40px',
            title:data.title,
            buttons:[
                {
                    text: data.cancelText,
                    click: function () {
                        data.cancel();
                        dialog.close().remove();
                    }
                },
                {
                    text: data.okText,
                    skin:'simple-orange',
                    click: function () {
                        data.ok();
                        dialog.close().remove();
                    }
                }
            ]
        }).open();

    };

});