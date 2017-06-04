var authController = require('../controllers/authcontroller.js');
var passport = require('passport');

var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
};

module.exports = function(app, passport) {

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



    // app.post('/dashboard/beer',isLoggedIn, authController.beer);

    app.get('/logout', authController.logout);


    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }))

    app.get('/auth', isLoggedIn, function(req, res, next) {
        res.render('user', {
            user: req.user,
            userProfile: JSON.stringify(req.user, null, '  ')
        });
    });

    app.get('/callback', passport.authenticate('auth0', {
        failureRedirect: '/logout'
    }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });




    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}
