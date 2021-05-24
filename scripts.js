//GLOBAL VARIABLES
let displayValue = '';
let num1;
let num2;
let operator;
let startInputSecondValue = false;

//DOM Elements
const displayDiv = document.querySelector('#display');
const numbersButtons = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clearButton = document.querySelector('#clear');

//EVENT LISTENERS
numbersButtons.forEach(number => number.addEventListener('click', displayNumber));
operators.forEach(operator => operator.addEventListener('click', storeFirstNumber));
equals.addEventListener('click', calculate);
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

function storeFirstNumber(e) {
  //when someone clicks a math operator, store (converted) display value in variable (num1)
  // if (!num1) {
  //   num1 = Number(displayValue);
  // }
  num1 = Number(displayValue);
  //store which math operator the user has clicked
  operator = e.target.textContent;
  //keep track that first number has been stored for display readout
  startInputSecondValue = true;
}

function calculate() {
  //when the user clicks equals, store (converted) display value in another variable (num2)
  num2 = Number(displayValue);
  //run operate function with variables
  const answer = operate(num1, num2, operator);
  //update display with answer
  displayValue = answer;
  displayDiv.textContent = displayValue;

  //get ready to perform another calculation
  startInputSecondValue = true;
  //assign answer to num1 value
  num1 = answer;
  //clear out num2 value
  num2 = undefined;
  //clear out operator value
  operator = undefined;
}

function clear() {
  displayValue = '';
  displayDiv.textContent = '0';
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  startInputSecondValue = false;
}