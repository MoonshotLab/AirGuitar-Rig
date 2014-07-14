var cameras = require('./libs/cameras');
var phidget = require('./libs/phidget');
var music = require('./libs/music');
var S3 = require('./libs/S3');
var db = require('./libs/db');
var gopro = require('./libs/gopro');
var hooks = require('./libs/hooks');
var countdown = require('./libs/countdown');
var songs = require('./config/songs');


var triggerSequence = function(e){
  phidget.setIndicator('in-process');

  var song = songs.lookup(e.phidgetId);
  music.play(song);

  countdown.begin()
    .then(db.getNextShortcode)
    .then(function(shortCode){
      makeAwesome(shortCode);
      makeSlowmo(shortCode);
    });
};


var makeSlowmo = function(shortCode){
  gopro.capture(shortCode, 3000)
    .then(S3.rememberSlowmo)
    .then(db.storeSlowmo)
    .then(hooks.notifySlowmo)
    .then(gopro.deleteCaptures)
    .fail(handleError);
};


var makeAwesome = function(shortCode){
  cameras.capture(shortCode)
    .then(S3.rememberAwesome)
    .then(db.storeAwesome)
    .then(hooks.notifyAwesome)
    .fail(handleError)
    .done(reset);
};


var reset = function(){
  console.log('resetting...');
  phidget.setIndicator('ready');
  music.play('chime');
};


var handleError = function(e){
  console.log(e);
  phidget.setIndicator('error');
};


phidget.events.on('trigger', triggerSequence);

phidget.events.on('ready', function(){
 cameras.connect().then(reset);
});
