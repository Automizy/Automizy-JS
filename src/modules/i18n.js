define([
    'automizy/core'
], function () {
    var i18n = function (obj) {
        var t = this;
        t.d = {
            language: 'en_US',
            file: '',
            hasFile: true,
            missingTranslates:[],
            translate: {
                'Upload': 'UpLoad'
            }
        };

        if (typeof obj !== 'undefined') {
            if (typeof obj.language !== 'undefined')
                t.language(obj.language);
            if (typeof obj.file !== 'undefined')
                t.file(obj.file);
            if (typeof obj.setTranslate !== 'undefined')
                t.setTranslate(obj.setTranslate);
        }
    };

    p = i18n.prototype;
    p.language = function (lang) {
        var t = this;
        if (typeof lang === 'string') {
            t.d.language = lang;
            return t;
        }
        return t.d.language;
    };
    p.file = function (file) {
        var t = this;
        if (typeof file === 'string') {
            t.d.file = file;
            $.getScript(file).done(function (script, textStatus) {
                console.log('Automizy.i18n database rebuilt');
            }).fail(function (jqxhr, settings, exception) {
                console.warn('Automizy.i18n database rebuilding failed: ', exception);
            });
            return t;
        }
        return t.d.file;
    };
    p.setTranslate = function (obj) {
        var t = this;
        if (typeof obj !== 'undefined') {
            t.d.translate = obj;
        }
        return t;
    };
    p.getTranslate = function () {
        return this.d.translate;
    };
    p.translate = function (text) {
        var t = this;
        if (typeof t.d.translate[text] === 'undefined') {
            if (1 === 2 && $A.d.settings.logTranslateMissings === true) {
                if($.inArray(text, t.d.missingTranslates) <= -1){
                    t.d.missingTranslates.push(text);
                    
                    function getErrorObject(){
                        try { throw Error('') } catch(err) { return err; }
                    }

                    var err = getErrorObject();
                    var callerLines = err.stack.split("\n");
                    var mainLine = callerLines[4];
                    for(var i = 0; i < callerLines.length; i++){
                        if(callerLines[i].substring(7, 19) === '$A.translate' || callerLines[i].substring(7, 16) === 'translate'){
                            mainLine = callerLines[i+1];
                        }
                    }
                    if(mainLine.slice(-1) === ')'){
                        var mainInfo = mainLine.substring(mainLine.indexOf('http'), mainLine.length-1);
                    }else{
                        var mainInfo = mainLine.substring(mainLine.indexOf('http'));
                    }
                    
                    console.warn('Missing translate: "' + text + '" - ' + mainInfo);
                }
            }
        } else {
            var text = t.d.translate[text];
        }
        for (var i = 1; i < arguments.length; i++) {
            text = text.replace("%s", arguments[i]);
        }
        return text;
    };

    $A.m.i18n = i18n;
    $A.d.i18n = new $A.m.i18n();
    $A.translate = function(){
        return $A.d.i18n.translate.apply($A.d.i18n, arguments);
    };
    $A.setTranslate = function(){
        return $A.d.i18n.setTranslate.apply($A.d.i18n, arguments);
    };
    $A.getTranslate = function(){
        return $A.d.i18n.getTranslate.apply($A.d.i18n, []);
    };
});