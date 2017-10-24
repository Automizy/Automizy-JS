define([
    'automizy/core',
    'automizy/defines/input',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/getUniqueString',
    'automizy/functions/parseBoolean',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/modules/validator'
], function () {
    var SpecialTagger = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-special-tagger"></table>'),
            $tr1: $('<tr></tr>'),
            $tr2: $('<tr></tr>'),
            $tr3: $('<tr></tr>'),
            $td1: $('<td class="automizy-special-tagger-td1"></td>'),
            $td2: $('<td class="automizy-special-tagger-td2"></td>'),
            $td3: $('<td class="automizy-special-tagger-td3"></td>'),

            $optionsBox: $('<div class="automizy-special-tagger-options-box"></div>'),
            $options: $('<div class="automizy-special-tagger-options"></div>'),
            $optionsText: $('<div class="automizy-special-tagger-options-text"></div>'),

            options: [],

            onAddTag:function(){},

            searchInput: $A.newInput2({
                innerIconRight: 'fa fa-search',
                placeholder: $A.translate('Search for Tags...'),
                padding: 0,
                margin: 0,
                width: '100%',
                keyup: function () {
                    var showedLength = 0;
                    var value = this.val().trim();
                    if (value.length <= 0) {
                        if(t.d.options.length <= 0){
                            t.d.$optionsText.ashow().text($A.translate('no tags'));
                            return;
                        }
                    } else {

                    }
                    var re = new RegExp(value, "gi");
                    for (var i = 0; i < t.d.options.length; i++) {
                        if (t.d.options[i].search.search(re) >= 0 || t.d.options[i].$checkbox.is(':checked')) {
                            t.d.options[i].$widget.ashow();
                            showedLength++;
                        } else {
                            t.d.options[i].$widget.ahide();
                        }
                    }

                    t.d.$optionsText.ahide();
                    if(showedLength <= 0){
                        t.d.$optionsText.ashow().text($A.translate('no results'));
                    }

                }
            }),
            newTagInput: $A.newInput2({
                placeholder: $A.translate('Add New Tag...'),
                padding: 0,
                margin: 0,
                width: '100%',
                enter: function () {
                    var value = this.val().trim();
                    if (value.length <= 0) {
                        return false;
                    }
                    for (var i = 0; i < t.d.options.length; i++) {
                        if (t.d.options[i].value == value) {
                            return false;
                        }
                    }
                    t.addTagToList(value, false, true);
                    t.scrollToBottom();
                    this.val('');
                }
            })

        };
        t.init();


        t.d.$tr1.appendTo(t.d.$widget);
        t.d.$tr2.appendTo(t.d.$widget);
        t.d.$tr3.appendTo(t.d.$widget);

        t.d.$td1.appendTo(t.d.$tr1);
        t.d.$td2.appendTo(t.d.$tr2);
        t.d.$td3.appendTo(t.d.$tr3);

        t.d.searchInput.drawTo(t.d.$td1);

        t.d.$optionsBox.appendTo(t.d.$td2);
        t.d.$options.appendTo(t.d.$optionsBox);
        t.d.$optionsText.appendTo(t.d.$optionsBox);

        t.d.newTagInput.drawTo(t.d.$td3);

        if (typeof obj !== 'undefined') {
            if (typeof obj.tagList !== 'undefined') {
                t.tagList(obj.tagList);
            }
            if (typeof obj.value !== 'undefined') {
                t.val(obj.value);
            }
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }
            if (typeof obj.unique !== 'undefined') {
                t.unique(obj.unique);
            }
            if (typeof obj.maxLength !== 'undefined') {
                t.maxLength(obj.maxLength);
            }
            if (typeof obj.change === 'function') {
                t.change(obj.change);
            }
            if (typeof obj.onAddTag === 'function') {
                t.onAddTag(obj.onAddTag);
            }
            t.initParameter(obj);
        }

    };

    var p = SpecialTagger.prototype;

    p.change = function (func, name, life) {
        var t = this;

        return t;
    };
    p.val = p.tags = function (tags) {
        var t = this;
        if (typeof tags !== 'undefined') {
            for (var i = 0; i < t.d.options.length; i++) {
                t.d.options[i].$checkbox.prop('checked', (tags.indexOf(t.d.options[i].value) >= 0));
            }
            return t;
        }
        tags = [];
        for (var i = 0; i < t.d.options.length; i++) {
            if (t.d.options[i].$checkbox.is(':checked')) {
                tags.push(t.d.options[i].value);
            }
        }
        return tags;
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
    p.onAddTag = function (onAddTag) {
        var t = this;
        if (typeof onAddTag !== 'undefined') {
            t.d.onAddTag = onAddTag;
            return t;
        }
        return t;
    };

    p.tagList = function (tags) {
        var t = this;
        if (typeof tags !== 'undefined') {
            t.d.options = [];
            t.d.$options.empty();
            t.d.$optionsText.ashow().text($A.translate('no tags'));

            tags.forEach(function (tag) {
                t.addTagToList(tag);
            });

            return t;
        }
        return t.d.options;
    };

    p.addTagToList = function (tag, prepend, autoCheck) {
        var t = this;
        prepend = prepend || false;
        autoCheck = autoCheck || false;
        t.d.$optionsText.ahide();

        var $widget = $('<label class="automizy-special-tagger-tag"></label>');
        var $checkbox = $('<input type="checkbox" class="automizy-special-tagger-tag-checkbox" />').appendTo($widget).change(function () {
            if (this.checked) {

            }
        }).attr('title', tag);
        var $tag = $('<span class="automizy-special-tagger-tag-label"></span>').text(tag).appendTo($widget).attr('title', tag);

        if(prepend){
            $widget.prependTo(t.d.$options);
        }else{
            $widget.appendTo(t.d.$options);
        }

        if(autoCheck){
            $checkbox.prop('checked', true);
        }

        var optionObj = {
            $widget: $widget,
            $checkbox: $checkbox,
            $tag: $tag,
            value: tag,
            search: tag
        };

        t.d.options.push(optionObj);

        t.d.onAddTag.apply(t, [tag, optionObj]);
        return t;
    };

    p.scrollToTop = function(){
        var t = this;
        t.d.$optionsBox.scrollTop(0);
        return t;
    };

    p.scrollToBottom = function(){
        var t = this;
        t.d.$optionsBox.scrollTop(999999);
        return t;
    };


    $A.initBasicFunctions(SpecialTagger, "SpecialTagger", ["change"]);
});
