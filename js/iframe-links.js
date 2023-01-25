// Create an object containing the iframe links and names
var links = {
  "link1": "/select.md",
  "link2": "https://skool.com",
  "link3": "https://discord.com"
};

// Create a function that changes the iframe's src to the selected link
function changeIframe(linkName) {
  var iframe = document.getElementById("iframe");
  iframe.src = links[linkName];
}

