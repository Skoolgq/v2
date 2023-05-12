console.log('%c%s', 'font-size: 26px;', "welcome to the console");
console.log('%c%s', 'font-size: 18px;', "you probably don't know why you're here.");
console.log('%c%s', 'font-size: 14px;', "so just close this panel and carry along. good day!");

const uvBackendList = ["holyubofficial.net/runtime~react/service/", "metallic.gq/ultraviolet/", "campusdirections.org/runtime~react/service/", "genebelcher.cyclic.app/uv/service/"];
localStorage.uvBackend = uvBackendList[Math.floor(Math.random() * uvBackendList.length)];
localStorage.setItem("currentapp", localStorage.currentapp.replace("{proxy}", localStorage.uvBackend))
localStorage.setItem("currentgame", localStorage.currentapp.replace("{proxy}", localStorage.uvBackend))
