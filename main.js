const drawCards = document.getElementById("draw-cards");

drawCards.addEventListener("click", handleClick);

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
