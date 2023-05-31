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
