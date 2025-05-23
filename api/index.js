const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const config = require("./config/config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// App
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// helmet
app.use(helmet());
app.use(cookieParser());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use(require("./routes/projects"));
app.use(require("./routes/lots"));
app.use(require("./routes/promos"));
app.use(require("./routes/user"));
app.use(require("./routes/orders"));
app.use(require("./routes/slider"));
app.use(require("./routes/company"));
app.use(require("./routes/categories"));
app.use(require("./routes/feedbacks"));
app.use(require("./routes/pdf"));
app.use(require("./routes/about"));

// Session
app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SEC || "gjs83Ghf82",
  })
);

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app,
};

// Connect to Mongoose
mongoose.connect(config.dbURL, config.dbOptions);
mongoose.connection
  .once("open", () => {
    console.log(`Mongoose - successful connection ...`);
  })
  .on("error", (error) => console.warn(error));
