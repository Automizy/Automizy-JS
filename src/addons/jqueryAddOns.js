define([], function () {
    $.fn.removeAttributes = function () {
        return this.each(function () {
            var attributes = $.map(this.attributes, function (item) {
                return item.name;
            });
            var img = $(this);
            $.each(attributes, function (i, item) {
                img.removeAttr(item);
            });
        });
    };
    $.fn.getAttributes = function () {
        var obj = {};
        $.each(this[0].attributes, function () {
            if (this.specified) {
                obj[this.name] = this.value;
            }
        });
        return obj;
    };
    $.fn.removeClassPrefix = function (prefix) {
        this.each(function (i, el) {
            var classes = el.className.split(" ").filter(function (c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });
            el.className = $.trim(classes.join(" "));
        });
        return this;
    };
    $.fn.ashow = function () {
        this.removeClass('automizy-hide');
        return this;
    };
    $.fn.ahide = function () {
        this.addClass('automizy-hide');
        return this;
    };
    $.fn.serializeObject = function(addUnchecked){
        var result = {};
        var addUnchecked = addUnchecked || false;
        var extend = function (i, e) {
            var n = result[e.name];
            if (typeof n !== 'undefined' && n !== null) {
                if ($.isArray(n)) {
                    n.push(e.value);
                } else {
                    result[e.name] = [n, e.value];
                }
            } else {
                result[e.name] = e.value;
            }
        };

        values = this.serializeArray();
        if(addUnchecked){
            values = values.concat(
                this.find('input[type=checkbox]:not(:checked)').map(
                    function() {
                        return {name:this.name, value:"off"}
                    }).get()
            );
        }

        $.each(values, extend);
        return result;
    };
    var restrict = function(t){
        var v = false;
        var min = Number.NEGATIVE_INFINITY;
        var max = Number.POSITIVE_INFINITY;
        if(typeof t.value !== 'undefined'){
            v = parseFloat(t.value);
        }else{
            return false;
        }
        if(typeof t.min !== 'undefined' && t.min.toString().length > 0){
            min = parseFloat(t.min);
        }
        if(typeof t.max !== 'undefined' && t.max.toString().length > 0){
            max = parseFloat(t.max);
        }
        if (v >= min && v <= max){
            t.value = v;
        }else{
            t.value = v < min ? min : max;
        }
    };
    var restricted = false;
    $.fn.pbmInput = function () {
        return this.each(function(){
            if (this.type && 'number' === this.type.toLowerCase()) {
                $(this).on('change', function(){
                    if(!restricted){
                        restricted = true;
                        restrict(this);
                        $(this).trigger('change');
                        return false;
                    }else{
                        setTimeout(function(){restricted = false}, 10);
                    }
                }).bind('mousewheel DOMMouseScroll', function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    var t = this,
                        v = parseFloat(t.value);
                    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                        t.value = v + 1;
                    }else{
                        t.value = v - 1;
                    }
                    $(this).trigger('change');
                    return false;
                });
            }
        });
    };
});