let cards = [
"AC.png","2C.png", "3C.png","4C.png",
"5C.png","6C.png","7C.png","8C.png",
"9C.png","XC.png","JC.png","QC.png",
"KC.png","AH.png","2H.png", "3H.png",
"4H.png","5H.png","6H.png","7H.png",
"8H.png","9H.png","XH.png","JH.png",
"QH.png","KH.png","AS.png","2S.png",
"3S.png","4S.png","5S.png","6S.png",
"7S.png","8S.png","9S.png","XS.png",
"JS.png","QS.png","KS.png","AD.png",
"2D.png", "3D.png","4D.png","5D.png",
"6D.png","7D.png","8D.png","9D.png",
"XD.png","JD.png","QD.png","KD.png"];


/*
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

}*/

function getRandomCard(element) {
    var i = Math.floor(Math.random()* element.length);

    return element[i+1];
}

function createCardElement(card) {

    const newCard = document.createElement("img");
    newCard.src = `cards/${card}`;
    newCard.classList.add("card-image");
    return newCard;
}

function dealCard() {
    
    const randomCard = getRandomCard(cards);
    const dealerCard = document.getElementById("dealer");
    const playerCard = document.getElementById("player");
    const newCardElement = createCardElement(randomCard);
   
const newHandButton = document.getElementById("new-hand");
newHandButton.addEventListener("click", function() {
    //dealerCard.innerHTML = "";
    //playerCard.innerHTML = "";


    while (dealerCard.firstChild) {
        dealerCard.removeChild(dealerCard.firstChild);
    }

    while (playerCard.firstChild) {
        playerCard.removeChild(playerCard.firstChild);
    }
    
    for(let i=0; i<2;i++){
        playerCard.appendChild(createCardElement(getRandomCard(cards)));
    }
   
    dealerCard.appendChild(createCardElement(getRandomCard(cards)));
    });

const hitButton = document.getElementById("hit");
hitButton.addEventListener("click", function() {
playerCard.appendChild(createCardElement(getRandomCard(cards)));
});
const stayButton = document.getElementById("stay");
stayButton.addEventListener("click", function() {
dealerCard.appendChild(createCardElement(getRandomCard(cards)));
});

}

document.addEventListener("DOMContentLoaded", function () {
    dealCard();

})




