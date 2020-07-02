const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');

app.use(bodyParser.json()); // parses any json we're sent
app.use(bodyParser.urlencoded({extended: true})); // this allows us to send data via Postman

app.use(cookieParser()); // allows you to parse cookies

// cors middleware
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // http://localhost:8080
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(require('./controllers/user'));

const port = 3000;

// interact with database and front end
db.sync().then(function() { // sync up with the database before continuing
  app.listen(port, function() { // listen for interactions from app on port 3000
    console.log(`Listening on port ${port}.`);
  });
});