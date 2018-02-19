var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('', function(err){
  if(err){
    console.log(err);
  } else {
    console.log("connected to DB ");
  }
});
