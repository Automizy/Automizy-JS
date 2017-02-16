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
            other:false,
            otherText:$A.translate('MAYBE'),
            content:'',
            title:$A.translate('Please confirm your action.'),
            skin:''
        };
        if(typeof obj.ok === 'function'){
            data.ok = obj.ok;
        }
        if(typeof obj.cancel !== 'undefined'){
            data.cancel = obj.cancel;
        }
        if(typeof obj.other !== 'undefined'){
            data.other = obj.other;
        }
        if(typeof obj.okText !== 'undefined'){
            data.okText = obj.okText;
        }
        if(typeof obj.cancelText !== 'undefined'){
            data.cancelText = obj.cancelText;
        }
        if(typeof obj.otherText !== 'undefined'){
            data.otherText = obj.otherText;
        }
        if(typeof obj.content !== 'undefined'){
            data.content = obj.content;
        }
        if(typeof obj.title !== 'undefined'){
            data.title = obj.title;
        }
        if(typeof obj.skin !== 'undefined'){
            data.skin = obj.skin;
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
        if(data.other !== false){
            buttons.push({
                text: data.otherText,
                skin: 'simple-orange',
                click: function () {
                    data.other();
                    dialog.close();
                }
            });
        }
        if(data.ok !== false){
            buttons.push({
                text: data.okText,
                skin: 'simple-orange',
                click: function () {
                    var okValue = data.ok();
                    if(typeof okValue !== 'undefined' && okValue === false){

                    }else {
                        dialog.close();
                    }
                }
            });
        }

        var dialog = $A.newDialog({
            content:data.content,
            id:'automizy-confirmation-dialog',
            width:'500px',
            skin:data.skin,
            positionY:'40px',
            title:data.title,
            close:function(){
                this.remove();
            },
            buttons:buttons
        }).open();

        return dialog;

    };

});