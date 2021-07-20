import cryptoJs from 'crypto-js';

function encrypt(data) {
  return cryptoJs.AES.encrypt(JSON.stringify(data), '1234').toString();
}

function decrypt(data) {
  let result = cryptoJs.AES.decrypt(data, '1234');
  result = result.toString(cryptoJs.enc.Utf8);
  return JSON.parse(result);
}

/*
  input: the string to sanitize
  id: the field being sanitized
  minLength: the allowable minimum length of the string
  maxLength: the allowable maximum length of the string
*/
function sanitize(input, field, minLength, maxLength) {
  if (!input) {
    throw new Error('No input');
  } else {
    if (input.length < minLength || input.length > maxLength) {
      throw new Error(`${field} must be between ${minLength} and ${maxLength} characters.`);
    } else {
      return encodeURIComponent(input);
    }
  }
}

/*
  An extension of sanitize for the login screen that checks
  if the username and password meet the requirements.
*/
function sanitizeLogin(input, field, minLength, maxLength) {
  let regex;
  let errorMessage;

  if (field === 'username') {
    regex = RegExp(/^[\w ]+$/);
    errorMessage = 'Username field should only contain alphanumeric characters, underscores, and spaces.';
  } else if (field === 'password') {
    regex = RegExp(/^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/);
    errorMessage = 'Password should have a minimum of 8 characters, at least 1 Uppercase Letter, 1 Lowercase Letter, 1 Number, and 1 Special Character.';
  } else {
    console.log('Field parameter must be username or password');
    throw new Error('Something went wrong');
  }

  if (!regex.test(input)) {
    throw new Error(errorMessage);
  } else {
    return sanitize(input, field, minLength, maxLength);
  }
}

export {
  encrypt,
  decrypt,
  sanitize,
  sanitizeLogin
};