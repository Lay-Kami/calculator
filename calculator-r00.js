const displayText = document.querySelector('p');
const btnNum = document.querySelectorAll('button.num');
const btnDot = document.querySelector('button.dot');
displayText.textContent = '0'; //default

const numberStored = [];
const operatorStored = [];
const numbersKey = [];

if ((numberStored.length === 0 && operatorStored.length === 0) || (numberStored.length === 1 && numbersKey.length !== 0)) {
  //NUMBER 1
  btnNum.forEach(btn => btn.addEventListener('click', handleNumberConstructure));
}
if (numberStored.length === 1) {
  //OPERATOR
  showNumber(numberStored[0]);
}
if (numberStored.length === 1 && operatorStored === 1) {
  //NUMBER
}
if (numberStored.length === 2 && operatorStored.length === 1) {
  //OPERATIONS
}

//store number input;
function constructNumber(index, numberData) {
  numbersKey.push(numberData);
  let number = numbersKey.join('');
  numberStored[index] = parseFloat(number);
}

//display number content
function showNumber(numberData) {
  const textLength = displayText.textContent.length;

    if (textLength === 9 || textLength === 20) {
      displayText.textContent += `\r\n`;
    } else if (textLength > 30) {
      return;
    } else if (displayText.textContent === '0' || numbersKey.length === 0) {
      displayText.textContent = '';
    }
    displayText.textContent += `${numberData}`;
}

//number button event
function handleNumberConstructure (e) {
  const numKey = e.target.dataset.key;
  showNumber(numKey);
  constructNumber(0, numKey);
}

btnDot.addEventListener('click', () => {
  if (numbersKey.includes('.')) {
    btnNum[10].removeEventListener('click', handleNumberConstructure);
  }
    btnNum[10].addEventListener('click', handleNumberConstructure);
});