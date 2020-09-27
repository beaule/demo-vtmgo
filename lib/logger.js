/***********************************
 * logger singleton to access and initialize application logger
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var Winston = require("winston");
var Logger = require("express-winston-middleware");

/***********************************
 * Private constants.
 ************************************/

/***********************************
 * Private properties
 ************************************/

var _logger = new Logger.Log({
  transports: [new Winston.transports.Console()]
});

var _requestLogger = new Logger.request({
  transports: [new Winston.transports.Console()]
});

/***********************************
 * Module exports.
 ************************************/
module.exports = {
  getLogger: function () {
    return _logger;
  },

  getRequestLogger: function () {
    return _requestLogger;
  }
};
