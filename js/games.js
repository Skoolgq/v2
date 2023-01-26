// Create an object containing the game names, icons, and iframe links
var games = [
  {
    name: "Subway Surfers",
    icon: "https://play-lh.googleusercontent.com/NVJuKheL9D0uzQf-QNTBtcr7BzfUwwqi4-zKVddVdxrsMdoNAv7k332oso9th4ns4Xwa",
    link: "https://3kho.github.io/projects/subway-surfers/index.html"
  },
  {
    name: "Game 2",
    icon: "game2-icon.png",
    link: "game2.html"
  },
  {
    name: "Game 3",
    icon: "game3-icon.png",
    link: "game3.html"
  }
];

// Create a function that creates the iframe file for each game
function createIframeFile(game) {
  var iframe = document.createElement("iframe");
  iframe.src = game.link;
  iframe.classList.add("game-iframe");
  document.body.appendChild(iframe);
}

// Create a function that creates the game card for each game
function createGameCard(game) {
  var gameCard = document.createElement("div");
  gameCard.classList.add("game-card");
  gameCard.innerHTML = `
    <img src="${game.icon}" alt="${game.name} Icon">
    <h2>${game.name}</h2>
    <a href="#" onclick="createIframeFile('${game.link}')">Play</a>
  `;
  document.getElementById("games-container").appendChild(gameCard);
}

// Create the game cards for each game in the games object
games.forEach(function(game) {
  createGameCard(game);
});
