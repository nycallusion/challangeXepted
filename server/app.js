var express = require('express');
var logger = require('morgan');
const cors = require("cors");
const mongodb = require('./database/mongo')
var indexRouter = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: [
      "https://www.davidcodedesign.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }));

app.use('/challengexcepted', indexRouter);

module.exports = app;
