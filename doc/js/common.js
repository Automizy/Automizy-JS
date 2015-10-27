function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

function loadBasicModuleFucntionDescriptions(moduleName, func) {
    if (typeof moduleName === 'string') {
        var lowercase = moduleName;//.toLowerCase();
        var uppercase = lowercase.charAt(0).toUpperCase() + moduleName.slice(1);
        $.ajax({
            url: 'basic-module-functions.html',
            dataType: 'html',
            success: function (data) {
                data = data.replace(/{{ModuleLowerCase}}/g, lowercase);
                data = data.replace(/{{ModuleUpperCase}}/g, uppercase);
                $(data).each(function () {
                    var id = $(this).attr('id');
                    $("[id='" + id + "']:empty").html($(this).html());
                });
                func();
            }
        });
    }
}

function loadPage(url1, url2, moduleName) {

    var addButtonsToCodeBlocksTimeout;
    function addButtonsToCodeBlocks() {
        $('.prettyprinted:not(.buttoned):not(#module-example)').each(function () {
            var $t = $(this);
            $t.addClass('buttoned');
            $t.css('position', 'relative');
            var $testButton = $A.newButton().text('test').click(function (module) {
                //$A.hashChange(module.widget().closest('article').attr('id') + '/code/test');
                window.TEST = $t.data('content');
                var $iframe = $('<iframe src="codeframe.html"/>').css({
                    outline: '2px solid #000000',
                    width: '100%',
                    height: '300px'
                });
                $A.newDialog({
                    content: $iframe,
                    hash: module.widget().closest('article').attr('id') + '/code/test'
                }).draw();
            }).draw().widget().css({
                position: 'absolute',
                right: 0,
                bottom: 0
            }).appendTo($t);
            clearTimeout(addButtonsToCodeBlocksTimeout);
            addButtonsToCodeBlocksTimeout = setTimeout(function () {
                addButtonsToCodeBlocks();
            }, 100);
        });
    }

    setCookie("last-page", url1 + ',' + url2 + ',' + moduleName);
    $A.hashChange(moduleName);
    $('[data-name]').removeClass('active-page');
    $('[data-name="' + moduleName + '"]').addClass('active-page');
    if (url2 !== undefined) {
        $('.module-content').load(url1, function () {
            $.ajax({
                url: url2,
                success: function (data) {
                    $('#module-example').text(data);
                    $('#module-demo').html('<iframe src=' + url2 + '/>');
                },
                complete: function () {
                    loadBasicModuleFucntionDescriptions(moduleName, function () {
                        $('.prettyprint').each(function () {
                            var $t = $(this);
                            var tt = $t.text();
                            $t.data('content', tt);
                            if (tt.lastIndexOf("\n") > 0) {
                                $t.text(tt.substring(0, tt.lastIndexOf("\n")));
                            }
                        });
                        prettyPrint();
                        setTimeout(function () {
                            addButtonsToCodeBlocks();
                        }, 100);
                    });
                    //$('#module-demo iframe').attr('onload', "javascript:alert($('#module-demo iframe').height(parseInt($('#module-demo iframe').contents().find('.automizy-feedback').height())+100).height());");
                }
            });
        });
    }
    else
        $('.module-content').load(url1, function () {
            $('.prettyprint').each(function () {
                var $t = $(this);
                var tt = $t.text();
                $t.data('content', tt);
                if (tt.lastIndexOf("\n") > 0) {
                    $t.text(tt.substring(0, tt.lastIndexOf("\n")));
                }
            });
            prettyPrint();
            setTimeout(function () {
                addButtonsToCodeBlocks();
            }, 100);
            if (typeof $(".globalFunctions-" + moduleName)[0]!=='undefined')
                $(".globalFunctions-" + moduleName)[0].click();
            if (typeof $(".globalEvents-" + moduleName)[0]!=='undefined')
                $(".globalEvents-" + moduleName)[0].click();
        });
}

function openDownloadsDialog() {
    if (typeof downloadsDialog !== 'undefined') {
        downloadsDialog.open();
        return true;
    }
    var $content = $('\
<div>\n\
    <a href="downloads/automizy.min.js" target="_blank" onClick="$A.hashChange(\'downloads/automizy.min.js\')">Download the compressed, production JavaScript file for AutomizyJS 0.5.3</a><br/>\n\
    <a href="downloads/automizy.min.css" target="_blank" onClick="$A.hashChange(\'downloads/automizy.min.css\')">Download the compressed, production CSS file for AutomizyJS 0.5.3</a><br/>\n\
    <a href="downloads/automizy.js" target="_blank" onClick="$A.hashChange(\'downloads/automizy.js\')">Download the uncompressed, development JavaScript file for AutomizyJS 0.5.3</a><br/>\n\
    <a href="downloads/automizy.css" target="_blank" onClick="$A.hashChange(\'downloads/automizy.css\')">Download the uncompressed, development CSS file for AutomizyJS 0.5.3</a><br/>\n\
    <a href="downloads/automizy.min.map" target="_blank" onClick="$A.hashChange(\'downloads/automizy.min.map\')">Download the map file for AutomizyJS 0.5.3</a><br/>\n\
    <a href="downloads/automizyjs.zip" onClick="$A.hashChange(\'downloads/automizyjs.zip\')">Download the all in one ZIP file for AutomizyJS 0.5.3</a>\n\
</div>\n\
    ');
    window.downloadsDialog = $A.newDialog({
        title: "Download AutomizyJS",
        hash: 'downloads',
        content: $content,
        buttons: [{
                text: 'Close',
                skin: 'nobox-green',
                click: function () {
                    downloadsDialog.close();
                }
            }]
    }).draw();
    return true;
}

$(function () {
    $('[data-url]').click(function () {
        loadPage($(this).attr('data-url'), $(this).attr('data-example-url'), $(this).data('name'));
    });
    if (1==1 || getCookie("last-page") === "") {
        loadPage('introduction.html', '', 'Introduction');
    }
    else {
        var attrs = getCookie("last-page").split(',');
        loadPage(attrs[0], attrs[1], attrs[2]);
    }
    ;
});