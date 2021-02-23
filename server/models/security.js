const security = require('../security/security');

function verifyToken(req, res) {
  const verified = security.verifyJsonToken(req.cookies['SESSIONID']);

  if (verified) {
    console.log('Token verified');
    return res.status(200).json(security.encrypt({success: true, result: true}));
  } else {
    console.log('Token not verified');
    return res.status(200).json(security.encrypt({success: true, result: false}));
  }
}

module.exports = {
  verifyToken: verifyToken
};