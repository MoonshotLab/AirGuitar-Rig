var isRecording = false;

$(function(){
  buildSongTemplates();
});


var nextSong = function(){
  var index = $('#songs').find('.song').index('.selected');
  var nextIndex = index+1;

  if(nextIndex > $('#songs').find('.song').length - 1)
    nextIndex = 0;

  var $thisSong = $($('#songs').find('.song')[index]);
  var $nextSong = $($('#songs').find('.song')[nextIndex]);

  $thisSong.removeClass('selected');
  $nextSong.addClass('selected');
};


var selectSong = function(){
  if(!isRecording){
    isRecording = true;
    $('#songs').addClass('highlight');
    setTimeout(function(){
      $('#songs').removeClass('highlight');
    }, 100);

    setTimeout(startCountdown, 250);
  }
};


var startCountdown = function(){
  $('#songs').removeClass('show');
  $('#countdown').addClass('show');
  socket.emit('prep-stage');

  var video = $('#countdown').find('video')[0];
  video.onended = function(e) {
    socket.emit('rock-out');

    setTimeout(function(){
      socket.emit('clean-stage');
      location.reload();
    }, 15000);
  };
  video.play();
};



var socket = io();
socket.on('next-song', nextSong);
socket.on('select-song', selectSong);
