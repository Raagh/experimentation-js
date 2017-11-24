const HexBinaryConverter = require('./lib/hexa-binary-converter');


let converter = new HexBinaryConverter();

let binaryNumber = converter.hexToBinary('53FA32');
let hexaNumber = converter.binaryToHex('010100111111101000110010');


console.log(binaryNumber);
console.log(hexaNumber);

