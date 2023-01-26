const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  const div = document.querySelector('body');
  if (body.classList.contains('dark-mode')) {
  document.cookie = "theme=light";
  document.body.classList.add("dark-mode")
  } else {
  document.cookie = "theme=dark";
  document.body.classList.remove("dark-mode")
  }
})
