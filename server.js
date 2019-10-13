// dependecies
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// route paths
var apiRoutes = (path.join(__dirname, "./app/routing/apiRoutes.js"));
var htmlRoutes = (path.join(__dirname),"./app/routing/htmlRoutes.js");

// routing
require(apiRoutes)(app); 
require(htmlRoutes)(app);

app.listen(PORT, function(){
  console.log(`App listening on http://localhost:${PORT}`)
})