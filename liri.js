require("dotenv").config();
const keys = require('./keys');
const inquirer = require('inquirer');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('fs');


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
  console.log("----------------------------------------------------------------");
  chooseOption(response.option)
});

function chooseOption(option){

  if (option === "my-tweets") {
    findTwitts();
  } 
  else if(option === "spotify-this-song"){
    var songName;
    inquirer.prompt([
      {
        type: "input",
        name: "songName",
        message: "Type what you want to search: ",
      }
    
    ]).then(function(response){
      songName = response.songName;
      //Loads the Spotify API
      var spotify = new Spotify(keys.spotify);

      spotify.search({ type: "track", query: songName, limit:5 }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        // Do something with 'data'
        // console.log(JSON.stringify(data, null, 2));
        console.log('This is what we found abouth that song...');
        console.log("----------------------------------------------------------------");
        data.tracks.items.forEach(function (song, key){
          console.log("Song #: " + (key + 1));
          console.log("____________________");
          console.log('Artist: ' + song.artists[0].name);
          console.log('Song Name: ' + song.name);
          console.log('Link: ' + song.external_urls.spotify);
          console.log('Album: ' + song.album.name);
          console.log("____________________");
        })
        console.log("----------------------------------------------------------------");


      });
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

//This function retriees the first 20 twits fron Tweeter
function findTwitts(){
  var twitter = new Twitter(keys.twitter);
  var params = {q: 'adcarballido', count: 20};
  twitter.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      tweets.statuses.forEach(function (element, key){
        console.log((key + 1) + ". " + element.text);
      });
    }else{console.log(error)}
  });
}

//Function to retrieve Movie information from OMDB
function findMovie(movieName) {
  request(keys.omdb.url + "?t=" + movieName + "&type=movie&apikey=" + keys.omdb.api, function (error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

      console.log("Here is the information we found for that movie...");
      console.log("----------------------------------------------------------------");      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Contry of Production: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("----------------------------------------------------------------");    
    }
  });
}
