# SQL Movies Finder 

 This is a backend implementation used to request and recommend movies with SQL.

Users can add movies, actors and receive analytics through the api endpoints. 

## This is what it does

- It allows users to manage movies and actors, by adding and viewing them
- Users can find movies by title or genre.
- Get top-rated movies.
- Offer movies by the same genre or/and actors (with joins).

## Why it's useful

- Shows you SQL queries, joins and simple analytics.        
- Demoz where backend api design and database interaction is shown.
- Good for seeing relations between tables, as well as summarising the data.

## How it works

- Works through Node.js.
- Uses a SQLite database.
- Results from API endoints are received as JSON results.
- Data retrieval is posby SQL queries with JOINs, WHERE clauses, ORDER BY, and LIMIT.

## How to set up and run

Clone the project:
```bash
git clone <your-repo-url>
```
Go to the project folder:

``` bash 
cd sql-movie-finder
```
Install required packages:

``` bash
npm install
```

Start the server:

```bash 
node server.js
```
 Server will run at ‘http://localhost:3000’,

  ## You can play around with API like this, 
  
  * to get all movies:
  
 ```bash 
curl https://localhost:3000/movies
```

 * To view top rated service studio movies:
curl http://localhost:3000/movies/top-rated

* To search for movies by title or by genre:
 curl http://localhost:3000/movies/search? title=Inception&genre=Action

* postman can also be used, or tools like it

## Tech Used

* Node.js
* Express
* SQLite3
* Body-Parser

## Author

Timileyin Adeoye
