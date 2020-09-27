/***********************************************************
 * Digital Progile API - Authorization
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
const HOSTNAME = "passport.datavillage.me";
const ROOT_PATH = "https://" + HOSTNAME + "/oauth/";

/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/
function _authorize(clientId, callback, consentReceiptUri) {
  return (
    ROOT_PATH +
    "authorize?client_id=" +
    clientId +
    "&redirect_uri=" +
    callback +
    "&response_type=code&scope=" +
    consentReceiptUri +
    "&state=empty"
  );
}

function _getUserAccessToken(clientId, clientSecret, code, done) {
  var data = qs.stringify({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code: code
  });
  var config = {
    method: "post",
    url: ROOT_PATH + "token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      return done(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return done(null);
    });
}

function _refreshUserAccessToken(
  clientId,
  clientSecret,
  scope,
  refreshToken,
  done
) {
  var data = qs.stringify({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    scope: scope
  });
  var config = {
    method: "post",
    url: ROOT_PATH + "token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      return done(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return done(null);
    });
}

/***********************************
 * Module exports.
 ************************************/
module.exports = {
  ROOT_PATH: ROOT_PATH,
  authorize: function (clientId, callback, consentReceiptUri) {
    return _authorize(clientId, callback, consentReceiptUri);
  },
  getUserAccessToken: function (clientId, clientSecret, code, done) {
    _getUserAccessToken(clientId, clientSecret, code, done);
  },
  refreshUserAccessToken: function (
    clientId,
    clientSecret,
    scope,
    refreshToken,
    done
  ) {
    _refreshUserAccessToken(clientId, clientSecret, scope, refreshToken, done);
  },
  deAuthorize: function () {
    return ROOT_PATH + "deauthorize";
  }
};
