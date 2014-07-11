var EE = require('events').EventEmitter;
var emitter = new EE();

console.log('waiting for phidget to come online...');

setTimeout(function(){
  console.log('phidget online...');
  emitter.emit('ready');
}, 1000);

setTimeout(function(){
  emitter.emit('trigger', { phidgetId: 1 });
}, 5000);

var setIndicator = function(){
  return true;
};

exports.events = emitter;
exports.setIndicator = setIndicator;
