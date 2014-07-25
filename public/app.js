var socket = io();
socket.on('message', function(data){
  console.log(data);
});

$(function(){
  console.log('zepto loaded...');
});
