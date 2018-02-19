var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var ejs = require('ejs');
var engine = require('ejs-mate');
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

require('./routes/main')(app);

app.listen(secret.port, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("listening on " + secret.port);
  }
});
