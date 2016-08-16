define([
    'automizy/core'
], function () {

    $A.alert = function (obj) {
        var obj = obj || {};
        var data = {
            ok:function(){},
            okText:$A.translate('OK'),
            content:'',
            title:$A.translate('Something wrong...')
        };
        if(typeof obj === 'string'){
            data.content = obj;
        }else{
            if (typeof obj.ok === 'function') {
                data.ok = obj.ok;
            }
            if (typeof obj.cancel === 'function') {
                data.cancel = obj.cancel;
            }
            if (typeof obj.okText !== 'undefined') {
                data.okText = obj.okText;
            }
            if (typeof obj.cancelText !== 'undefined') {
                data.cancelText = obj.cancelText;
            }
            if (typeof obj.content !== 'undefined') {
                data.content = obj.content;
            }
            if (typeof obj.title !== 'undefined') {
                data.title = obj.title;
            }
        }

        var dialog = $A.newDialog({
            content:data.content,
            width:'500px',
            positionY:'40px',
            title:data.title,
            close:function(){
                this.remove();
            },
            buttons:[
                {
                    text: data.okText,
                    skin:'simple-orange',
                    click: function () {
                        data.ok();
                        dialog.close();
                    }
                }
            ]
        }).open();

    };

});