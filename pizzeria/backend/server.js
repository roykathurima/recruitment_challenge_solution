const express = require('express');

// The lib helps deal with the browser's cross-orgin resource-sharing policy
const cors = require('cors');

// node-postgres lib to interface with the postgres database
const { Pool } = require('pg')

// Local Test Database Config
const dbConfig = require('./config/db_config');

const app = express();

// We'll allow all origins
app.use(cors());

// Middleware to allow us to parse a request with a json body
app.use(express.json());

// App-level to log request method and path
app.use((req, res, next)=>{
    next()
});

// Connection credentials for the database
let conn_credentials = dbConfig

// Heroku already has a NODE_ENV environment var set to production
// We use it know if we are developing locally or we have deployed to heroku
if(process.env.NODE_ENV == 'production'){
    // the DATABASE_URL is also exposed as an environmnent var in Heroku
    // We use it to connect to the db added in heroku
    conn_credentials = {connectionString: process.env.DATABASE_URL}
}
// I hear connection pools are better than clients :)
const pool = new Pool({
    ...conn_credentials
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`The server is listening on port ${PORT}...`));