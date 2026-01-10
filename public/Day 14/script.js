var song = document.getElementById("song");
var icon = document.getElementById("play-button");

icon.onclick = function() {
    if(song.paused) {
        song.play();
        icon.src = "media/pause icon.png";
    } else {
        song.pause();
        icon.src = "media/play icon.png";
    }
   
}