const db = require('../database/database');
const security = require('../security/security-utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//creates hash seed
const salt = bcrypt.genSaltSync(5);

module.exports.createUser = function(req, res){

  //backend sanitization in case of front end fail/exploit or programs like postman.
  const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
  const cleanPassword = security.sanitize(req.body.user_password, 'password', 8, 18);

  if(cleanUsername){
    if(cleanPassword){
      //hashes password
      const hashedPassword = bcrypt.hashSync(cleanPassword, salt);

      //this replacement-style query encodes the user input and inserts it into the query at runtime which guards against SQL injection.
      db.query(
        //query for resultset of users with same username as the input username
        "SELECT * FROM users WHERE username=?",
        { replacements: [cleanUsername],
          type: db.QueryTypes.SELECT }
      )
      .then(result => {
        //if result is empty, insert new user
        if(result === undefined || result.length == 0){
          db.query(
            "INSERT INTO users (username, user_password) VALUES (?, ?)",
            { replacements: [cleanUsername, hashedPassword],
              type: db.QueryTypes.SELECT }
          )
          .then(result => {
            res.status(200).send("User was successfully created.");
          }).catch(function(err){
            res.status(500).send("Insertion error: " + err);
          })
        }else{
          res.status(400).send("Username already exists.");
        }
      }).catch(function(err){
        res.status(500).send("Select Error: " + err);
      })
    } else {
      res.status(400).send("Incorrect username or password.");
    }
  } else {
    res.status(400).send("Incorrect username or password.");
  }
}

module.exports.login = function(req, res){
  const cleanUsername = security.sanitize(req.body.username, 'username', 6, 32);
  const cleanPassword = security.sanitize(req.body.user_password, 'password', 8, 18);

  if(cleanUsername){
    if(cleanPassword){
      const submittedPassword = cleanPassword;
      //this replacement-style query encodes the user input and inserts it into the query at runtime which guards against SQL injection.
      db.query(
        //query for resultset of users with same username as the input username
        "SELECT * FROM users WHERE username=?",
        { replacements: [cleanUsername],
          type: db.QueryTypes.SELECT }
      )
      .then(result => {
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
            security.generateJsonToken(payload).then(function(sessionToken){
              res.cookie("SESSIONID", sessionToken, { expires: new Date(Date.now() + 900000)});//, httpOnly:true, secure:true});
              res.status(200).json({data: userData});
            }).catch(function(err){
              console.log("GenerateJsonToken err: " + err);
            });

          } else {
            res.status(400).send("Incorrect username or password.");
          }
        } else {
          res.status(400).send("Incorrect username or password.");
        }

      }).catch(function(err){
        res.status(500).send("Query err: " + err);
      })
    } else {
      res.status(400).send("Incorrect username or password.");
    }
  } else {
    res.status(400).send("Incorrect username or password.");
  }
}

module.exports.verifyToken = function(req, res){
  //send cookie to verification function
  const verified = security.verifyJsonToken(req.cookies['SESSIONID']);

  if(verified){
    res.status(200).send("Success");
  } else {
    res.status(403).send("Invalid Token");
  }
}

module.exports.logout = function(req, res){
  if(req.cookies['SESSIONID']){
    res.cookie("SESSIONID", req.cookies['SESSIONID'], { expires: new Date(Date.now() - 900000)});//, httpOnly:true, secure:true});
    res.status(200).send("Logged out.");
  } else {
    console.log("Wasn't logged in.");
    res.status(500).send("Wasn't logged in.")
  }
}
