var Q = require('q');
var needle = require('needle');


var notifySlowmo = function(shortCode){
  var deferred = Q.defer();
  var params = [
    'shortCode=',
    shortCode,
    '&secret=',
    process.env.POST_HOOK_SECRET
  ].join('');

  console.log('notifying web app of new slowmo...');

  needle.post('http://share-guitar.com/slowmo', params, {}, function(err, res, body){
    if(body.success) deferred.resolve(body);
    else deferred.reject(body);
  });

  return deferred.promise;
};


exports.notifySlowmo = notifySlowmo;
