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

  db.user.findOne({
    where: {
      id: userId
    }
  }).then(function(user){
    var user = user.get();
    username = user.username
      console.log("USER",username);

  })
  // console.log("usrname", req.user.username);
  // console.log("displayName", req.session.passport);
  db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
<<<<<<< HEAD
      console.log(dbBeer);
    return res.render("dashboard", dbBeer);
=======
      var hbsObject = {
      beer: dbBeer,
      username: username
    };
    return res.render("dashboard", hbsObject);
>>>>>>> 26979948b5bcad5fc3cd65cc7a00751fc06f5898

    });

}

exports.beer = function(req,res){

	db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
    	var hbsObject = {
      beer: dbBeer
    };

  // db.user.findAll({
  //     // include: [db.beer]
  //   }).then(function(dbUser) {
  //     var userObject = {
  //     user: dbUser
  //   };
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