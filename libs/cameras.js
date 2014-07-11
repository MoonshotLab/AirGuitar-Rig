var Q = require('q');

var capture = function(){
  var deferred = Q.defer();

  console.log('capturing photos...');
  setTimeout(function(){
    deferred.resolve([
      '/dir/file1.jpg', '/dir/file2.jpg'
    ]);
  }, 1000);

  return deferred.promise;
};


var connect = function(){
  var deferred = Q.defer();

  console.log('prepping cameras...');

  setTimeout(function(){
    console.log('cameras ready...');
    deferred.resolve();
  }, 1000);

  return deferred.promise;
};

exports.capture = capture;
exports.connect = connect;
