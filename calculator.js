"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector(".calculator-screen");
  const buttons = document.querySelectorAll(".calculator-buttons button");
  let screenValue = "";
  let operator = "";
  let firstOperand = "";

  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      const buttonValue = e.target.textContent.trim();

      console.log(buttonValue, buttonValue == "=");

      if (buttonValue === "C") {
        screenValue = "";
        screen.textContent = screenValue;
        operator = "";
        firstOperand = "";
      } else if (buttonValue === "=") {
        screenValue = calculate(screenValue).toString();
        screen.textContent = screenValue;
      } else if (["+", "-", "*", "/"].includes(buttonValue)) {
        if (firstOperand === "") {
          firstOperand = screenValue;
        }
        if (operator === "") {
          operator = buttonValue;
          screenValue += ` ${operator} `;
        } else {
          screenValue = screenValue + ` ${buttonValue} `;
        }
        screen.textContent = screenValue;
      } else {
        screenValue += buttonValue;
        screen.textContent = screenValue;
      }
    });
  });
});

function calculate(expression) {
  const tokens = expression.split(/([+\-*/])/).filter(Boolean);
  console.log(tokens);
  let result = parseFloat(tokens[0]);
  let i = 1;

  while (i < tokens.length) {
    const operator = tokens[i];
    const number = parseFloat(tokens[i + 1]);

    switch (operator) {
      case "+":
        result += number;
        break;
      case "-":
        result -= number;
        break;
      case "*":
        result *= number;
        break;
      case "/":
        if (number !== 0) {
          result /= number;
        } else {
          throw new Error("Division by zero");
        }
        break;
    }
    i += 2;
  }
  return result;
}
