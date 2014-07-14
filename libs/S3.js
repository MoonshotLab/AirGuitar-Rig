var Q = require('q');
var knox = require('knox');

var s3Client = knox.createClient({
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: 'air-guitar',
});


var rememberAwesome = function(filePaths){
  var deferred = Q.defer();
  var S3Paths = [];

  filePaths.forEach(function(file){
    store(file, function(newPath){
      S3Paths.push(newPath);

      if(S3Paths.length == filePaths.length)
        deferred.resolve(S3Paths);
    });
  });

  return deferred.promise;
};


var rememberSlowmo = function(filePath){
  var deferred = Q.defer();

  store(filePath, function(){
    deferred.resolve(S3Paths);
  });

  return deferred.promise;
};


var store = function(file, next){
  console.log('storing', file, 'in S3...');

  setTimeout(function(){
    next(file);
  }, 1000);
};


exports.rememberAwesome = rememberAwesome;
exports.rememberSlowmo = rememberSlowmo;
