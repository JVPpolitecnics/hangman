let words = [
  ["apple", "Fruit used for cider making", "apple.png"],
  ["banana", "Fruit that has a variety named 'Cavendish'", "banana.png"],
  ["chair", "Furniture", "chair.png"],
  ["dog", "Pet", "dog.png"],
  ["elephant", "Animal with a trunk", "elephant.png"],
  ["flower", "Associated with plants reproducing", "flower.png"],
  ["grape", "Fruit used to make wine", "grape.png"],
  ["horse", "Animal", "horse.png"],
  ["igloo", "Shelter", "igloo.png"],
  ["jacket", "Clothing", "jacket.png"],
  ["kangaroo", "Marsupilanian", "kangaroo.png"],
  ["lion", "Animal you see in a safari reserve", "lion.png"],
  ["monkey", "Primate", "monkey.png"],
  ["nose", "Part of the body", "nose.png"],
  ["orange", "Citrus", "orange.png"],
  ["penguin", "Bird", "penguin.png"],
  ["quilt", "Cover", "quilt.png"],
  ["rabbit", "Rodent", "rabbit.png"],
  ["sun", "Planet", "sun.jpg"],
  ["tree", "Produces oxygen during the day", "tree.png"],
];
let coincidenceCounter;
let foundLetterArray = JSON.parse(localStorage.getItem('foundLetterList')) || [];
let clickedArray = JSON.parse(localStorage.getItem('clickedLetter'))|| [];
let randomWord = null;
let successCounter = 0;
let explanation;
let clickableLetterArray = [];
let alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
let randomIndex;
let mistake = parseInt(localStorage.getItem('mistake')) || 1;
let points = parseInt(localStorage.getItem('points')) || 0;
let username;


function checkName() {
   username = document.getElementById("name").value || localStorage.getItem('name');

  if (username == "") {
    alert("Please fill in your name");
  } else {
    startGame(false);
  }
}
// initiates game elements if first go, else it recovers them and changes them to suit new word.
function startGame(update) {
  //console.log("clicked:" + clickedArray.toString());
  coincidenceCounter  = 0;
  if (!update){
  randomIndex = parseInt(localStorage.getItem('wordIndex')) || Math.floor(Math.random() * 20);
} else {
  randomIndex = Math.floor(Math.random() * 20);
}
  randomWord = words[randomIndex][0];
  explanation = words[randomIndex][1];
  imgPath =  words[randomIndex][2];
  foundLetterArray = [];
  let initialMessageBox = document.getElementById("initialMessageBox");
  if (initialMessageBox != null) {
    initialMessageBox.remove();
    addLogOutButton()
  }
  addMaskedWords(update);
  createLetterButtons(update);
  addHintPointsAndImagesToGame(update);
  updateImgHangMan(mistake);
}

function addLogOutButton(){
  let button = document.createElement('button');
  button.className = "button";
  button.id = "logout";
  button.innerHTML = "Log-out"
  button.addEventListener("click", function () {
    logOut();
  });
  document.body.appendChild(button);
}

function logOut(){
 localStorage.removeItem("points");
 localStorage.removeItem("wordIndex");
 localStorage.removeItem("mistake");
 localStorage.removeItem("foundLetterList");
 localStorage.removeItem("clickedLetter");
  window.location.reload(true);
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
      
    } else {
      clickedArray.push(letter);
    } 
    
  }
  if(!wordChar.includes(letter)){
    if(mistake >= 9){
      alert("you loose");
      let loseMessage = document.getElementById("loseMessageBox");
      loseMessage.style.display = 'block'; 

    }
    mistake++;
    console.log("mistake: "+ mistake);
    updateImgHangMan(mistake);
  }
  
  checkIfWordIsGuessed(coincidenceCounter, randomWord);
  saveData();
  changeColors(); 
}

function updatePointsPanel(){
  let point = document.getElementById("points");
  point.innerHTML = "points: " + points;
}
function updateImgHangMan(mistake) {
  let hangmanImg = document.getElementById("hangmanImg");
  hangmanImg.src = "img/hangman" + mistake + ".png";
}
function checkIfWordIsGuessed(coincidences, wordCharArray) {
  if (wordCharArray.length == coincidences) {
    clickedArray = [];
    foundLetterArray = [];
    changeColors();
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

function addHintPointsAndImagesToGame(update) {
  let hint;
  let pointBox;
  let imgBox;
  if (!update) {
    hint = document.createElement("h1");
    hint.id = "hint";
    hint.className = "gameArea";
    pointBox = document.createElement("h1");
    pointBox.id = "points";
    imgBox = document.createElement("img");
    imgBox.id = "imgBox";
    imgBox.src = "img/words/" + imgPath;
    let container = document.getElementById("imgBoxContainer");
    container.appendChild(imgBox);
    document.body.appendChild(pointBox);
    document.body.appendChild(hint);
  } else {
    hint = document.getElementById("hint");
    pointBox = document.getElementById("points");
    imgBox = document.getElementById("imgBox");
    imgBox.src = "img/words/" + imgPath;
  }

  hint.innerHTML = explanation;
  pointBox.innerHTML = "points: " +points;
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
      clickableLetterButton.className = "button letters";
      if(clickedArray.includes(letter)){
        clickableLetterButton.style.color = "red";
      }
      if(foundLetterArray.includes(letter)){
        clickableLetterButton.style.color = "green"
      }

      clickableLetterButton.addEventListener("click", function () {
        
        handleClick(clickableLetterButton);
        
      });
    let area = document.getElementById("buttonArea");
      area.appendChild(clickableLetterButton);
     
    });
  }
}
function changeColors(){
  const elements = document.querySelectorAll('.letters');
elements.forEach(element => {
  if (clickedArray.includes(element.dataset.letter)){
    element.style.color = 'red';
  } else{
    element.style.color = 'white';
  }
 if (foundLetterArray.includes(element.dataset.letter)){
  element.style.color = 'green';
 }
});
}
 function saveData(){
  // Save data to localStorage
  localStorage.setItem('points', points);
  localStorage.setItem('mistake', mistake);
  localStorage.setItem('wordIndex', randomIndex);
  localStorage.setItem('foundLetterList',JSON.stringify(foundLetterArray));
  localStorage.setItem('clickedLetter', JSON.stringify(clickedArray));
  localStorage.setItem('name', username);
  
};
