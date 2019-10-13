// dependencies
var path = require("path");

// load data
var friends = require(path.join(__dirname,"../data/friends.js"));

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var newFriend = req.body; 
    console.log(newFriend);
    
    friends.push(newFriend); // add new friend to array
    
    res.send("New Friend added.")
    console.log(friends);
  });

};
