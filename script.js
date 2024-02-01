let words = [
  ["Apple", "Fruit used for cider making", "apple.jpg"],
  ["Banana", "Fruit that has a variety named 'Cavendish'", "banana.jpg"],
  ["Chair", "Furniture", "chair.jpg"],
  ["Dog", "Pet", "dog.jpg"],
  ["Elephant", "Animal with a trunk", "elephant.jpg"],
  ["Flower", "Associated with plants reproducing", "flower.jpg"],
  ["Grape", "Fruit used to make wine", "grape.jpg"],
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
let explanation;
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
  if (initialMessageBox != null) {
    initialMessageBox.remove();
  }
  executeGameFunctionality(true);
}
function executeGameFunctionality(isFirstExecution) {
  randomIndex = Math.floor(Math.random() * 20);
  explanation = words[randomIndex][1];
  randomWord = words[randomIndex][0];
  if (!isFirstExecution) {
    foundLetterArray = [];
    addHintToGame(true);
    addMaskedWords(true);
    checkIfLetterCoincides();
  } else {
    addLetterButtons();
    showLetterButtons();
    addHintToGame();
    addMaskedWords();
    checkIfLetterCoincides();
  }
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

function actUpponCoincidence(amountOfCoincidences) {
  if (coincidence != null) {
    for (let i = 0; i < amountOfCoincidences; i++) {
      foundLetterArray.push(coincidence);
   }
    updateBlanksForFoundLetter();
    let success = checkCompleteWord();
    if (success) {
      executeGameFunctionality(false);
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

function addHintToGame(update) {
  let hint;
  let points;
  if (!update) {
    hint = document.createElement("h1");
    hint.id = "hint";
    hint.className = "gameArea";
    points = document.createElement("h1");
    points.id = "points";
    document.body.appendChild(points);
    document.body.appendChild(hint);
  } else {
    hint = document.getElementById("hint");
    points = document.getElementById("points")
  }

  hint.innerHTML = explanation;
  points.innerHTML = successCounter;
}

function checkIfLetterCoincides() {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedButton = event.target;
      let buttonLetter = clickedButton.getAttribute("data-letter");
      let wordChars = randomWord.toLowerCase().split("");
      if (wordChars.includes(buttonLetter)) {
        wordChars.filter(x => x === buttonLetter).length;
        coincidence = buttonLetter;
        let amountOftimes = wordChars.filter(x => x === buttonLetter).length;
        actUpponCoincidence(amountOftimes);
      } else {
        coincidence = null;
      }
    });
  });
}

function addMaskedWords(update) {
  let underscores = "__ ".repeat(randomWord.length);
  let underscoresArea;
  if (!update){
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
