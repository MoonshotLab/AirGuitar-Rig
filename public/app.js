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

    setTimeout(function(){
      $('#songs').removeClass('active');
      $('#countdown').addClass('active');
    }, 500);

    setTimeout(startCountdown, 750);
  }
};


var startCountdown = function(){
  $('#songs').removeClass('show');
  $('#countdown').addClass('show');
  socket.emit('prep-stage');

  setTimeout(function(){
    $('#count').text('4');
  }, 1000);
  setTimeout(function(){
    $('#count').text('3');
  }, 2000);
  setTimeout(function(){
    $('#count').text('2');
  }, 3000);
  setTimeout(function(){
    $('#count').text('1');
  }, 4000);
  setTimeout(function(){
    $('#count').text('ROCK OUT!');
  }, 5000);

  setTimeout(function(){
    socket.emit('rock-out');
  }, 7000);

  setTimeout(function(){
    socket.emit('clean-stage');
    location.reload();
  }, 15000);
};



var socket = io();
socket.on('next-song', nextSong);
socket.on('select-song', selectSong);
