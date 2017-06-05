var authController = require('../controllers/authcontroller.js');
var passport = require('passport');
var dotenv = require('dotenv');
var BreweryDb = require('brewerydb-node');
 //used ('dotenv to hide key')
var brewdb = new  BreweryDb(process.env.BreweryDb);

 var env = {
     AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
     AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
     AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http:localhost:3000/callback'
 };

module.exports = function(app, passport) {

    // testing Auth0
    app.get('/login/auth0',
        function(req, res) {
            res.render('login', { env: process.env });
        });

    // Perform the final stage of authentication with Auth0 and redirect to '/user'
    app.get('/callback',
        passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
        function(req, res) {
            res.redirect(req.session.returnTo || '/user');
        });


    // Get the user profile Auth0
    app.get('/userProfile', isLoggedIn, function(req, res, next) {
        res.render('user', {

            user: req.user,
            userProfile: JSON.stringify(req.user, null, '  ')
        });
    });


    //     // BEER_DB ROUTE
    // app.get('/beers/:beer', function(req,res){
    //   // in here a request to http://localhost:8000/breweries/g0jHqt will fetch the same as your example code
    //   brewdb.search.beers(
    //     { 
    //         q: req.params.beer 
    //     }, function(err, beer) 
    //     {
    //     if(err) {
    //         console.error(err);
    //         res.status(500).send("An error occurred");
    //     } else if(beer) { // we found the beer
    //         res.send(beer);
    //     } else{
    //         res.status(404).send('We could not find your beer');
    //     }
    //   })
    // });

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.get('/logout', authController.logout);

    app.get('/forgot', authController.forgot);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/dashboard/beer', isLoggedIn, authController.beer);

    app.get('/profile/:user', isLoggedIn, authController.user);



    app.get('/logout', authController.logout);


    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }))

     // BEER_DB ROUTE
    app.get('/beers/:beer', function(req,res){
      
      // in here a request to http://localhost:8000/breweries/g0jHqt will fetch the same as your example code
      brewdb.search.beers({ q: req.params.beer }, function(err, beer) {
        if(err) {
            console.error(err);
            res.status(500).send("An error occurred");
        } else if(beer) { // we found the beer
            res.send(beer);
        } else{
            res.status(404).send('We could not find your beer');
        }
      })
    });

    // app.get('/auth', isLoggedIn, function(req, res, next) {
    //     res.render('user', {
    //         user: req.user,
    //         userProfile: JSON.stringify(req.user, null, '  ')
    //     });
    // });

    // app.get('/callback', passport.authenticate('auth0', {
    //     failureRedirect: '/logout'
    // }), function(req, res) {
    //     res.redirect(req.session.returnTo || '/');
    // });




    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}
