const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var m = "Heya!";
var hash = SHA256(m).toString();
console.log(m);
console.log(hash);
var data={
  id: 4
};

var token = jwt.sign(data, "123abc");

jwt.verify

var token = {
  data, hash: SHA256(JSON.stringify(data) + 'Hasoyam!').toString();
}
