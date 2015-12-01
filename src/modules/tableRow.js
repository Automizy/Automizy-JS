define([
    'automizy/core',
    'automizy/functions/getUniqueString',
    'automizy/functions/registerLocalEvents',
    'automizy/functions/initBasicFunctions'
], function () {
    var TableRow = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<tr class="automizy-table-row"></tr>'),
            table:false,
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
                t.index(obj.index());
                t.d.table = $A.table(t.widget().closest('.automizy-table-box'));
                if(typeof obj.data('recordId') !== 'undefined')t.recordId(obj.data('recordId'));
                if(typeof obj.attr('id') !== 'undefined')t.id(obj.attr('id'));
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
    var p = TableRow.prototype;
    
    p.table = function (table) {
        var t = this;
        if (typeof table !== 'undefined') {
            t.d.table = table;
            var rowIndex = t.d.index;
            var trs = t.d.table.table().find('tr:first').siblings().andSelf();
            var id = trs.eq(rowIndex).attr('id') || 0;
            
            if(typeof $A.getTableRow(id) === 'undefined'){
                t.$widget().insertBefore(trs.eq(rowIndex));
            }
            return t;
        }
        if (!t.d.table) {
            t.d.table = $A.table(t.widget().closest('.automizy-table-box'));
        }
        return t.d.table;
    };
    p.index = function () {
        return this.widget().index();
    };
    p.recordId = function () {
        return this.widget().data('id') || this.widget().data('recordId') || this.widget().find('td:first input').val() || 0;
    };

    p.$checkbox = function(){
        return this.d.$widget.find('.automizy-table-rowcheck:first');
    };
    p.getCellByColName = function(name){
        var t = this;
        if(typeof name === 'undefined'){
            return false;
        }
        var cells = t.cells();
        for(var i = 0; i < cells.length; i++){
            if(cells[i].col().name() == name){
                cell = cells[i];
                break;
            }
        }
        return cell || false;
    }
    
    p.cells = function (type) {
        var t = this;
        var table = t.table();
        var tableId = table.id();
        var index = t.index();
        var colCount = table.table()[0].rows[0].cells.length;

        var type = type || 'Automizy';
        if (type === 'jQuery') {
            return t.widget().find('th, td');
        } else if (type === 'DOM') {
            return table.table()[0].rows[index].cells;
        }

        var aCells = [];
        for (var i = 0; i < colCount; i++) {
            var cell = table.table()[0].rows[index].cells[i];
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
    
    $A.initBasicFunctions(TableRow, "TableRow");

});