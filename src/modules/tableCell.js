define([
    'automizy/core',
    'automizy/functions/getUniqueString',
    'automizy/functions/initBasicFunctions'
], function () {
    var TableCell = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<td class="automizy-table-cell"></td>'),
            $editableContent: $('<span class="automizy-table-cell-editable-content"></span>'),
            hasObject: false,
            editable: false
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

            t.d.editable = t.col().editable();
            if (t.editable()) {

                t.d.$editableContent = $($(obj)[0].innerHTML);
                t.d.html = $($(obj)[0].innerHTML).html();

            }

        }
    };


    var p = TableCell.prototype;

    p.openInlineEditor = function(){
        var t = this;
        //console.log(t.col());
        /*
        var inlineInput = $A.newInput(t.col().d.inlineInputObject)
        t.html(inlineInput.widget());

        switch (inlineInput.type()){
            case 'text':{

                break;
            }
        }
        console.log('open inline editor');
        */
    }

    p.table = function () {
        var $table = this.widget().closest('table');
        if ($table.hasClass('automizy-table')) {
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
            if (t.editable()) {
                t.d.$editableContent = t.d.$editableContent.html(text)
                t.d.$widget.html(t.d.$editableContent);
            }
            else {
                t.d.$widget.html(text);
            }
            return t;
        }
        return t.d.text;
    };
    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            if (t.editable()) {
                t.d.$editableContent = t.d.$editableContent.html(html)
                t.d.$widget.html(t.d.$editableContent);
            }
            else {
                t.d.$widget.html(html);
            }
            t.d.text = t.d.$widget.text();
            return t;
        }
        return t.d.html;
    };

    p.editable = function () {
        var t = this;
        return t.d.editable;
    };

    $A.initBasicFunctions(TableCell, "TableCell");

});