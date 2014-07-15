var Q = require('q');
var MongoClient = require('mongodb').MongoClient;

var awesomes = null;
var slowmos = null;

MongoClient.connect(process.env.DB_CONNECT, function(err, db){
  if(err) console.log('error connecting to db...', err);
  else console.log('connected to db...');

  slowmos = db.collection('slowmos');
  awesomes = db.collection('awesomes');
});


var getNextShortcode = function(){
  var deferred = Q.defer();

  slowmos.count(function(err, count){
    deferred.resolve(padNumber(count, 5));
  });

  return deferred.promise;
};


var storeAwesome = function(filePaths){
  var deferred = Q.defer();

  var record = {
    index: 0,
    files: filePaths
  };

  console.log('saving record at index ' + record.index + '...');

  setTimeout(function(){
    deferred.resolve(record);
  }, 1000);

  return deferred.promise;
};


var storeSlowmo = function(filePath){
  var deferred = Q.defer();

  slowmos.insert(
    { videoUrl : filePath },
    function(err, res){
      deferred.resolve(res);
    }
  );

  return deferred.promise;
};


var padNumber = function(num, size){
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
};


exports.storeAwesome = storeAwesome;
exports.storeSlowmo = storeSlowmo;
exports.getNextShortCode = getNextShortcode;
