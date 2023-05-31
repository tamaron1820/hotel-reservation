const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');
const cors = require('cors');
const app = express();
const CORRECT_RESPONSE = 200;
const ERROR_RESPONSE = 400;
const PORT_NUM = 8080;

app.use(cors());

// parse application/json
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

app.post('/login', async (req, res) => {
  try {
    const db = await getDBConnection();
    let user = req.body;

    const existingUser = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [user.username, user.password]);
    if (!existingUser) {
      res.status(ERROR_RESPONSE).send("Invalid username or password");
      return;
    }

    res.status(CORRECT_RESPONSE).send();
    console.log("login success");
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Login failed");
  }
});


app.post('/register', async (req, res) => {
  try {
    const db = await getDBConnection();
    let user = req.body;

    // ユーザー名の一意性を確認する
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [user.username]);
    if (existingUser) {
      res.status(ERROR_RESPONSE).send("Username already exists");
      return;
    }

    // 新しいユーザーを登録する
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, user.password], function(err) {
      if (err) {
        console.error(err.message);
        res.status(ERROR_RESPONSE).send("Registration failed");
      } else {
        res.status(CORRECT_RESPONSE).send();
      }
      console.log("register success");
    });
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Registration failed");
  }
});

app.post('/book-room', async (req, res) => {
  try {
    const db = await getDBConnection();
    let roomType = req.body.roomtype;

    const room = await db.get('SELECT * FROM roomtypes WHERE roomtype = ?', [roomType]);
    if (!room) {
      res.status(ERROR_RESPONSE).send("Room type not found");
      return;
    }

    if (room.number <= 0) {
      res.status(ERROR_RESPONSE).send("No room available");
      return;
    }

    await db.run('UPDATE roomtypes SET number = number - 1 WHERE roomtype = ?', [roomType]);
    res.status(CORRECT_RESPONSE).json({message: "Room booked successfully"});
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Failed to book room");
  }
});





/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {sqlite3.Database} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'roomtype.db',
    driver: sqlite3.Database
  });
  return db;
}

async function checkDBConnection() {
  const db = await getDBConnection();
  console.log('DB connection successful');
}

// テーブルの存在を確認
async function checkTableExists() {
  const db = await getDBConnection();
  const rows = await db.all('SELECT * FROM roomtypes ');
  console.log(rows); // テーブルの一覧が表示されます
}

(async function() {
  await checkDBConnection();
  await checkTableExists();
})();

app.use(express.static("public"));
const PORT = process.env.PORT || PORT_NUM;
const server = app.listen(PORT, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});


