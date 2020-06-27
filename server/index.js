require('dotenv').config();

const PORT = process.env.PORT || 3001
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const { client  } = require('./db');
client.connect()

const path = require('path');
const DIST_PATH = path.join(__dirname, '../dist');

server.use(express.static(DIST_PATH));

server.listen(PORT, () => {
    console.log('The server is running on port', PORT)
});

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);