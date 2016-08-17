define([], function () {
    if(typeof Object.prototype.renameProperty === 'undefined') {
        Object.defineProperty(Object.prototype, "renameProperty", {
            value: function (oldName, newName) {
                if (this.hasOwnProperty(oldName)) {
                    this[newName] = this[oldName];
                    delete this[oldName];
                }
                return this;
            },
            enumerable: false
        });
    }
    if(typeof Array.prototype.remove === 'undefined') {
        Object.defineProperty(Array.prototype, "remove", {
            value: function (item) {
                var removeCounter = 0;

                for (var index = 0; index < this.length; index++) {
                    if (this[index] === item) {
                        this.splice(index, 1);
                        removeCounter++;
                        index--;
                    }
                }
                return removeCounter;
            },
            enumerable: false
        });
    }
});
