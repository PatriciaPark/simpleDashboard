const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const ejs = require("ejs");
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "pyjee8-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// Database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();

// simple route
app.use(express.static('public'));
app.get("/", (req, res) => {
  res.sendFile('./index.html', {root: __dirname })
  // res.json({ message: "Welcome to simple-dashboard application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});