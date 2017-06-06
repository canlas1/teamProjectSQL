var db = require("../models");


var exports = module.exports = {}


exports.signup = function(req,res){

  res.render('signup'); 

}

exports.forgot = function(req,res){

  res.render('forgot'); 

}

exports.signin = function(req,res){

  res.render('signin'); 

}

exports.dashboard = function(req,res){

  db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
      console.log(dbBeer);
    return res.render("dashboard", dbBeer);

    });

}

exports.beer = function(req,res){

  db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
      var hbsObject = {
      beer: dbBeer
    };
    return res.render("user", hbsObject);

    });

}

exports.user = function(req,res){
//req.params.user
	db.user.findOne({
      where: {
          id: req.params.user
        }
    }).then(function(user) {
      console.log(user);
      var hbsObject = {
      beer: user
    };
    return res.render("user", hbsObject);

    }); 

}

exports.logout = function(req,res){
  console.log(req.session);
  req.session.destroy(function(err) {
  res.redirect('/');
  });

}

exports.addBeer = function(req,res) {
  res.render('dashboard');
}