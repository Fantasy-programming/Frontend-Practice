let total = 0;
let pnum = 0;
let poperation = 0;
let screen = document.querySelector(".box1");

document.querySelector(".calculator").addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    let trigger = event.target.innerHTML;

    if (trigger === "=") {
      total = poperation(pnum, parseInt(screen.innerHTML));
      screen.innerText = total;
      pnum = 0;
    } else if (trigger === "C") {
      clear();
    } else if (trigger === "←") {
      if (screen.innerHTML.length === 1) {
        screen.innerHTML = 0;
      } else {
        screen.innerHTML = screen.innerHTML.slice(0, -1);
      }
    } else if (operation(trigger) !== 0) {
      if (pnum === 0) {
        pnum = parseInt(screen.innerHTML);
        poperation = operation(trigger);
        screen.innerText = 0;
      } else {
        pnum = poperation(pnum, parseInt(screen.innerHTML));
        poperation = operation(trigger);
        screen.innerText = 0;
      }
    } else {
      if (screen.innerHTML === "0") {
        screen.innerHTML = trigger;
      } else {
        screen.innerHTML += trigger;
      }
    }
  }
});

const sum = (num1, num2) => {
  return num1 + num2;
};

const sub = (num1, num2) => {
  return num1 - num2;
};

const mul = (num1, num2) => {
  return num1 * num2;
};

const div = (num1, num2) => {
  return num1 / num2;
};

const operation = (sign) => {
  switch (sign) {
    case "+":
      return sum;
    case "-":
      return sub;
    case "x":
      return mul;
    case "÷":
      return div;
    default:
      return 0;
  }
};

const clear = () => {
  document.querySelector(".box1").innerHTML = 0;
  pnum = 0;
  poperation = 0;
  total = 0;
};
