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
  app.get("/api/category/", function(req, res) {
    db.Category.findAll()
    .then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

 
  
}



 
   