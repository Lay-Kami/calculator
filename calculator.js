const displayText = document.querySelector('p');
displayText.textContent = '0';

//create the operations function
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtraction(a, b) {
  return a - b;
}

function division(a, b) {
  if(b === 0) {
    return 'Error';
  }
  return a/b;
}

function percentage(a) {
  return division(a, 100);
}


//store input from click
const arrUserClick = [];

function getOperands(arr, data) {
  arr.push(data);
}

//when clicking show the number
function showOperands(e) {
  const textLength = displayText.textContent.length;
  if (textLength === 9 || textLength === 20) {
    displayText.textContent += `\r\n`;
  } else if (textLength > 30) {
    return;
  } else if (displayText.textContent === '0') {
    displayText.textContent = '';
  }
  
  displayText.textContent += `${this.dataset.key}`;
  getOperands(arrUserClick, this.dataset.key) 
}

const btnOperands = document.querySelectorAll('button.num');
const btnDot = document.querySelector('button.dot');

btnOperands.forEach(btn => {
  btn.addEventListener('click', showOperands);
});

//disable dot if it already exists
btnDot.addEventListener('click', () => {
  if (arrUserClick.includes('.')) {
    btnOperands[10].removeEventListener('click', showOperands);
  }
    btnOperands[10].addEventListener('click', showOperands);
});

//let user erase last choice
function eraseOperand(e) {
  const textLength = displayText.textContent.length;

  if (displayText.textContent == '0') {
    displayText.textContent = '0';
    return;
  } else if (textLength < 2) {
    displayText.textContent = '0';
    return;
  }
  displayText.textContent = displayText.textContent.slice(0, textLength - 1);
  arrUserClick.pop();
}

const btnBacksp = document.querySelector('button.bck');
btnBacksp.addEventListener('mousedown', eraseOperand);

//let user reset all
function resetAll(e) {
  arrUserClick.length = 0;
  displayText.textContent = '0';
}

const btnReset = document.querySelector('button.reset');
btnReset.addEventListener('click', resetAll);

