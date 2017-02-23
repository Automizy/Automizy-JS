define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons',
    'automizy/modules/input2'
], function () {
    var InlineEditable = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-inline-editable inline-edit-inactive"></div>'),
            $editableContent: $('<span class="automizy-inline-editable-editable-content">'),
            inlineInput: null,

            value: ''
        };
        t.f = {};

        t.init();
        if (typeof obj !== 'undefined') {

            if (obj instanceof $A.m.Input2) {
                t.inlineInput(obj);
            }
            else {
                if (typeof obj.inlineInput !== 'undefined') {
                    t.inlineInput(obj.inlineInput);
                }
                if (typeof obj.editableContent !== 'undefined') {
                    t.editableContent(obj.editableContent);
                }
                if (typeof obj.onInlineEditComplete === 'function') {
                    t.onInlineEditComplete(obj.onInlineEditComplete);
                }
                if (typeof obj.onInlineEditCanceled === 'function') {
                    t.onInlineEditCanceled(obj.onInlineEditCanceled);
                }
                t.initParameter(obj);
            }
        }

    };

    var p = InlineEditable.prototype;

    p.editableContent = function (editableContent) {
        var t = this;
        if (typeof editableContent !== 'undefined') {
            t.d.$editableContent.html(editableContent);
            return t;
        }
        return t.d.$editableContent.html();
    };

    p.inlineInput = function (obj) {
        var t = this;

        if (typeof obj !== "undefined") {

            var inlineInput;

            if (obj instanceof $A.m.Input2) {
                inlineInput = obj;
            }
            else {
                inlineInput = $A.newInput2(obj);
            }

            /*Showing inline input on focus*/
            inlineInput.focus(function () {
                $(document).click();

                /*Showing inline editable*/
                t.showInlineEdit();
                $(document).on('click', removeFunction);
            });

            /*Hiding on escape key*/
            inlineInput.input().keyup(function (e) {
                if (e.keyCode == 27) {
                    cancelButton.click();
                }
            });

            /*Initializing validator if exists*/
            var validator = inlineInput.validator();

            /*Save & cancel buttons*/
            var saveButton = $A.newButton({
                icon: 'fa-check',
                skin: 'simple-orange',
                click: function () {
                    if (typeof inlineInput.validator() !== 'undefined') {
                        if (inlineInput.validate()) {
                            /*If input was valid when pressing save/enter*/
                            t.onInlineEditComplete(inlineInput);
                            $(document).off('click', removeFunction);
                        }
                        else {
                            /*If input was invalid when pressing save/enter*/
                            saveButton.disabled(true);
                            $(document).off('click', removeFunction);
                            inlineInput.focus();

                            /*If input becomes invalid, enable save button*/
                            validator.onInvalid(function () {
                                saveButton.disable();
                            });

                            /*If input becomes valid, enable save button*/
                            validator.onValid(function () {
                                saveButton.enable();
                            });

                        }
                    }
                    else {
                        t.onInlineEditComplete(inlineInput);
                        $(document).off('click', removeFunction);
                    }
                }
            });

            inlineInput.buttonRight(saveButton);

            var cancelButton = $A.newButton({
                icon: 'fa-close',
                skin: 'simple-white',
                click: function () {
                    t.onInlineEditCanceled();
                    $(document).off('click', removeFunction);
                }
            }).drawTo(inlineInput.d.$inputButtonRightCell);


            inlineInput.enter(function () {
                saveButton.click();
                /*
                 t.onInlineEditComplete(inlineInput);
                 $(document).off('click', removeFunction);
                 */
            });


            /*Saving old value*/
            inlineInput.data('old-value', inlineInput.value());


            /*Fill this array with the selector of elements
             which could be clicked when the inline edit input is open,
             without closing it
             */
            var ignoreOutClick = [];

            /*Any click in the edit box is ignored*/
            ignoreOutClick.push(inlineInput.d.$inputCell);
            ignoreOutClick.push(saveButton.widget());
            //ignoreOutClick.push(inlineInput.d.$inputCell);

            switch (inlineInput.type()) {
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


            /*Detecting click outside the inline input*/
            function removeFunction(event) {
                var clickedIn = false;
                /*Iterating through all the ignore selectors*/
                for (var i = 0; i < ignoreOutClick.length; i++) {
                    if (!($(event.target).closest(ignoreOutClick[i]).length == false && t.widget().hasClass('inline-edit-active'))) {
                        clickedIn = true;
                    }
                }
                if (!clickedIn) {
                    $(document).off('click', removeFunction);
                    t.onInlineEditCanceled();
                }
            }

            t.d.inlineInput = inlineInput;
            inlineInput.drawTo(t.d.$widget);
            return t;
        }
        return t.d.inlineInput;
    };

    p.onInlineEditComplete = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('onInlineEditComplete', func);
        } else {
            var inlineInput = t.inlineInput();
            inlineInput.data('old-value', inlineInput.value());
            t.value(inlineInput.value());
            t.hideInlineEdit();
            t.runFunctions('onInlineEditComplete');
        }
        return t;
    };

    p.onInlineEditCanceled = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('onInlineEditCanceled', func);
        } else {
            t.runFunctions('onInlineEditCanceled');
            t.hideInlineEdit();
        }
        return t;
    };

    p.showInlineEdit = function () {
        var t = this;
        t.widget().addClass("inline-edit-active");
        t.widget().removeClass("inline-edit-inactive");
    };

    p.isShown = function () {
        return this.widget().hasClass('inline-edit-active');
    };

    p.hideInlineEdit = function () {
        var t = this;
        var inlineInput = t.inlineInput();
        t.widget().removeClass("inline-edit-active");
        t.widget().addClass("inline-edit-inactive");
        inlineInput.value(t.value());
        inlineInput.input().blur();
        inlineInput.hideError();
        inlineInput.buttonRight().enable();
    };

    p.value = function (value) {
        var t = this;
        if (typeof value !== "undefined") {
            t.d.value = value;
            t.d.inlineInput.value(value);
            return t;
        }
        return t.d.value;
    };

    $A.initBasicFunctions(InlineEditable, "InlineEditable", []);


});
