buttons = document.querySelectorAll(".drum")
audio1 = new Audio("sounds/tom-1.mp3");
audio2 = new Audio("sounds/tom-2.mp3");
audio3 = new Audio("sounds/tom-3.mp3");
audio4 = new Audio("sounds/tom-4.mp3");
audio5 = new Audio("sounds/snare.mp3");
audio6 = new Audio("sounds/crash.mp3");
audio7 = new Audio("sounds/kick-bass.mp3");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        makeSound(this.innerHTML);
        buttonAnimation(this.innerHTML);
})};

document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    buttonAnimation(event.key)
 });

 function makeSound(key) {
    switch (key) {
        case "w":
            audio1.play();
            break;
        case "a":
            audio2.play();
            break;
        case "s":
            audio3.play();
            break;
        case "d":
            audio4.play();
            break;
        case "j":
            audio5.play();
            break;
        case "k":
            audio6.play();
            break;
        case "l":
            audio7.play();
            break;
        default:
            break;
    }
 }

 function buttonAnimation(currentKey) {
    let activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
 }