var EE = require('events').EventEmitter;
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var emitter = new EE();

var assetsPath = path.join(__dirname, '../', 'public');
app.use(express.static(assetsPath));

io.on('connection', function(socket){
  socket.on('prep-stage', function(){
    emitter.emit('prep-stage');
  });
  socket.on('clean-stage', function(){
    emitter.emit('clean-stage');
  });
  socket.on('rock-out', function(){
    emitter.emit('rock-out');
  });
});


app.get('/', function(req, res){
  res.sendfile('/public/index.html');
});

http.listen(3001, function(){
  console.log('web server ready, listening on port 3001...');
});


exports.selectSong = function(){
  console.log('starting song...');
  io.sockets.emit('select-song');
};


exports.nextSong = function(){
  console.log('next song...');
  io.sockets.emit('next-song');
};


exports.restartInterface = function(){
  io.sockets.emit('restart-interface');
};


exports.events = emitter;
