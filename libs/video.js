var Q = require('q');
var path = require('path');
var spawn = require('child_process').spawn;


var optimize = function(shortCode){
  var deferred = Q.defer();
  var file = path.join(process.cwd(), 'tmp/') + shortCode + '.mp4';

  stripAudio({shortCode: shortCode, file: file})
    .then(cropClip)
    .then(makeSlowmo)
    .then(encodeAsWebm)
    .then(capturePoster)
    .fail(deferred.reject)
    .done(deferred.resolve);

  return deferred.promise;
};


var stripAudio = function(opts){
  var deferred = Q.defer();
  var noAudioFile = path.join(process.cwd(), 'tmp/') + opts.shortCode + '-no-audio.mp4';
  var args = ['-i', opts.file, '-an', noAudioFile, '-y'];

  var ffmpeg = spawn('ffmpeg', args);
  console.log('stripping audio...');

  ffmpeg.on('exit', function(){
    console.log('stripped audio...');
    deferred.resolve({
      file: noAudioFile,
      shortCode: opts.shortCode
    });
  });

  return deferred.promise;
};


var cropClip = function(opts){
  var deferred = Q.defer();
  var croppedFile = path.join(process.cwd(), 'tmp/') + opts.shortCode + '-cropped.mp4';
  var args = ['-i', opts.file, '-filter:v', 'crop=720:720:280:0', croppedFile, '-y'];

  var ffmpeg = spawn('ffmpeg', args);
  console.log('cropping clip...');

  ffmpeg.on('exit', function(){
    console.log('cropped clip...');
    deferred.resolve({
      file: croppedFile,
      shortCode: opts.shortCode
    });
  });

  return deferred.promise;
};


var makeSlowmo = function(opts){
  var deferred = Q.defer();
  var slowmoFile = path.join(process.cwd(), 'tmp/') + opts.shortCode + '.mp4';
  var args = ['-i', opts.file, '-filter:v', 'setpts=4.5*PTS', slowmoFile, '-y'];

  var ffmpeg = spawn('ffmpeg', args);
  console.log('making it a slowmo frealsy...');

  ffmpeg.on('exit', function(){
    console.log('made it a slowmo...');
    deferred.resolve({
      file: slowmoFile,
      shortCode: opts.shortCode
    });
  });

  return deferred.promise;
};



var encodeAsWebm = function(opts){
  var deferred = Q.defer();
  var webmPath = path.join(process.cwd(), 'tmp/') + opts.shortCode + '.webm';
  var args = ['-i', opts.file, '-codec:v', 'libvpx', '-b', '1500k', '-codec:a', 'libvorbis', webmPath, '-y'];

  var ffmpeg = spawn('ffmpeg', args);
  console.log('encoding as webm...');

  ffmpeg.on('exit', function(){
    console.log('encoded as webm...');
    opts.webm = webmPath;

    deferred.resolve(opts);
  });

  return deferred.promise;
};



var capturePoster = function(opts){
  var deferred = Q.defer();
  var posterPath = path.join(process.cwd(), 'tmp/') + opts.shortCode + '.jpg';
  var args = ['-i', opts.file, '-vframes', '1', '-ss', '00:00:05', posterPath, '-y'];

  var ffmpeg = spawn('ffmpeg', args);
  console.log('writing thumnail...');

  ffmpeg.on('exit', function(){
    console.log('wrote thumbnail...');
    deferred.resolve({
      shortCode: opts.shortCode
    });
  });

  return deferred.promise;
};


exports.optimize = optimize;
