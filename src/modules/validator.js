define([
    'automizy/core',
    'automizy/functions/getUniqueString'
], function () {
    var Validator = function (obj) {
        var t = this;
        t.d = {
            email: false,
            domain: false,
            url: false,
            domainOrUrl: false,
            int: false,
            number: false,
            minLength: false,
            maxLength: false,
            min: false,
            max: false,
            file: false,
            sameas: false,
            isValid: true,
            notEmpty:false,
            validValues: [],
            errors: [],
            options: {},
            id: 'automizy-validator-' + $A.getUniqueString(),
            regular: {
                email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                domain: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
                url: /^(((https?|ftp):\/\/)|(www\.))(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
            },
            input: false,
            value: ''
        };

        /*
         if (typeof obj !== "undefined") {
         if (typeof obj === "function" && obj instanceof Input) {
         t.d.input = obj;
         } else if (typeof obj === 'object') {
         if (typeof obj.input !== 'undefined') {
         if (obj.input instanceof Input) {
         t.d.input = obj.input;
         } else if (typeof obj.input === 'string') {
         t.d.input = $A.getInput(obj.input) || false;
         }
         }
         }
         if (t.d.input instanceof Input)
         t.d.value = t.d.input.val();
         }
         */

        if (typeof obj === 'object') {
            t.set(obj);
        }
    };

    var p = Validator.prototype;
    p.set = function (obj) {
        var t = this;
        if (typeof obj === 'string'){
            var os = obj;
            obj = {};
            obj[os] = true;
        }
        if (typeof obj.value !== 'undefined')
            t.d.value = obj.value;
        if (typeof obj.email !== 'undefined')
            t.d.options.email = $A.parseBoolean(obj.email);
        if (typeof obj.domain !== 'undefined')
            t.d.options.domain = $A.parseBoolean(obj.domain);
        if (typeof obj.url !== 'undefined')
            t.d.options.url = $A.parseBoolean(obj.url);
        if (typeof obj.domainOrUrl !== 'undefined')
            t.d.options.domainOrUrl = $A.parseBoolean(obj.domainOrUrl);
        if (typeof obj.int !== 'undefined')
            t.d.options.int = $A.parseBoolean(obj.int);
        if (typeof obj.number !== 'undefined')
            t.d.options.number = $A.parseBoolean(obj.number);
        if (typeof obj.minLength !== 'undefined')
            t.d.options.minLength = parseInt(obj.minLength);
        if (typeof obj.maxLength !== 'undefined')
            t.d.options.maxLength = parseInt(obj.maxLength);
        if (typeof obj.min !== 'undefined')
            t.d.options.min = parseInt(obj.min);
        if (typeof obj.max !== 'undefined')
            t.d.options.max = parseInt(obj.max);
        if (typeof obj.file !== 'undefined')
            t.d.options.file = $A.parseBoolean(obj.file);
        if (typeof obj.sameas !== 'undefined')
            t.d.options.sameas = obj.sameas;
        if (typeof obj.notEmpty !== 'undefined')
            t.d.options.notEmpty = obj.notEmpty;
        if (typeof obj.invalidValue !== 'undefined')
            t.d.options.invalidValue = obj.invalidValue;
        return t;
    };
    p.run = function (obj) {
        var t = this;
        if ((typeof obj === 'object' || typeof obj === 'array') && !$.isArray(obj)) {
            t.set(obj);
        }
        if (typeof obj === 'string' || typeof obj === 'number' || $.isArray(obj)) {
            t.value(obj);
        }
        t.d.errors = [];
        t.d.isValid = true;
        for (var i in t.d.options) {
            var a = t.d.options[i];
            if (i === 'email' && a === true)
                t.email(t.d.value);
            if (i === 'domain' && a === true)
                t.domain(t.d.value);
            if (i === 'url' && a === true)
                t.url(t.d.value);
            if (i === 'domainOrUrl' && a === true)
                t.domainOrUrl(t.d.value);
            if (i === 'int' && a === true)
                t.int(t.d.value);
            if (i === 'num' && a === true)
                t.num(t.d.value);
            if (i === 'minLength' && !isNaN(a))
                t.minLength(t.d.value, a);
            if (i === 'maxLength' && !isNaN(a))
                t.maxLength(t.d.value, a);
            if (i === 'min' && !isNaN(a))
                t.min(t.d.value, a);
            if (i === 'max' && !isNaN(a))
                t.max(t.d.value, a);
            if (i === 'file' && a === true)
                t.file(t.d.value);
            if (i === 'sameas' && typeof a !== 'undefined')
                t.sameas(t.d.value, a);
            if (i === 'notEmpty' && a === true)
                t.notEmpty(t.d.value);
            if (i === 'invalidValue')
                t.invalidValue(t.d.value, a);
        }
        return t;
    };
    p.execute = function (obj) {
        var t = this;
        if(typeof obj === 'undefined')var obj = false;
        if(obj === null)obj = [];
        t.run(obj);
        return t.d.isValid;
    };

    p.errors = function () {
        return this.d.errors;
    };

    p.value = p.val = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            t.d.value = value;
            return t;
        }
        return t.d.value;
    };

    p.email = function (value) {
        this.d.email = true;
        var a = this.d.regular.email.test(value);
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Invalid email address");
        }
        return a;
    };
    p.domain = function (value) {
        this.d.domain = true;
        var a = this.d.regular.domain.test(value);
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Invalid domain");
        }
        return a;
    };
    p.url = function (value) {
        this.d.url = true;
        var a = this.d.regular.url.test(value);
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Invalid URL");
        }
        return a;
    };
    p.domainOrUrl = function (value) {
        this.d.domainOrUrl = true;
        var a = this.d.regular.domain.test(value) || this.d.regular.url.test(value);
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Invalid domain or URL");
        }
        return a;
    };
    p.int = p.integer = function (value) {
        this.d.int = true;
        var a = (value == +value && value == (value | 0));
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Not an integer");
        }
        return a;
    };
    p.num = p.number = function (value) {
        this.d.number = true;
        var a = !isNaN(value);
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Not a number");
        }
        return a;
    };
    p.minLength = p.minLen = function (value, len) {
        len = parseInt(len);
        this.d.minLength = len;
        var a = value.length >= len;
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Too short");
        }
        return a;
    };
    p.notEmpty = function (value) {
        this.d.notEmpty = true;
        var a = value != '';
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("No empty");
        }
        return a;
    };
    p.maxLength = function (value, len) {
        len = parseInt(len);
        this.d.maxLength = len;
        var a = value.length <= len;
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Too long");
        }
        return a;
    };
    p.min = function (value, number) {
        number = parseInt(number);
        this.d.min = number;
        var a = value >= number;
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Too little");
        }
        return a;
    };
    p.max = function (value, number) {
        number = parseInt(number);
        this.d.max = number;
        var a = value <= number;
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Too many");
        }
        return a;
    };
    p.file = function () {
    };
    p.sameas = function (value, otherValue) {
        if(typeof otherValue.val === 'function'){
            otherValue = otherValue.val();
        }
        var a = value === otherValue;
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("The values are not equals");
        }
        return a;
    };
    p.invalidValue = function (value, invalidValue) {
        this.d.invalidValue = invalidValue;
        var a = value != invalidValue;
        if (a === false) {
            this.d.isValid = false;
            this.d.errors.push("Invalid value");
        }
        return a;
    };

    p.errors = function () {
        return this.d.errors;
    };


    p.id = function (id) {
        if (typeof id === 'number' || typeof id === 'string') {
            $A.d.validator.renameProperty(this.d.id, id);
            this.d.id = id;
            return this;
        }
        return this.d.id;
    };
    p.data = function (data, value) {
        if (typeof this.d.data === 'undefined')
            this.d.data = {};
        if (typeof data !== 'string') {
            return this.d.data;
        }
        if (typeof value === 'undefined') {
            return this.d.data[data];
        }
        this.d.data[data] = value;
        return this;
    };

    $A.m.Validator = Validator;
    $A.d.validator = new $A.m.Validator();
    $A.validate = function(){
        return $A.d.validator;
    };
    $A.newValidator = $A.createValidator = function (obj) {
        var t = new Validator(obj);
        $A.d.validators[t.d.id] = t;
        return t;
    };
    $A.getValidator = function (id) {
        return $A.d.validatorss[id];
    };
    $A.getAllValidator = function () {
        return $A.d.validators;
    };
    $A.removeValidator = $A.deleteValidator = function (id) {
        return $A.getValidator[id].remove();
    };
    $A.removeAllValidator = $A.deleteAllValidator = function (id) {
        for (i in $A.getAllValidator())
            $A.getAllValidator()[i].remove();
    };
});
