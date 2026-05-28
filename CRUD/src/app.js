// in this file we have to create a server
let express = require("express");

// creating a server instance

let app = express();

// using middleware for json format

app.use(express.json());

// we have to export the app to use in server.js

module.exports = app;
