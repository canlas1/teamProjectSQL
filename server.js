    var express    = require('express')
    var app        = express()
    var passport   = require('passport')
    var session    = require('express-session')
    var bodyParser = require('body-parser')
    var env        = require('dotenv').load()
    var exphbs     = require('express-handlebars')
    var path       = require("path")
    var PORT = process.env.PORT || 3000;
    
    var GoogleStrategy = require('passport-google-oauth20').Strategy;

    
    // Express Static
    app.use(express.static(path.join(__dirname, "app/public")));

    //For BodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());



     // For Passport
    app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions


     //For Handlebars
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    

    app.get('/', function(req, res){
      res.render('index');
    });

    //For Google Strategy
    passport.use(new GoogleStrategy({
    clientID: "84277905767-o6snqpv2rsleqi61bldusauns3135mu2.apps.googleusercontent.com",
    clientSecret: "pP2DhQC2dj15uLgLklLmqZ60",
    callbackURL: "https://localhost:3000/oauth2/callback"

    // //For Google Strategy
    // passport.use(new GoogleStrategy({
    // clientID: "84277905767-o6snqpv2rsleqi61bldusauns3135mu2.apps.googleusercontent.com",
    // clientSecret: "pP2DhQC2dj15uLgLklLmqZ60",
    // callbackURL: "https://teambeerlog.herokuapp.com/oauth2/callback"

  },

    function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id },function (err, user) {
      return cb(err, user);
    });
    }
    ));

    //  GET /auth/google
   // Use passport.authenticate() as route middleware to authenticate the
   // request.  The first step in Google authentication will involve
   // redirecting the user to google.com.  After authorization, Google
   // will redirect the user back to this application at /auth/google/callback
 app.get('/auth/google',
   passport.authenticate('google', { scope: ['openid email profile'] }));
 
 app.get('/auth/google/callback',
   passport.authenticate('google', {
     failureRedirect: '/login'
   }),
   function(req, res) {
     // Authenticated successfully
     res.redirect('/');
   });

 app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

    //Models
    var models = require("./app/models");


    //Routes
    var authRoute = require('./app/routes/auth.js')(app,passport);


    //load passport strategies
    require('./app/config/passport/passport.js')(passport,models.user,models.brewers);

    //Sync Database
    models.sequelize.sync().then(function(){
    console.log('Nice! Database looking good!')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });



    app.listen(PORT, function(err){
        if(!err)
        console.log("Live on Port 3000"); else console.log(err)

    });



    