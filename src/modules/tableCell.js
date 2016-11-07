define([
    'automizy/core',
    'automizy/functions/getUniqueString',
    'automizy/functions/registerLocalEvents',
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

                if (typeof obj.data('inlineInputObject') !== 'undefined') {
                    t.inlineInputObject(data('inlineInputObject'));
                }
            } else {
                if (typeof obj.index !== 'undefined')
                    t.index(obj.index);
                if (typeof obj.table !== 'undefined')
                    t.table(obj.table);
                if (typeof obj.recordId !== 'undefined')
                    t.recordId(obj.recordId);
                if (typeof obj.inlineInputObject !== 'undefined') {
                    t.inlineInputObject(obj.inlineInputObject);
                }
                t.initParameter(obj);
            }

            t.d.editable = t.col().editable();
            if (t.editable()) {

                t.d.$editableContent = obj.find('.automizy-table-cell-editable-content');
                //t.d.html = $($(obj)[0].innerHTML).html();   //???
                t.d.html = $(obj).text();
            }

        }
    };


    var p = TableCell.prototype;

    p.table = function () {
        var $table = this.widget().closest('table');
        if ($table.hasClass('automizy-table')) {
            return $A.getTable($table.closest('.automizy-table-box').attr('id')) || $table;
        }
        return $table;
    };

    p.row = function () {
        return $A.tableRow(this.table().table().find('tr:first').siblings().addBack().eq(this.widget().parent().index()));
    };
    p.col = function () {
        return $A.tableCol(this.table().table().find('th, td').eq(0).siblings().addBack().eq(this.widget().index()));
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

    p.inlineInputObject = function (obj) {
        var t = this;
        if (typeof obj !== 'undefined') {
            t.d.inlineInputObject = obj;
            return t;
        }
        return t.d.inlineInputObject;
    };

    /*Opens inline editor*/
    p.inlineEdit = function () {

        var cell = this;

        /*If true, opening inlineButtonsBox will be prevented*/
        $A.d.inlineEditClick = true;

        var $editableContent = cell.d.$editableContent;
        var col = cell.col();

        col.setInlineInputObject(cell);

        /*Hiding old content*/
        $editableContent.hide()

        /*Inserting input field*/
        var inlineInputObject = cell.inlineInputObject();

        /*
        *Setting input type
        *if it's datetime, we'll need a little trick to make the datetimepicker show
        *if datetime, type is set to text, and will be changed after the input is drawn
        * */
        var originalType = inlineInputObject.type || 'text';

        inlineInputObject.type = originalType;
        if(originalType === 'datetime'){
            inlineInputObject.type = 'text';
        }
        var inlineInput = $A.newInput(inlineInputObject).newRow(false);

        var cancelButton = $A.newButton({
            html: '&#10006;',
            click: function () {
                removeInlineEditBox();
            }
        });
        var saveButton = $A.newButton({
            html: '&#10004;',
            skin: 'simple-orange',
            click: function () {
                col.onInlineEditComplete(cell, inlineInput);

                /*Hiding input*/
                removeInlineEditBox();
            }
        });

        var $editInputBox = $('<span class="automizy-table-inline-edit-input-box"></span>');

        /*Fill this array with the selector of elements
         which could be clicked when the inline edit input is open,
         without closing it
         */
        var ignoreOutClick = [];

        /*Any click in the edit box is ignored*/
        ignoreOutClick.push($editInputBox);

        switch (originalType) {
            case "date":
                ignoreOutClick.push('#ui-datepicker-div');
                break;
            case "datetime":
                ignoreOutClick.push('#ui-datepicker-div');
                break;
            case "select":
                /*Option window click is ignored*/
                ignoreOutClick.push('.automizy-select-option-box');
                break;
            default:
                break;
        }

        /*Focusing on input*/
        inlineInput.input().focus();

        /*Stop editing if escape pressed*/
        inlineInput.input().keyup(function (e) {
            if (e.keyCode == 27) {
                cancelButton.click();
            }
        });

        /*Enter function*/
        inlineInput.enter(function () {
            saveButton.click();
        });

        /*Removing inline edit*/
        function removeInlineEditBox() {
            inlineInput.remove();
            cancelButton.remove();
            saveButton.remove();
            $editInputBox.remove();
            $editableContent.show();
            $(document).off('click', removeFunction);
            $A.d.inlineEditClick = true;
        }

        $(document).on('click', removeFunction);

        /*Detecting click outside the inline input*/
        function removeFunction(event) {

            var clickedIn = false;
            /*Iterating through all the ignore selectors*/
            for (var i = 0; i < ignoreOutClick.length; i++) {
                if (!($(event.target).closest(ignoreOutClick[i]).length == false && $editInputBox.is(":visible"))) {
                    clickedIn = true;
                    $A.d.inlineEditClick = true;
                }
            }
            if (!clickedIn) {
                removeInlineEditBox();
                $A.d.inlineEditClick = false;
            }
        }


        /*Drawing the elements 10ms later (if not, edit box won't appear)*/
        setTimeout(function () {
            inlineInput.widget().appendTo($editInputBox);
            saveButton.widget().appendTo($editInputBox);
            cancelButton.widget().appendTo($editInputBox);
            $editInputBox.appendTo(cell.widget());

            /*Necessary to make datetimepicker work*/
            if(originalType === 'datetime'){
                inlineInput.displayType(originalType);
            }
        }, 10);

    };

    $A.initBasicFunctions(TableCell, "TableCell");

});