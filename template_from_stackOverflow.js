class SomeClass {
    constructor() {
        this._data = [1, 2, 3, 4];
    }

    [Symbol.iterator]() {
        var index = -1;
        var data = this._data;

        return {
            next: () => { return { value: data[++index], done: !(index in data) } }
        };
    };
}


var obj = new SomeClass();
for (var i of obj) { console.log(i) }