/***********************************
 * session singleton to access and initialize http session
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var fs = require("fs");

/***********************************
 * Private constants.
 ************************************/
const TOKEN_FILE_PATH = "data/token.db";
/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/
function _storeUserRefreshToken(userRefreshToken) {
  fs.writeFile(TOKEN_FILE_PATH, userRefreshToken, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}

function _getUserRefreshToken(done) {
  fs.readFile(TOKEN_FILE_PATH, "utf-8", (err, data) => {
    return done(data);
  });
}

function _deleteUserRefreshToken() {
  fs.unlinkSync(TOKEN_FILE_PATH);
}

/***********************************
 * Module exports.
 ************************************/
module.exports = {
  setUserAccessToken: function (req, userAccessToken) {
    req.session.userAccessToken = userAccessToken;
  },
  getUserAccessToken: function (req) {
    return req.session.userAccessToken;
  },
  storeUserRefreshToken: function (userRefreshToken) {
    _storeUserRefreshToken(userRefreshToken);
  },
  getUserRefreshToken: function (done) {
    return _getUserRefreshToken(done);
  },
  deleteUserRefreshToken: function () {
    _deleteUserRefreshToken();
  }
};
