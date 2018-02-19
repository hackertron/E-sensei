var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('your url here ', function(err){
  if(err){
    console.log(err);
  } else {
    console.log("connected to DB ");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.get('/', function(req, res, next){
  res.json('home');
})

app.listen(8080, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("listening on 8080 ");
  }
});
