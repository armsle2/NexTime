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
    db.Item.findAll({})
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });

  //GET route for getting one item for detailed view

  app.get("/api/todos/:id", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.id
              }
    })
    .then(function(dbItem) {
      
      res.json(dbItem);

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

//ROUTE TO DELETE ITEMS
   app.delete("/api/todos/:id", function(req, res) {
   
    db.Item.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });

  });



  
  // POST route for saving a new todo
  app.post("/api/todos/", function (req, res){
    console.log(req.body);
    db.Item.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      
    
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });
}



 
   