const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const symbols = ["'", ":", "!", "@", "#", "$", "^", ")", "&", "*", "%", "-"];

const passSpan = document.querySelector('.pass-len');

const form = document.querySelector('#form');

const range = form['length'];

const copyBtn = document.querySelector('.copy');

let len = range.value;

passSpan.innerText = len;

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1))
}

function generatePass(passLen, options) {
  let strongPass = [];

  let  arrOfArrs;

  if (options.length == 0){
    arrOfArrs = [letters, numbers, symbols];
  } else {
    arrOfArrs = options;
  }
  
  for (let i = 0; i < passLen; i++) {
    /*Selecciona un array aleatorio de los 3*/ 
    const myArr = arrOfArrs[getRandomNumber(0, arrOfArrs.length - 1)];
    /*Selecciona 1 caracter aletorio del array seleccionado*/
    const randomChar = myArr[getRandomNumber(0, myArr.length - 1)];
    /*Agrega el caracter a un array en cada iteracion*/
    strongPass.push(randomChar);
  }
  strongPass = strongPass.join("");

  form['pass'].value = strongPass;
}

range.addEventListener('click', (e) => {
  e.preventDefault();
  len = range.value;
  passSpan.innerText = len;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let options = [];

  let checks = {
    letters: form['letters'].checked,
    numbers: form['numbers'].checked,
    chars: form['chars'].checked
  };
  
  for(let check in checks) {
    if(checks[check] == true){
      if (check == 'letters'){
        options.push(letters);
      } else if (check == 'numbers') {
        options.push(numbers);
      } else {
        options.push(symbols);
      }
    }
  }
  
  generatePass(len, options);
});

copyBtn.addEventListener('click', (e) => {
  copyToClipboard('.pass');
});

function copyToClipboard (target) {
  const element = document.querySelector(target);
  const value = element.value;

  window.navigator.clipboard.writeText((value));
  alert("copied:" + value);
  location.reload();
}