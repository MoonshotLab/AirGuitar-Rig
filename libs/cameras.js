var spawn = require('child_process').spawn;
var Q = require('q');

var capture = function(){
  var deferred = Q.defer();

  console.log('capturing photos...');
  setTimeout(function(){
    deferred.resolve([
      '/dir/file1.jpg', '/dir/file2.jpg'
    ]);
  }, 1000);

  return deferred.promise;
};


var connect = function(){
  var deferred = Q.defer();

  console.log('prepping cameras...');

  setTimeout(function(){
    console.log('cameras ready...');
    deferred.resolve();
  }, 1000);

  return deferred.promise;
};


var takePicture = function(cameraId){
  var process = spawn('./take-pic', [cameraId]);

  process.stdout.on('data', function(data){
    var timestamp = new Date().getTime();
    var buff = new Buffer(data);
    var convert = buff.toString('utf8').replace('\n', '');
    console.log('STDOUT', timestamp + ':', convert);
  });

  process.stderr.on('data', function(data){
    var buff = new Buffer(data);
    console.log('STDERR:', buff.toString('utf8'));
  });

  process.on('close', function(data){
    console.log('usb connection closed for camera', cameraId + '...');
  });
};


exports.capture = capture;
exports.connect = connect;
exports.takePicture = takePicture;
