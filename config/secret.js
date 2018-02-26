module.exports = {
  database: 'mongolab url here',
  port: 8080,
  secretKey: 'key here',
  facebook: {
    clientID: 'id here',
    clientSecret: 'secret here',
    profileFields: ['emails', 'displayName'],
    callbackURL:  'callback here',
    passReqToCallback: true
  }
}
