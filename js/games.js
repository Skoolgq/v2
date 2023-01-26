// Create an object containing the game names, icons, and iframe links
var games = [
  {
    "name": "Subway Surfers",
    "icon": "https://play-lh.googleusercontent.com/NVJuKheL9D0uzQf-QNTBtcr7BzfUwwqi4-zKVddVdxrsMdoNAv7k332oso9th4ns4Xwa",
    "link": "https://3kho.github.io/projects/subway-surfers/index.html"
  },
  {
    "name": "Game 2",
    "icon": "icon2.png",
    "link": "https://game2.com"
  },
  {
    "name": "Game 3",
    "icon": "icon3.png",
    "link": "https://game3.com"
  }
];

// Create a function that creates a game card for each game
function createGameCards() {
  var gamesContainer = document.getElementById("games-container");
  for (var i = 0; i < games.length; i++) {
    var gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
        <img src="${games[i].icon}" alt="${games[i].name}">
        <h2>${games[i].name}</h2>
        <a href="${games[i].link}" target="_blank">Play</a>
    `;
    gamesContainer.appendChild(gameCard);
  }
}
