console.log('%c%s', 'font-size: 26px;', "welcome to the console");
console.log('%c%s', 'font-size: 18px;', "you probably don't know why you're here.");
console.log('%c%s', 'font-size: 14px;', "so just close this panel and carry along. good day!");

if(localStorage.uvBackend == null)
{
    localStorage.uvBackend = "obliged-gisele-thetatortotgod.koyeb.app";
}
localStorage.setItem("currentapp", localStorage.currentapp.replace("{proxy}", localStorage.uvBackend))
localStorage.setItem("currentgame", localStorage.currentapp.replace("{proxy}", localStorage.uvBackend))