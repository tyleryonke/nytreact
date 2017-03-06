// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var nytAPI = "8b94eaad754b4bbca0e19a51915c6f45";

// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(searchTerm) {

    console.log(searchTerm);

    // Figure out the geolocation
    
    var queryURL = "http://api.nytimes.com/svc/search/v1/article?format=json&query=" + searchTerm + "&api-key=" + nytAPI;
    axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        console.log(response);
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticle: function() {
    return axios.get("/api/saved");
  },

  // This function posts new searches to our database.
  postArticle: function(location) {
    return axios.post("/api/saved", { location: location });
  },

  deleteArticle: function(location) {
    return axios.delete("/api/saved", { location: location });
  }
};

// We export the API helper
module.exports = helpers;
