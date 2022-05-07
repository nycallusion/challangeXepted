var express = require('express');
var logger = require('morgan');
const cors = require("cors");
const mongodb = require('./database/mongo')
const indexRouter = require('./routes/index');
const io = require('./socket.io/index')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://www.davidcodedesign.me",
      "https://davidcodedesign.me"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }));

app.use('/challengexcepted', indexRouter);

app.post('/test', async (req, res) => {
  await io.emit('test', 'test');
  res.json({message: 'send'})
})

module.exports = app;
