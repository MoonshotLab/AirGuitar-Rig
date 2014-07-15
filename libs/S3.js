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
  var parts = filePath.split('/');
  var remotePath = '/' + parts[parts.length - 1];

  store(filePath, remotePath, function(s3Path){
    deferred.resolve(s3Path);
  });

  return deferred.promise;
};


var store = function(fileToSave, S3Path, next){
  console.log('storing', fileToSave, 'in S3...');
  s3Client.putFile(fileToSave, S3Path, function(err, res){
    if(err) console.log('error storing file...');
    else next(S3Path);
  });
};


exports.rememberAwesome = rememberAwesome;
exports.rememberSlowmo = rememberSlowmo;
