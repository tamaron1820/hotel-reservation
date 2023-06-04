# *HOTEL RESERVATION* API Documentation
*This API is designed to provide backend support for a hotel reservation web service. It provides endpoints for user authentication, room searching, and review posting.*

## *User Authentication*
**Request Format:** */login*

**Request Type:** *POST*

**Returned Data Format**: HTTP status code

**Description:** *This endpoint is used for user authentication. The user provides their credentials and the endpoint returns a HTTP status code.*


**Example Request:** *{
  "username": "user1",
  "password": "password1"
}
*

**Example Response:**
```
HTTP status code 200 if credentials are correct.
```

**Error Handling:**
*If the credentials provided are incorrect, the server will return a 400 Bad Request status code with a message "Invalid username or password". If an error occurs during the login process, the server will return a 500 Internal Server Error status code with a message "An error occurred during login".*

## *User Registration*
**Request Format:** *User Registration*

**Request Type:** *POST*

**Returned Data Format**: HTTP status code

**Description:** * This endpoint is used for user registration. The user provides their credentials and the endpoint returns a HTTP status code.*

**Example Request:**
```
{
  "username": "user1",
  "password": "password1"
}
```

**Example Response:**
HTTP status code 200 if registration is successful.

**Error Handling:**
*If the username already exists, the server will return a 400 Bad Request status code with a message "Username already exists". If an error occurs during the registration process, the server will return a 500 Internal Server Error status code with a message "An error occurred during registration".*

## *Room Booking*
**Request Format:** * /book-room*

**Request Type:** *POST*

**Returned Data Format**: JSON

**Description:** *This endpoint is used to book a room. It checks if the requested room type is available and books the room if it is.*

**Example Request:** *{
  "username": "user1",
  "roomtype": "deluxe"
}
*

**Example Response:**
*{
  "message": "Room booked successfully"
}
*


**Error Handling:**
*If the room is not available, the server will return a 400 Bad Request status code with a message "No room available". If an error occurs during the booking process, the server will return a 500 Internal Server Error status code with a message "An error occurred during booking room".*

## *Submit Review*
**Request Format:** * /submit-review*

**Request Type:** *POST*

**Returned Data Format**: JSON

**Description:** *This endpoint is used to submit a review. The user provides their username, rating, review title, and comment.*

**Example Request:** *{
  "username": "user1",
  "rating": 5,
  "title": "Great room",
  "comment": "The room was clean and spacious."
}
*

**Example Response:**
*{
  "message": "Review submitted successfully"
}
*


**Error Handling:**
*If an error occurs during the review submission, the server will return a 500 Internal Server Error status code with a message "An error occurred during submitting review".*

## *Get Reviews*
**Request Format:** * /get-reviews*

**Request Type:** *GET*

**Returned Data Format**: JSON

**Description:** *This endpoint is used to retrieve all reviews from the database. It returns the reviews as JSON.*

**Example Response:**
*[
  {
    "username": "user1",
    "rating": 5,
    "title": "Great room",
    "comment": "The room was clean and spacious."
  },
  {
    "username": "user2",
    "rating": 4,
    "title": "Good service",
    "comment": "The staff were friendly and helpful."
  }
]

*


**Error Handling:**
*If an error occurs during getting reviews, the server will return a 500 Internal Server Error status code with a message "An error occurred during getting reviews".*
