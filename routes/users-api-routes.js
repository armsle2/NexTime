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

    // GET route for getting all of the posts
  //  app.get("/api/users/", function(req, res) {
    //    db.Item.findAll()
      //      .then(function(dbUser) {
        //        res.json(dbUser);
          //  });
    //});






 // GET route for getting all of the posts
  app.get("/api/todos/", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Item.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbItem) {
      res.json(dbItem);
    });
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
}