var Q = require('q');

var store = function(filePaths){
  var deferred = Q.defer();

  var record = {
    index: 0,
    files: filePaths
  };

  console.log('saving record at index ' + record.index + '...');

  setTimeout(function(){
    deferred.resolve(record);
  }, 1000);

  return deferred.promise;

};

exports.store = store;
