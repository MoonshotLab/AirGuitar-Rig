var Q = require('q');
var path = require('path');
var spawn = require('child_process').spawn;
var videoProfiles = [];



var encodeAsWebm = function(shortCode){
  var deferred = Q.defer();

  var webmPath = path.join(process.cwd(), 'tmp/') + shortCode + '.webm';
  var moviePath = path.join(process.cwd(), 'tmp/') + shortCode + '.mp4';
  console.log('encoding as webm...');

  var args = ['-i', moviePath, '-codec:v', 'libvpx', '-quality', 'good', '-codec:a', 'libvorbis', webmPath];
  var ffmpeg = spawn('ffmpeg', args);

  ffmpeg.on('exit', function(){
    console.log('encoded as webm...');
    deferred.resolve(shortCode);
  });

  return deferred.promise;
};



var capturePoster = function(shortCode){
  var deferred = Q.defer();

  var posterPath = path.join(process.cwd(), 'tmp/') + shortCode + '.jpg';
  var moviePath = path.join(process.cwd(), 'tmp/') + shortCode + '.mp4';
  console.log('writing thumnail...');

  var args = ['-i', moviePath, '-vframes', '1', '-ss', '00:00:02', posterPath];
  var ffmpeg = spawn('ffmpeg', args);

  ffmpeg.on('exit', function(){
    console.log('wrote thumbnail...');
    deferred.resolve(shortCode);
  });

  return deferred.promise;
};


exports.capturePoster = capturePoster;
exports.encodeAsWebm = encodeAsWebm;
