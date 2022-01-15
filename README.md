# calculator

Plan calculator:


numberStored: [],
operatorStored: []
numbersKey: []

if numberStored.length === 0 && operatorStored.length === 0 || numberStored === 1 && numbersKey.length !== 0 {
NUMBER
  press number button:
        let numberkey = this.dataset.key;
    START function displayNumbers(numberkey);
        //....
        display.textContext += `${numberkey}` 
    END
    START ConstructNumber(index = 0)
      //store number input;
        numbersKey.push(numberkey);
        let number = numbersKey.join();
        numberStored[0] = parseFloat(number);
    END
}

if numberStored.length === 1 {
OPERATOR
  press operator button;
    numbersKey.lentgh = 0;
    START function displayNumbers(numberStored[0]);
        //....
        display.textContext += `${numberStored[0]}` 
    END
    START function3();
      operatorStored[0] = e.target.dataset.key;
    END
}

if numberStored.length === 1 && operatorStored.length === 1; {
NUMBER 2
 press number button:
        let numberkey = this.dataset.key;
    START function displayNumbers(numberkey);
        //....
        display.textContext += `${numberkey}` 
    END
    START ConstructNumber(index = 1)
      //store number input;
        numbersKey.push(numberkey);
        let number = numbersKey.join();
        numberStored[1] = parseFloat(number);
    END
}

if numberStored.length === 2 && operatorStored.length === 1; {
OPERATE() => OPERATOR ‘=’

if press ‘=’:
    START function operateHandler()
        //get result
          let result = operate(op, number1, number2);
    		
        //erase number1 && number2
          numbersKey.length = 0;
          numberStored.length = 0;  		
        //erase operator;
          operator.length = 0;

        //store result as num1;
          numberStore.push(result)
        
        //display
        START function displayNumbers(numberStored[0]);
            //....
            display.textContext += `${numberStored[0]}` 
        END
    END

//this return number.length === 1 && operator.length === 0;

else
OPERATE() => OPERATOR ‘+’ ‘-’ ‘/’ ‘*’

if press ‘+’ ‘-’ ‘/’ ‘*’
    START function operateHandler()
        //get result
          let result = operate(op, number1, number2);
    		
        //erase number1 && number2
          numbersKey.length = 0;
          numberStored.length = 0;  		
        //erase operator;
          operator.length = 0;
        //this return number.length === 1 && operator.length === 0;
        //store result as num1;
          numberStore.push(result)
        
        //display
        START function displayNumbers(numberStored[0]);
            //....
            display.textContext += `${numberStored[0]}` 
        END
        START function3(e);
          operatorStored[0] = e.target.dataset.key;
        END
    END 
	

END

//this return number.length === 1 && operator.length === 1;

}
