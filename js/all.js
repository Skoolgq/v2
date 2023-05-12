console.log('%c%s', 'font-size: 26px;', "welcome to the console");
console.log('%c%s', 'font-size: 18px;', "you probably don't know why you're here.");
console.log('%c%s', 'font-size: 14px;', "so just close this panel and carry along. good day!");

const uvBackendList = ["holyubofficial.net/runtime~react/service/", "metallic.gq/ultraviolet/", "campusdirections.org/runtime~react/service/", "genebelcher.cyclic.app/uv/service/"];
localStorage.uvBackend = uvBackendList[Math.floor(Math.random() * uvBackendList.length)];
localStorage.setItem("currentapp", localStorage.currentapp.replace("{proxy}", localStorage.uvBackend))
localStorage.setItem("currentgame", localStorage.currentapp.replace("{proxy}", localStorage.uvBackend))

// get the current URL
const currentUrl = window.location.href;
// get the ad divs
const popunderdiv = document.querySelector('#popunder-ad');

// check the URL and replace the div with different HTML code based on the URL
if (currentUrl.includes('skoolgq.github.io')) {
  popunderdiv.innerHTML = "<script type='text/javascript' src='//pl19358963.highrevenuegate.com/91/8e/f0/918ef00884db501fa39b827dc69381cd.js'></script>";
} else if (currentUrl.includes('ela.pages.dev')) {
  popunderdiv.innerHTML = '<h1>testing code, ignore</h1>';
} else {
  popunderdiv.innerHTML = '<h1>Welcome to the Default Website</h1><p>This is the default website.</p>';
}
