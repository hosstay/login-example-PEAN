const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const Database = require('./database/database');

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
app.use(require('./controllers/security'));

const port = 3000;

db = new Database();
db.init().then(() => {
  app.listen(port, () => console.log('listening on port ' + port));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});