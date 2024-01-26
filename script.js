let words = [
  ["Apple", "Fruit used for cider making", "apple.jpg"],
  ["Banana", "Fruit that has a variety named 'Cavendish'", "banana.jpg"],
  ["Chair", "Furniture", "chair.jpg"],
  ["Dog", "Pet", "dog.jpg"],
  ["Elephant", "Animal with a trunk", "elephant.jpg"],
  ["Flower", "Associated with plants reproducing", "flower.jpg"],
  ["Grape", "Fruit", "grape.jpg"],
  ["Horse", "Animal", "horse.jpg"],
  ["Igloo", "Shelter", "igloo.jpg"],
  ["Jacket", "Clothing", "jacket.jpg"],
  ["Kangaroo", "Marsupilanian", "kangaroo.jpg"],
  ["Lion", "Animal you see in a safari reserve", "lion.jpg"],
  ["Monkey", "Primate", "monkey.jpg"],
  ["Nose", "Part of the body", "nose.jpg"],
  ["Orange", "Citrus", "orange.jpg"],
  ["Penguin", "Bird", "penguin.jpg"],
  ["Quilt", "Cover", "quilt.jpg"],
  ["Rabbit", "Rodent", "rabbit.jpg"],
  ["Sun", "Planet", "sun.jpg"],
  ["Tree", "Produces oxygen during the day", "tree.jpg"],
];
let coincidence = null;
let foundLetterArray = [];
let randomWord = null;
let successCounter = 0;
let explanation ;
let clickableLetterArray = [];
let alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
let randomIndex;
function checkName() {
  let username = document.getElementById("name").value;

  if (username == "") {
    alert("Please fill in your name");
  } else {
    startGame();
  }
}

function startGame() {
  randomIndex = Math.floor(Math.random() * 20);
  foundLetterArray = [];
  let initialMessageBox = document.getElementById("initialMessageBox");
if (initialMessageBox != null){
  initialMessageBox.remove();
}
  explanation = words[randomIndex][1];
  randomWord = words[randomIndex][0];
executeGameFunctionality();
}

function executeGameFunctionality(){
  addHintToGame(true);
  addMaskedWords();
  addLetterButtons();
  showLetterButtons();
  checkIfLetterCoincides();
}

function checkCompleteWord() {
  if (foundLetterArray.length == randomWord.length) {
    successCounter++;
    let points = document.getElementById("points");
    points.innerHTML = successCounter;
    return true;
  } else {
    return false;
  }
}

function actUpponCoincidence() {
  if (coincidence != null) {
    foundLetterArray.push(coincidence);
    updateBlanksForFoundLetter();
     let success = checkCompleteWord();
     if (success){
 addHintToGame(false);
     }
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

function addHintToGame(firstExecution) {
  let hint;
  let points;
  if (firstExecution){
    hint = document.createElement("h1");
    hint.id = "hint";
  hint.innerHTML = explanation;
  hint.className = "gameArea";

   points = document.createElement("h1");
  points.innerHTML = successCounter;
  points.id = "points";
  document.body.appendChild(points);
  document.body.appendChild(hint);
  } else {
    randomIndex =  Math.floor(Math.random() * 20);
    explanation = words[randomIndex][1];
    randomWord = words[randomIndex][0];
hint = document.getElementById("hint");
points = document.getElementById("points");
hint.innerHTML = explanation;
let wordArea = document.getElementById("wordArea");
wordArea.remove();
addMaskedWords();
  }

}

function checkIfLetterCoincides() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedButton = event.target;
      let buttonLetter = clickedButton.getAttribute("data-letter");
      let wordChars = randomWord.toLowerCase().split("");
      if (wordChars.includes(buttonLetter)) {
        coincidence = buttonLetter;
        actUpponCoincidence();
      } else {
        coincidence = null;
      }
    });
  });
}

function addMaskedWords() {
  let underscores = "__ ".repeat(randomWord.length);
  let underscoresArea = document.createElement("h1");
  underscoresArea.id = "wordArea";
  underscoresArea.innerHTML = underscores;
  underscoresArea.className = "gameArea";
  document.body.appendChild(underscoresArea);
}

function addLetterButtons() {
  alphabetArray.forEach((element) => {
    let clickableLetterButton = document.createElement("button");
    clickableLetterButton.innerHTML = element;
    clickableLetterButton.dataset.letter = element;
    clickableLetterButton.dataset.available = true;
    clickableLetterButton.className = "button";
    clickableLetterArray.push(clickableLetterButton);
  });
}

function showLetterButtons() {
  clickableLetterArray.forEach((element) => {
    document.body.appendChild(element);
  });
}
