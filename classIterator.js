// Make an instance object iterable using a class
// Returns a random array of numbers sorted during iteration

class RandomizedNumbers {
    #length;
    #randomArr;

    constructor(numberOfElements) {
        this.#arrLength = numberOfElements;
        this.buildRandomArray();
    }

    set #arrLength(length) {
        if (!Number.isNaN(length) || length > 0) {
            this.#length = length;
        } else {
            this.#length = 1;
        }
    }

    get arrLength() {
        return this.#length;
    }

    get randomArray() {
        return this.#randomArr;
    }

    buildRandomArray() {
        this.#randomArr = new Array(this.#length).fill(0);
        this.#randomArr.forEach((val, indx, arr) => {
            arr[indx] = Math.floor(Math.random() * 100) + 1
        });
    }

    [Symbol.iterator]() {
        let indx = 0;
        let arr = this.randomArray.sort((a,b) => a - b );

        return {
            next: () => {
                if (indx < this.arrLength) {
                    return { done: false, value: arr[indx++] };
                } else {
                    return { done: true, value: undefined };
                }
            }
        }
    }
}

let obj = new RandomizedNumbers(10);
console.log(obj.randomArray);

for (let o of obj) {
    console.log(o);
}