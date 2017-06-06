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
app.get("/api/like", function(req, res) {
    console.log("BODY---",req.body);
    // console.log('TEST',db.Beer);
    // console.log('TEST',db.beer);
    // db.beer.create(req.body).then(function(dbBeer) {
    //   // res.json(dbBeer);
    //   res.redirect("/dashboard")
    // });
  });


  app.post("/dashboard/api/beer", function(req, res) {
    // console.log('TEST',db.Beer);
    // console.log('TEST',db.beer);
    db.beer.create(req.body).then(function(dbBeer) {
      // res.json(dbBeer);
      res.redirect("/dashboard")
    });
  });

 
};
