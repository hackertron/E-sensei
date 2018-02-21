var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var ejs = require('ejs');
var engine = require('ejs-mate');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');

var app = express();

var secret = require('./config/secret');



mongoose.connect(secret.database, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("connected to DB ");
  }
});

app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUnitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({url: secret.database, autoReconnect: true})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

require('./routes/main')(app);
require('./routes/user')(app);
require('./routes/teacher')(app);

app.listen(secret.port, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("listening on " + secret.port);
  }
});
