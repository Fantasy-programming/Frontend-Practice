const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// AI PLAY
function nextSequece() {
  const number = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[number];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

// USER PLAY

// START GAME
$(document).keypress(function (key) {
  if (level === 0) {
    nextSequece();
  }
});

$(".btn").click(function (event) {
  const userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// CHECK ANSWER (GAME VS USER)
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequece();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// RESTART GAME
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// HELPER FUNCTIONS

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
