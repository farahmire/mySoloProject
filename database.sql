
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "watchlist" (
	"id" SERIAL PRIMARY KEY,
	"currency" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"symbol" text NOT NULL,
	"bought" BOOLEAN DEFAULT FALSE
);



INSERT INTO watchlist (currency, description, symbol, bought, user_id)
VALUES
('USD', 'Apple Inc', 'aapl', false, 1),
( 'USD', 'Microsoft', 'MSFT', false, 2);



INSERT INTO "user" ( username, password)
VALUES
( 'johndoe', '123'),
( 'janedoe', '123');

INSERT INTO watchlist (currency, description, symbol, user_id)
VALUES
(  'USD', 'Apple Inc', 'AAPL', 1),
( 'USD', 'Microsoft', 'MSFT', 2);