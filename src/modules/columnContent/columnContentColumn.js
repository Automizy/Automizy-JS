define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var ColumnContentColumn = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-column-content-column automizy-closed"></div>'),
            $table: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-column-content-column-table"></table>'),
            $trTop:$('<tr class="automizy-column-content-column-tr-top"></tr>'),
            $tdTop:$('<td class="automizy-column-content-column-td-top"></td>'),
            $trMiddle:$('<tr class="automizy-column-content-column-tr-middle"></tr>'),
            $tdMiddle:$('<td class="automizy-column-content-column-td-middle"></td>'),
            $trBottom:$('<tr class="automizy-column-content-column-tr-bottom"></tr>'),
            $tdBottom:$('<td class="automizy-column-content-column-td-bottom"></td>'),

            $title:$('<div class="automizy-column-content-column-title"></div>'),
            $subTitle:$('<div class="automizy-column-content-column-subtitle"></div>'),
            $content:$('<div class="automizy-column-content-column-content"></div>'),
            $footerContent:$('<div class="automizy-column-content-column-footer-content"></div>'),

            name:false,
            title:false,
            subTitle:false,
            content:false,
            footerContent:false
        };
        t.f = {};
        t.init();


        t.d.$table.appendTo(t.d.$widget);
        t.d.$trTop.appendTo(t.d.$table);
        t.d.$tdTop.appendTo(t.d.$trTop);
        t.d.$trMiddle.appendTo(t.d.$table);
        t.d.$tdMiddle.appendTo(t.d.$trMiddle);
        t.d.$trBottom.appendTo(t.d.$table);
        t.d.$tdBottom.appendTo(t.d.$trBottom);

        t.d.$title.appendTo(t.d.$tdTop);
        t.d.$subTitle.appendTo(t.d.$tdTop);
        t.d.$content.appendTo(t.d.$tdMiddle);
        t.d.$footerContent.appendTo(t.d.$tdBottom);


        if (typeof obj !== 'undefined') {
            if (typeof obj.name !== 'undefined') {
                t.name(obj.name);
            }
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.subTitle !== 'undefined') {
                t.subTitle(obj.subTitle);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.footerContent !== 'undefined') {
                t.footerContent(obj.footerContent);
            }
            if (typeof obj.columnContentModule !== 'undefined') {
                t.columnContentModule(obj.columnContentModule);
            }
            t.initParameter(obj);
        }

    };

    var p = ColumnContentColumn.prototype;

    p.columnContentModule = function (columnContentModule) {
        var t = this;
        if (typeof columnContentModule !== 'undefined') {
            t.d.columnContentModule = columnContentModule;
            return t;
        }
        return t.d.columnContentModule;
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            return t;
        }
        return t.d.name;
    };

    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.widget().css('width', t.d.width);
            return t;
        }
        return t.d.width;
    };

    p.content = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            if(typeof content === 'boolean'){
                t.widget().toggleClass('automizy-has-content', content);
                return t;
            }
            if (t.d.$content.contents() instanceof jQuery) {
                t.d.$content.contents().appendTo($A.$tmp);
            }
            t.d.$content.empty();
            t.d.content = content;
            if (t.d.content instanceof jQuery) {
                t.d.content.appendTo(t.d.$content);
            } else if (typeof t.d.content.drawTo === 'function') {
                t.d.content.drawTo(t.d.$content);
            } else {
                t.d.$content.html(t.d.content);
            }
            t.content(true);
            return t;
        }
        return t.d.content;
    };
    p.footerContent = function (footerContent) {
        var t = this;
        if (typeof footerContent !== 'undefined') {
            if(typeof footerContent === 'boolean'){
                t.widget().toggleClass('automizy-has-footer', footerContent);
                return t;
            }
            if (t.d.$footerContent.contents() instanceof jQuery) {
                t.d.$footerContent.contents().appendTo($A.$tmp);
            }
            t.d.$footerContent.empty();
            t.d.footerContent = footerContent;
            if (t.d.footerContent instanceof jQuery) {
                t.d.footerContent.appendTo(t.d.$footerContent);
            } else if (typeof t.d.footerContent.drawTo === 'function') {
                t.d.footerContent.drawTo(t.d.$footerContent);
            } else {
                t.d.$footerContent.html(t.d.footerContent);
            }
            t.footerContent(true);
            return t;
        }
        return t.d.footerContent;
    };

    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            if(typeof title === 'boolean'){
                t.widget().toggleClass('automizy-has-title', title);
                return t;
            }
            t.d.title = title;
            t.d.$title.html(title);
            t.title(true);
            return t;
        }
        return t.d.title;
    };
    p.subTitle = function (subTitle) {
        var t = this;
        if (typeof subTitle !== 'undefined') {
            if(typeof subTitle === 'boolean'){
                t.widget().toggleClass('automizy-has-subtitle', subTitle);
                return t;
            }
            t.d.subTitle = subTitle;
            t.d.$subTitle.html(subTitle);
            t.subTitle(true);
            return t;
        }
        return t.d.subTitle;
    };

    p.opened = function (opened) {
        var t = this;
        if(typeof opened !== 'undefined'){
            t.d.opened = $A.parseBoolean(opened);
            return t;
        }
        return t.d.opened;
    };

    p.open = function (force) {
        var t = this;
        force = force || false;
        t.opened(true);
        if(force){
            t.widget().addClass('automizy-disable-animate');
        }
        t.widget().removeClass('automizy-closed');
        if(force){
            t.widget().removeClass('automizy-disable-animate');
        }
        return t;
    };
    p.close = function (force) {
        var t = this;
        force = force || false;
        t.opened(false);
        if(force){
            t.widget().addClass('automizy-disable-animate');
        }
        t.widget().addClass('automizy-closed');
        if(force){
            t.widget().removeClass('automizy-disable-animate');
        }
        return t;
    };


    $A.initBasicFunctions(ColumnContentColumn, "ColumnContentColumn", []);


});
