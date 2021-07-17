const express = require('express');

// The lib helps deal with the browser's cross-orgin resource-sharing policy
const cors = require('cors');

const app = express();

// We'll allow all origins
app.use(cors());

// Middleware to allow us to parse a request with a json body
app.use(express.json());

// App-level to log request method and path
app.use((req, res, next)=>{
    next()
});

// Route to test if we are online
app.get('/', (req, res)=>{
    res.send({'error':'0', 'message':'The Server is online...'});
});
app.get('/angular_test/', (req, res)=>{
    res.send({'error':'0', 'message':'The Rad app'});
});


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`The server is listening on port ${PORT}...`));