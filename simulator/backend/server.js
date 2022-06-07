/**
 * Main file for server. Configures and starts server
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({path: './simulator/.env'});

const SequelizeUtil = require("./util/SequelizeUtil");

const device = require("./api/device");
const manufacturer = require("./api/manufacturer");
const type = require("./api/type");
const status = require("./api/status");

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api/device', device);
app.use('/api/manufacturer', manufacturer);
app.use('/api/type', type);
app.use('/api/status', status);

//port for heroku/any server which uses environmental variable PORT or 8081 (a port for our localhost)
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;

const sequelizeUtil = new SequelizeUtil();

app.listen(port,  async () => {
    const isSequelizeConnected = await sequelizeUtil.isSequelizeConnected();
    if(isSequelizeConnected){
        console.log(`Server started on port ${port} // http://${host}:${port}/`);

        //const posted = await axios.post(`http://${host}:${port}/api/status/`, {status: 'Test1', type: ['lamp', 'camera'] });
        //console.log(posted.data);

        //const readed = await axios.get(`http://${host}:${port}/api/type/lamp`);
        //console.log(readed.data);

        //const updated = await axios.put(`http://${host}:${port}/api/status/`, {status: 'Test1', typeDelete: 'katle', typeAdd: 'lamp' });
        //console.log(updated.data);

        //const deleted = await axios.delete(`http://${host}:${port}/api/status/Test1`);
        //console.log(deleted.data);
    }
});