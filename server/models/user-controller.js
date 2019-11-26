const db = require('../database/database');
const security = require('../security/security');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('../utility/utility.js');

//creates hash seed
const salt = bcrypt.genSaltSync(5);

async function createUser(req, res){

  try{

    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.password, 'password', 8, 18);

    if(cleanUsername){
      if(cleanPassword){
        const hashedPassword = bcrypt.hashSync(cleanPassword, salt);

        const result = await db.query(
          "SELECT * FROM users WHERE username=?",
          { replacements: [cleanUsername],
            type: db.QueryTypes.SELECT }
        );

        if(result === undefined || result.length == 0){
          await db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            { replacements: [cleanUsername, hashedPassword],
              type: db.QueryTypes.SELECT }
          );
          
          return res.status(200).json(security.encrypt({success: true, result: true}));
        }else{
          throw "Username already exists.";
        }
      } else {
        throw "Incorrect username or password.";
      }
    } else {
      throw "Incorrect username or password.";
    }
  }catch(err){
    return res.status(200).json(security.encrypt({success: false, result: {msg: `User not created.`, result: util.errorHandler({err: err, context: 'createUser', isLast: true})}}));
  }
}

async function login(req, res){

  try{

    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.password, 'password', 8, 18);

    if(cleanUsername){
      if(cleanPassword){
        const submittedPassword = cleanPassword;

        const result = await db.query(
          "SELECT * FROM users WHERE username=?",
          { replacements: [cleanUsername],
            type: db.QueryTypes.SELECT }
        );

        if (result.length > 0){

          const userData = result[0];

          const isVerified = bcrypt.compareSync(submittedPassword, userData.password);

          if (isVerified){

            const payload = {
              "id:":userData.id
            }

            //User authenticated... give them a token cookie
            const sessionToken = await security.generateJsonToken(payload);

            res.cookie("SESSIONID", sessionToken, { expires: new Date(Date.now() + 900000)});//, httpOnly:true, secure:true});
            return res.status(200).json(security.encrypt({success: true, result: {msg: 'You have successfully logged in.', result: {username: userData.username}}}));
          } else {
            throw "Incorrect username or password.";
          }
        } else {
          throw "Incorrect username or password.";
        }
      } else {
        throw "Incorrect username or password.";
      }
    } else {
      throw "Incorrect username or password.";
    }
  }catch(err){
    return res.status(200).json(security.encrypt({success: false, result: {msg: 'Could not be logged in.', result: util.errorHandler({err: err, context: 'login', isLast: true})}}));
  }
}

function verifyToken(req, res){
  console.log("here");

  console.log(`req.cookies['SESSIONID']`);
  console.log(req.cookies['SESSIONID']);
  const verified = security.verifyJsonToken(req.cookies['SESSIONID']);

  if(verified){
    console.log('Token verified');
    return res.status(200).json(security.encrypt({success: true, result: true}));
  } else {
    console.log('Token not verified');
    return res.status(200).json(security.encrypt({success: true, result: false}));
  }
}

function logout(req, res){

  if(req.cookies['SESSIONID']){

    console.log('Logged out');
    res.cookie('SESSIONID', req.cookies['SESSIONID'], { expires: new Date(Date.now() - 900000)});//, httpOnly:true, secure:true});
    return res.status(200).json(security.encrypt({success: true, result: true}));
  } else {

    console.log(`User wasn't logged in so can't log out.`);
    return res.status(200).json(security.encrypt({success: false, result: {msg: `Not logged in. Can't Log out.`, result: false}}));
  }
}

module.exports = {
  createUser: createUser,
  login: login,
  verifyToken: verifyToken,
  logout: logout
};