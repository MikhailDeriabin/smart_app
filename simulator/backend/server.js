/**
 * Main file for server. Configures and starts server
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config({path: './simulator/.env'});

const SequelizeUtil = require("./util/SequelizeUtil");

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//port for heroku/any server which uses environmental variable PORT or 8081 (a port for our localhost)
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;

const sequelizeUtil = new SequelizeUtil();

app.listen(port,  async () => {
    const isSequelizeConnected = await sequelizeUtil.isSequelizeConnected();
    if(isSequelizeConnected){
        console.log(`Server started on port ${port} // http://${host}:${port}/`);
    }
});