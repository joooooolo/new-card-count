var dealerScore = 0;
var playerScore = 0;
var dealerAceScore = 0;
var playerAceScore = 0;
var hidden;
var deck;
var onHit = true;
let hiddenImage = document.createElement("img");
hiddenImage.src = "cards/BACK.png";

window.onload = function () {
  newDeck();
  shuffleDeck();
  //gameplay();
  document.getElementById("new-hand").addEventListener("click", newHand);
};

//create cards deck
function newDeck() {
  const suits = "SDCH";
  const ranks = "23456789XJQKA";
  deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(ranks[j] + suits[i] + ".png");
    }
  }
}

//shuffle cards deck
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    var j = Math.floor(Math.random() * deck.length);
    let temp = deck[j];
    deck[j] = deck[i];
    deck[i] = temp;
  }
}

function newHand() {
  //onHit = false;

  dealerScore = 0;
  playerScore = 0;
  document.getElementById("dealer-cards").innerHTML = "";
  document.getElementById("player-cards").innerHTML = "";

  //testing hidden
  hidden = deck.pop();
  //let hiddenImage = document.createElement("img");
  //hiddenImage.src = "cards/BACK.png";
  document.getElementById("dealer-cards").appendChild(hiddenImage);

  for (let i = 0; i < 2; i++) {
    let cardImage = document.createElement("img");
    let card = deck.pop();
    cardImage.src = "cards/" + card;

    document.getElementById("player-cards").appendChild(cardImage);
    playerScore += getScore(card);
    document.getElementById("player-score").innerHTML = playerScore;

    if (playerScore < 21) {
      onHit = true;
    }

    if (playerScore == 21) {
      onHit = false;
      document.getElementById("results").innerText = "BLACKJACK";
      return;
    }
  }

  let cardImage = document.createElement("img");
  let card = deck.pop();
  cardImage.src = "cards/" + card;

  document.getElementById("dealer-cards").appendChild(cardImage);
  dealerScore += getScore(card);
  document.getElementById("dealer-score").innerHTML = dealerScore;
  //dealerScore += getScore(hidden);

  if (onHit) {
    document.getElementById("hit").addEventListener("click", hit);
  } else {
    return;
  }

  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  //document.getElementById("hit").addEventListener("click", function() {

  if (!onHit) {
    return;
  }

  let cardImage = document.createElement("img");
  let card = deck.pop();
  cardImage.src = "cards/" + card;
  playerScore += getScore(card);
  document.getElementById("player-cards").append(cardImage);
  document.getElementById("player-score").innerHTML = playerScore;

  if (playerScore == 21) {
    onHit = false;
    document.getElementById("results").innerText = "BLACKJACK";
    //document.getElementById("hit").removeEventListener("click", hit);
    return;
  }

  if (playerScore > 21) {
    onHit = false;
    //onHit = false;
    document.getElementById("results").innerText = "Dealer Wins";
    //document.getElementById("hit").removeEventListener("click", hit);
    return;
  }

  if (playerScore == dealerScore) {
    document.getElementById("results").innerText = "Tie!";
  }
  document.getElementById("hit").removeEventListener("click", hit);
  //});
}

function stay() {
  onHit = false;
  hiddenImage.src = "cards/" + hidden;
  dealerScore += getScore(hidden);
  let message = "";
  //document.getElementById("dealer-score").innerHTML = dealerScore;
  while (dealerScore < 17) {
    let card = deck.pop();
    let newCard = document.createElement("img");
    newCard.src = "cards/" + card;
    document.getElementById("dealer-cards").appendChild(newCard);
    dealerScore += getScore(card);
  }

  if (dealerScore > 21) {
    message = "Player Wins";
  }

  if (dealerScore == 21) {
    message = "Dealer Wins";
  } else if (dealerScore == playerScore) {
    message = "Tie";
  } else if (dealerScore > playerScore) {
    message = "Dealer Wins";
  } else if (dealerScore < playerScore) {
    message = "Player Wins";
  }

  document.getElementById("dealer-score").innerHTML = dealerScore;
  document.getElementById("results").innerText = message;
  document.getElementById("stay").removeEventListener("click", stay);
  document.getElementById("stay").removeEventListener("click", hit);
}

function getScore(card) {
  let data = card.split("");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }

    return 10;
  }

  return parseInt(value);
}
