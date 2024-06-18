const drawDeck = document.getElementById("draw-deck");
const drawCards = document.getElementById("draw-cards");
const cardsContainer = document.getElementById('cards-container');

const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');

let deckId;

drawDeck.addEventListener("click", handleClick);
drawCards.addEventListener("click", handleDrawCards);

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId)
      // return deckId;
    })
}

function handleDrawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        handleClick()
        // handleDrawCards()
      } else {
        console.log(data.cards)

        card1.innerHTML = `
            <img src="${data.cards[0].image}" alt="${data.cards[0].value} of ${data.cards[0].suit}">`;
        card2.innerHTML = `
            <img src="${data.cards[1].image}" alt="${data.cards[1].value} of ${data.cards[1].suit}">`;
      }
    })
}
