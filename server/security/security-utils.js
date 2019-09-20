const util = require('util');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//makes the jwt.sign function into a promise so I can wait for it to resolve
const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'));

const SESSION_DURATION = 240;

function generateJsonToken(payload){
  //make it a promise so i can wait for it to resolve
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
      // "/" define the area of the regex.
      // ^ says there can be no text before this symbol
      // $ says there can be no text after this symbol
      // thus the input must conform to exactly what is contained in this pattern
      // []+ means what is in the brackets can be repeated one or more times.
      // \w means any alphanumeric character and underscores.
      // there is a space after \w, thus allowing spaces.
      // thus this expression matches only alphanumeric characters and spaces
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

module.exports = {
  generateJsonToken: generateJsonToken,
  verifyJsonToken: verifyJsonToken,
  sanitize: sanitize
};