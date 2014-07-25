var pinMapping = {
  'fan' : 5,
  'lights' : 7,
  'buttons': {
    'next' : 1,
    'prev' : 4
  },
  'indicators' : {
    'ready' : 3,
    'recording' : 2,
    'uploading' : 1
  }
};

var phidgetsLib = require('phidgets');
var EE = require('events').EventEmitter;

var emitter = new EE();
var phidget = new phidgetsLib();


console.log('waiting for phidget to come online...');
phidget.connect(function(x){
  console.log('phidget online...');
  emitter.emit('ready');
});


phidget.on('error', function(error){
  console.log('phidget error:' + error);
});


phidget.on('input', function(boardId, inputId, state){
  var buttons = pinMapping.buttons;

  if(inputId == buttons.next && state == 1)
    emitter.emit('next-song');
  else if(inputId === buttons.prev && state == 1)
    emitter.emit('select-song');
});


// Params: 'ready', 'busy', or 'uploading'
var setIndicator = function(state){
  var indicatorPins = pinMapping.indicators;

  for(var key in indicatorPins){
    phidget.setOutput(phidget.id, indicatorPins[key], false);
  }

  phidget.setOutput(phidget.id, indicatorPins[state], true);
};


// Params: 'on' or 'off'
var switchLights = function(state){
  var bools = state == 'on' ? true : false;
  phidget.setOutput(phidget.id, pinMapping.lights, bools);
};


// Params: 'on' or 'off'
var switchFans = function(state){
  var bools = state == 'on' ? true : false;
  phidget.setOutput(phidget.id, pinMapping.fan, bools);
};


exports.setIndicator = setIndicator;
exports.switchLights = switchLights;
exports.switchFans = switchFans;
exports.events = emitter;
exports.setIndicator = setIndicator;
