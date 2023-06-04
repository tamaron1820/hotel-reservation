/*
 * Name: Tatsuhiko Araki
 * Date: May 23, 2023
 * Section: CSE 154 AA
 *
 * This is the JS file that implements the yipper application of server side JS
 * This program displays all of end points of this yipper page.
 */
"use strict";
const express = require('express');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');
const cors = require('cors');
const app = express();
const CORRECT_RESPONSE = 200;
const ERROR_RESPONSE = 400;
const PORT_NUM = 8080;
const RANDOM_CONFIRMATION = 10;

app.use(cors());

// parse application/json
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * Handles the login request.
 * Validates the user credentials against the database.
 * Returns a response with the appropriate status code and message.
 */
app.post('/login', async (req, res) => {
  try {
    const db = await getDBConnection();
    let user = req.body;

    const existingUser = await db.get('SELECT * FROM users WHERE username = ? AND password = ?',
     [user.username, user.password]);
    if (!existingUser) {
      res.status(ERROR_RESPONSE).send("Invalid username or password");
      return;
    }

    res.status(CORRECT_RESPONSE).send();
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Login failed");
  }
});

/**
 * Handles the registration request.
 * Checks if the username already exists in the database.
 * Inserts a new user record if the username is unique.
 * Returns a response with the appropriate status code and message.
 */
app.post('/register', async (req, res) => {
  try {
    const db = await getDBConnection();
    let user = req.body;
    const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [user.username]);
    if (existingUser) {
      res.status(ERROR_RESPONSE).send("Username already exists");
      return;
    }
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, user.password], function(err) {
      if (err) {
        console.error(err.message);
        res.status(ERROR_RESPONSE).send("Registration failed");
      } else {
        res.status(CORRECT_RESPONSE).send();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Registration failed");
  }
});

/**
 * Handles the room booking request.
 * Checks if the requested room type is available.
 * Inserts a new booking record if a room is available.
 * Returns a response with the appropriate status code and message.
 */
app.post('/book-room', async (req, res) => {
  try {
    const db = await getDBConnection();
    let roomType = req.body.roomtype;
    let username = req.body.username;

    const room = await db.get('SELECT * FROM roomtypes WHERE roomtype = ?', [roomType]);
    if (room.number <= 0) {
      res.status(ERROR_RESPONSE).send("No room available");
      return;
    }
    let confirmationNumber = generateConfirmationNumber();
    await db.run('INSERT INTO bookings (username, roomtype, date, confirmation_number) VALUES (?, ?, CURRENT_DATE, ?)',
      [username, roomType, confirmationNumber]);
    res.status(CORRECT_RESPONSE).json({message: "Room booked successfully"});
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Failed to book room");
  }
});

/**
 * Handles the submission of a review.
 * Inserts a new review record into the database.
 * Returns a response with the appropriate status code and message.
 */
app.post('/submit-review', async (req, res) => {
  try {
    const db = await getDBConnection();
    let review = req.body;
    await db.run(
      'INSERT INTO reviews (username, rating, title, comment) VALUES (?, ?, ?, ?)',
      [review.username, review.rating, review.title, review.comment]
    );

    res.status(CORRECT_RESPONSE).json({message: "Review submitted successfully"});
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Failed to submit review");
  }
});

/**
 * Retrieves all reviews from the database.
 * Returns a response with the appropriate status code and the reviews as JSON.
 */
app.get('/get-reviews', async (req, res) => {
  try {
    const db = await getDBConnection();
    const reviews = await db.all('SELECT * FROM reviews ORDER BY id DESC');
    res.status(CORRECT_RESPONSE).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(ERROR_RESPONSE).send("Failed to get reviews");
  }
});

/**
 * Generates a random confirmation number for room bookings.
 * @returns {string} - The generated confirmation number.
 */
function generateConfirmationNumber() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let confirmationNumber = '';

  for (let i = 0; i < RANDOM_CONFIRMATION; i++) {
    confirmationNumber += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return confirmationNumber;
}

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

app.use(express.static("public"));
const PORT = process.env.PORT || PORT_NUM;
app.listen(PORT);
