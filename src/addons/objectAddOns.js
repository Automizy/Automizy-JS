define([], function () {
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
});
