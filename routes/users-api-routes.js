// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


//Get Route for getting ALL USERS
    app.get("/api/users/", function(req, res) {
        db.User.findAll()
            .then(function(dbUser) {

                res.json(dbUser);

            });
      
        // app.get("/api/users/", function(req, res) {
        //   db.User.findOne({
        //     where: {
        //       lastName: req.body.lastName
        // }

        //}).then(function(dbUser) {
        //  res.json(dbUser);
        // });

    });



    // POST route for saving a new user
    app.post("/api/users/", function(req, res) {
        console.log(req.body);
        db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password
            })
            .then(function(dbUser) {
                res.json(dbUser);
            });
    });

    //delete route to delete a user

    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
}