CREATE TABLE users (
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  PRIMARY KEY("username")
);
CREATE TABLE "roomtypes" (
	"roomtype"	TEXT NOT NULL,
	"number"	INTEGER NOT NULL,
	PRIMARY KEY("roomtype")
);
CREATE TABLE "sqlite_sequence" (
	"name"	,
	"seq"
);
CREATE TABLE "reviews" (
	"id"	INTEGER,
	"username"	INTEGER NOT NULL,
	"rating"	INTEGER NOT NULL,
	"title"	TEXT NOT NULL,
	"comment"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE "bookings" (
	"id"	INTEGER,
	"username"	BLOB NOT NULL,
	"roomtype"	REAL NOT NULL,
	"date"	TEXT NOT NULL,
	"confirmation_number"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
