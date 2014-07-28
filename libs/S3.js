var Q = require('q');
var path = require('path');
var knox = require('knox');

var s3Client = knox.createClient({
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: 'air-guitar',
});


var rememberSlowmo = function(shortCode){
  var deferred = Q.defer();
  var filePath = path.join(process.cwd(), 'tmp/') + shortCode + '.mp4';
  var remotePath = '/' + shortCode + '.mp4';

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
    if(err) console.log('error storing file...', err);
    else next('https://s3.amazonaws.com/air-guitar' + relativeS3Path);
  });
};


exports.rememberSlowmo = rememberSlowmo;
