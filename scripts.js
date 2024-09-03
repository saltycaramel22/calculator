// Basic math operation functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    } else {
        return a / b;
    }
}

let firstNumber = null;
let secondNumber = null;
let operator = null;

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

// Variables to store the display value and the state of the calculator
let displayValue = '';
let currentOperator = null;
let firstOperand = null;
let awaitingSecondOperand = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Function to update the display
function updateDisplay() {
    display.textContent = displayValue || '0';
}

// Function to handle number button clicks
function handleNumber(number) {
    if (awaitingSecondOperand) {
        displayValue = number;
        awaitingSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// Function to handle operator button clicks
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = operate(currentOperator, firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    awaitingSecondOperand = true;
    currentOperator = nextOperator;
    updateDisplay();
}

// Function to clear the calculator
function clearCalculator() {
    displayValue = '';
    firstOperand = null;
    currentOperator = null;
    awaitingSecondOperand = false;
    updateDisplay();
}

// Event listeners for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { textContent: value } = button;

        if (parseFloat(value) >= 0 || value === '0') {
            handleNumber(value);
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            if (currentOperator && !awaitingSecondOperand) {
                handleOperator(currentOperator);
                currentOperator = null;
            }
        } else {
            handleOperator(value);
        }
    });
});

updateDisplay();
