// Grabs all current items from the db and "optimizes" them

var path = require('path');
var fs = require('fs');
var db = require('../libs/db');
var s3 = require('../libs/s3');
var video = require('../libs/video');


var makeSlowmos = function(slowmos){
  var i = 0;

  var make = function(slowmo){
    var asset = slowmo.url.replace('https://s3.amazonaws.com/air-guitar/', '');
    var shortCode = asset.replace('.mp4', '');
    var file = fs.createWriteStream(path.join(process.cwd(), 'tmp', asset));

    s3.client.getFile(asset, function(err, res){
      if(err) console.log(err);

      res.on('data', function(data) {
        file.write(data);
      });
      res.on('end', function(chunk) {
        file.end();
        video.optimize(shortCode).then(function(){
          s3.rememberSlowmo(shortCode).then(function(obj){
            db.storeSlowmo(obj);
            console.log('done');

            i++;
            if(slowmos[i])
              make(slowmos[i]);
            else
              console.log('done');
          });
        }).fail(function(e){
          console.log(e);
        });
      });
    });

  };

  make(slowmos[0]);
};


db.connect()
  .then(db.getAllSlowmos)
  .then(makeSlowmos)
  .fail(function(e){
    console.log(e);
  });
