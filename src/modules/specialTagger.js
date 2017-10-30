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
            $optionsLoading: $('<div class="automizy-special-tagger-options-loading"></div>'),

            options: [],

            type:'checkbox',

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
                            t.d.$optionsText.ashow().text($A.translate('no tags...'));
                            return;
                        }
                    } else {

                    }
                    var re = new RegExp(value, "gi");
                    for (var i = 0; i < t.d.options.length; i++) {
                        if (t.d.options[i].search.search(re) >= 0 || t.d.options[i].$checkbox.is(':checked') || t.d.options[i].$radio.is(':checked')) {
                            t.d.options[i].$widget.ashow();
                            showedLength++;
                        } else {
                            t.d.options[i].$widget.ahide();
                        }
                    }

                    t.d.$optionsText.ahide();
                    if(showedLength <= 0){
                        t.d.$optionsText.ashow().text($A.translate('no results...'));
                    }

                }
            }),
            newTagInput: $A.newInput2({
                placeholder: $A.translate('Add New Tag...'),
                padding: 0,
                margin: 0,
                width: '100%',
                enter: function () {
                    t.addTagFromInput(this.val());
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
        t.d.$optionsLoading.appendTo(t.d.$optionsBox);

        t.d.newTagInput.drawTo(t.d.$td3);

        if (typeof obj !== 'undefined') {
            if (typeof obj.tagList !== 'undefined') {
                t.tagList(obj.tagList);
            }
            if (typeof obj.value !== 'undefined') {
                t.val(obj.value);
            }
            if (typeof obj.maxHeight !== 'undefined') {
                t.maxHeight(obj.maxHeight);
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
            if (typeof obj.type !== 'undefined') {
                t.type(obj.type);
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
            if(t.type() === 'checkbox') {
                for (var i = 0; i < t.d.options.length; i++) {
                    t.d.options[i].$checkbox.prop('checked', (tags.indexOf(t.d.options[i].value) >= 0));
                }
            }else if(t.type() === 'radio') {
                for (var i = 0; i < t.d.options.length; i++) {
                    if(tags == t.d.options[i].value){
                        t.d.options[i].$radio.prop('checked', true);
                        break;
                    }
                }
            }
            return t;
        }
        if(t.type() === 'checkbox') {
            tags = [];
            for (var i = 0; i < t.d.options.length; i++) {
                if (t.d.options[i].$checkbox.is(':checked')) {
                    tags.push(t.d.options[i].value);
                }
            }
            return tags;
        }else if(t.type() === 'radio') {
            tags = '';
            for (var i = 0; i < t.d.options.length; i++) {
                if (t.d.options[i].$radio.is(':checked')) {
                    tags = t.d.options[i].value;
                    break;
                }
            }
            return tags;
        }
    };
    p.type = function(type){
        var t = this;
        if(typeof type !== 'undefined'){
            t.d.type = type;
            if(t.d.type === 'checkbox'){
                for (var i = 0; i < t.d.options.length; i++) {
                    t.d.options[i].$radio.appendTo($A.$tmp);
                    t.d.options[i].$checkbox.prependTo(t.d.options[i].$widget);
                }
            }else if(t.d.type === 'radio'){
                for (var i = 0; i < t.d.options.length; i++) {
                    t.d.options[i].$radio.prependTo(t.d.options[i].$widget);
                    t.d.options[i].$checkbox.appendTo($A.$tmp);
                }
            }
            return t;
        }
        return t.d.type;
    };
    p.maxHeight = function (maxHeight) {
        var t = this;
        if (typeof maxHeight !== 'undefined') {
            t.d.maxHeight = maxHeight;
            t.d.$optionsBox.css('max-height', t.d.maxHeight);
            return t;
        }
        return t.d.maxHeight;
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
            t.d.$optionsText.ashow().text($A.translate('no tags...'));

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
        var $checkbox = $('<input type="checkbox" class="automizy-special-tagger-tag-checkbox" />').attr('title', tag);
        var $radio = $('<input type="radio" name="'+t.id()+'" class="automizy-special-tagger-tag-radio" />').attr('title', tag);
        var $tag = $('<span class="automizy-special-tagger-tag-label"></span>').text(tag).appendTo($widget).attr('title', tag);

        if(prepend){
            $widget.prependTo(t.d.$options);
        }else{
            $widget.appendTo(t.d.$options);
        }

        if(t.d.type === 'checkbox'){
            $radio.appendTo($A.$tmp);
            $checkbox.prependTo($widget);
        }else if(t.d.type === 'radio'){
            $radio.prependTo($widget);
            $checkbox.appendTo($A.$tmp);
        }

        if(autoCheck){
            $checkbox.prop('checked', true);
            $radio.prop('checked', true);
        }

        var optionObj = {
            $widget: $widget,
            $checkbox: $checkbox,
            $radio: $radio,
            $tag: $tag,
            value: tag,
            search: tag
        };

        t.d.options.push(optionObj);

        return t;
    };

    p.addTagFromInput = function (value) {
        var t = this;
        var tag = value.trim();
        if (tag.length <= 0) {
            return false;
        }
        var tagLower = tag.toLowerCase();
        for (var i = 0; i < t.d.options.length; i++) {
            if (t.d.options[i].value.toLowerCase() === tagLower) {
                t.d.options[i].$checkbox.prop('checked', true);
                t.d.options[i].$radio.prop('checked', true);
                return false;
            }
        }
        t.addTagToList(tag, false, true);
        t.scrollToBottom();
        t.d.onAddTag.apply(t, [tag]);
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

    p.loadingOn = function(){
        var t = this;
        t.widget().addClass('automizy-line-loading');
        t.d.newTagInput.disable();
        return t;
    };
    p.loadingOff = function(){
        var t = this;
        t.widget().removeClass('automizy-line-loading');
        t.d.newTagInput.enable();
        return t;
    };



    $A.initBasicFunctions(SpecialTagger, "SpecialTagger", ["change"]);
});
