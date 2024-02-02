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
  randomWord = words[randomIndex][0];
  explanation = words[randomIndex][1];
  foundLetterArray = [];
  let initialMessageBox = document.getElementById("initialMessageBox");
  if (initialMessageBox != null) {
    initialMessageBox.remove();
  }
  addMaskedWords();
  createLetterButtons();
  addHintToGame();
}

function handleClick(event) {
let buttonClicked = event.target;
let letter = buttonClicked.dataset.letter;
      // Check if coincidence
      let wordChar = randomWord.split();
      for (let i = 0; i < wordChar.length; i++) {
       
        if(wordChar[i]== letter){
            foundLetterArray.push(letter);
            updateBlanksForFoundLetter()
            addHintToGame(update);
        }

    

  };
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

function createLetterButtons() {
  alphabetArray.forEach((letter) => {
    let clickableLetterButton = document.createElement("button");
    clickableLetterButton.innerHTML = letter;
    clickableLetterButton.datas
    et.letter = letter;
    clickableLetterButton.dataset.available = true;
    clickableLetterButton.className = "button";
    
    clickableLetterButton.addEventListener("click", function() {
      handleClick(clickableLetterButton);
    });

    document.body.appendChild(clickableLetterButton);
  });
}

