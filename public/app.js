var socket = io();
socket.on('next-song', function(data){
  nextSong();
});


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
