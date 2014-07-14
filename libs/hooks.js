var Q = require('q');


var notifyAwesome = function(){
  var deferred = Q.defer();

  console.log('notifying web app of new awesome...');
  setTimeout(function(){
    deferred.resolve({success: true});
  }, 1000);

  return deferred.promise;
};


var notifySlowmo = function(){
  var deferred = Q.defer();

  console.log('notifying web app of new slowmo...');
  setTimeout(function(){
    deferred.resolve({success: true});
  }, 1000);

  return deferred.promise;
};


exports.notifyAwesome = notifyAwesome;
exports.notifySlowmo = notifySlowmo;
