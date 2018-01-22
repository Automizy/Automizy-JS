define([
    "automizy/modules/list/listElement"
], function () {

    var RowListElement = function (obj) {
        var t = this;

        obj = obj || {};

        $A.m.ListElement.apply(t, [obj]);

        t.d.$row = $('<div class="automizy-list-element-row"></div>').appendTo(t.d.$widget);

        t.d.$remove = $('<span class="automizy-list-element-remove fa fa-remove"></span>').appendTo(t.d.$row).click(function(){
            t.remove();
        });
        t.d.$infoBox = $('<div class="automizy-list-element-info-box"></div>').appendTo(t.d.$row);
        t.d.$buttonBox = $('<div class="automizy-list-element-button-box"></div>').appendTo(t.d.$row);

        t.d.$title = $('<div class="automizy-list-element-title"></div>').appendTo(t.d.$infoBox);
        t.d.$content = $('<div class="automizy-list-element-content"></div>').appendTo(t.d.$infoBox);
        t.d.$tags = $('<div class="automizy-list-element-tags"></div>').appendTo(t.d.$infoBox);

        t.d.title = false;
        t.d.tags = [];

        if (typeof obj !== 'undefined') {
            if (typeof obj.removable !== 'undefined') {
                t.removable(obj.removable);
            }
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.content !== 'undefined') {
                t.content(obj.content);
            }
            if (typeof obj.tags !== 'undefined') {
                t.tags(obj.tags);
            }
        }

        t.widget().addClass('automizy-type-row');

    };
    RowListElement.prototype = Object.create($A.m.ListElement.prototype);
    RowListElement.prototype.constructor = RowListElement;

    var p = RowListElement.prototype;

    p.title = function(title){
        var t = this;
        if(typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(t.d.title);
            return t;
        }
        return t.d.title;
    };
    p.content = function(content){
        var t = this;
        if(typeof content !== 'undefined') {
            t.d.content = content;
            t.d.$content.html(t.d.content);
            return t;
        }
        return t.d.content;
    };
    p.tags = function(tags){
        var t = this;
        if(typeof tags !== 'undefined') {
            t.d.tags = [];
            tags.forEach(function(tag){
                t.addTag(tag);
            });
            return t;
        }
        return t.d.tags;
    };
    p.addTag = function(tag){
        var t = this;
        if(typeof tag !== 'undefined') {
            var tagObj = {
                name:tag,
                text:tag
            };
            tagObj.$widget = $('<span class="automizy-list-element-tag"><i class="fa fa-filter"></i>'+tag+'</span>').appendTo(t.d.$tags);
            t.d.tags.push(tagObj);
            return t;
        }
        return t.d.tags;
    };
    p.removeTag = function(tag){
        var t = this;
        if(typeof tag !== 'undefined') {
            t.d.tags.forEach(function(tagObj){
                if(tagObj.name === tag){
                    tagObj.$widget.remove();
                }
            });
        }
        return t;
    };
    p.removable = function(removable){
        var t = this;
        if(typeof removable !== 'undefined') {
            if(removable){
                t.d.$remove.ashow();
            }else{
                t.d.$remove.ahide();
            }
        }
        return t;
    };

    $A.initBasicFunctions(RowListElement, "RowListElement", []);

});