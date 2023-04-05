const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path : "./config.env"});
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const conn = require('./database/connection.js');

// using routes
app.use(require('./routes/route'));

conn.then(db => {
    if(!db) return process.exit(1);

    // listen to http server
    app.listen(port, () => {
        console.log(`server is running on port:http://localhost:${port}`);
    })

    // if there is an error in the HTTP server
    app.on('error', err => console.log(`Failed to Connect with HTTP Server:${err}`));

    // if there is an error in mongodb connection
}).catch(err => {
    console.log(`Connection Failed!${err}`); 
});


