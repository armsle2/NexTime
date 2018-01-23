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

  // GET route for getting all of the users
  app.get("/api/users/", function(req, res) {
    db.User.findAll()
    .then(function(dbUser) {
      res.json(dbUser);
    });
  });

// GET route for getting all of the items related to a specific user id
  app.get("/api/user/:id/to-do", function(req, res) {
    db.Item.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.Category, db.User]
    })
    .then(function(dbUser) {
      res.json(dbUser);
    });
  });


  
  // POST route for creating a new user
  app.post("/api/users/", function (req, res){
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

