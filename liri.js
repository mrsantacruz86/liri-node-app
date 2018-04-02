require("dotenv").config();
const keys = require('./keys');
const inquirer = require('inquirer');

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var mainChoise;
inquirer.prompt([
  {
    type: "list",
    name: "option",
    message: "Please choose an option to start: ",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(response){
  console.log(mainChoise);
});

if (mainChoise === "my-tweets") {
  console.log("not yes completed")
} 
else if(mainChoise === "spotify-this-song"){
  var searchBy;
  var searchText;
  inquirer.prompt([
    {
      type: "list",
      name: "searchBy",
      message: "Tell us what kind of search doyou want to perform: ",
      choices: ["Artist(s)", "The song's name", "A preview link of the song from Spotify", "The album that the song is from"]
    },
    {
      type: "input",
      name: "searchText",
      message: "Type what you want to search: ",
    }
  
  ]).then(function(response){
    searchBy = response.searchBy;
    searchText = response.searchText;
    console.log("You are going to search songs by: " + searchBy);
    console.log("You are going to search for: " + searchText);
  });
} 
else if(mainChoise === "movie-this"){
  console.log("not yes completed")
} 
else if(mainChoise === "do-what-it-says"){
  console.log("not yes completed")
} 