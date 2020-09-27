/***********************************
 * index route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require("express");
var router = express.Router();
var Session = require("../lib/session.js");
var Authorization = require("../lib/api/authorization.js");
var Consents = require("../lib/api/consents.js");
var Cages = require("../lib/api/cages.js");
var Custom = require("../lib/custom.js");

/***********************************
 * Private functions
 ************************************/
function getPreferedCreativeWork(req, prefered, done) {
  var query = {
    query:
      '{CreativeWork(filter: { Providers:{uri: "https://www.vrt.be" }}){uri image}}',
    variables: {}
  };
  if (prefered) {
    query = {
      query: "{CreativeWorkPrefered{uri image}}",
      variables: {}
    };
  }
  Custom.queryCreativeWorks(Session.getUserAccessToken(req), query, function (
    response
  ) {
    if (response != null) {
      return done(response.data);
    } else return done(null);
  });
}
/***********************************
 * Routers
 ************************************/
/* get home */
router.get("/", function (req, res, next) {
  Session.setUserAccessToken(
    req,
    "eyJhbGciOiJLTVMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJodHRwczovL2FwaS5kYXRhdmlsbGFnZS5tZS8iLCJzdWIiOiJjYzA2Nzk0ZC1lOTc3LTRkYTEtOThhMi1mMzU2MDVjMmMyOTkiLCJ1cmkiOiJodHRwczovL2FwaS5kYXRhdmlsbGFnZS5tZS91c2Vycy9jYzA2Nzk0ZC1lOTc3LTRkYTEtOThhMi1mMzU2MDVjMmMyOTkiLCJhenAiOiJtSWVQT2VUR2F5RTBZaGRuSG80bURjYWdWMHVxUExVdSIsImlhdCI6MTU5OTA3NDgxNywiZXhwIjoyMTk5MDc0ODE3LCJzY29wZSI6Imh0dHBzOi8vYXBpLmRhdGF2aWxsYWdlLm1lL2NvbnNlbnRSZWNlaXB0cy9VdWVHeDAtRWdVbVJiSDRqc1Z6ZHJoc3l1Mk10RkF0Q2xaNjdjY2VDXzRkclhQLVhGYnVDSmZzeUo5TzBmUkUwVjEzTjA3bE8yejBMakZ1ekVMN3hwcUNJMFFHNHhFLUNCd2hsMHJXRmpQV2wtSDVaQ3I1bWw3WU1POVFhazVociJ9.AQICAHiicquW0AOzDlrHF9VXK3pZkmcMQWFNDW2TSJ2YbFcC0gGaeSMGcWrpYomQy2GPUN0AAAACtzCCArMGCSqGSIb3DQEHBqCCAqQwggKgAgEAMIICmQYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAwnJ8/OJXWp9EtHz/UCARCAggJqu2fpKFKPBTnmJ2PGoAgO9qPaMd/IH77j2aGHOofpT2RS6IL7OjTHiKbVgpz8i0J6tREK9mDTx3uw2bvX1BfYPgdvlVtZ5iEJglOi7alFF59xXxr3Vu0gj8u9JrcJxYb0awfzrz3eOQmR3gCy7aWM/XLoYbeMtUSNwoMt3Fsx1ZKTtpE1D3QCUhTvG8uDzrNzw5bduEnmbKa4wqDCPUcCLijuFjm8q1ITLFbgCblk1U2W8TPBL41q9SoY+ZTonHU6tvuPzqD6cCCp+rDMvgSfiiHGT0O3Rf3hU+vN1wyCfdh7u53GkUCTFUBfnV7rFjbhrXiwFGdMHCfZU9nglJb5jmjOd9VJh74nosfNmUEdnyPGgl8Y786t1lHKKOZiQ/bgImhm4oFtK1ZCgJB5URcc56Bki0PSKBVGKbIb5bGa/Xwh+QZlTaQeRJYx4DE8zKpZD4Ucufu8p7g2v7Bsirv1q16WIV0lw5S730CQJUAN3ALp07buFtYs98ZkFR2kAuUhQYwngkBQFm/HxMKdi0tUSV+BFGr83SNtonitMSu+aF35qMdE0EFFlQdV22OXhTKP+0iPrdwZkNwy++06K5UYG/TAjfntQ8J4CqBI8rtyxlKKmeaSMTBr342jv22fWhI+ZMxJEpO229ybrGeA5T/Zkn3Lp2021QS7NABHB1wfJFK9teIHefekpJTAoTsMHhG3fb645vJeoqQFt7eXFfI7nHaM1vY1fMlY7P3Th16ewPHbSbMGiRmTlC8M4CDCFh+YZjeTw0HwbrRqKQlXAeH87p0cAlxtXIm7ZdNUblicXs3+euGK+VfjUft+"
  );
  renderHome(req, res, false);
  //get consent user access token from refresh token if any
  /*Session.getUserRefreshToken(function (userRefreshToken) {
    if (userRefreshToken != null) {
      Authorization.refreshUserAccessToken(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        Consents.ROOT_PATH_CONSENT_RECEIPT + process.env.CONSENT_RECEIPT_ID,
        userRefreshToken,
        function (response) {
          if (response != null) {
            //store access token in session
            Session.setUserAccessToken(req, response.access_token);
            //store refresh token in file
            Session.storeUserRefreshToken(response.refresh_token);
          } else {
            //set access token in session to null
            Session.setUserAccessToken(req, null);
            //remove refresh token from file
            Session.deleteUserRefreshToken();
          }
          renderHome(req, res);
        }
      );
    } else renderHome(req, res);
  });*/
});

/* Authorize callback and Import data*/
router.get("/callback", function (req, res, next) {
  renderHome(req, res, true);
});

/**
 * render  home
 * @param {req} request
 * @param {res} response
 */
function renderHome(req, res, prefered) {
  getPreferedCreativeWork(req, prefered, function (creativeWorks) {
    console.log("****" + creativeWorks);
    var creativeWorksForUi = null;
    if (creativeWorks != null && prefered)
      creativeWorksForUi = creativeWorks.CreativeWorkPrefered;
    if (creativeWorks != null && !prefered)
      creativeWorksForUi = creativeWorks.CreativeWork;

    res.render("home", {
      layout: "master",
      actionActivateConsent: Authorization.authorize(
        process.env.CLIENT_ID,
        process.env.APP_URL + "callback",
        Consents.ROOT_PATH_CONSENT_RECEIPT + process.env.CONSENT_RECEIPT_ID
      ),
      actionRevokeConsent: Authorization.deAuthorize(),
      creativeWorks: creativeWorksForUi
    });
  });
}

/**
 * render error
 * @param {req} request
 * @param {res} response
 */
function renderError(req, res, error) {
  res.render("error", {
    layout: "master",
    title: "Error",
    message: error
  });
}

module.exports = router;
