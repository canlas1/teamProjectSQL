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

  var userId = req.session.passport.user;
  var username = "";
  var custom;

  db.user.findOne({
    where: {
      id: userId
    }
  }).then(function(user){
    var user = user.get();
    username = user.username
      console.log("USER",username);

  })

  db.custombeer.findAll({
    
  }).then(function(dbCust){
    custom = dbCust

  })

  db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
      console.log(dbBeer);

      var hbsObject = {
      beer: dbBeer,
      username: username,
      custombeer: custom
    };
    return res.render("dashboard", hbsObject);


    });

}

exports.beer = function(req,res){

	db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
    	var hbsObject = {
      beer: dbBeer
    };
    return res.render("beer", hbsObject);

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