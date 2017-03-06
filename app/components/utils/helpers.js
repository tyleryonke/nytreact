// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var nytKey = "8b94eaad754b4bbca0e19a51915c6f45";

// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(searchTerm) {

    console.log(searchTerm);

    // Figure out the geolocation
    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytKey + "&q=" + searchTerm;
    axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response) {
        console.log(response);
        return response.data.response.docs;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticle: function() {
    return axios.get("/api/saved").then(function(response) {
      return response.data;
    }
  },

  // This function posts new searches to our database.
  postArticle: function(articleObj) {
    return axios.post("/api/saved", { title: articleObj.headline.main, url: articleObj.web_url });
  },

  deleteArticle: function(selectedArticle) {
    return axios.delete("/api/saved/" + selectedArticle);
  }
};

// We export the API helper
module.exports = helpers;
