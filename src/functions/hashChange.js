define([
    'automizy/core',
    "automizy/addons/objectAddOns"
], function ($A) {
    var isChangeManually = false;
    $A.hashChange = function (hash, add) {
        if(typeof hash === 'undefined'){
            $(window).trigger('hashchange');
            return true;
        }
        if(typeof add === 'undefined'){
            var add = true;
        }else{
            var add = $A.parseBoolean(add);
        }
        if(add){
            $A.d.hashes.push(hash);
        }else{
            $A.d.hashes.remove(hash);
            hash = $A.d.hashes[$A.d.hashes.length - 1] || '';
        }
        isChangeManually = true;
        window.location.hash = hash;
        setTimeout(function(){
            isChangeManually = false;
        }, 10)
    };
    
    $(window).on('hashchange', function() {
        if(!isChangeManually){
            var hash = window.location.hash;
            if(hash.charAt(0) === '#')
                hash = hash.slice(1);
            $A.hashChange(hash);
        }
    });
});