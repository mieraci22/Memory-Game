const gameContainer = document.getElementById("game");

let numPairs = 6; // Define the number of pairs
let shuffledColors; // Declare shuffledColors
let score = 0;
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let noClicking = false;

function generateRandomColors(numPairs) {
  const colors = [];
  for (let i = 0; i < numPairs; i++) {
    const color = getRandomColor();
    colors.push(color, color);
  }
  return colors;
}

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 70%)`;
}

function shuffle(array) {
  let counter = array.length;
  // Shuffle logic...
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.style.backgroundColor = 'gray';
    newDiv.setAttribute('data-color', color);
    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (noClicking) return;
  let clickedCard = event.target;

  if (clickedCard === firstCard) return; // Prevent double click on the same card

  clickedCard.style.backgroundColor = clickedCard.getAttribute('data-color');
  if (!firstCard || !secondCard) {
    clickedCard.classList.add('flipped');
    firstCard = firstCard || clickedCard;
    secondCard = clickedCard === firstCard ? null : clickedCard;
    cardsFlipped++;
  }

  if (cardsFlipped === 2) {
    noClicking = true;
    let firstCardColor = firstCard.getAttribute('data-color');
    let secondCardColor = secondCard.getAttribute('data-color');

    if (firstCardColor === secondCardColor) {
      cardsFlipped = 0;
      firstCard = null;
      secondCard = null;
      noClicking = false;
      score++; // Increment score for a match
    } else {
      setTimeout(() => {
        firstCard.style.backgroundColor = 'gray';
        secondCard.style.backgroundColor = 'gray';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;
        cardsFlipped = 0;
        noClicking = false;
      }, 1000);
    }
    updateScoreDisplay();
  }
}

function startGame() {
  shuffledColors = shuffle(generateRandomColors(numPairs));
  createDivsForColors(shuffledColors);
  document.getElementById('startGame').style.display = 'none';
  document.getElementById('restartGame').style.display = 'block';
  score = 0;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.getElementById('score').textContent = score;
}

function restartGame() {
  // Clear existing cards
  gameContainer.innerHTML = '';
  // Reset game state
  firstCard = null;
  secondCard = null;
  cardsFlipped = 0;
  noClicking = false;
  score = 0;
  updateScoreDisplay();
  // Restart the game
  startGame();
}

document.getElementById('StartGame').addEventListener('click', startGame);
document.getElementById('restartGame').addEventListener('click', restartGame);
