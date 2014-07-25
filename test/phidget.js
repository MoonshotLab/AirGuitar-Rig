// Use this to test if everything is hooked up correctly

var phidget = require('../libs/phidget');


phidget.events.on('ready', function(){
  console.log('phidget connected');
  phidget.setIndicator('ready');

  setTimeout(function(){
    phidget.setIndicator('uploading');
  }, 1000);

  setTimeout(function(){
    phidget.setIndicator('busy');
  }, 2000);

  setTimeout(function(){
    phidget.switchFans('on');
  }, 5000);

  setTimeout(function(){
    phidget.switchLights('on');
  }, 10000);

  setTimeout(function(){
    phidget.switchFans('offf');
    phidget.switchLights('offf');
  }, 20000);
});


phidget.events.on('trigger', function(e){
  console.log(e);
});
