/***********************************************************
 * Digital Progile API - Cages
 ***********************************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var axios = require("axios");
var qs = require("qs");

/***********************************
 * Private constants.
 ************************************/
const HOSTNAME = "w5xq953rfj.execute-api.us-east-1.amazonaws.com";
const ROOT_PATH = "https://" + HOSTNAME + "/dev/";

/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/

function _queryCreativeWorks(userAccessToken, query, done) {
  var config = {
    method: "post",
    url: ROOT_PATH + "graphql",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userAccessToken
    },
    data: query
  };

  axios(config)
    .then(function (response) {
      return done(response.data);
    })
    .catch(function (error) {
      return done(null);
    });
}

/***********************************
 * Module exports.
 ************************************/
module.exports = {
  ROOT_PATH: ROOT_PATH,

  queryCreativeWorks: function (userAccessToken, query, done) {
    _queryCreativeWorks(userAccessToken, query, done);
  }
};
