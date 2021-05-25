//GLOBAL VARIABLES
let displayValue = '';
let num1, num2, operator;
let startInputSecondValue = false;

//DOM QUERIES
const displayDiv = document.querySelector('#display');
const numbersButtons = document.querySelectorAll('.numbers');
const operatorsButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');

//EVENT LISTENERS
numbersButtons.forEach(number => number.addEventListener('click', displayNumber));
operatorsButtons.forEach(operator => operator.addEventListener('click', calculate));
clearButton.addEventListener('click', clear);

//FUNCTIONS
// math operation functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  return (num2 === 0) ? 'Error' 
  : num1 / num2
}

//operate function choses which math function to run
function operate(num1, num2, operator) {
  switch(operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
  }
}

//function that shows the numbers pushed on calculater display readout
function displayNumber(e) {
  //make sure display font size is set to normal
  displayDiv.classList.remove('bigAnswer');
  
  //clear out displayvalue for second value if number stored in num1
  if (startInputSecondValue) {
    displayValue = '';
    startInputSecondValue = false;
  }
  //check display value length to make sure number can fit display
  if (displayValue.length > 7) return;

  //get input (as a string) from button push
  const input = e.target.textContent;
  //check string for decimal, if no period, add to string and update display
  if (input === '.') {
    if (!displayValue.includes('.')) {
      displayValue += input;
      displayDiv.textContent = displayValue;
    }
  } else {
    displayValue += input;
    displayDiv.textContent = displayValue;
  }
}

//function that either calculates answer after (=, +, -, *, /) press, or assigns num1 a value depending on state
function calculate(e) {
  //equals clicked (=)
  if (e.target.textContent === '=') {
    num2 = Number(displayValue);
    //run operate function to get answer and update display
    const answer = round(operate(num1, num2, operator));
    displayDiv.textContent = answer;
    
    //math operators clicked (+, -, *, /)
  } else {
    // assign value to num1
    if (!num1) {
      num1 = Number(displayValue);
      startInputSecondValue = true;
      // store which math operator the user has clicked
      operator = e.target.textContent;
      return;

      //assign value to num2, calculate answer, and update display
    } else {
      num2 = Number(displayValue);
      startInputSecondValue = true;
      //run operate function with variables
      const answer = round(operate(num1, num2, operator));
      
      //run operate function to get answer and update display
      displayDiv.textContent = answer;
      // store which math operator the user has clicked for possible next calculation
      operator = e.target.textContent;
      //assign answer to num1 value
      num1 = answer;
      //clear out num2 value
      num2 = undefined;
    }
  }
  //lower font size if answer is greater than 7 characters
  if (displayDiv.textContent.length > 7) {
    displayDiv.classList.add('bigAnswer');
  }
}

//function that clears all values out
function clear() {
  displayDiv.classList.remove('bigAnswer');
  displayValue = '';
  displayDiv.textContent = '0';
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  startInputSecondValue = false;
}

//function that rounds numbers with long decimals
const round = (answer) => Math.round(answer * 1000) / 1000;