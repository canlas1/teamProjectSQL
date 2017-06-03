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

	res.render('dashboard'); 

}

exports.beer = function(req,res){

	res.render('beer'); 

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