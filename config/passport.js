var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secret = require('../config/secret');
var User = require('../models/user');
var async = require('async');
var request = require('request');

passport.serializeUser(function(user, done){
  done(null,user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use(new FacebookStrategy(secret.facebook, function(req, token, refreshToken, profile, done){
  User.findOne({facebook: profile.id}, function(err, user){
    if(err) return done(err);

    if(user) {
      req.flash('loginMessage', 'Successfully login with facebook');
      return done(null, user);
    }
    else {
      async.waterfall([
        function(callback) {
          var newUser = new User();
          newUser.email = profile._json.email;
          newUser.facebook = profile.id;
          newUser.tokens.push({kind: 'facebook', token: token });
          newUser.profile.name = profile.displayName;
          newUser.profile.picture = 'https://graph.facebok.com/' + profile.id + '/picture?type=large';

          newUser.save(function(err){
            if(err) throw err;
            req.flash('loginMessage', 'Successfully login with facebook');
            callback(err, newUser)
          });
        },
        function(newUser, callback) {
          //mailchimp request
          request({
            url: 'your mailchimp here ',
            method: 'POST',
            headers: {
              'Authorization': 'your auth token here',
              'Content-Type': 'Application/json'
            },
            json: {
              'email_address': newUser.email,
              'status': 'subscribed'
            }
          }, function(err, response, body) {
            //
            if(err) {
              return done(err, newUser);
            } else {
              console.log("success");
              return done(null, newUser);
            }

          });
        }
      ]);
    }
  });
}));
