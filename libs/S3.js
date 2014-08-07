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

  var fileBase = path.join(process.cwd(), 'tmp/') + shortCode;
  var mp4 = fileBase + '.mp4';
  var poster = fileBase + '.jpg';
  var remotePath = '/' + shortCode + '.mp4';

  store(mp4, '/' + shortCode + '.mp4', function(){
    store(poster, '/' + shortCode + '.jpg', function(){
      deferred.resolve(shortCode);
    });
  });

  return deferred.promise;
};


var remeberWebm = function(shortCode){
  var localFile = path.join(process.cwd(), 'tmp/') + shortCode + '.webm';
  var relativePath = '/' + shortCode + '.webm';

  store(localFile, relativePath);
};


var store = function(fileToSave, relativeS3Path, next){
  console.log('storing', fileToSave, 'in S3...');
  s3Client.putFile(fileToSave, relativeS3Path, function(err, res){
    if(err) console.log('error storing file...', err);
    if(next) next();
  });
};


exports.rememberSlowmo = rememberSlowmo;
exports.client = s3Client;
exports.remeberWebm = remeberWebm;
