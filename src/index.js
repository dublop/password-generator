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

const API = 'https://famous-quotes4.p.rapidapi.com/random?category=all&count=1';

let words = [];

let len = range.value;

passSpan.innerText = len;

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1))
}

function generatePass(passLen, options, words = false) {
  let strongPass = [];

  let  arrOfArrs;

  /*Si el array esta vacio crea una contrase;a con todas la opciones x desfecto*/
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

  /*Comprueba si la opcion de palabras esta activa y las une con un guion -*/ 
  if (words == true) {
    strongPass = strongPass.join("-");
    console.log(strongPass.split("-").length)
  }else{
    strongPass = strongPass.join("");
  }
  form['pass'].value = strongPass;
}

range.addEventListener('change', (e) => {
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
    chars: form['chars'].checked,
    words: form['words'].checked,
  };
  
  for(let check in checks) {
    if(checks[check] == true){
      if (check == 'words'){
       options = [];
       form['letters'].checked = false,
       form['numbers'].checked = false,
       form['chars'].checked = false,
        options.push(words)
      } else {
        if (check == 'letters'){
          options.push(letters);
        } else if (check == 'numbers') {
          options.push(numbers);
        } else {
          options.push(symbols);
        }
      }
    }
  }
  if (checks['words'] == true) {
    generatePass(len, options, true);
  }else {
    generatePass(len, options);
  }
});

copyBtn.addEventListener('click', (e) => {
  copyToClipboard('.pass');
});

function copyToClipboard (target) {
  const element = document.querySelector(target);
  const value = element.value;
  element.select();
  navigator.clipboard.writeText((value))
    .then(
      ()=> {alert('Password copied to clipboard!');}
    )
    .catch(
      ()=> {alert('An error ocurred!');}
    );
  
}

function fetchData(API) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '707879c69fmsh4c832878d0c9862p1a808djsn1967a349a7fa',
      'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
    }
  };

  fetch(API,options)
    .then((response) => response.json())
    .then((data) => {
      words = (data[0].text).split(" ").sort();
    })
    .catch((error) => {
      console.error(error);
    })
  
}

fetchData(API);