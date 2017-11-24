class FazzBizzBarr {

    constructor() {

    }

    outputFazzBizzBar(numbers) {
        let outPut = '';
        numbers = ("" + numbers).split("");
        numbers.forEach((digit) => {
            if ((digit % 3) == 0) {
                outPut += 'Fazz';
            }
            else if ((digit % 5) == 0) {
                outPut += 'Bizz';
            }
            else if ((digit % 7) == 0) {
                outPut += 'Barr';
            }
            else {
                outPut += digit;
            }
        });

        return outPut;
    }

}

module.exports = FazzBizzBarr;