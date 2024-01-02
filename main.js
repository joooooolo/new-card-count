let dealerScore = 0;
let playerScore = 0;
let dealerAceScore = 0;
let playerAceScore = 0;
let hidden;
let deck;
let onHit = true;
let hiddenImage = document.createElement("img");
//hiddenImage.src = "cards/BACK.png";

//main onload function
window.onload = function () {
  newDeck();
  shuffleDeck();
  document.getElementById("new-hand").addEventListener("click", newHand);
};

//generates new deck of cards
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

//shuffles deck and draws random cards
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[j];
    deck[j] = deck[i];
    deck[i] = temp;
  }
}

//main function and executes once user clicks new hand button
function newHand() {
  //generate a new deck after the last card of the deck array is generated
  if (deck.length === 0) {
    newDeck();
    shuffleDeck();
  }

  dealerScore = 0;
  playerScore = 0;

  //starts empty fields for dealer and user
  document.getElementById("dealer-cards").innerHTML = "";
  document.getElementById("player-cards").innerHTML = "";
  // added both to fix bug lets see
  hiddenImage.src = "cards/BACK.png"; //--==--to fix bug for hidden image once new hand button is clicked
  //pops card and appends it to hidden image facedown
  hidden = deck.pop();
  document.getElementById("dealer-cards").appendChild(hiddenImage);

  //draws to cards to player and checks score
  for (let i = 0; i < 2; i++) {
    let cardImage = document.createElement("img");
    let card = deck.pop();
    cardImage.src = "cards/" + card;

    document.getElementById("player-cards").appendChild(cardImage);
    playerScore += getScore(card);
    document.getElementById("player-score").innerHTML = playerScore;

    //added if statement to count aces for player
    if (card[0] == "A") {
      playerAceScore += 1;
    }

    if (playerScore < 21) {
      onHit = true;
    }

    if (playerScore == 21 && playerAceScore == 1) {
      //added playerAceScore to check player blackjack
      onHit = false;
      document.getElementById("results").innerText = "BLACKJACK";

      stay();
      //return;
    }
  }

  //draws one card to dealer beside the facedown card
  let cardImage = document.createElement("img");
  let card = deck.pop();
  cardImage.src = "cards/" + card;

  document.getElementById("dealer-cards").appendChild(cardImage);
  dealerScore += getScore(card);
  document.getElementById("dealer-score").innerHTML = dealerScore;

  //dealerAceScore to check for dealer Aces
  if (card[0] == "A") {
    dealerAceScore += 1;
    dealerScore -= 10; //moves ace value to 1 every single time
  }

  if (onHit) {
    document.getElementById("hit").addEventListener("click", hit);
  } else {
    return;
  }

  document.getElementById("stay").addEventListener("click", stay);
}

//draws one card to player and updates and checks user score
function hit() {
  if (!onHit) {
    return;
  }

  let cardImage = document.createElement("img");
  let card = deck.pop();
  cardImage.src = "cards/" + card;
  playerScore += getScore(card);

  //check if user draws ace card and updates score
  if (playerScore > 21 && card[0] == "A") {
    playerAceScore += 1;
    onHit = true;
    playerScore -= 10;
  }

  document.getElementById("player-cards").append(cardImage);
  document.getElementById("player-score").innerHTML = playerScore;

  if (playerScore == 21) {
    //onHit = false;
    //document.getElementById("results").innerText = "BLACKJACK";   //fixed bug
    //return;
    stay();
  }

  if (playerScore > 21) {
    onHit = false;
    //onHit = false;
    document.getElementById("results").innerText = "Dealer Wins";
    return;
  }

  if (playerScore == dealerScore) {
    document.getElementById("results").innerText = "Tie!";
  }
}

//Function stay, draws cards to dealer up to 17 and compares score with user
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

    //checks if dealer draws ace card and updates score
    if (dealerScore > 21 && card[0] == "A") {
      dealerAceScore += 1;
      onHit = true;
      dealerScore -= 10;
    }
  }

  if (dealerScore == 21 && dealerAceScore == 1) {
    if (dealerScore == playerScore && dealerAceScore == playerAceScore) {
      // dealing with blackjack for player and dealer

      message = "BLACKJACK FOR BOTH SUCKER";
    } //dealing with dealer blackjack
    message = "BLACKJACK! DEALER WINS";
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("hit").removeEventListener("click", hit);
  }

  if (dealerScore > 21 || dealerScore < playerScore) {
    message = "Player Wins";
  } else if (dealerScore == 21 || dealerScore > playerScore) {
    message = "Dealer Wins";
  } else if (dealerScore == playerScore) {
    message = "Tie";
  }

  document.getElementById("dealer-score").innerHTML = dealerScore;
  document.getElementById("results").innerText = message;
  document.getElementById("stay").removeEventListener("click", stay);
  document.getElementById("hit").removeEventListener("click", hit);
}

//function to calculate cards score
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
