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
    db.beer.create(req.body).then(function(dbBeer) {
      // res.json(dbBeer);
      res.redirect("/dashboard/beer/")
    });
  });


// TESTING...
app.put("/user/:id", function(req, res) {

    db.beer.findById(req.params.id)
    .then(function(dbBeer) {
      return dbBeer.addUser(req.body.userId);
    })
    .then(function(dbBeer) {
      res.redirect("/");
    });

});
 
};
      // id: req.body.id,
      // beername: req.body.beername,
      // breweryname: req.body.breweryname,
      // origin: req.body.origin,
      // type: req.body.type