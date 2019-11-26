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

  //decode since input was encoded before sent to backend
  input = decodeURIComponent(input);

  if(input === ""){

    console.log(name + " field empty");
    return false;
  } else{

    if(input.length < minLength || input.length > maxLength){

      console.log(name + " field must be between " + minLength + " and " + maxLength + " characters.");
      return false;
    } else {

      let regex;
      let errorMessage;

      if(name === 'username'){
        regex = /^[\w ]+$/;
        errorMessage = 'Username field should only contain alphanumeric characters, underscores, and spaces.';
      } else if (name === 'password'){
        regex = /^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/;
        errorMessage = 'Password should have a minimum of 8 characters, at least 1 Uppercase Letter, 1 Lowercase Letter, 1 Number, and 1 Special Character.';
      }

      if(!regex.test(input)){
        console.log(errorMessage);
        return false;
      } else {
        return input;
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