define([], function () {
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }
    if (!Date.timestamp) {
        Date.timestamp = function () {
            return Math.floor(Date.now() / 1000);
        };
    }
});