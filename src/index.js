/***********************************
 * Module dependencies.
 ************************************/
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var flash = require("connect-flash");
var Logger = require("../lib/logger");
var dotenv = require("dotenv");

//routes
var indexRouter = require("../routes/index");

/***********************************
 * App creation
 ************************************/
var app = express();
dotenv.load();

/***********************************
 * Templating
 ************************************/
var hbs = exphbs.create({
  defaultLayout: "master",
  extname: ".handlebars",
  layoutsDir: "views/layouts",
  partialsDir: "views/partials"
});

app.engine("handlebars", hbs.engine);

/***********************************
 * Set up app properties & engine
 ************************************/
var sess = {
  secret: "demo",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

app.use(session(sess));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(express.static(path.join("client")));
app.set("view engine", ".handlebars");
app.set("views", path.join(__dirname, "../views"));
app.use(Logger.getRequestLogger());

app.use(flash());

/***********************************
 * auth message failure
 ************************************/
app.use(function (req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});

/***********************************
 * Routes
 ************************************/

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

/***********************************
 * Error handling
 ************************************/
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

/***********************************
 * Start server
 ************************************/

var server = app.listen("8080", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Datavillage sample app listening at http://%s:%s", host, port);
});

/***********************************
 * Module exports.
 ************************************/
module.exports = app;
