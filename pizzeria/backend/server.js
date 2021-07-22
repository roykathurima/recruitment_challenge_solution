const express = require('express');

// The lib helps deal with the browser's cross-orgin resource-sharing policy
const cors = require('cors');

const app = express();

// We'll allow all origins
app.use(cors());

// Middleware to allow us to parse a request with a json body
app.use(express.json());

// Import our controllers
const { 
    add_user,
    get_user,
    get_pizzas,
    get_pizza,
    add_pizza,
    delete_pizza,
    edit_pizza,
    add_order,
} = require('./controllers');

// App-level to log request method and path
app.use((req, res, next)=>{
    next()
});

// User Routes
app.post('/add-user/', add_user);
app.post('/get-user/', get_user);

// Pizza Routes
app.post('/get-pizza/', get_pizza);
app.post('/add-pizza/', add_pizza);
app.get('/get-pizzas/', get_pizzas);
app.post('/delete-pizza/', delete_pizza);
app.post('/edit-pizza/', edit_pizza);
app.post('/add-order/', add_order);


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`The server is listening on port ${PORT}...`));