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

            tags: []
        };
        t.f = {};
        t.init();

        if (typeof obj !== 'undefined') {

            if (typeof obj.tags !== 'undefined') {
                t.tags(obj.tags);
            }
            if (typeof obj.onRemoveTag === 'function') {
                t.onRemoveTag(obj.onRemoveTag);
            }

            t.initParameter(obj);
        }

    };

    var p = Tagger.prototype;

    p.addTag = p.addTag || function (obj) {
            var t = this;
            if (typeof t.d.tags === 'undefined') {
                return t;
            }
            if (typeof obj !== 'undefined') {
                if (obj instanceof $A.m.Tag) {
                    obj.tagger(t);
                    obj.drawTo(t.d.$widget);
                } else {
                    if (typeof obj === 'string') {
                        obj = {text: obj};
                    }
                    obj.tagger = t;
                    var tag = $A.newTag(obj);
                    t.d.tags.push(tag);
                    tag.drawTo(t.d.$widget);
                }
                return t;
            }
            var tag = $A.newTag();
            t.d.tags.push(tag);
            tag.drawTo(t.d.$widget);
            return tag;
        };

    p.removeTag = p.removeTag || function (tag) {
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
                tag.remove();
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
        }
        return t;
    };


    p.tags = p.tags || function (tags) {
            var t = this;
            if (typeof t.d.tags === 'undefined') {
                t.d.tags = [];
            }
            if (typeof tags !== 'undefined') {
                for (var i = 0; i < t.d.tags.length; i++) {
                    t.d.tags[i].remove();
                }
                for (var i in tags) {
                    t.addTag(tags[i]);
                }
                return t;
            }
            return t.d.tags;
        };


    $A.initBasicFunctions(Tagger, "Tagger", []);


});
