// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");var nodemon =  require("nodemon");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var list = [
  {
    name: "Monica",
    photo: "https://",
    scores: [5,1,4,4,5,3,3,4,2,4]
  },
  {
    name: "Billy",
    photo: "https://",
    scores: [5,1,4,4,5,3,3,4,2,4]
  },
];

var user  = [
  {
    name: "userMonica",
    photo: "https://",
    scores: [5,1,4,4,5,3,3,4,2,4]
  },
  {
    name: "userBilly",
    photo: "https://",
    scores: [5,1,4,4,5,3,3,4,2,4]
  },
];
//make new waitlist


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
  res.json(user);
});


// Create New Table - takes in JSON input
app.post("/api/list", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newList = req.body;

  console.log(newList);

  res.json(newList);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
