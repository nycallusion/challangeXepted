var express = require('express');
var logger = require('morgan');
const cors = require("cors");
const mongodb = require('./database/mongo')
const indexRouter = require('./routes/index');
const socketio = require('./socket.io/index')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: [
      "https://www.davidcodedesign.com",
      "http://localhost:3000",
      "http://34.138.155.221",
      "http://www.davidcodedesign.me"
      
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }));

app.use('/challengexcepted', indexRouter);

module.exports = app;
