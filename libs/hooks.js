var Q = require('q');
var needle = require('needle');


var notifyAwesome = function(){
  var deferred = Q.defer();

  console.log('notifying web app of new awesome...');
  setTimeout(function(){
    deferred.resolve({success: true});
  }, 1000);

  return deferred.promise;
};


var notifySlowmo = function(shortCode){
  var deferred = Q.defer();
  var params = [
    'shortCode=',
    shortCode,
    '&secret=',
    process.env.POST_HOOK_SECRET
  ].join('');

  console.log('notifying web app of new slowmo...');

  needle.post('http://localhost:3000/slowmo', params, {}, function(err, res, body){
    if(body.success) deferred.resolve(body);
    else deferred.reject(body);
  });

  return deferred.promise;
};


exports.notifyAwesome = notifyAwesome;
exports.notifySlowmo = notifySlowmo;
