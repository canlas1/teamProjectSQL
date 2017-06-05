//load bcrypt
var bCrypt = require('bcrypt-nodejs');

//require Auth0
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

  

module.exports = function(passport,user,brewer){
  var Beer = brewer;
  var User = user;

  passport.use(strategy);

  var LocalStrategy = require('passport-local').Strategy;
  

  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(

    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
       

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        return done(null, false, {message : 'That email is already taken'} );
      }

      else{
      
        var userPassword = generateHash(password);
        var data = {
         
          email:email,
          password:userPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username
        };
        


        User.create(data).then(function(newUser,created){
          if(!newUser){
            return done(null,false);
          }

          if(newUser){
            return done(null,newUser);
            
          }


        });
      }


    }); 



  }



  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {

      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }

      if (!isValidPassword(user.password,password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));


  // passport.use(new GoogleStrategy({
  //     clientID: "204676919066-615sd9bf02838gra9qntjjpfdlg64opf.apps.googleusercontent.com",
  //     clientSecret: "VlGrdzlqAVOzsV33sFB-PV_n",
  //     callbackURL: "https://localhost:3000/oauth2/callback"
  //   },
    // function(accessToken, refreshToken, profile, done) {
    //     process.nextTick(function(){
    //       User.findOne({'google.id': profile.id}, function(err, user){
    //         if(err)
    //           return done(err);
    //         if(user)
    //           return done(null, user);
    //         else {
    //           var newUser = new User();
    //           newUser.google.id = profile.id;
    //           newUser.google.token = accessToken;
    //           newUser.google.name = profile.displayName;
    //           newUser.google.email = profile.emails[0].value;

    //           newUser.save(function(err){
    //             if(err)
    //               throw err;
    //             return done(null, newUser);
    //           })
    //           // console.log(profile);
    //         }
    //       });
    //     });
    //   }

  //));
}

