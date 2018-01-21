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
    db.Item.findAll({
      include: [db.Category]
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });


 // GET route for getting all of the posts
  app.get("/api/todos/category/:category_id", function(req, res) {
    db.Item.findAll({
      where: {
        CategoryId: req.params.category_id
      },
      include: [db.Category]
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });

  //GET route for getting one item for detailed view

  app.get("/api/todos/:id", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Category]
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

//ROUTE TO UPDATE ITEMS
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
      task: req.body.task,
      body: req.body.body,
      category: req.body.category,
      CategoryId: req.body.CategoryId,
      UserId: req.body.UserId
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // POST route for saving a new todo
  app.put("/api/todos/", function (req, res){
    console.log(req.body);
    db.Item.update(req.body,
    {
      where: {
        id: req.body.taskID
      }
    })
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });
}



 
   