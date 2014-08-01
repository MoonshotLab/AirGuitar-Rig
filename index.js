var phidget = require('./libs/phidget');
var web = require('./libs/web');
var S3 = require('./libs/S3');
var db = require('./libs/db');
var hooks = require('./libs/hooks');
var gopro = null;


var prepStage = function(){
  phidget.switchFans('on');
};


var cleanStage = function(){
  phidget.switchFans('off');
  phidget.switchLights('off');
};


var triggerSequence = function(){
  phidget.switchLights('on');
  db.getNextShortCode().then(function(shortCode){
    phidget.setIndicator('recording');

    // Wait just a few seconds before we start recording
    setTimeout(function(){
      gopro.capture(shortCode, 4000)
        .then(function(){
          phidget.setIndicator('uploading');
          S3.rememberSlowmo(shortCode)
            .then(db.storeSlowmo)
            .then(hooks.notifySlowmo)
            .then(gopro.deleteCaptures)
            .then(reset)
            .fail(handleError);
        });
    }, 2000);
  });
};


var reset = function(){
  console.log('resetting...');
  cleanStage();
  phidget.setIndicator('ready');
  web.restartInterface();
};


var handleError = function(e){
  console.log(e);
  phidget.setIndicator('error');
};


var connect = function(){
  db.connect()
    .then(function(){
      gopro = require('./libs/gopro');
      gopro.connect()
        .then(function(){
          console.log('All Systems Ready...');
          reset();
        });
    })
    .fail(function(e){
      console.log(e);
    });
};


web.events.on('prep-stage', prepStage);
web.events.on('clean-stage', cleanStage);
web.events.on('rock-out', triggerSequence);

phidget.events.on('next-song', web.nextSong);
phidget.events.on('select-song', web.selectSong);
phidget.events.on('ready', connect);
