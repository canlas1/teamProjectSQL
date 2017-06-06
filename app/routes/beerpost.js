var db = require("../models");

module.exports = function(app) {
  // app.get("/dashboard/beer", function(req, res) {
  //   // Here we add an "include" property to our options in our findAll query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.beer.findAll({
  //     // include: [db.beer]
  //   }).then(function(dbBeer) {
  //     console.log(dbBeer);
  //     // res.json(dbBeer);
  //   res.render('beer', dbBeer); 

  //   });
  // });

app.post("/dashboard/api/beer", function(req, res) {
    // console.log('TEST',db.Beer);
    // console.log('TEST',db.beer);
    db.custombeer.create(req.body).then(function(dbBeer) {
      // res.json(dbBeer);
      res.redirect("/dashboard")
    });
  });

  app.post("/api/add/beer", function(req, res) {
    // console.log('TEST',db.Beer);
    
   console.log(req.body);
   console.log(req.body.name)
   console.log(req.body.abv)
   console.log(req.body.description)
   console.log(req.body.label)

   var data = {
    name: req.body.name, 
    abv: req.body.abv, 
    description: req.body.description, 
    img: req.body.label
  }

   
   console.log("Grabbing the mofucking beer");
   db.beer.create(data).then(function(newBeer,created){
          if(!newBeer){
            return done(null,false);
          }

          if(newBeer){
            console.log(newBeer);
            
          }


        });
  });



 
};
