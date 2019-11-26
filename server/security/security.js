const util     = require('util');
const jwt      = require('jsonwebtoken');
const fs       = require('fs');
const path     = require('path');
const cryptoJs = require('crypto-js');
const pako     = require('pako');

//makes the jwt.sign function into a promise so I can wait for it to resolve
const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'));

const SESSION_DURATION = 240;

function generateJsonToken(payload){
  return new Promise(function(resolve, reject){

    async function createSessionToken(payload) {
      return signJwt(payload, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: SESSION_DURATION
      });
    }
    
    resolve(createSessionToken(payload));
  });
}

function verifyJsonToken(token){

  if(token){

    return jwt.verify(token, RSA_PUBLIC_KEY, {algorithms: ['RS256']}, function(err, token){

      if(err){
        console.log("Err: " + err + ", returning false.");
        return false;
      } else {
        return true;
      }
    });
  } else {
    //No token with that name was found, thus not verified.
    return false;
  }

}

function sanitize(input, name, minLength, maxLength){

  if(input === ""){

    console.log(name + " field empty");
    return false;
  } else{

    if(input.length < minLength || input.length > maxLength){

      console.log(name + " field must be between " + minLength + " and " + maxLength + " characters.");
      return false;
    } else {

      const regex = /^[\w ]+$/;

      //if the input doesn't match the regular expression, alert the user.
      if(!regex.test(input)){

        console.log(name + " field should only contain alphanumeric characters, underscores, and spaces.");
        return false;
      } else {

        //returns input with special characters encoded in the off chance someone gets through the previous checks.
        return encodeURIComponent(input);
      }
    }
  }
}

function encrypt(data) {
  let result = pako.deflate(JSON.stringify(data), { to: 'string' });
  result = (cryptoJs.AES.encrypt(result, '8184')).toString();
  return (result);
}

function decrypt(data) {
  let result = (cryptoJs.AES.decrypt(data, '8184').toString(cryptoJs.enc.Utf8));
  result = JSON.parse(pako.inflate(result, { to: 'string' }));
  return (result);
}

module.exports = {
  generateJsonToken: generateJsonToken,
  verifyJsonToken: verifyJsonToken,
  sanitize: sanitize,
  encrypt: encrypt,
  decrypt: decrypt
};