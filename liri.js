require("dotenv").config();
const keys = require('./keys');
const inquirer = require('inquirer');
const request = require('request');
var Twitter = require('twitter');

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
  console.log(response.option);
  chooseOption(response.option)
});

function chooseOption(option){

  if (option === "my-tweets") {
    findTwitts();
  } 
  else if(option === "spotify-this-song"){
    var searchBy;
    var searchText;
    inquirer.prompt([
      {
        type: "list",
        name: "searchBy",
        message: "Tell us what kind of search do you want to perform: ",
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
  //Find a movie from OMDB
  else if(option === "movie-this"){
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Type a title to search: ",
      }
    ]).then(function(response) {
      findMovie(response.title);
    });
  } 
  else if(option === "do-what-it-says"){
    console.log("not yet completed")
  }
}

//Thia function retriees the first 20 twits fron Tweeter
function findTwitts(){
  var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });

  var params = { screen_name: 'nodejs' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
}

//Function to retrieve Movie information from OMDB
function findMovie(movieName) {
  request(keys.omdb.url + "?t=" + movieName + "&type=movie&apikey=" + keys.omdb.api, function (error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

      console.log("Here is theinformation we found for that movie...");
      console.log("*************************************************");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Contry of Production: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("*************************************************");
    }
  });
}

function findTweets() {
  
}