define([
    'automizy/core',
    'automizy/functions/getUniqueString',
    'automizy/functions/initBasicFunctions'
], function () {
    var TableCell = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<td class="automizy-table-cell"></td>'),
            hasObject: false
        };
        t.init();
        
        if (typeof obj !== 'undefined') {
            if (obj instanceof HTMLElement) {
                obj = $(obj);
            }
            if (obj instanceof jQuery) {
                t.d.hasObject = true;
                t.d.$widget = obj;
                t.d.html = obj.html();
                t.d.text = obj.text();
                t.d.table = $A.table(t.widget().closest('.automizy-table-box'));
            } else {
                if (typeof obj.index !== 'undefined')
                    t.index(obj.index);
                if (typeof obj.table !== 'undefined')
                    t.table(obj.table);
                if (typeof obj.recordId !== 'undefined')
                    t.recordId(obj.recordId);
                t.initParameter(obj);
            }
        }
    };
    var p = TableCell.prototype;

    p.table = function () {
        var $table = this.widget().closest('table');
        if($table.hasClass('automizy-table')){
            return $A.getTable($table.closest('.automizy-table-box').attr('id')) || $table;
        }
        return $table;
    };
    
    p.row = function () {
        return $A.tableRow(this.table().table().find('tr:first').siblings().andSelf().eq(this.widget().parent().index()));
    };
    p.col = function () {
        return $A.tableCol(this.table().table().find('th, td').eq(0).siblings().andSelf().eq(this.widget().index()));
    };
    p.index = function () {
        return [this.col().index(), this.row().index()];
    };
    p.recordId = function () {
        return this.row().recordId();
    };
    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.d.$widget.text(text);
            t.d.html=text;
            t.d.$widget.html(text);
            return t;
        }
        return t.d.text;
    };
    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            t.d.$widget.html(html);
            t.d.text=t.d.$widget.text();
            return t;
        }
        return t.d.html;
    };
    
    $A.initBasicFunctions(TableCell, "TableCell");

});