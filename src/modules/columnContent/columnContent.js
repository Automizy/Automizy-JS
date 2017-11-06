define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var ColumnContent = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-column-content"></div>'),
            width: '100%',
            height: 'auto',

            opened: false,

            columnsArray: [],
            columns: {}
        };
        t.f = {};
        t.init();

        if (typeof obj !== 'undefined') {
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }
            if (typeof obj.height !== 'undefined') {
                t.height(obj.height);
            }
            if (typeof obj.columns !== 'undefined') {
                t.columns(obj.columns);
            }
            t.initParameter(obj);
        }

    };

    var p = ColumnContent.prototype;

    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.widget().css('width', t.d.width);
            return t;
        }
        return t.d.width;
    };
    p.height = function (height) {
        var t = this;
        if (typeof height !== 'undefined') {
            t.d.height = height;
            t.widget().css('height', t.d.height);
            return t;
        }
        return t.d.height;
    };
    p.columns = function (columns) {
        var t = this;
        t.d.columnsArray = [];
        t.d.columns = {};
        columns.forEach(function (column) {
            var columnModule = $A.newColumnContentColumn(column);
            t.d.columnsArray.push(columnModule);
            t.d.columns[column.name || $A.getUniqueString()] = columnModule;
            columnModule.drawTo(t.d.$widget);
        });
        return t;
    };
    p.getColumn = function (name) {
        return this.d.columns[name];
    };

    $A.initBasicFunctions(ColumnContent, "ColumnContent", []);


});
