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
let letter = event.dataset.letter;
      // Check if coincidence
      let wordChar = randomWord.split("git ");
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
    clickableLetterButton.dataset.letter = letter;
    clickableLetterButton.dataset.available = true;
    clickableLetterButton.className = "button";
    
    clickableLetterButton.addEventListener("click", function() {
      handleClick(clickableLetterButton);
    });

    document.body.appendChild(clickableLetterButton);
  });
}

