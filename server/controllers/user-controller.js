const db = require('../database/database');
const security = require('../security/security-utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('../utility/utility.js');

//creates hash seed
const salt = bcrypt.genSaltSync(5);

async function createUser(req, res){

  try{

    //backend sanitization in case of front end fail/exploit or programs like postman.
    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.user_password, 'password', 8, 18);

    if(cleanUsername){
      if(cleanPassword){
        //hashes password
        const hashedPassword = bcrypt.hashSync(cleanPassword, salt);

        //this replacement-style query encodes the user input and inserts it into the query at runtime which guards against SQL injection.
        let result = await db.query(
          "SELECT * FROM users WHERE username=?",
          { replacements: [cleanUsername],
            type: db.QueryTypes.SELECT }
        );

        //if result is empty, insert new user
        if(result === undefined || result.length == 0){
          await db.query(
            "INSERT INTO users (username, user_password) VALUES (?, ?)",
            { replacements: [cleanUsername, hashedPassword],
              type: db.QueryTypes.SELECT }
          );
          
          res.status(200).json({message: "User was successfully created."});
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
    util.errorHandler(err, 'createUser', true);
    res.status(500).json({message: typeof err === 'string' ? err : 'Something went wrong.'});
  }
}

async function login(req, res){

  try{

    const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
    const cleanPassword = security.sanitize(req.body.user_password, 'password', 8, 18);

    if(cleanUsername){
      if(cleanPassword){
        const submittedPassword = cleanPassword;

        //this replacement-style query encodes the user input and inserts it into the query at runtime which guards against SQL injection.
        let result = await db.query(
          //query for resultset of users with same username as the input username
          "SELECT * FROM users WHERE username=?",
          { replacements: [cleanUsername],
            type: db.QueryTypes.SELECT }
        );

        //If there's a match
        if (result.length > 0){
          //userData is the first match (which should be the only match since usernames are unique)
          const userData = result[0];

          //compares the hashes of the user password and submitted password
          const isVerified = bcrypt.compareSync(submittedPassword, userData.user_password);

          if (isVerified){
            //generate token payload
            const payload = {
              "id:":userData.id
            }

            //User authenticated... give them a token cookie
            let sessionToken = await security.generateJsonToken(payload);

            res.cookie("SESSIONID", sessionToken, { expires: new Date(Date.now() + 900000)});//, httpOnly:true, secure:true});
            res.status(200).json({message: 'You have successfully logged in.', result: {username: userData.username}});

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
    util.errorHandler(err, 'login', true);
    res.status(500).json({message: typeof err === 'string' ? err : 'Something went wrong.'});
  }
}

function verifyToken(req, res){
  //send cookie to verification function
  const verified = security.verifyJsonToken(req.cookies['SESSIONID']);

  if(verified){
    console.log("Token verified");
    res.status(200);
  } else {
    console.log("Token not verified");
    res.status(403);
  }
}

function logout(req, res){
  if(req.cookies['SESSIONID']){
    console.log("Logged out");
    res.cookie("SESSIONID", req.cookies['SESSIONID'], { expires: new Date(Date.now() - 900000)});//, httpOnly:true, secure:true});
    res.status(200);
  } else {
    console.log("Wasn't logged out.");
    res.status(400);
  }
}

module.exports = {
  createUser: createUser,
  login: login,
  verifyToken: verifyToken,
  logout: logout
};