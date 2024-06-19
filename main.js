const drawDeck = document.getElementById("draw-deck");
const drawCards = document.getElementById("draw-cards");
const cardsContainer = document.getElementById('cards-container');
const headerTitle = document.getElementById('header-title');
const remainingCards = document.getElementById('remaining-cards');
const computerScore = document.getElementById('computer-score');
const playerScore = document.getElementById('player-score');


const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');

let deckId;
let playerPoints = 0
let computerPoints = 0;

drawCards.classList.add('disabled')
drawDeck.addEventListener("click", handleClick);
drawCards.addEventListener("click", handleDrawCards);

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.textContent = `Remaining cards: ${data.remaining} `
      headerTitle.textContent = "Game of War"
      computerScore.textContent = `Computer: 0`;
      playerScore.textContent = `Player: 0`;

      drawCards.classList.remove('disabled')
      drawCards.disabled = false
    })
}

function handleDrawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      remainingCards.textContent = `Remaining cards: ${data.remaining} `

      card1.innerHTML = `<img src="${data.cards[0].image}" alt="${data.cards[0].value} of ${data.cards[0].suit}">`;
      card2.innerHTML = `<img src="${data.cards[1].image}" alt="${data.cards[1].value} of ${data.cards[1].suit}">`;

      const winnerText = winingCard(data.cards[0].value, data.cards[1].value);
      headerTitle.textContent = winnerText;

      if (data.remaining === 0) {
        drawCards.classList.add('disabled')
        drawCards.disabled = true
        drawDeck.classList.remove('disabled')
        drawDeck.disabled = false;
        gameEnded(computerPoints, playerPoints)
      } else {
        drawDeck.classList.add('disabled')
        drawDeck.disabled = true;
      }
    })
}

function winingCard(value1, value2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

  const indexCard1 = valueOptions.indexOf(value1);
  const indexCard2 = valueOptions.indexOf(value2);

  if (indexCard1 === indexCard2) {
    return 'WAR!';
  } else if (indexCard1 > indexCard2) {
    computerPoints++
    computerScore.textContent = `Computer: ${computerPoints}`;
    return 'Computer Scores!';
  } else {
    playerPoints++;
    playerScore.textContent = `Player: ${playerPoints}`;
    return 'Player Scores!';
  }
}

function gameEnded(computerS, playerS) {
  if (computerS === playerS) {
    headerTitle.textContent = "It's a Tie!"
  } else if (computerS > playerS) {
    headerTitle.textContent = "The computer won the game!"
  }
  else {
    headerTitle.textContent = "Player won the game!"
  }
}