var songs = [
  {
    "artist": "Beastie Boys",
    "title": "Sabotage",
    "src" : "BEASTIE_BOYS_SABOTAGE.mp3",
    "selector": "sabotage"
  },
  {
    "artist": "Heart",
    "title": "Barracuda",
    "src" : "HEART_BARRACUDA.mp3",
    "selector": "barracuda"
  },
  {
    "artist": "Guns and Roses",
    "title": "Paradise City",
    "src" : "GNR_PARADISE.mp3",
    "selector": "paradise"
  },
  {
    "artist": "Prince",
    "title": "Let's Go Crazy",
    "src" : "PRINCE_LETS_GO_CRAZY.mp3",
    "selector": "crazy"
  },
  {
    "artist": "The Darkness",
    "title": "I Believe in a thing called love",
    "src" : "DARKNESS_THING_CALLED_LOVE.mp3",
    "selector": "love"
  },
  {
    "artist": "Joan Jett",
    "title": "I Love Rock and Roll",
    "src" : "JOAN_JETT_I_LOVE_ROCKNROLL.mp3",
    "selector": "rock"
  }
];


var buildSongTemplates = function(){
  songs.forEach(function(song, i){
    var klass = '';

    if(i === 0) klass = 'selected';
    klass += ' ' + song.selector;

    var songTemplate = [
      '<div class="song ' + klass + '" data-title="' + song.title + '">',
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
