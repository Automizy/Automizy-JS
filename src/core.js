define([], function () {
    $A = new function () {
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
            alerts: {},
            forms:{},
            validators:{},
            feedbacks: {},
            hashes:[],
            elements:{
                $tmp:$('<div></div>'),
                $loading:$('<div class="automizy-loading" style="margin-top: 8px;"><div class="automizy-loading-in automizy-loading-in-1"></div><div class="automizy-loading-in automizy-loading-in-2"></div><div class="automizy-loading-in automizy-loading-in-3"></div></div>')
            }
        };
        t.m = {};
        t.mt = {};
        t.default = {};
        t.events = {};
        t.customEvents = {
            functions:{},
            on:{},
            off:{},
            one:{}
        };
    }();
    
    return $A;
});