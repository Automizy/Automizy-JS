define(['automizy/core'], function () {
    $A.parseBoolean = function (value, nullOnFailure) {
        if (typeof value === 'string')
            value = value.toLowerCase();
        switch (value) {
            case true:
            case 'true':
            case 1:
            case '1':
            case 'on':
            case 'yes':
            case 'y':
            case '✓':
            case '✔':
            case '☑':
            case '☒':
                value = true;
                break;
            case false:
            case 'false':
            case 0:
            case '0':
            case 'off':
            case 'no':
            case 'n':
            case 'x':
            case '✗':
            case '✘':
            case '☐':
                value = false;
                break;
            default:
                if (nullOnFailure) {
                    value = null;
                } else {
                    value = false;
                }
                break;
        }
        return value;
    };
});