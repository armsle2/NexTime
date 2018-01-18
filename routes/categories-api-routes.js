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
  app.get("/api/categories/", function(req, res) {
    db.Category.findAll()
    .then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

 //GET route for gteting one post for category view

  app.get("/api/todos/category/:category", function(req, res) {
  //  app.get("/api/todos/", function(req, res) {
    db.Item.findAll({
      where: {
        category: req.params.category
        //category: "Groceries"
              }
    })
    .then(function(dbItem) {
      
      res.json(dbItem);

    });
  });
  
}



 
   