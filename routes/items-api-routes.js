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

  // GET route for getting all of the Items
  app.get("/api/todos/", function(req, res) {
    db.Item.findAll()
    .then(function(dbItem) {
      res.json(dbItem);
    });
  });


  // GET route for getting all of the Items by a specific user
  app.get("/api/todos", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
   
    db.Item.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbItem) {
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

//POST ROUTE TO UPDATE ITEMS

app.put("/api/todos/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Item.update({
      task: req.body.task,
      complete: req.body.complete
    }, {
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
}



 
   