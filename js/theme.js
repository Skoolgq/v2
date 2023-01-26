// check if there's already a theme saved in local storage
var currentTheme = localStorage.getItem("theme") || "light";

// apply the saved theme
document.body.classList.add(currentTheme);
document.getElementById(currentTheme + "-mode").classList.add("active");

// switch theme function
function switchTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
  document.getElementById("light-mode").classList.remove("active");
  document.getElementById("dark-mode").classList.remove("active");
  document.getElementById(theme + "-mode").classList.add("active");
  localStorage.setItem("theme", theme);
}
