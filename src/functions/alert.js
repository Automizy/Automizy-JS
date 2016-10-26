define([
    'automizy/core'
], function () {

    $A.alert = function (param1, param2) {
        var param1 = param1 || {};
        var param2 = param2 || false;
        var data = {
            ok:function(){},
            okText:$A.translate('OK'),
            content:'',
            title:$A.translate('Something wrong...')
        };
        if(typeof param1 === 'string'){
            data.content = param1;
            if(typeof param2 === 'string'){
                data.title = param1;
                data.content = param2;
            }
        }else{
            if (typeof param1.ok === 'function') {
                data.ok = param1.ok;
            }
            if (typeof param1.cancel === 'function') {
                data.cancel = param1.cancel;
            }
            if (typeof param1.okText !== 'undefined') {
                data.okText = param1.okText;
            }
            if (typeof param1.cancelText !== 'undefined') {
                data.cancelText = param1.cancelText;
            }
            if (typeof param1.content !== 'undefined') {
                data.content = param1.content;
            }
            if (typeof param1.title !== 'undefined') {
                data.title = param1.title;
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