var db = require("../models");

module.exports = function(app) {

    app.post("/dashboard/api/beer", function(req, res) {

        db.custombeer.create(req.body).then(function(dbBeer) {

            res.redirect("/dashboard")
        });
    });

    app.post("/api/add/beer", function(req, res) {


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
        db.beer.create(data).then(function(newBeer, created) {
            if (!newBeer) {
                return done(null, false);
            }

            if (newBeer) {
                console.log(newBeer);

            }


        });
    });




};
