var pinMapping = {
  'fan' : 0,
  'lights' : 1,
  'buttons': {
    'next' : 7,
    'prev' : 6,
    'delete': 0
  },
  'indicators' : {
    'ready' : 6,
    'busy' : 7
  }
};

var phidgetConnected = false;
var phidgetsLib = require('phidgets');
var EE = require('events').EventEmitter;

var emitter = new EE();
var phidget = new phidgetsLib();


console.log('waiting for phidget to come online...');
phidget.connect(function(x){
  console.log('phidget online...');
  phidgetConnected = true;
  emitter.emit('ready');
});


phidget.on('error', function(error){
  console.log('phidget error:' + error);
});


phidget.on('input', function(boardId, inputId, state){
  var buttons = pinMapping.buttons;

  if(inputId == buttons.next && state == 1 && phidgetConnected === true)
    emitter.emit('next-song');
  else if(inputId === buttons.prev && state == 1 && phidgetConnected === true)
    emitter.emit('select-song');
  else if(inputId == buttons.delete && state == 1 && phidgetConnected === true)
    emitter.emit('delete-captures');
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
