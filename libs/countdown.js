var Q = require('q');

var begin = function(){
  var deferred = Q.defer();

  console.log('starting countdown...');
  console.log('3');

  setTimeout(function(){
    console.log('2');
  }, 1000);

  setTimeout(function(){
    console.log('1');
  }, 2000);

  setTimeout(function(){
    deferred.resolve();
  }, 3000);

  return deferred.promise;
};


exports.begin = begin;
