// *********************************************************************************
// html-routes.js - this file includes a set of routes for sending users to the various html pages in the NextTime Application.
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
      db.Item.findAll().then(function(tasks){
        res.render('index', {tasks});
      })
  });

  // Route to the to do list / user page
  app.get("/to-do", function(req, res) {

  });

app.get("/add", function(req, res) {

  });


};
