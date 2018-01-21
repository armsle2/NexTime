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
  app.get("/api/users/", function(req, res) {
    db.User.findAll()
    .then(function(dbUser) {
      res.json(dbUser);
    });
  });

// GET route for getting all of the posts
  app.get("/api/user/:id/to-do", function(req, res) {
    db.Item.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Category]
    })
    .then(function(dbUser) {
      res.json(dbUser);
    });
  });


  
  // POST route for saving a new post
  app.post("/api/users/", function (req, res){
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

