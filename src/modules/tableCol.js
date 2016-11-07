define([
    'automizy/core',
    'automizy/functions/getUniqueString',
    'automizy/functions/registerLocalEvents',
    'automizy/functions/initBasicFunctions'
], function () {
    var TableCol = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<th class="automizy-table-col"></th>'),
            table: false,
            hasObject: false,
            newCol: false,
            editable: false,
            html: '',
            text: '',
            active: true
        };
        t.init();

        if (typeof obj !== 'undefined') {

            if (obj instanceof HTMLElement) {
                obj = $(obj);
            }
            if (obj instanceof jQuery) {
                t.d.hasObject = true;
                t.d.$widget = obj;
                t.d.index = obj.index();
                t.d.text = obj.text();
                t.d.html = obj.html();
                t.d.active = obj.css('display') !== 'none';
                //t.d.table = $A.table(t.widget().closest('.automizy-table-box'));
                if (typeof obj.data('name') !== 'undefined')t.name(obj.data('name'));
                if (typeof obj.attr('id') !== 'undefined')t.id(obj.attr('id'));
                if (typeof obj.data('editable') !== 'undefined')t.editable(obj.data('editable'));
                if (typeof obj.data('onInlineEditComplete') !== 'undefined')t.d.onInlineEditComplete = obj.data('onInlineEditComplete');
                if (typeof obj.data('setInlineInputObject') !== 'undefined')t.d.setInlineInputObject = obj.data('setInlineInputObject');
                if (typeof obj.data('data') !== 'undefined')t.data(obj.data('data'));
            } else {
                if (typeof obj.newCol !== 'undefined')
                    t.d.newCol = obj.newCol;
                if (typeof obj.editable !== 'undefined')
                    t.d.editable = obj.editable;
                if (typeof obj.setInlineInputObject !== 'undefined')
                    t.d.setInlineInputObject = obj.setInlineInputObject;
                if (typeof obj.onInlineEditComplete !== 'undefined')
                    t.d.onInlineEditComplete = obj.onInlineEditComplete;
                if (typeof obj.index !== 'undefined')
                    t.index(obj.index);
                if (typeof obj.table !== 'undefined')
                    t.table(obj.table);
                if (typeof obj.name !== 'undefined')
                    t.name(obj.name);
                if (typeof obj.html !== 'undefined')
                    t.html(obj.html);
                if (typeof obj.text !== 'undefined')
                    t.text(obj.text);
                if (typeof obj.active !== 'undefined')
                    t.active(obj.active);
                if (typeof obj.data !== 'undefined')
                    t.data(obj.data);
                t.initParameter(obj);
            }
        }


    };
    var p = TableCol.prototype;

    p.table = function (table) {
        var t = this;
        if (typeof table !== 'undefined') {
            t.d.table = table;
            var colIndex = t.d.index;
            var $cols = t.d.table.table().find('th, td').eq(0).siblings().addBack();
            var colLen = $cols.length;
            var id = $cols.eq(colIndex).attr('id') || 0;

            //if(typeof $A.getTableCol(id) === 'undefined'){
            if (t.d.newCol) {
                t.$cells().each(function (index) {
                    var $this = $(this);
                    var $clone = $this.clone().empty().removeAttr('id');
                    var $row = $this.closest('tr');
                    if (index === 0) {
                        t.d.$widget = $clone;
                        t.d.$widget.attr('id', t.id());
                    }
                    if (colIndex >= colLen) {
                        $clone.insertAfter($row.find('th, td').eq(colLen - 1));
                    }
                    else {
                        if (colIndex < 0) {
                            colIndex = 0;
                        }
                        $clone.insertBefore($row.find('th, td').eq(colIndex));
                    }
                });
            }
            return t;
        }
        if (!t.d.table) {
            t.d.table = $A.table(t.widget().closest('.automizy-table-box'));
        }
        return t.d.table;
    };
    p.index = function (index) {
        var t = this;
        if (typeof index !== 'undefined') {
            if (t.d.hasObject) {
                t.$cells().each(function () {
                    var $this = $(this);
                    var row = $this.closest('tr');
                    $this.insertBefore(row.find('th, td').eq(index));
                })
            }
            t.d.index = index;
            return t;
        }
        t.d.index = t.widget().index();
        return t.d.index;
    };
    p.text = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.d.$widget.text(text);
            t.d.html = text;
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
            t.d.text = t.d.$widget.text();
            return t;
        }
        return t.d.html;
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            t.d.$widget.data('name', name);
            return t;
        }
        return t.d.name;
    };
    p.active = function (active) {
        var t = this;
        if (typeof active !== 'undefined') {
            t.d.active = $A.parseBoolean(active);
            if (t.d.active) {
                t.show();
            } else {
                t.hide();
            }
            return t;
        }
        return t.d.active;
    };
    p.editable = function (editable) {
        var t = this;
        if (typeof editable !== 'undefined') {
            t.d.editable = editable;
            return t;
        }
        return t.d.editable;
    };
    p.cells = function (type) {
        var t = this;
        var table = t.table();
        var tableId = table.id();
        var rowCount = table.table()[0].rows.length;
        var index = t.index();

        var type = type || 'Automizy';
        if (type === 'jQuery') {
            return table.table().find('th:nth-child(' + (index + 1) + '), td:nth-child(' + (index + 1) + ')');
        } else if (type === 'DOM') {
            var cells = [];
            var rows = table.table()[0].rows;
            for (var i = 0; i < rows.length; i++) {
                cells.push(rows[i].cells[index]);
            }
            return cells;
            //return table.table()[0].rows[i].cells;
        }

        var aCells = [];
        for (var i = 0; i < rowCount; i++) {
            var cell = table.table()[0].rows[i].cells[index];
            aCells.push($A.tableCell(cell));
        }
        return aCells;
    };
    p.$cells = function () {
        return this.cells('jQuery');
    };
    p.domCells = function () {
        return this.cells('DOM');
    };

    p.hide = function () {
        this.$cells().hide();
        this.d.active = false;
        return this;
    };
    p.show = function () {
        this.$cells().show();
        this.d.active = true;
        return this;
    };
    p.remove = function () {
        this.$cells().remove();
        delete $A.d["tablecols"][this.id()];
        return true;
    };

    p.onInlineEditComplete = function (cell, inlineInput) {
        var t = this;
        t.d.onInlineEditComplete(cell, inlineInput);
    }

    p.setInlineInputObject = function (cell) {
        var t = this;
        t.d.setInlineInputObject(cell);
    };

    $A.initBasicFunctions(TableCol, "TableCol");

});