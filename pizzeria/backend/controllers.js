// node-postgres lib to interface with the postgres database
const { Pool } = require('pg')

// Local Test Database Config
const dbConfig = require('./config/db_config');

// Connection credentials for the database
let conn_credentials = dbConfig

// Heroku already has a NODE_ENV environment var set to production
// We use it know if we are developing locally or we have deployed to heroku
if(process.env.NODE_ENV == 'production'){
    // the DATABASE_URL is also exposed as an environmnent var in Heroku
    // We use it to connect to the db added in heroku
    conn_credentials = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    }
}
// I hear connection pools are better than clients :)
const pool = new Pool({
    ...conn_credentials
})

// creating a user on the database
const add_user = async (req, res) =>{
    // I expect the front end did due-diligence and that there are no nulls || undefined
    const { email, name, phone_number, address, is_admin } = req.body;
    // This way of doing things is kinda tedious
    const query = {
        text: 'INSERT INTO users (email, name, phone_number, address, is_admin) VALUES ($1,$2,$3,$4,$5)',
        values: [email, name, phone_number, address, is_admin],
    }
    try{
        const ret_data = await pool.query(query);
        // console.log('query returned data', ret_data);
        // pool.end();
        res.send({'error':'0', 'message':{row_count: ret_data.rowCount, action:ret_data.command}});
    }catch(e){
        // For now we'll return a GENERIC error messsage and log into the console
        console.error("Error during user addition: ",e);
        res.send({'error':'1', 'message':'Failed to insert record intot the database'});
    }
}

const get_user = async (req, res)=>{
    // Will be easier accessing via email than ID
    // const id = req.body.id;
    const email = req.body.email;
    const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    }
    try{
        const ret_data = await pool.query(query);
        // pool.end();
        // we return the first user since we only expect one
        // GraphQl would be sweet to trim this data down but it would be an overkill
        res.send({'error':'0', 'data':ret_data.rows[0]});
    }catch(e){
        // A 404 is probably code '42P02', an observation... probably check the docs to be certain before implementation
        console.error("Error getting the user from the database: ", e);
        res.send({'error':'1', "message":'Failed to get user from the database'})
    }
}

// controller for adding pizzas
const add_pizza = async (req, res)=>{
    const { name, price } = req.body;
    const query = {
        text: 'INSERT INTO pizza (name, price) VALUES ($1, $2)',
        values: [name, price]
    }
    try{
        const ret_data = await pool.query(query);
        res.send({'error':'0', 'message':{row_count: ret_data.rowCount, action:ret_data.command}});
    }catch(e){
        console.error("Error creating Pizzas: ", e);
        res.send({'error':'1', 'message':'Failed to insert the pizza into the database'});
    }
}

// Get a single pizza with ID -> This is for Pizza Details
const get_pizza = async (req, res)=>{
    const id = req.body.id;
    const query = {
        text: 'SELECT * FROM pizza WHERE id = $1',
        values: [id],
    }
    try{
        const ret_data = await pool.query(query);
        res.send({'error':'0', 'data':ret_data.rows[0]});
    }catch(e){
        console.error('Error getting pizza: ', e);
        res.send({'error':'1', 'message':'Failed to fetch the pizza from the database'});
    }
}

// Get all the Pizzas -> This is for the store
const get_pizzas = async (req, res)=>{
    try{
        const ret_data = await pool.query('SELECT * FROM pizza');
        res.send({'error':'0', 'data':ret_data.rows[0]});
    }catch(e){
        console.error('Error getting pizzas: ', e);
        res.send({'error':'1', 'message':'Failed to fetch the pizzas'});
    }
}

module.exports = { add_user, get_user, get_pizza, get_pizzas, add_pizza }