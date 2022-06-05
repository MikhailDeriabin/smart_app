/**
 * Main file for server. Configures and starts server
 */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//port for heroku/any server which uses environmental variable PORT or 8081 (a port for our localhost)
const host = process.env.DATABASE_HOST || "localhost";
const port = process.env.DATABASE_PORT || 8081;

app.listen(port, async() => {
    console.log(`Server started on port ${port} // http://${host}:${port}/`);
});