const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const { getMatrixPage, addMatrixPage, addMatrix } = require('./routes/matrix');
const { getHomePage } = require('./routes/index');
const { getPprPage, addPprPage, addPpr } = require('./routes/ppr');
const { getReviwerPage, addReviwerPage, addReviwer, editReviewerPage } = require('./routes/reviewer');
const { deleteDeveloper, addDeveloperPage, addDeveloper, editDeveloperPage, editDeveloper } = require('./routes/developer');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'ppr'
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.get('/', getHomePage);
app.get('/delete/:id', deleteDeveloper);
app.get('/add', addDeveloperPage);
app.post('/add', addDeveloper);
app.get('/edit/:id', editDeveloperPage);
app.post('/edit/:id', editDeveloper);

app.get('/ppr', getPprPage);
app.get('/ppr/add', addPprPage);
app.post('/ppr/add', addPpr);

app.get('/matrix', getMatrixPage);
app.get('/matrix/add', addMatrixPage);
app.post('/matrix/add', addMatrix);

app.get('/reviewers', getReviwerPage);
app.get('/reviewer/add', addReviwerPage);
app.post('/reviewer/add', addReviwer);
app.get('/reviewer/edit/:id', editReviewerPage);
// app.get('/reviewer/delete/:id', editReviewerPage);



// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});