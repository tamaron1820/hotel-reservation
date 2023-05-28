const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');
const app = express();
const CORRECT_RESPONSE = 200;
const ERROR_RESPONSE = 400;
const PORT_NUM = 8080;

// parse application/json
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

// create a new database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

app.post('/login', async (req, res) => {
  try {
    await getDBConnection();
    let user = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [user.username, user.password], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      if (row) {
        res.status(200).send();
      } else {
        res.status(401).send("Invalid username or password");
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// POST /register to register a new user
app.post('/register', async (req, res) => {
  try {
    await getDBConnection();
    let user = req.body;
    db.run('INSERT INTO users(username, password) VALUES(?, ?)', [user.username, user.password], function(err) {
      if (err) {
        res.status(400).send({ error: err.message });
        return;
      }
      // Return the new user's ID to the client
      res.status(201).send({ id: this.lastID });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to register user" });
  }
});


/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {sqlite3.Database} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'login.db',
    driver: sqlite3.Database
  });
  return db;
}

app.use(express.static("public"));
const PORT = process.env.PORT || PORT_NUM;
app.listen(PORT);
