var isRecording = false;
var selectedSong = null;

$(function(){
  buildSongTemplates();
});



var fadeIn = function(el, speed, next){
  if(el.volume < 0.9){
    el.volume += 0.05;
    setTimeout(function(){
      fadeIn(el, speed, next);
    }, speed);
  } else{
    if(next) next();
  }
};


var fadeOut = function(el, speed, next){
  if(el.volume > 0.1){
    el.volume -= 0.05;
    setTimeout(function(){
      fadeOut(el, speed, next);
    }, speed);
  } else{
    if(next) next();
  }
};



var showSongSelector = function(){
  $('#instructions').removeClass('show');
  $('#song-selector').addClass('show');

  var audio = $('#audio-clips').find('audio')[0];
  audio.volume = 0;
  audio.play();
  fadeIn(audio, 500);
};



var nextSong = function(){
  var $selector = $('#song-selector');
  var index = $selector.find('.song').index('.selected');
  var nextIndex = index+1;

  if(nextIndex > $selector.find('.song').length - 1)
    nextIndex = 0;

  var $thisSong = $($selector.find('.song')[index]);
  var $nextSong = $($selector.find('.song')[nextIndex]);
  var $thisAudio = $('#audio-clips').find('audio')[index];
  var $nextAudio = $('#audio-clips').find('audio')[nextIndex];

  $thisSong.removeClass('selected');
  $nextSong.addClass('selected');

  fadeOut($thisAudio, 15, function(){
    $thisAudio.pause();
    $thisAudio.currentTime = 0;

    $nextAudio.volume = 0;
    $nextAudio.play();
    fadeIn($nextAudio, 150);
  });
};



var selectSong = function(){
  if(!isRecording){
    isRecording = true;

    var index = $('#song-selector').find('.song').index('.selected');
    selectedSong = $('#audio-clips').find('audio')[index];
    selectedSong.pause();
    selectedSong.currentTime = 0;

    $('#song-selector').addClass('highlight');
    setTimeout(function(){
      $('#song-selector').removeClass('highlight');
    }, 100);

    setTimeout(function(){
      selectedSong.volume = 0;
      selectedSong.play();
      fadeIn(selectedSong, 3000);
    }, 1000);

    setTimeout(startCountdown, 250);
  }
};



var startCountdown = function(){
  $('#song-selector').removeClass('show');
  $('#countdown').addClass('show');
  socket.emit('prep-stage');

  var video = $('#countdown').find('video')[0];
  video.onended = function(e) {
    socket.emit('rock-out');

    setTimeout(function(){
      fadeOut(selectedSong, 500, function(){
        socket.emit('clean-stage');
        location.reload();
      });
    }, 3000);
  };
  video.play();
};



var socket = io();
socket.on('select-song', selectSong);
socket.on('next-song', function(){
  if($('section.screen.show').attr('id') == 'instructions')
    showSongSelector();
  else
    nextSong();
});
