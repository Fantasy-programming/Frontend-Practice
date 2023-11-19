let box = document.querySelector(".box");
let title = document.getElementById("title");
let count = 0;
let move = 0;
let word = "";
let query = ".box.group-1";

document.addEventListener("keydown", async (event) => {
  if (!isLetter(event.key) && !specialKey(event.key)) {
    event.preventDefault();
  }

  if (count === 5 && event.key === "Enter") {
    event.preventDefault();
    let correct = await getword();
    check = checkword(word, correct);
    if (check) {
      animate("correct");
    } else {
      processIncorrect(word, correct);
      animate("incorrect");
      nextTurn();
    }
  }

  if (box.nextElementSibling === null && count === 4 && !specialKey(event.key)) {
    word += event.key;
    event.preventDefault();
    box.value = event.key.toUpperCase();
    count++;
    console.log(count);
    console.log(box);
    console.log(box.nextElementSibling);
  } else if (box.nextElementSibling && count < 5 && !specialKey(event.key)) {
    word += event.key;
    // console.log(word);
    event.preventDefault();
    box.value = event.key.toUpperCase();
    box = box.nextElementSibling;
    count++;
    console.log(count);
  }

  if (event.key === "Backspace") {
    if (box.nextElementSibling === null && count === 5) {
      event.preventDefault();
      word = word.slice(0, -1);
      box = box.previousElementSibling;
      box.value = box.value.slice(0, -1);
      count--;
    } else if (box.previousElementSibling && box.previousElementSibling.nodeName === "INPUT" && count !== 0) {
      event.preventDefault();
      word = word.slice(0, -1);
      box = box.previousElementSibling;
      box.value = "";
      count--;
    }
  }
});

// Utility functions

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
function specialKey(key) {
  return key === "Backspace" || key === "Enter";
}

function checkword(yours, correct) {
  return yours === correct;
}

async function getword() {
  const response = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await response.json();
  return data.word;
}

function nextTurn() {
  count = 0;
  word = "";
  move++;
  query = `.box.group-${move + 1}`;
}

function animate(status) {
  const boxes = document.querySelectorAll(query);
  if (status === "correct") {
    title.style.animation = "rainbow 4s infinite linear";
    boxes.forEach((box) => {
      box.style.backgroundColor = "green";
      box.style.color = "white";
    });
  } else {
    boxes.forEach((box) => {
      box.style.animation = "believer 2s ease-in-out forwards";
    });
  }
}

function processIncorrect(guess, correct) {
  const guessedLetters = guess.split("");
  const correctLetters = correct.split("");
  const boxes = document.querySelectorAll(query);

  guessedLetters.forEach((letter, index) => {
    const box = boxes[index];

    if (correctLetters.includes(letter)) {
      if (letter === correctLetters[index]) {
        box.style.backgroundColor = "green";
        box.style.color = "white";
      } else {
        box.style.backgroundColor = "orange";
        box.style.color = "white";
      }
    } else {
      box.style.backgroundColor = "grey";
      box.style.color = "white";
    }
  });
}
