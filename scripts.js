//GLOBALS
let displayValue = '';

//DOM Elements
const displayDiv = document.querySelector('#display');
const numbersButtons = document.querySelectorAll('.numbers');

//EVENT LISTENERS
numbersButtons.forEach(number => number.addEventListener('click', displayNumber));

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
  //get number value (as a string) from button push
  const number = e.target.textContent;
  //string concat at this point, not actual number yet
  displayValue += number;
  //update display readout
  displayDiv.textContent = displayValue;
}
