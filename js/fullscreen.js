document.addEventListener("keydown", function(event) {
  if (event.code === "KeyF") fullscreen();
});

function fullscreen() {
  let iframe = document.getElementById('game-frame');
  if (!iframe) iframe = document.getElementById('app-frame');
  
  if (iframe.requestFullscreen) iframe.requestFullscreen();
  else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
  else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen();
  else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
};
