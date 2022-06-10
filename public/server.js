const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
var router = require("express").Router();
// const expressSession = require('express-session');
const app = express();

// // set the view engine to ejs
// const path = require('path');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Cross-Origin Resource Sharing, CORS
app.use(cors());
// cookie
app.use(cookieParser());
app.use(
  cookieSession({
    name: "pyjee8-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: "strict",
    cookie: {
      secureProxy: true,
      httpOnly: true,
      domain: "https://simple-dashboard-pyjee8.herokuapp.com/",
      expires: 3600
    }
  })
);

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// cookie session
// app.use(expressSession({
//   secret:'COOKIE_SECRET',
//   resave:true,
//   saveUninitialized:true
// }));


// // Count today's visitors
// var count = 0;
// app.use(function (req, res, next) {
//   var date = new Date();
//   var today=date.getYear()+" "+date.getMonth()+" "+date.getDate();
// // Update views
// console.log(req.session.lastVisit);
// if(req.session.lastVisit != today){
//   req.session.lastVisit = today;
//   count++;
// }
// // Write response
// res.end(count + 'visit')
// })

// Database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();

// simple route
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("./index.html", {root: __dirname })
  // res.json({ message: "Welcome to simple-dashboard application." });
});


router.route('/api/users/').get(function(req,res, next){
  console.log('***********************************/api/users/ called.' + req.session.user);
  if(req.session.user){
      next();
  }else{
      res.redirect('./index.html');
  }
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