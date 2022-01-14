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


//store input from click
const arrUserClick = [];

function getOperands(arr, data) {
  arr.push(data);
}

//when clicking show the number
const btnOperands = document.querySelectorAll('button.num');
btnOperands.forEach(btn => {
  btn.addEventListener('click', showOperands);
});

function showOperands(e) {
  const textLength = displayText.textContent.length;

  if (textLength === 9 || textLength === 20) {
    displayText.textContent += `\r\n`;
  } else if (textLength > 30) {
    return;
  } else if (displayText.textContent === '0' || arrUserClick.length === 0) {
    displayText.textContent = '';
  }
  
  displayText.textContent += `${this.dataset.key}`;
  getOperands(arrUserClick, this.dataset.key) 
}

//disable dot if it already exists
const btnDot = document.querySelector('button.dot');

btnDot.addEventListener('click', () => {
  if (arrUserClick.includes('.')) {
    btnOperands[10].removeEventListener('click', showOperands);
  }
    btnOperands[10].addEventListener('click', showOperands);
});

//let user erase last choice
const btnBacksp = document.querySelector('button.bck');
btnBacksp.addEventListener('mousedown', eraseOperand);

function eraseOperand(e) {
  const textLength = displayText.textContent.length;

  if (displayText.textContent == '0') {
    displayText.textContent = '0';
    return;
  } else if (textLength < 2) {
    arrUserClick.length = 0;
    displayText.textContent = '0';
    return;
  } 
  displayText.textContent = displayText.textContent.slice(0, textLength - 1);
  arrUserClick.pop();
}

//let user reset all
const btnReset = document.querySelector('button.reset');
btnReset.addEventListener('click', resetAll);

function resetAll(e) {
  arrUserClick.length = 0;
  displayText.textContent = '0';
  storeNumbers.length = 0;
  operator.length = 0;
}

//o que deve acontecer quando eu clico no operador?
/* 
  *guardar o primeiro valor (a)
  
  *registrar o operador; (para direcionar a operação a ser feita)
  
  *resetar o texto;
  
  *resetar o array(?);
    antes de resetar, precisa guardar o valor em ordem
    
  *registrar o segundo valor;
  
  *quando tiver 2 operandos: se clicado novamente, inicia a operação;

  *o retorno (resultado) da operação deve tomar o lugar do primeiro valor (a)
*/

//store operadors by click input [onlyTwo]
const operator = [];

const btnOp = document.querySelectorAll('.main-op');
btnOp.forEach(btn => btn.addEventListener('click', getOperators));

function getOperators(e) {
  const operatorType = this.dataset.key;
  if(operator.length > 1) operator.length = 0;
  operator.push(operatorType);
}


//store arguments a and b
const storeNumbers = []

const storeArguments = function(e) {
  const userInput = arrUserClick.join('');

  getOperands(storeNumbers, userInput);
  arrUserClick.length = 0; //reset data
}

btnOp.forEach(btn => {
  btn.addEventListener('click', storeArguments);
  btn.addEventListener('click', operation);
});

//do the operation
function operation(e) {
  if (storeNumbers.length === 2) {
    const a = +storeNumbers[0];
    const b = +storeNumbers[1];
    let result = 0;
    console.log('I have two numbers stored')
    if (operator[0] == '/') {
      result = division(a, b);
      console.log(result);
    }

    //function switch used operator.
    operator.reverse().pop();
    const reservedOperator = operator[0];
    resetAll();
    operator.push(reservedOperator);

    //


    return;
  }
  console.log('I have one number stored')
}

