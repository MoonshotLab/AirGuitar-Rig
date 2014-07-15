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
  var shortCode = parts[parts.length - 1].replace('.mp4', '');
  var remotePath = '/' + parts[parts.length - 1];

  store(filePath, remotePath, function(s3Path){
    deferred.resolve({
      shortCode: shortCode,
      url: s3Path
    });
  });

  return deferred.promise;
};


var store = function(fileToSave, relativeS3Path, next){
  console.log('storing', fileToSave, 'in S3...');
  s3Client.putFile(fileToSave, relativeS3Path, function(err, res){
    if(err) console.log('error storing file...');
    else next('https://s3.amazonaws.com/air-guitar' + relativeS3Path);
  });
};


exports.rememberAwesome = rememberAwesome;
exports.rememberSlowmo = rememberSlowmo;
