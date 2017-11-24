class HexaBinaryConverter {

    constructor() {
        this.hexTable = {
            0: '0000',
            1: '0001',
            2: '0010',
            3: '0011',
            4: '0100',
            5: '0101',
            6: '0110',
            7: '0111',
            8: '1000',
            9: '1001',
            A: '1010',
            B: '1011',
            C: '1100',
            D: '1101',
            E: '1110',
            F: '1111',
        };
    }

    // Esto se podria resolver simplemente con un parseInt, entendi que no tenia que usarlo
    // sino implementarlo yo mismo. El doble foreach se podia reducir a uno si creamos una tabla de Binary a Hex
    binaryToHex(binaryNumber) {
        let hexaNumber = '';
        binaryNumber = binaryNumber.match(/.{1,4}/g);

        binaryNumber.forEach((binary) => {
            Object.keys(this.hexTable).forEach((hexa) => {
                if (this.hexTable[hexa] == binary) {
                    hexaNumber += hexa;
                }
            });
        });

        return hexaNumber;
    }

    hexToBinary(hexNumber) {
        let binaryNumber = '';

        var arrayNumber = hexNumber.toUpperCase().split('');

        arrayNumber.forEach((element) => {
            if (this.hexTable.hasOwnProperty(element)) {
                binaryNumber += this.hexTable[element];
            }
        });

        return binaryNumber;
    }
}

module.exports = HexaBinaryConverter;