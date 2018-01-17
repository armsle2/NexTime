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
  app.get("/api/todos/", function(req, res) {
    db.Item.findAll()
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });

  
  // POST route for saving a new post
  app.post("/api/todos/", function (req, res){
    console.log(req.body);
    db.Item.create({
      task: req.body.task,
      body: req.body.body,
      category: req.body.category
    
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });
}



 
   