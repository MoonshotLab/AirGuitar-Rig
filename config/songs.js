var songs = [
  {
    "phidgetId": "0",
    "artist": "Eddie Van Halen",
    "song": "Hot for Teacher"
  },
  {
    "phidgetId": "1",
    "artist": "Joan Jett",
    "song": "I Love Rock `n` Roll"
  },
  {
    "phidgetId": "2",
    "artist": "The Rolling Stones",
    "song": "Paint it Black"
  },
  {
    "phidgetId": "3",
    "artist": "AC/DC",
    "song": "You Shook Me All Night Long"
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

exports.lookup = lookup;
