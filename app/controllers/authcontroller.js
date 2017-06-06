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
  var apiBeer = {};

  db.user.findOne({
    where: {
      id: userId
    }
  }).then(function(user){
    var user = user.get();
    username = user.username
      console.log("USER",username);

  })

  db.beer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
      apiBeer = {
      beer: dbBeer
    }
  })
  // console.log("usrname", req.user.username);
  // console.log("displayName", req.session.passport);
  db.custombeer.findAll({
      // include: [db.beer]
    }).then(function(dbBeer) {
      var hbsObject = {
      beer: apiBeer,
      username: username,
      custombeer: dbBeer
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