
function calculatePoints (element) {

var totalPoints;
var points = element.map((card,i) => {

    if (card[i] == A) {
        points = 11;
        totalPoints +=points;
    }
    else if (card[i] == X || card[i] == J || card[i] == Q || card[i] == K) {
        points = 10;
        totalPoints += points;
    }
    else {
        points = card[i];
        totalPoints+=points;
    }

    return totalPoints;
});

}


function newDeck() {
 
  const suits = "SDCH";
  const ranks = "123456789XJQKA";

  const deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(ranks[j] + suits[i] + ".png");
    }
  }

  return deck;
}

function getRandomCard(element) {
  var j = Math.floor(Math.random() * element.length);

  return element[j + 1];
}

function createCardElement(element) {
  const newCard = document.createElement("img");
  newCard.src = `cards/${element}`;
  newCard.classList.add("card-image");
  return newCard;
}

function dealCard() {
  const dealerCard = document.getElementById("dealer");
  const playerCard = document.getElementById("player");
  const card = newDeck();
  const newHandButton = document.getElementById("new-hand");
  newHandButton.addEventListener("click", function () {
    dealerCard.innerHTML = "";
    playerCard.innerHTML = "";

    for (let i = 0; i < 2; i++) {
      playerCard.appendChild(createCardElement(getRandomCard(card)));
    }
    dealerCard.appendChild(createCardElement(getRandomCard(card)));
  });

  const hitButton = document.getElementById("hit");
  hitButton.addEventListener("click", function () {
    playerCard.appendChild(createCardElement(getRandomCard(card)));
  });
  const stayButton = document.getElementById("stay");
  stayButton.addEventListener("click", function () {
    dealerCard.appendChild(createCardElement(getRandomCard(card)));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  dealCard();
});
