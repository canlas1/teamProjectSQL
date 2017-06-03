var authController = require('../controllers/authcontroller.js');

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

    // app.post("/api/beer", passport.authenticate("", {
    //     Controller.addBeer}
    //     );


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');
    }
}
