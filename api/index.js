const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');


const config = require('./config/config')
mongoose.Promise = global.Promise

const app = express();


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// helmet

app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use(cors())
app.use(require('./routes/subscribes'))


// Session
const expressSession = require("express-session");
app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret:
      process.env.SESSION_SEC || "gjs83Ghf82"
  })
);



//app.disable('x-powered-by');


// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}


// Connect to Mongoose

mongoose.connect(config.dbURL, config.dbOptions)

mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)

    })
  .on('error', error => console.warn(error))


