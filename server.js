// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var nodemon =  require("nodemon");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Friends (DATA)
// =============================================================
var user  = [];
var match = [];

//store closest frien here, using map to rewirte the new info?
var topFriend = [];

var list = [
  {
    name: "Monica",
    photo: "https://",
    scores: [5, 3, 4, 4, 5, 3, 3, 4, 2, 4]
  },
  {
    name: "Billy",
    photo: "https://news.nationalgeographic.com/content/dam/news/2015/06/06/waqswim/1_waqswim_nationalgeographic_1514924.adapt.710.1.jpg",
    scores: [5, 1, 4, 4, 5, 3, 3, 4, 2, 4]
  },
  {
    name: "Mark",
    photo: "https://instagram.ftpa1-1.fna.fbcdn.net/t51.2885-19/10731526_788370824554808_522872068_a.jpg",
    scores: [4, 3, 2, 3, 4, 2, 4, 2, 2, 4]
  },
  {
    name: "Ryan S.",
    photo: "https://drive.google.com/open",
    scores: [3, 3, 1, 2, 1, 2, 4, 3, 1, 2]
  },
  {
    name: "Milena Garces",
    photo: "http://icons.iconarchive.com/icons/ph03nyx/super-mario/256/Retro-Star-icon.png",
    scores: [3, 4, 3, 2, 1, 3, 3, 5, 1, 5]
 },
 {
    name: "Erik Denman",
    photo: "https://drive.google.com/file/d/0B27_pCcNo5-SRkNfUmx2ZHQ1VkE/view?usp=sharing",
    scores: [3, 4, 3, 2, 2, 1, 4, 5, 5, 5]
  },
  {
    name: "Kendra Krzywicki",
    photo: "https://drive.google.com/open?id=14BTtkQIvHO1jcOr7ELPAWcZpfkWaeTEEDg",
    scores: [2, 2, 3, 4, 1, 4, 3, 5, 4, 2]
  }

];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// Get all people
app.get("/api/list", function(req, res) {
  res.json(list);
});

app.get("/api/repo", function(req, res) {
  res.json("https://github.com/NguyenM66/FriendFinder");
});

app.get("/api/match", function(req, res) {
  res.json(match);
});

app.get("/api/user", function(req, res) {
  res.json(user);
});


// Create New Table - takes in JSON input
app.post("/api/match", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newList = req.body;
  //console.log('scores',newList.scores)
  //for all items in the array (maps) returns integer and replaces old value in array
  newList.scores = newList.scores.map(function(score){
    return parseInt(score)
  })

  user.push(newList);
 //console.log("newList ", newList.scores);
  //res.json(newList);


  var newFriend = compareDiff();
  console.log("new friend: ", newFriend);
  match.push(newFriend);
  res.json(newFriend);
});

// Functions
// =============================================================
function compareDiff(){
  var closestFriend = [50, 0];
  var lowestSum = closestFriend[0];
  var topFriend = closestFriend[1];
  var friendObj = {};

  //for each friend
  for(var i = 0; i < list.length; i++) {
    var diffArray = [];
    var sum = 0;
    

    //console.log("firends list: ", list[i].scores);
    //console.log("user scores: ", user[0].scores);
    //for each score[i] in each array
    for(var j = 0; j < list[i].scores.length; j++){
      //take absolute value diff
      var diff = Math.abs(user[0].scores[j] - list[i].scores[j]);
      diffArray.push(diff);
    }
    //console.log("diffArray: ", diffArray);
    //sum diffArray
    sum = diffArray.reduce(add, 0);
   // console.log("sum", sum);

    //if it is the lowest sum then store friend as well
    closestFriend = checkLowest(sum, lowestSum, topFriend, i);
    lowestSum = closestFriend[0];
    topFriend = closestFriend[1];
    //console.log("closestFriend", closestFriend);
    //console.log("lowestSum: ", lowestSum);
    //console.log("topFriend: ", topFriend);

    friendObj = list[topFriend];
    //console.log("friendObj: ", friendObj);
  }
    
    return friendObj;

}

function add(a, b) {
  return a + b;
}

function checkLowest(a, b, topfriend, index){
  if(a < b) {
    return [a, index];
  }else {
    return [b, topfriend];
  }
}
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
