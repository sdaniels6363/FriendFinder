// dependencies
var path = require("path");

// load data
var friends = require(path.join(__dirname, "../data/friends.js"));

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;

    // abstract out the score from the new user to do comparisons with
    var newUserScore = newFriend.score;

    // array where the differences will be stored for potential matches
    var matchTotalCalculated = [];

    for (var x = 0; x < friends.length; x++) {
      // loop for each user

      var match = friends[x];

      // check to see if the new user matches and existing user
      if ((newFriend.name === match.name) && (newFriend.photo === match.photo)) {
        continue;
      }

      var matchScore = match.score; // store match's scores 
      var differences = []; // empty array to calculate the differences

      for (var y = 0; y < 10; y++) {
        // convert submitted data from string to int
        newUserScore[y] = parseInt(newUserScore[y]);

        // loop to determine difference question by question
        var newUser = newUserScore[y];
        var matchUser = matchScore[y];
        differences.push(Math.abs(newUser - matchUser));
      }

      // this calculates the sum of the array.
      var sum = differences.reduce(function (a, b) { return a + b }, 0);

      // new object for the matchTotalCalculated array
      var matchCalc = {
        "name": match.name,
        "photo": match.photo,
        "totalDifference": sum
      };
      // add calculated difference to array
      matchTotalCalculated.push(matchCalc);

    }

    // sort array by total difference in ascending order, then display the closest match to newUser
    matchTotalCalculated.sort(function (a, b) {
      return a.totalDifference - b.totalDifference
    });

    // after the match has been determined add the new user to the array.

    friends.push(newFriend); // add new friend to array
    res.send(matchTotalCalculated[0]) // send back the first result after all matches have been sorted.
  }

  );

};
