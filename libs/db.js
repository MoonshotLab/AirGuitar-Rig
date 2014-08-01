var Q = require('q');
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;
var client = null;

var slowmos = null;

var connect = function(){
  var deferred = Q.defer();
  console.log('connecting to db...');

  MongoClient.connect(process.env.DB_CONNECT, function(err, db){
    client = db;
    if(err) console.log('error connecting to db...', err);
    else console.log('connected to db...');

    slowmos = db.collection('slowmos');

    deferred.resolve();
  });

  return deferred.promise;
};


var getNextShortCode = function(){
  var deferred = Q.defer();

  slowmos
    .find()
    .sort({ _id : 1 })
    .toArray(
      function(err, results){
        if(err){
          // just fulfill it please
          deferred.resolve(rando(500, 10000).toString());
        } else {
          var maxRecord = _.max(results, function(result){
            return parseInt(result.shortCode);
          });
          var currentMax = parseInt(maxRecord.shortCode);
          var shortCode = padNumber(currentMax+1, 5);
          deferred.resolve(shortCode);
        }
      }
    );

  return deferred.promise;
};


var getAllSlowmos = function(){
  var deferred = Q.defer();

  slowmos
    .find()
    .toArray(
      function(err, results){
        if(err) deferred.reject(results);
        else deferred.resolve(results.reverse());
      }
    );

  return deferred.promise;
};


var storeSlowmo = function(obj){
  var deferred = Q.defer();
  obj.preferred = false;

  console.log('saving slowmo in database...');
  slowmos.insert(
    obj,
    function(err, res){
      if(err) deferred.reject(err);
      deferred.resolve(obj.shortCode);
    }
  );

  return deferred.promise;
};


var padNumber = function(num, size){
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
};


var rando = function(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
};


exports.connect = connect;
exports.storeSlowmo = storeSlowmo;
exports.getNextShortCode = getNextShortCode;
exports.getAllSlowmos = getAllSlowmos;
exports.client = function(){
  return client;
};
