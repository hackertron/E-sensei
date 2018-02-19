module.exports = function(app) {

  app.get('/', function(req, res, next){
    res.render('main/home');
  });
}
