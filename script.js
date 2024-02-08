let words = [
  ["apple", "Fruit used for cider making", "apple.jpg"],
  ["banana", "Fruit that has a variety named 'Cavendish'", "banana.jpg"],
  ["chair", "Furniture", "chair.jpg"],
  ["dog", "Pet", "dog.jpg"],
  ["elephant", "Animal with a trunk", "elephant.jpg"],
  ["flower", "Associated with plants reproducing", "flower.jpg"],
  ["grape", "Fruit used to make wine", "grape.jpg"],
  ["horse", "Animal", "horse.jpg"],
  ["igloo", "Shelter", "igloo.jpg"],
  ["jacket", "Clothing", "jacket.jpg"],
  ["kangaroo", "Marsupilanian", "kangaroo.jpg"],
  ["lion", "Animal you see in a safari reserve", "lion.jpg"],
  ["monkey", "Primate", "monkey.jpg"],
  ["nose", "Part of the body", "nose.jpg"],
  ["orange", "Citrus", "orange.jpg"],
  ["penguin", "Bird", "penguin.jpg"],
  ["quilt", "Cover", "quilt.jpg"],
  ["rabbit", "Rodent", "rabbit.jpg"],
  ["sun", "Planet", "sun.jpg"],
  ["tree", "Produces oxygen during the day", "tree.jpg"],
];
let coincidenceCounter;
let foundLetterArray = [];
let randomWord = null;
let successCounter = 0;
let explanation;
let clickableLetterArray = [];
let alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
let randomIndex;
let mistake = parseInt(localStorage.getItem('mistake')) || 1;
let points = parseInt(localStorage.getItem('points')) || 0;



function checkName() {
  let username = document.getElementById("name").value;

  if (username == "") {
    alert("Please fill in your name");
  } else {
    startGame(false);
  }
}
// initiates game elements if first go, else it recovers them and changes them to suit new word.
function startGame(update) {
  coincidenceCounter  = 0;
  randomIndex = Math.floor(Math.random() * 20);
  randomWord = words[randomIndex][0];
  explanation = words[randomIndex][1];
  foundLetterArray = [];
  let initialMessageBox = document.getElementById("initialMessageBox");
  if (initialMessageBox != null) {
    initialMessageBox.remove();
  }
  addMaskedWords(update);
  createLetterButtons(update);
  addHintToGame(update);
  updateImgHangMan(mistake);
}

//function in which most of the game functionality is handled
function handleClick(event) {
  let letter = event.dataset.letter;
  // Check if coincidence
  let wordChar = randomWord.split("");
  for (let i = 0; i < wordChar.length; i++) {
    if (wordChar[i] == letter && wordChar[i] != ".") {
      foundLetterArray.push(letter);
      updateBlanksForFoundLetter();
      coincidenceCounter++;
      console.log("acierto");
      console.log("aciertos:" + coincidenceCounter);
      
    } 
  }
  if(!wordChar.includes(letter)){
    mistake++;
    console.log("mistake: "+ mistake);
    updateImgHangMan(mistake);
  }
  checkIfWordIsGuessed(coincidenceCounter, randomWord);
}
function updatePointsPanel(){
  let point = document.getElementById("points");
  point.innerHTML = points;
}
function updateImgHangMan(mistake) {
  let hangmanImg = document.getElementById("hangmanImg");
  hangmanImg.src = "img/hangman" + mistake + ".png";
}
function checkIfWordIsGuessed(coincidences, wordCharArray) {
  if (wordCharArray.length == coincidences) {
    startGame(true);
    points++;
    updatePointsPanel();
  }
}

function updateBlanksForFoundLetter() {
  wordArea = document.getElementById("wordArea");
  charWordArray = randomWord.split("");
  let underscoresWithFoundLetters = [];

  charWordArray.forEach((foundLetter) => {
    if (
      foundLetterArray.includes(foundLetter.toLowerCase()) ||
      foundLetterArray.includes(foundLetter.toUpperCase())
    ) {
      underscoresWithFoundLetters.push(foundLetter + " ");
    } else {
      underscoresWithFoundLetters.push("__ ");
    }
    wordArea.innerHTML = underscoresWithFoundLetters.join(" ");
  });
}

function addHintToGame(update) {
  let hint;
  let pointBox;
  if (!update) {
    hint = document.createElement("h1");
    hint.id = "hint";
    hint.className = "gameArea";
    pointBox = document.createElement("h1");
    pointBox.id = "points";
    document.body.appendChild(pointBox);
    document.body.appendChild(hint);
  } else {
    hint = document.getElementById("hint");
    pointBox = document.getElementById("points");
  }

  hint.innerHTML = explanation;
  pointBox.innerHTML = points;
}

function addMaskedWords(update) {
  let underscores = "__ ".repeat(randomWord.length);
  let underscoresArea;
  if (!update) {
    underscoresArea = document.createElement("h1");
    underscoresArea.id = "wordArea";
    underscoresArea.innerHTML = underscores;
    underscoresArea.className = "gameArea";
    document.body.appendChild(underscoresArea);
  } else {
    underscoresArea = document.getElementById("wordArea");
    underscoresArea.innerHTML = underscores;
  }
}

function createLetterButtons(update) {
  if (!update) {
    alphabetArray.forEach((letter) => {
      let clickableLetterButton = document.createElement("button");
      clickableLetterButton.innerHTML = letter;
      clickableLetterButton.dataset.letter = letter;
      clickableLetterButton.dataset.available = true;
      clickableLetterButton.className = "button";

      clickableLetterButton.addEventListener("click", function () {
        handleClick(clickableLetterButton);
      });
let area = document.getElementById("buttonArea");
      area.appendChild(clickableLetterButton);
    });
  }
}

window.addEventListener('beforeunload', function() {
  // Save data to localStorage
  localStorage.setItem('points', points);
  localStorage.setItem('mistake', mistake);
  localStorage.setItem('name', mistake);
  localStorage.setItem('wordIndex', randomIndex);
});
