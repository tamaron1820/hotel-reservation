# *HOTEL RESERVATION* API Documentation
*This API is designed to provide backend support for a hotel reservation web service. It provides endpoints for user authentication, room searching, and review posting.*

## *User Authentication*
**Request Format:** */api/authenticate*

**Request Type:** *POST*

**Returned Data Format**: Plain Text

**Description:** *This endpoint is used for user authentication. The user provides their credentials and the endpoint returns a token if the credentials are correct.*


**Example Request:** *{
  "username": "user1",
  "password": "password1"
}
*

**Example Response:**
```
token1234abcd
```

**Error Handling:**
*If the credentials provided are incorrect, the server will return a 401 Unauthorized status code and a message indicating the error.*

## *Room Search*
**Request Format:** */api/rooms/search*

**Request Type:** *GET*

**Returned Data Format**: JSON

**Description:** *This endpoint is used to search for available rooms based on the check-in date, room type, and the number of occupants. It returns a list of rooms that match the search criteria.*

**Example Request:** */api/rooms/search?checkin_date=2023-05-20&room_type=deluxe&occupants=2*

**Example Response:**

```json
[
  {
    "room_id": 101,
    "room_type": "deluxe",
    "capacity": 3,
    "price": 200,
    "available": true
  },
  {
    "room_id": 102,
    "room_type": "deluxe",
    "capacity": 3,
    "price": 220,
    "available": true
  }
]
```

**Error Handling:**
*If no rooms match the search criteria, the server will return a 404 Not Found status code and a message indicating that no rooms are available.*

## *Post Review*
**Request Format:** */api/reviews*

**Request Type:** *POST*

**Returned Data Format**: Plain Text

**Description:** *This endpoint allows authenticated users to post a review for a hotel room they've stayed in. The user provides their token, the room id, and their review, and the endpoint posts the review if the token is valid.*

**Example Request:** *{
  "token": "token1234abcd",
  "room_id": 101,
  "review": "Great room, very clean and spacious."
}
*

**Example Response:**
Review posted successfully.


**Error Handling:**
*If the token provided is invalid or expired, the server will return a 401 Unauthorized status code and a message indicating the error. If the room id provided does not exist, the server will return a 404 Not Found status code and a message indicating the error.*
