var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    console.log(req.body.scores);

    var friend = req.body;

    for(var i = 0; i < friend.scores.length; i++) {
      friend.scores[i] = parseInt(friend.scores[i]);
    }

    var bestMatch = 0;
    var worstMatch = 40;


    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(friend.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < worstMatch) {
        bestMatch = i;
        worstMatch = totalDifference;
      }
    }

    friends.push(friend);

    res.json(friends[bestMatch]);
  });
};