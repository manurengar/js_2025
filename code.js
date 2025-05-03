class Calculations {
  #seed = 0;
  #arrLength = 1;

  constructor(arrLength, seed) {
    this.#setSeed(seed);
    this.#setArrLenght(arrLength);
  }

  #setSeed(seed) {
    if (!Number.isNaN(seed) || Number.isInteger(seed)) {
      this.#seed = seed;
    } else {
      this.#seed = Math.floor(Math.random() * 100);
    }
  }

  getSeed() {
    return this.#seed;
  }

  #setArrLenght(length) {
    if (!Number.isNaN(length) || Number.isInteger(length) || !Boolean(length)) {
      if (length > 100 || length < 0) {
        this.#arrLength = 50;
      } else {
        this.#arrLength = length;
      }
    }
  }

  getArrLength() {
    return this.#arrLength;
  }

  delayedCalculation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let templateArr = new Array(this.getArrLength()).fill(0);
        templateArr.forEach((val, indx, arr) => arr[indx] = Math.floor(Math.random() * this.getSeed()) + 1);
        // Cases of rejection
        if (templateArr.every((val) => val === 0) || templateArr.length === 0) {
          reject(new Error('Array contains only 0 or is bad instantiated'));
        }
        let randomSummatory = templateArr.reduce((preVal, curVal, indx, arr) => preVal + curVal);
        if (randomSummatory === 0 || Number.isNaN(randomSummatory)) {
          reject(new Error('Summatory went wrong: Number is NaN or 0'));
        }

        resolve(randomSummatory);
      }, 5000)
    });
  }
}


class RandomCalculation extends Calculations {
  constructor(arrLength, seed) {
    super(arrLength, seed);
  }
  // Extend with one extra lasting method
  async #calculateNewRandomArr() {
    let randomNumber = 0;
    try {
      randomNumber = await this.delayedCalculation();
    } catch (error) {
      console.log(error);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(randomNumber ** 2);
      }, 2000)
    });
  }

  async getRandomCalculation() {
    let randomCalculation = await this.#calculateNewRandomArr();
    return new Promise((resolve, reject) => {
      resolve(randomCalculation);
    });
  }
}


//////////// CODE GOES HERE
let randomizer = new RandomCalculation(10, 23);
let printValue = 0;
console.log('Class instantiated');
randomizer.getRandomCalculation().then((value) => {
  printValue = value;
  console.log(printValue)
});
console.log('Method called');