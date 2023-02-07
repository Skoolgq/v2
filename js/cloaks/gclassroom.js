const changeFaviconButton = document.getElementById("cloakclassroom");

  changeFaviconButton.addEventListener("click", function() {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://ssl.gstatic.com/classroom/favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);

    document.title = "Classes";

    localStorage.setItem("favicon", link.href);
    localStorage.setItem("title", document.title);
  });

  const storedFavicon = localStorage.getItem("favicon");
  const storedTitle = localStorage.getItem("title");

  if (storedFavicon && storedTitle) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = storedFavicon;
    document.getElementsByTagName('head')[0].appendChild(link);

    document.title = storedTitle;
  }
