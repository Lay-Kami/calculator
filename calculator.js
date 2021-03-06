const displayText = document.querySelector('p');
const btnNum = document.querySelectorAll('button.num');
const btnDot = document.querySelector('button.dot');
const btnOp = document.querySelectorAll('button.main-op');
const btnEnter = document.querySelector('#enter');
const btnBacksp = document.querySelector('button.bck');
const btnReset = document.querySelector('button.reset');
const btnPerc = document.querySelector('.perc');
displayText.textContent = '0'; //default

const storedValues = [];
const storedOperator = [];
const storedNumberKey = [];

btnPerc.addEventListener('click', makePercentage) 
function makePercentage (e) {
  if(storedValues[0] && storedOperator[0] && !storedValues[1])  {
    storedValues[0] = percentage(storedValues[0]);
    displayText.textContent = `${storedValues[0]}`;
  } else if (storedValues[1] && storedValues[0] && storedOperator[0]) {
    storedValues[1] = percentage(storedValues[1]);
    displayText.textContent = `${storedValues[1]}`;
  }
}

btnSwitch = document.querySelector('.switch');
btnSwitch.addEventListener('click', switchSigns);

function switchSigns (e) {
  if(storedValues[0] && !storedValues[1])  {
    storedValues[0] = storedValues[0] * (-1);
    displayText.textContent = storedValues[0];
  } else if (storedValues[1] && storedValues[0] && storedOperator[0]) {
    storedValues[1] = storedValues[1] * (-1);
    displayText.textContent = storedValues[1];
  }
}

//number button event.
function handleValueConstructure (e) {
  const numKey = e.target.dataset.key;
  showNumber(numKey);
  if(storedValues.length === 1 && storedOperator.length === 1 || storedValues.length === 2) {
    constructValue(1, numKey);
  } else if ((storedValues.length === 0 && storedOperator.length === 0) ||storedValues.length === 1) {
    constructValue(0, numKey);
  } 
}
btnNum.forEach(btn => btn.addEventListener('click', handleValueConstructure));
//disable dot button after use.
btnDot.addEventListener('click', () => {
  if (storedNumberKey.includes('.')) {
    btnNum[10].removeEventListener('click', handleValueConstructure);
  }
    btnNum[10].addEventListener('click', handleValueConstructure);
});

//choose one operator at time, if 2 values return the result
function handleOperators (e) {
  let resultValue;
  clean(storedNumberKey);
  if(storedValues.length === 1) {
		storedOperator[0] = e.target.dataset.key;
  } else if(storedValues.length === 2 && storedOperator.length === 1) {
		resultValue = returnResult(storedOperator[0], storedValues[0], storedValues[1]);
    storedOperator[0] = e.target.dataset.key;
  }
  if (resultValue !== undefined) {
  displayText.textContent = `${resultValue}`;
  return;
} else if (storedValues[0]) {
  displayText.textContent = `${storedValues[0]}`
  return
  }
  displayText.textContent = `0`;
}
btnOp.forEach(btn => btn.addEventListener('click', handleOperators));

//OPERATE '='
function operateHandler(e) {
  clean(storedNumberKey);
  if(storedValues.length === 1 && storedOperator.length === 1) {
    storedValues[1] = storedValues[0];
  }
  let resultValue = '0';
  if(storedValues.length === 2 && storedOperator.length === 1) {
       resultValue = returnResult(storedOperator[0], storedValues[0], storedValues[1]);
    }
    displayText.textContent = `${resultValue}`;
}
btnEnter.addEventListener('click', operateHandler);



//clean value
function clean (...arr) {
  for(let i = 0; i < arr.length; i++) {
    arr[i].length = 0;
  }
}

//store number input.
function constructValue(index, numberData) {
  storedNumberKey.push(numberData)
  let number = storedNumberKey.join('');
  storedValues[index] = parseFloat(number);
}

//display number content.
function showNumber(numberData) {
  const textLength = displayText.textContent.length;

    if (textLength === 9 || textLength === 20) {
      displayText.textContent += `\r\n`;
    } else if (textLength > 30) {
      return;
    } else if (displayText.textContent === '0' || storedNumberKey.length === 0) {
      displayText.textContent = '';
    }
    displayText.textContent += `${numberData}`;
}

function operate(op, value1, value2) {
  const a = value1;
  const b = value2;
  return op === '+' ? add(a, b): 
         op === '-' ? subtraction(a, b): 
         op === '/' ? division(a, b): 
         op ==='*' ? multiply(a, b): 0;
}

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

function returnResult(op, value1, value2) {
  let result = operate(op, value1, value2);
  clean(storedValues);
  clean(storedOperator);
  storedValues[0] = result;
  return adjustResultScNotation(result);
  // storedValues[0] = result;
}

function adjustResultScNotation(value) {
  if (value > 1e6) {
    return value = value.toExponential(2);
  } else if (value < 0.9 && toString(value).length > 6) {
    return value = value.toPrecision(2);
  } else if (toString(value).length > 9) {
    return value = value.toFixed(2);
  } else {
    return value;
  }
}

function eraseOperand(e) {
  const textLength = displayText.textContent.length;

  if (displayText.textContent == '0') {
      return;
    } else if (textLength < 2) {
        clean(storedNumberKey);
        displayText.textContent = '0';
        return;
      } else if (storedNumberKey.length === 0) {
          displayText.textContent = '';
        }
  displayText.textContent = displayText.textContent.slice(0, textLength - 1);
  storedNumberKey.pop();
}
btnBacksp.addEventListener('mousedown', eraseOperand);
        

function restart(e) {
  const myClean = [storedNumberKey, storedOperator, storedValues];
  displayText.textContent = '0';
  clean(...myClean);
}  
btnReset.addEventListener('click', restart);

