// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

//requiring the handlebars dependency
var exphbs = require("express-handlebars");

//creates extra helper functions and houses the default layout setting
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance. 
    helpers: {
        math: function(lvalue, operator, rvalue, options) {
				    lvalue = parseFloat(lvalue);
				    rvalue = parseFloat(rvalue);
				        
				    return {
				        "+": lvalue + rvalue,
				        "-": lvalue - rvalue,
				        "*": lvalue * rvalue,
				        "/": lvalue / rvalue,
				        "%": lvalue % rvalue
				    }[operator];
				}
    },
    defaultLayout: "main"
});

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/users-api-routes.js")(app);
require("./routes/categories-api-routes.js")(app);
require("./routes/items-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
