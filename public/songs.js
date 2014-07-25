var songs = [
  {
    "artist": "Eddie Van Halen",
    "title": "Hot for Teacher",
    "src" : ""
  },
  {
    "artist": "Joan Jett",
    "title": "I Love Rock `n` Roll",
    "src" : ""
  },
  {
    "artist": "The Rolling Stones",
    "title": "Paint it Black",
    "src" : ""
  },
  {
    "artist": "AC/DC",
    "title": "You Shook Me All Night Long",
    "src" : ""
  }
];


var lookup = function(phidgetId){
  var selectedSong = songs[0];

  songs.forEach(function(song){
    if(song.phidgetId == phidgetId){
      selectedSong = song;
    }
  });

  return selectedSong;
};


var buildSongTemplates = function(){
  songs.forEach(function(song, i){
    var klass = '';
    if(i === 0) klass = 'selected';
    var template = [
      '<div data-src="' + song.src + '" class="song ' + klass + '">',
        '<h1>' + song.title + '</h1>',
        '<h2>' + song.artist + '</h2>',
      '</div>'
    ].join('');

    $('#songs').append(template);
  });
};
