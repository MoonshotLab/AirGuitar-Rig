// Tests the following:
// 1. Do all systems connect in the correct order?
// 2. Does the gopro capture?
// 3. Do the captures get saved to S3 and Mongo?
// 4. Does it report to the web service?

var S3 = require('../libs/S3');
var db = require('../libs/db');
var hooks = require('../libs/hooks');
var gopro = null;


var makeSlowmo = function(shortCode){
  console.log('maiking a slowmo...');
  gopro.capture(shortCode, 3000)
    .then(S3.rememberSlowmo)
    .then(db.storeSlowmo)
    .then(hooks.notifySlowmo)
    .then(gopro.deleteCaptures)
    .done(process.exit)
    .fail(handleError);
};


var handleError = function(e){
  console.log(e);
  phidget.setIndicator('error');
};


db.connect()
  .then(function(){
    gopro = require('../libs/gopro');
    gopro.connect()
      .then(db.getNextShortCode)
      .then(makeSlowmo);
  })
  .fail(function(e){
    console.log(e);
  });
