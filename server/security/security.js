const util = require('util');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const cryptoJs = require('crypto-js');

// makes the jwt.sign function into a promise so I can wait for it to resolve
const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'));

const SESSION_DURATION = 240;

function encrypt(data) {
  return cryptoJs.AES.encrypt(JSON.stringify(data), '1234').toString();
}

function decrypt(data) {
  let result = cryptoJs.AES.decrypt(data, '1234');
  result = result.toString(cryptoJs.enc.Utf8);
  return JSON.parse(result);
}

function generateJsonToken(payload) {
  return new Promise(function(resolve, reject) {
    async function createSessionToken(payload) {
      return signJwt(payload, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: SESSION_DURATION
      });
    }

    resolve(createSessionToken(payload));
  });
}

function verifyJsonToken(token) {
  if (token) {
    return jwt.verify(token, RSA_PUBLIC_KEY, {algorithms: ['RS256']}, function(err, token) {
      if (err) {
        console.log(`Err: ${err}, returning false.`);
        return false;
      } else {
        return true;
      }
    });
  } else {
    // No token with that name was found, thus not verified.
    return false;
  }
}

function sanitize(input, field, minLength, maxLength) {
  // decode since input was encoded before sent to backend
  input = decodeURIComponent(input);

  if (!input) {
    throw new Error('Incorrect username or password.');
  } else {
    if (input.length < minLength || input.length > maxLength) {
      throw new Error(`${field} must be between ${minLength} and ${maxLength} characters.`);
    } else {
      let regex;
      let errorMessage;

      if (field === 'username') {
        regex = /^[\w ]+$/;
        errorMessage = 'Username field should only contain alphanumeric characters, underscores, and spaces.';
      } else if (field === 'password') {
        regex = /^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/;
        errorMessage = 'Password should have a minimum of 8 characters, at least 1 Uppercase Letter, 1 Lowercase Letter, 1 Number, and 1 Special Character.';
      }

      if (!regex.test(input)) {
        throw new Error(errorMessage);
      } else {
        return input;
      }
    }
  }
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  generateJsonToken: generateJsonToken,
  verifyJsonToken: verifyJsonToken,
  sanitize: sanitize
};