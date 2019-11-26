const cryptoJs = require('crypto-js');
const pako     = require('pako');

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

export {
  encrypt,
  decrypt
};
