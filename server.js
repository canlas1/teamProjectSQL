    var express = require('express')
    var app = express()
    var passport = require('passport')
    var session = require('express-session')
    var bodyParser = require('body-parser')
    var env = require('dotenv').load()
    var exphbs = require('express-handlebars')
    var path = require("path")
    var PORT = process.env.PORT || 3000;
    var Auth0Strategy = require('passport-auth0');
    var logger = require('morgan');
    var request = require('request')
    


    // Express Static
    app.use(express.static(path.join(__dirname, "app/public")));

    //For BodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    // For Passport
    app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    //For Handlebars
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    app.get('/', function(req, res) {
        res.render('index');
    });


 app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});


    //Models
    var models = require("./app/models");


    //Associations
    models.user.belongsToMany(models.beer, { through: models.userbeer, foreignKey: "beerId" });
    models.beer.belongsToMany(models.user, { through: models.userbeer, foreignKey: "userId" });
    // models.user.hasMany(models.beer, { through: 'userbeer' });
    // models.beer.hasMany(models.user, { through: 'userbeer' });



    //Routes
    var routes = require('./app/routes/auth.js')(app, passport);
    var beerpost = require('./app/routes/beerpost.js')(app);



    //load passport strategies
    require('./app/config/passport/passport.js')(passport, models.user, models.brewers);





    //Sync Database
    models.sequelize.sync().then(function() {
        console.log('Nice! Database looking good!')

    }).catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!")
    });



    app.listen(PORT, function(err){
        if(!err)
        console.log("Live on Port " + PORT );
        else console.log(err)

    });
