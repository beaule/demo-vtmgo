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
const HOSTNAME = "api.datavillage.me";
const ROOT_PATH = "https://" + HOSTNAME + "/cages/";

/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/
function _importData(
  userAccessToken,
  consentReceiptId,
  startDate,
  endDate,
  done
) {
  var config = {
    method: "get",
    url:
      ROOT_PATH +
      consentReceiptId +
      "/importData?startDate=" +
      startDate +
      "&endDate=" +
      endDate,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userAccessToken
    }
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

function _loadData(userAccessToken, consentReceiptId, done) {
  var config = {
    method: "get",
    url: ROOT_PATH + consentReceiptId + "/loadData",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userAccessToken
    }
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

function _applyTemporalEnrichment(userAccessToken, done) {
  var config = {
    method: "get",
    url: ROOT_PATH + "/enrich/temporal",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userAccessToken
    }
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

function _applyHealthEnrichment(userAccessToken, done) {
  var config = {
    method: "get",
    url: ROOT_PATH + "/enrich/health",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userAccessToken
    }
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

function _queryDigitalTwin(userAccessToken, query, done) {
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
      console.log(error);
      return done(null);
    });
}

/***********************************
 * Module exports.
 ************************************/
module.exports = {
  ROOT_PATH: ROOT_PATH,
  importData: function (
    userAccessToken,
    consentReceiptId,
    startDate,
    endDate,
    done
  ) {
    _importData(userAccessToken, consentReceiptId, startDate, endDate, done);
  },
  loadData: function (userAccessToken, consentReceiptId, done) {
    _loadData(userAccessToken, consentReceiptId, done);
  },
  applyTemporalEnrichment: function (userAccessToken, done) {
    _applyTemporalEnrichment(userAccessToken, done);
  },
  applyHealthEnrichment: function (userAccessToken, done) {
    _applyHealthEnrichment(userAccessToken, done);
  },
  queryDigitalTwin: function (userAccessToken, query, done) {
    _queryDigitalTwin(userAccessToken, query, done);
  }
};
