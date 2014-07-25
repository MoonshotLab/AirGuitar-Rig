var socket = io();
socket.on('message', function(data){
  console.log(data);
});

$(function(){
  console.log('zepto loaded...');
});


setTimeout(function(){
  socket.emit('start-capture');
}, 5000);
