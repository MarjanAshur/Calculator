document.addEventListener('DOMContentLoaded', function () {
  let displayValue = '0';
  let num1 = '';
  let num2 = '';
  let operator = '';
  let hasDecimal = false;
  let isEqualClicked = false; 

  const display = document.getElementById('display');

  function updateDisplay() {
    display.textContent = displayValue;
  }

  function clearDisplay() {
    displayValue = '0';
    num1 = '';
    num2 = '';
    operator = '';
    hasDecimal = false;
    isEqualClicked = false;
    updateDisplay();
  }

  function handleNumberClick(num) {
    if (isEqualClicked) { 
      clearDisplay();
      isEqualClicked = false; 
    }
    if (displayValue === '0') {
      displayValue = num;
    } else {
      displayValue += num;
    }
    updateDisplay();
  }

  function handleOperatorClick(op) {
    if (operator !== '' && num2 !== '') {
      calculate();
    }
    num1 = displayValue;
    operator = op;
    displayValue = '0';
    hasDecimal = false;
    updateDisplay();
  }

  function calculate() {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result = 0;
    switch (operator) {
      case '+':
        result = n1 + n2;
        break;
      case '-':
        result = n1 - n2;
        break;
      case '×':
        result = n1 * n2;
        break;
      case '÷':
        if (n2 !== 0) {
          result = n1 / n2;
        } else {
          displayValue = 'Error';
          updateDisplay();
          return;
        }
        break;
    }
    displayValue = result.toString();
    num1 = '';
    num2 = '';
    operator = '';
    hasDecimal = false;
    isEqualClicked = true; 
    updateDisplay();
  }

  document.getElementById('clear').addEventListener('click', clearDisplay);

  document.getElementById('backspace').addEventListener('click', function () {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
      displayValue = '0';
    }
    updateDisplay();
  });

  document.getElementById('decimal').addEventListener('click', function () {
    if (!hasDecimal) {
      displayValue += '.';
      hasDecimal = true;
    }
    updateDisplay();
  });

  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(button => {
    button.addEventListener('click', function () {
      handleNumberClick(button.textContent);
    });
  });

  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach(button => {
    button.addEventListener('click', function () {
      handleOperatorClick(button.textContent);
    });
  });

  document.getElementById('calculate').addEventListener('click', function () {
    if (operator !== '' && num1 !== '') { 
      num2 = displayValue;
      calculate();
    }
  });
});
