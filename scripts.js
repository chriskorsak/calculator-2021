//GLOBAL VARIABLES
let displayValue = '';
let num1;
let num2;
let operator;
let startInputSecondValue = false;

//DOM Elements
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
  //clear out displayvalue for second value if number stored in num1
  if (startInputSecondValue) {
    displayValue = '';
    startInputSecondValue = false;
  }
  //get number value (as a string) from button push
  const number = e.target.textContent;
  //string concat at this point, not actual number yet
  displayValue += number;
  //update display readout
  displayDiv.textContent = displayValue;
}

//function that stores numbers and operator, and updates boolean to ready second value input
//feeds inputs into operate function and updates display with answer
//also gets app ready to perform another calculation
//when the user clicks equals, store (converted) display value in another variable (num2)
function calculate(e) {
  if (e.target.textContent === '=') {
    num2 = Number(displayValue);
    //run operate function with variables
    const answer = operate(num1, num2, operator);
    console.log(answer);
    //update display with answer
    displayValue = answer;
    displayDiv.textContent = displayValue;

  } else {
    //math operators clicked
    // check if first number variable has been assigned a value
    if (!num1) {
      num1 = Number(displayValue);
      startInputSecondValue = true;
      // store which math operator the user has clicked
      operator = e.target.textContent;
      //assign value to second number variable
    } else {
      num2 = Number(displayValue);
      startInputSecondValue = true;
      //run operate function with variables
      const answer = operate(num1, num2, operator);
      //update display with answer
      displayValue = answer;
      displayDiv.textContent = displayValue;
      // store which math operator the user has clicked
      operator = e.target.textContent;
      //assign answer to num1 value
      num1 = answer;
      //clear out num2 value
      num2 = undefined;
    }
  }
}

//function that clears all values out
function clear() {
  displayValue = '';
  displayDiv.textContent = '0';
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  startInputSecondValue = false;
}