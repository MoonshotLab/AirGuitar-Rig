var Q = require('q');

var remember = function(filePaths){
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


var store = function(file, next){
  console.log('storing', file, 'in S3...');

  setTimeout(function(){
    next(file);
  }, 1000);
};

exports.remember = remember;
