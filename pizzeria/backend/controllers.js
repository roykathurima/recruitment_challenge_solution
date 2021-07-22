// node-postgres lib to interface with the postgres database
const { Pool } = require('pg')

// Local Test Database Config
const dbConfig = require('./config/db_config');

// Transform the order object to match the shape that we expect in the UI
const { transformOrder } = require('./utils');

// Connection credentials for the database
let conn_credentials = dbConfig

// Heroku already has a NODE_ENV environment var set to production
// We use it to know if we are developing locally or we have deployed to heroku
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
        res.send({'error':'0', 'data':ret_data.rows});
    }catch(e){
        console.error('Error getting pizzas: ', e);
        res.send({'error':'1', 'message':'Failed to fetch the pizzas'});
    }
}

// Delete Pizza
const delete_pizza = async (req, res)=>{
    const id = req.body.id;
    const query = {
        text: 'DELETE FROM pizza WHERE id = $1',
        values: [id],
    }
    try{
        const ret_data = await pool.query(query);
        res.send({'error':'0', 'message':{row_count: ret_data.rowCount, action:ret_data.command}});
    }catch(e){
        console.error('Error Deleting Pizzas: ', e);
        res.send({'error':'1', 'message':'Failed to delete the Pizza'})
    }
}

// Update Pizza
const edit_pizza = async (req, res)=>{
    const { id, name, price } = req.body;
    const query = {
        text: 'UPDATE pizza SET name=$1, price = $2 WHERE id = $3',
        values: [name, price, id]
    }
    try{
        const ret_data = await pool.query(query);
        res.send({'error':'0', 'message':{row_count: ret_data.rowCount, action:ret_data.command}});
    }catch(e){
        console.error('Error Deleting Pizza: ', e);
        res.send({'error':'1', 'message':'Failed to Update the Pizza'});
    }
}

// Enter orders into the database
const add_order = async (req, res)=>{
    // Planning on making this look sweet
    const {
        user_id,
        pizza_id,
        gross_total,
        order_date,
        order_items //It's going to be an array of them
    } = req.body;

    const query = {
        text:`
            INSERT INTO orders (user_id, pizza_id, gross_total, order_date)
            VALUES ($1, $2, $3, $4)
            RETURNING id AS order_id
        `,
        values: [user_id, pizza_id, gross_total, order_date]
    }
    try{
        const ret_data = await pool.query(query);
        const order_identifier = ret_data.rows[0].order_id
        if(order_identifier){
            order_items.forEach( async (item)=>{
                const item_query = {
                    text:`
                    INSERT INTO order_item (order_id, quantity, unit_price, subtotal)
                    VALUES ($1, $2, $3, $4)
                    `,
                    values:[order_identifier, item.quantity, item.unit_price, item.subtotal]
                }
                try{
                    const resp = await pool.query(item_query);
                }catch(e){
                    console.error("Error Adding Item", e)
                }
            })
            // Send this outside the loop, when we are done
            // We return the main order items...
            res.send({'error':'0', 'data':{row_count: ret_data.rowCount, action:ret_data.command}});
        }else{
            // It'll probably be handled in the catch block but just in case
            res.send({'error':'1', 'message':'Failed to Place your Order'});
        }
    }catch(e){
        console.error('Error adding an Order: ', e);
        res.send({'error':'1', 'message':'Failed to Place your Order'});
    }
}

// Get all Order from the database
const get_orders = async (req, res)=>{
    // This is goint to be a GET request so no params
    const query = {
        // We want everything from the orders table
        // used AS customer_name because of the ambiguity between customer and pizza name
        text: `
        SELECT a.order_date, a.gross_total, b.quantity, b.unit_price, c.name AS customer_name, c.address, d.name
        FROM orders AS a
        INNER JOIN order_item AS b ON a.id = b.order_id
        INNER JOIN users AS c ON c.id = a.user_id
        INNER JOIN pizza AS d ON d.id = a.pizza_id
        `,
        values:[]
    }
    try{
        // The data returned returned will need an extra transformation step
        // The order items should be an array inside the orders 
        const ret_data = await pool.query(query);
        const return_array = transformOrder(ret_data)
        res.send({'error':'0', 'data':return_array});
    }catch(e){
        console.error('Error adding an Order: ', e);
        res.send({'error':'1', 'message':'Failed to get the Orders'});
    }
}

// Get a single order from the database
const get_order = async (req, res)=>{
    const id = req.body.id;
    const query = {
        // We want everything from the orders table
        text: `
        SELECT a.order_date, a.id, a.gross_total, b.quantity, b.unit_price, c.name AS customer_name, c.address, d.name
        FROM orders AS a
        INNER JOIN order_item AS b ON a.id = b.order_id
        INNER JOIN users AS c ON c.id = a.user_id
        INNER JOIN pizza AS d ON d.id = a.pizza_id WHERE a.id = $1
        `,
        values:[id]
    }
    try{
        const ret_data = await pool.query(query);
        // The data returned returned will need an extra transformation step
        // The order items should be an array inside the orders object
        const return_array = transformOrder(ret_data)
        res.send({'error':'0', 'data':return_array});
    }catch(e){
        console.error('Error adding an Order: ', e);
        res.send({'error':'1', 'message':'Failed to Get the Order'});
    }
}

module.exports = {
    add_user,
    get_user,
    get_pizza,
    get_pizzas,
    add_pizza,
    delete_pizza,
    edit_pizza,
    add_order,
    get_orders,
    get_order,
}