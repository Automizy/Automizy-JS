define([], function () {
    window.AutomizyJs = window.$A = new function () {
        var t = this;
        t.d = {
            version: '0.5.3',
            settings: {
                logTranslateMissings:true
            },
            uniques:[],
            defines: {},
            dialogs: {},
            buttons: {},
            inputs: {},
            forms:{},
            validators:{},
            feedbacks: {},
            hashes:[]
        };
        t.m = {};
        t.mt = {};
        t.default = {};
    }();
    
    return AutomizyJs;
});