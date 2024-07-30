'use strict';

let body = document.body;
let numberInput = document.querySelector('.number-input');
let question = document.querySelector('.question');
let btnAgain = document.querySelector('.again');
let btnCheck = document.querySelector('.check');
let score = document.querySelector('.score');
let highScore = document.querySelector('.highscore');
let message = document.querySelector('.guess-message');

let secretNumber = Math.ceil(Math.random() * 20);
let flash = 1;
let flashLose = 1;

let messageFlash = function () {
  message.style.color = 'rgb(122, 120, 120)';
  setTimeout(() => {
    message.style.color = '';
  }, 60);
};

let gameLose = function () {
  btnCheck.disabled = true;
  message.textContent = 'ВЫ ПРОИГРАЛИ!';
  let toggle = true;
  flashLose = 1;
  setInterval(() => {
    if (flashLose) {
      body.style.backgroundColor = toggle ? 'rgb(192, 25, 25)' : 'black';
      toggle = !toggle;
    }
  }, 300);
};

const checkFunction = function () {
  if (1 <= numberInput.value && numberInput.value <= 20) {
    console.log(numberInput.value);
    message.classList.remove('message-error');
    switch (true) {
      case secretNumber == numberInput.value:
        question.textContent = secretNumber;
        let toggle = true;
        flash = 1;
        setInterval(() => {
          if (flash) {
            body.style.backgroundColor = toggle ? 'green' : 'black';
            toggle = !toggle;
          }
        }, 300);
        btnCheck.disabled = true;
        question.style.width = '50rem';
        message.textContent = 'ВЫ УГАДАЛИ!';
        if (highScore.textContent < score.textContent) {
          highScore.textContent = score.textContent;
        }
        break;
      case secretNumber < numberInput.value:
        message.textContent = 'Попробуй меньше!';
        messageFlash();
        score.textContent -= 1;
        if (score.textContent == 0) {
          gameLose();
        }
        break;
      case secretNumber > numberInput.value:
        message.textContent = 'Попробуй больше!';
        messageFlash();
        score.textContent -= 1;
        if (score.textContent == 0) {
          gameLose();
        }
        break;
    }
  } else {
    message.textContent = 'НЕВЕРНОЕ ЧИСЛО!';
    message.classList.add('message-error');
    btnCheck.style.backgroundColor = 'rgb(192, 25, 25)';
    btnCheck.style.animation = 'shake 0.5s';
    numberInput.style.borderColor = 'rgb(192, 25, 25)';
    numberInput.style.animation = 'shake 0.5s';
    setTimeout(() => {
      btnCheck.style.animation = '';
      btnCheck.style.backgroundColor = 'white';
      numberInput.style.borderColor = 'white';
      numberInput.style.animation = '';
    }, 500);
  }
};

const againFunction = function () {
  secretNumber = Math.ceil(Math.random() * 20);
  flash = 0;
  body.style.backgroundColor = 'black';
  score.textContent = 20;
  question.textContent = '???';
  numberInput.value = '';
  message.textContent = 'Начни угадывать';
  question.style.width = '25rem';
  btnCheck.disabled = false;
  flashLose = 0;
};

btnAgain.addEventListener('click', againFunction);
btnCheck.addEventListener('click', checkFunction);
