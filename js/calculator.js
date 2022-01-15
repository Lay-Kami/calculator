const displayText = document.querySelector('p');
const btnOperands = document.querySelectorAll('button.num');
const btnDot = document.querySelector('button.dot');
const btnBacksp = document.querySelector('button.bck');
const btnReset = document.querySelector('button.reset');
const btnOperators = document.querySelectorAll('button.main-op');
const btnEnter = document.querySelector('#enter');

const clickedNumbers = []; 
const numberStored = [];
const operatorStored = [];
displayText.textContentons = '0'; //default


//use o if statement para addEvent do operador como operate
//use if to unlock operate
btnEnter,addEventListener('click', storeNumber);
if(numberStored.length === 2 && operatorStored.length === 1) {
  btnEnter.addEventListener('click', () => {
    const result = operate(operatorStored, numberStored);
    displayText.textContent= `${result}`;
    numberStored.lenght = 0;
    operatorStored.lenght = 0;
    numberStored[0] = result;
  });
}

function operate(operator, number) {
  const a = number[0];
  const b = number[1];
  if (operator === '+') {
    return add(a, b);
  } else if (operator === '-') {
    return subtraction(a, b); 
  } else if (operator === '*') {
    return multiply(a, b);
  } else if (operator === '/') {
    return division(a, b);
  } 
}


//get number by its key
btnOperands.forEach(btn => btn.addEventListener('click', constructNumbers));

function constructNumbers(e) {
  const textLength = displayText.textContent.length;
  const keyNumber = this.dataset.key;

  if (textLength === 9 || textLength === 20) {
    displayText.textContent += `\r\n`;
  } else if (textLength > 30) {
    return;
  } else if (displayText.textContent === '0' || clickedNumbers.length === 0) {
    displayText.textContent = '';
  }
  
  displayText.textContent += `${keyNumber}`;
  return getOperands(clickedNumbers, keyNumber); 
}

//store input from click
function getOperands(arr, data) {
  return arr.push(data);
  }

//disable dotButton if it already exists
btnDot.addEventListener('click', () => {
  if (clickedNumbers.includes('.')) {
    btnOperands[10].removeEventListener('click', showOperands);
  }
    btnOperands[10].addEventListener('click', showOperands);
});

//erase last number clicked
btnBacksp.addEventListener('mousedown', eraseOperand);

function eraseOperand(e) {
  const textLength = displayText.textContent.length;

  if (displayText.textContent == '0') {
    return;
  } else if (textLength < 2) {
    clickedNumbers.length = 0;
    displayText.textContent = '0';
    return;
  } else if (clickedNumbers.length === 0) {
    displayText.textContent = '';
  }
  displayText.textContent = displayText.textContent.slice(0, textLength - 1);
  clickedNumbers.pop();
}

//Restart the app
btnReset.addEventListener('click', restart);

function restart(e) {
  clickedNumbers.length = 0;
  numberStored.length = 0;
  displayText.textContent = '0';
}


//Operators system
btnOperators.forEach(btn => {
  btn.addEventListener('click', storeNumber);
  btn.addEventListener('click', getOperator);
});

//store number input
function storeNumber(e) {
  let number = clickedNumbers.join('');
  number = parseFloat(number);
  if (!isNaN(number)) getOperands(numberStored, number); 
  clickedNumbers.length = 0;
}

//get operator
function getOperator(e) {
  const operator = this.dataset.key;
  if (operatorStored.length !== 1) operatorStored.length = 0;
  operatorStored.push(operator);
}


// create the operations function
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
    return 'error';
  }
  return a/b;
}

function percentage(a) {
  return division(a, 100);
}

function power(a, b) {
  return a ** b;
}