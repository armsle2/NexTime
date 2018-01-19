// *********************************************************************************
// html-routes.js - this file includes a set of routes for sending users to the various html pages in the NextTime Application.
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Route to the to do list / user page
  app.get("/to-do", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

app.get("/user", function(req, res){
    res.sendFile(path.join(__dirname, "../public/userInput.html"))
})


};
