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
  var webm = fileBase + '.webm';
  var poster = fileBase + '.jpg';
  var s3Base = 'https://s3.amazonaws.com/air-guitar/';
  var remotePath = '/' + shortCode + '.mp4';

  store(mp4, '/' + shortCode + '.mp4', function(){
    store(webm, '/' + shortCode + '.webm', function(){
      store(poster, '/' + shortCode + '.jpg', function(){
        deferred.resolve({
          shortCode: shortCode,
          mp4: s3Base + shortCode + '.mp4',
          webm: s3Base + shortCode + '.webm',
          poster: s3Base + shortCode + '.jpg'
        });
      });
    });
  });

  return deferred.promise;
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
