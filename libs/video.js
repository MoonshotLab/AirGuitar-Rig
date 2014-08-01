var Q = require('q');
var path = require('path');
var spawn = require('child_process').spawn;
var videoProfiles = [];



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
