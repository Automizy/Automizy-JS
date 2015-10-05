define([
    'automizy/core'
], function () {

    $A.default.numberFormat = {
        decimals:0,
        decPoint:'.',
        thousandsSep:','
    };

    $A.numberFormat = function (number, decimals, decPoint, thousandsSep) {
        if(typeof decimals === 'undefined'){
            var decimals = $A.default.numberFormat.decimals;
        }
        if(typeof decPoint === 'undefined'){
            var decPoint = $A.default.numberFormat.decPoint;
        }
        if(typeof thousandsSep === 'undefined'){
            var thousandsSep = $A.default.numberFormat.thousandsSep;
        }

        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
            dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return Math.round(n * k) / k;
            },
            s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };
    $A.defaultNumberFormat = function (numberFormat) {
        if(typeof numberFormat === 'undefined'){
            return $A.default.numberFormat;
        }
        var numberFormat = numberFormat || {};
        if(typeof numberFormat.decimals !== 'undefined'){
            $A.default.numberFormat.decimals = numberFormat.decimals;
        }
        if(typeof numberFormat.decPoint !== 'undefined'){
            $A.default.numberFormat.decPoint = numberFormat.decPoint;
        }
        if(typeof numberFormat.thousandsSep !== 'undefined'){
            $A.default.numberFormat.thousandsSep = numberFormat.thousandsSep;
        }
        return $A;
    };

});