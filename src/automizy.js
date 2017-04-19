requirejs.config({
    waitSeconds: requirejs.s.contexts._.config.waitSeconds || 20,
    paths: {
        automizy: requirejs.s.contexts._.config.paths.automizy || requirejs.s.contexts._.config.paths.automizyJsDir || '../src'
    }
});
define([
    "automizy/core",

    "automizy/images/icons",

    "automizy/modules/dialog",
    "automizy/modules/alert",
    "automizy/modules/button",
    "automizy/modules/input",
    "automizy/modules/input2",
    "automizy/modules/inlineEditable",
    "automizy/modules/form",
    "automizy/modules/validator",
    "automizy/modules/slideWindow",
    "automizy/modules/table",
    "automizy/modules/tableRow",
    "automizy/modules/tableCol",
    "automizy/modules/tableCell",
    "automizy/modules/i18n",
    "automizy/modules/select/select",
    "automizy/modules/message",
    "automizy/modules/panel",
    "automizy/modules/tag/tagger",
    "automizy/modules/progressBar",

    "automizy/defines/input",
    
    "automizy/addons/jqueryAddOns",
    "automizy/addons/dateAddOns",
    "automizy/addons/objectAddOns",

    "automizy/functions/escapeJQuerySelector",
    "automizy/functions/initBasicFunctions",
    "automizy/functions/setWindowScroll",
    "automizy/functions/hashChange",
    "automizy/functions/getFunctionStringFromArray",
    "automizy/functions/insertAtCaret",
    "automizy/functions/delay",
    "automizy/functions/rand",
    "automizy/functions/md5",
    "automizy/functions/getUniqueString",
    "automizy/functions/getFileNameFromUrl",
    "automizy/functions/parseBoolean",
    "automizy/functions/ajaxDocumentCover",
    "automizy/functions/skin",
    "automizy/functions/base64Encode",
    "automizy/functions/base64Decode",
    "automizy/functions/dateFormat",
    "automizy/functions/store",
    "automizy/functions/cookie",
    "automizy/functions/convertToResponsive",
    "automizy/functions/numberFormat",
    "automizy/functions/decodeEntities",
    "automizy/functions/runFunctions",
    "automizy/functions/registerEvent",
    "automizy/functions/registerLocalEvents",
    "automizy/functions/getExtension",
    "automizy/functions/getGetParameter",
    "automizy/functions/iphoneStyle",
    "automizy/functions/confirm",
    "automizy/functions/alert",
    "automizy/functions/instructionsNotification",
    "automizy/functions/runEvent",
    "automizy/functions/isPageVisibility",
    "automizy/functions/escapeHtml",
    "automizy/functions/sameAs"
], function () {
    //console.log('%c AutomizyJs module loaded! ', 'background: #000000; color: #bada55; font-size:14px');
});
