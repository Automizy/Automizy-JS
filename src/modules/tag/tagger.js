define([
        'automizy/core',
        'automizy/addons/jqueryAddOns',
        'automizy/functions/initBasicFunctions',
        'automizy/functions/registerLocalEvents',
        'automizy/modules/tag/tag'
    ], function () {
        var Tagger = function (obj) {
            var t = this;
            t.d = {
                $widget: $('<div class="automizy-tagger"></div>'),
                $options: $('<ul class="automizy-tagger-options-list">'),

                tags: [],
                options: {},
                newTag: $A.newTag({text: '<input class="automizy-tagger-new-tag-input">'})
            }
            ;
            t.f = {
                onRemoveTag: function () {
                },
                onNewTagAdded: function () {
                },
                onTagAlreadyAdded: function () {
                }
            };
            t.init();

            if (typeof obj !== 'undefined') {

                if (typeof obj.options !== 'undefined') {
                    t.options(obj.options);
                }
                if (typeof obj.tags !== 'undefined') {
                    t.tags(obj.tags);
                }
                if (typeof obj.onRemoveTag === 'function') {
                    t.onRemoveTag(obj.onRemoveTag);
                }
                if (typeof obj.onTagAlreadyAdded === 'function') {
                    t.onTagAlreadyAdded(obj.onTagAlreadyAdded);
                }
                if (typeof obj.onNewTagAdded === 'function') {
                    t.onNewTagAdded(obj.onNewTagAdded);
                }

                t.initParameter(obj);
            }

            t.d.$options.appendTo('body').ahide();

        };

        var p = Tagger.prototype;

        p.positionOptionBox = function () {
            var t = this;
            var $optionBox = t.d.$options;
            var $newTag = t.d.newTag.widget();

            var $input = $newTag.find('input');
            var inputOffset = $input.offset();
            var offsetTop = $newTag.offset().top;
            var inputOffsetLeft = inputOffset.left;
            var tagHeight = t.d.newTag.widget().height();
            var inputWidth = $input.outerWidth();

            $optionBox.css({
                bottom: 'auto',
                left: inputOffsetLeft + 'px',
                top: (offsetTop + tagHeight + 1) + 'px',
                width: inputWidth + 'px'
            });
        };

        p.hideOptions = function (event) {
            var t = this;
            if (typeof event === 'undefined') {
                t.d.$options.ahide();
            }
            else {
                if ($(event.target).closest(event.data.d.$options).length === 0) {
                    event.data.d.$options.ahide();
                    $(document).off('mousewheel DOMMouseScroll', event.data.hideOptions);
                }
            }
        };

        p.showOptions = function () {
            var t = this;
            t.d.$options.ashow();
            $(document).on('mousewheel DOMMouseScroll', t, t.hideOptions);
        };

        p.hasTag = function (tag) {
            var t = this;
            var val = '';

            if (tag instanceof $A.m.Tag) {
                val = tag.text();
            } else {
                val = tag;
            }

            var hasTag = false;

            var tags = t.d.tags;
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].text() === val) {
                    hasTag = true;
                }
            }

            return hasTag;
        };

        p.hasOption = function (tag) {
            var t = this;
            var val = '';

            if (tag instanceof $A.m.Tag) {
                val = tag.text();
            } else {
                val = tag;
            }

            var hasOption = false;

            var options = Object.keys(t.d.options);
            if (options.indexOf(val) !== -1) {
                hasOption = true;
            }

            return hasOption;
        };

        p.getTag = function (tag) {
            var t = this;
            var text;
            if (tag instanceof $A.m.Tag) {
                text = tag.text();
            }
            else {
                text = tag;
            }
            for (var i = 0; i < t.d.tags.length; i++) {
                if (t.d.tags[i].text() === text) {
                    return t.d.tags[i]
                }
            }
            return false;
        };

        p.addTag = function (obj) {
            var t = this;
            if (typeof obj !== 'undefined') {
                var tag;
                if (obj instanceof $A.m.Tag) {
                    obj.tagger(t);
                    tag = obj;
                } else {
                    if (typeof obj === 'string') {
                        obj = {
                            text: obj,
                            tagger: t
                        };
                    }
                    tag = $A.newTag(obj);
                }

                if (t.hasTag(tag) === false) {
                    t.d.tags.push(tag);
                    tag.drawTo(t.d.$widget);
                }
                else {
                    t.onTagAlreadyAdded(tag)
                }
                t.addOption(tag.text(), false);

                return t;
            }
            else {
                var tag = t.d.newTag;
                resetNewTag();

                /*Detecting click outside the tagger*/
                function removeFunction(event) {
                    var ignoreOutClick = ['.automizy-tagger input.automizy-tagger-new-tag-input'];

                    var clickedIn = false;
                    /*Iterating through all the ignore selectors*/
                    for (var i = 0; i < ignoreOutClick.length; i++) {
                        if (!($(event.target).closest(ignoreOutClick[i]).length == false && tag.widget().is(":visible"))) {
                            clickedIn = true;
                        }
                    }
                    if (!clickedIn) {
                        resetNewTag();
                    }
                }

                function resetNewTag() {
                    t.hideOptions();
                    tag.widget().ahide();
                    tag.text('<input class="automizy-tagger-new-tag-input">');

                    var $input = tag.widget().find('input');

                    $input.keyup(function (e) {
                        if (t.d.$options.is(':visible') == false) {
                            t.showOptions();
                        }
                        var val = $input.val();
                        if (e.which == 13) {
                            if (val !== '') {
                                var realNewTag = $A.newTag(val);
                                if (t.hasTag(val) === false) {
                                    t.addTag(realNewTag);
                                    t.onNewTagAdded(realNewTag);
                                }
                                else {
                                    t.onTagAlreadyAdded(realNewTag);
                                }
                            }
                            resetNewTag();
                        }
                        else {
                            t.search(val);
                        }
                    });

                    t.d.$options.children().ahide();
                    $(document).off('click', removeFunction);
                }

                setTimeout(function () {
                    $(document).on('click', removeFunction);

                    tag.drawTo(t.widget()).widget().ashow().show();
                    tag.widget().find('input').focus();
                    t.showOptions();
                    t.positionOptionBox();
                }, 10);
            }
            return t;
        };

        p.tags = function (tags) {
            var t = this;
            if (typeof tags !== 'undefined') {
                for (var i = 0; i < t.d.tags.length; i++) {
                    t.d.tags = [];
                    t.d.$widget.empty();
                }
                for (var i in tags) {
                    t.addTag(tags[i]);
                }
                return t;
            }
            return t.d.tags;
        };

        p.addOption = function (option, isShown) {
            var t = this;
            if (typeof isShown === 'undefined') {
                isShown = true;
            }
            if (typeof option !== 'undefined') {

                if (option instanceof Array) {

                    option = option.sort();
                    for (var i = 0; i < option.length; i++) {
                        var alreadyExists = (typeof t.d.options[option[i]] !== 'undefined');
                        t.d.options[option[i]] = isShown;
                        if (!alreadyExists) {
                            createOptionElement(option[i]);
                        }
                    }
                }
                else {

                    var alreadyExists = (typeof t.d.options[option] !== 'undefined');
                    t.d.options[option] = isShown;
                    if (!alreadyExists) {
                        createOptionElement(option);
                    }
                }

                function createOptionElement(option) {
                    var options = Object.keys(t.d.options).sort();
                    var index = options.indexOf(option);

                    if (index !== -1) {

                        if (index === 0) {
                            index = 1;
                        }
                        var $option = $('<li title="' + option + '">' + option + '</li>').click(function () {
                            var val = $(this).text();
                            var realNewTag = $A.newTag(val);
                            if (t.hasTag(val) === false) {
                                t.addTag(realNewTag);
                                t.onNewTagAdded(realNewTag);
                            }
                            else {
                                t.onTagAlreadyAdded(realNewTag);
                            }
                        });


                        var $prevLi = t.d.$options.find('li').eq(index - 1);
                        if ($prevLi.length !== 0) {
                            $prevLi.after($option);
                        }
                        else {
                            t.d.$options.append($option);
                        }
                    }

                }
            }
            return t;
        };

        p.options = function (options) {
            var t = this;
            if (typeof options !== 'undefined') {
                t.d.options = {};
                t.d.$options.empty();
                t.addOption(options);
                return t;
            }
            return t.d.options;
        };


        p.search = function (text) {
            var t = this;
            var text = text || '';
            var options = Object.keys(t.d.options).sort();

            var optionsToShow = [];
            for (var i in options) {
                if (t.d.options[options[i]] == true) {
                    optionsToShow.push(options[i]);
                }
            }
            var $options = t.d.$options.children();

            for (var i = 0; i < optionsToShow.length; i++) {
                var str = optionsToShow[i];
                var optionIndex = options.indexOf(optionsToShow[i]);
                if (str.toLowerCase().search(text.toLowerCase()) > -1 || text.length <= 0) {
                    $($options[optionIndex]).ashow();
                } else {
                    $($options[optionIndex]).ahide();
                }
            }

            return t;
        };

        p.removeTag = function (tag) {
            var t = this;
            if (typeof t.d.tags === 'undefined') {
                return t;
            }
            if (typeof tag === 'string') {
                for (var i = 0; i < t.d.tags.length; i++) {
                    if (t.d.tags[i].text() === tag) {
                        t.d.tags[i].remove();
                    }
                }
            } else if (typeof tag === 'object') {
                var index = t.d.tags.indexOf(tag);
                if (index !== -1) {
                    tag.remove();
                }
            }
            return t;
        };


        p.onRemoveTag = function (obj) {
            var t = this;
            if (typeof obj === 'function') {
                t.f.onRemoveTag = obj;
            }
            else {
                t.f.onRemoveTag(obj);
                var index = t.d.tags.indexOf(obj);
                if (index !== -1) {
                    t.addOption(obj.text(), true);
                    t.d.tags.splice(index, 1);
                }
            }
            return t;
        };


        p.onNewTagAdded = function (obj) {
            var t = this;
            if (typeof obj === 'function') {
                t.f.onNewTagAdded = obj;
            }
            else {
                t.f.onNewTagAdded(obj);
            }
            return t;
        };

        p.onTagAlreadyAdded = function (obj) {
            var t = this;
            if (typeof obj === 'function') {
                t.f.onTagAlreadyAdded = obj;
            }
            else {
                t.f.onTagAlreadyAdded(obj);
                t.getTag(obj.text()).highlight();
            }
            return t;
        };

        $A.initBasicFunctions(Tagger, "Tagger", []);


    }
);
