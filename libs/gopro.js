var fs = require('fs');
var path = require('path');
var Q = require('q');
var GoPro = require('gopro_hero_api/libs/gopro');
var camera = null;


var connect = function(){
  var deferred = Q.defer();

  console.log('connecting to gopro...');
  camera = new GoPro(process.env.GOPRO_PASS, '10.5.5.9', '8080');

  camera.ready().then(function(){
    console.log('connected to gopro...');
    deferred.resolve();
  }).catch(function(){
    console.log('could not connect to camera.');
    deferred.resolve();
  });

  return deferred.promise;
};


var capture = function(shortCode, seconds){
  var deferred = Q.defer();

  console.log('starting slowmo capture...');
  camera.capture();

  var stop = function(){
    console.log('done capturing for ' + seconds + ' milliseconds...');
    getAndSaveLatestVideo(shortCode).then(deferred.resolve);
    camera.capture(false);
  };

  setTimeout(stop, seconds);
  return deferred.promise;
};


var getAndSaveLatestVideo = function(shortCode){
  var deferred = Q.defer();

  camera.requestFileSystem().then(function(files){
    files.reverse();

    var originalFile = null;
    var originalFileName = null;
    for(var i=0; i<files.length; i++){
      if(files[i].name.indexOf('MP4') != -1){
        originalFileName = files[i].name;
        originalFile = files[i].absolutePath + files[i].name;
        break;
      }
    }

    if(originalFile){
      console.log('saving', originalFileName, 'to the file system...');
      camera.copyFile(originalFile, 'tmp').then(function(oldName){
        var newName = path.join(process.cwd(), 'tmp', shortCode) + '.mp4';
        console.log('renaming', oldName.path, 'to', newName + '...');

        fs.rename(oldName.path, newName, function(err){
          if(err) console.log(err);
          deferred.resolve(newName);
        });
      }).catch(function(err){
        console.log(err);
      });
    }
  });

  return deferred.promise;
};


var deleteCaptures = function(){
  var deferred = Q.defer();

  console.log('deleting all slowmo captures....');
  camera.deleteAll().then(function(){
    deferred.resolve();
  });

  return deferred.promise;
};


exports.connect = connect;
exports.capture = capture;
exports.deleteCaptures = deleteCaptures;
