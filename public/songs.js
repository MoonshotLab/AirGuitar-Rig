var songs = [
  {
    "artist": "Beastie Boys",
    "title": "Sabotage",
    "src" : "BEASTIE_BOYS_SABOTAGE.mp3"
  },
  {
    "artist": "The Darkness",
    "title": "I Believe in a thing called love",
    "src" : "DARKNESS_THING_CALLED_LOVE.mp3"
  },
  {
    "artist": "Guns and Roses",
    "title": "Paradise City",
    "src" : "GNR_PARADISE.mp3"
  },
  {
    "artist": "Heart",
    "title": "Barracuda",
    "src" : "HEART_BARRACUDA.mp3"
  },
  {
    "artist": "Joan Jett",
    "title": "I Love Rock and Roll",
    "src" : "JOAN_JETT_I_LOVE_ROCKNROLL.mp3"
  },
  {
    "artist": "Prince",
    "title": "Let's Go Crazy",
    "src" : "PRINCE_LETS_GO_CRAZY.mp3"
  }
];


var buildSongTemplates = function(){
  songs.forEach(function(song, i){
    var klass = '';

    if(i === 0) klass = 'selected';
    var songTemplate = [
      '<div data-src="/songs/' + song.src + '" class="song ' + klass + '">',
        '<h1>' + song.title + '</h1>',
        '<h2>' + song.artist + '</h2>',
      '</div>'
    ].join('');

    var audioTemplate = [
      '<audio>',
        '<source src="/songs/' + song.src + ' "/>',
      '</audio>'
    ].join('');

    $('#song-selector').append(songTemplate);
    $('#audio-clips').append(audioTemplate);
  });
};
