var cameras = require('./libs/cameras');
var phidget = require('./libs/phidget');
var music = require('./libs/music');
var S3 = require('./libs/S3');
var db = require('./libs/db');
var hooks = require('./libs/hooks');
var countdown = require('./libs/countdown');
var songs = require('./config/songs');


var triggerSequence = function(e){
  phidget.setIndicator('in-process');

  var song = songs.lookup(e.phidgetId);
  music.play(song);

  countdown.begin()
    .then(cameras.capture)
    .then(S3.rememberAwesome)
    .then(db.storeAwesome)
    .then(hooks.notify)
    .fail(handleError)
    .done(reset);
};


var reset = function(){
  console.log('reseting...');
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
