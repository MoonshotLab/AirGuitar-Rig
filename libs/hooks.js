var Q = require('q');

var notify = function(){
  var deferred = Q.defer();

  console.log('notifying web app...');
  setTimeout(function(){
    deferred.resolve({success: true});
  }, 1000);

  return deferred.promise;
};

exports.notify = notify;
