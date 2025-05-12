const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentButton = document.getElementById("percent");

let currentInput = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button === percentButton) {
    
        currentInput = (parseFloat(display.value) / 100).toString();
        display.value = currentInput;
      } else {
    
        const value = button.getAttribute("data-value");
        if (value) {
          currentInput += value;
          display.value = currentInput;
        }
      }
    });
    }); 
clearButton.addEventListener("click", () => {
  currentInput = "";
  display.value = "";
});


deleteButton.addEventListener("click", () => {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1); 
    display.value = currentInput;
  }
});

calculateButton.addEventListener("click", () => {
  try {
    let result = calculateExpression(currentInput);
    display.value = result;
    currentInput = result.toString();
  } catch (error) {
    display.value = "Error: " + error.message;
    currentInput = "";
  }
});


function calculateExpression(expression) {
  const tokens = expression.split(/([\+\-\*\/])/);
  let results = parseFloat(tokens[0]);
  if (isNaN(results)) {
    throw new Error("Invalid expression: " + expression);
  }
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextOperand = parseFloat(tokens[i + 1]);

    if (isNaN(nextOperand)) {
      throw new Error("Invalid operand: " + operator);
    }
    if (operator === "+") results += nextOperand;
    else if (operator === "-") results -= nextOperand;
    else if (operator === "*") results *= nextOperand;
    else if (operator === "/") {
      if (nextOperand === 0) {
        throw new Error("Division by zero");
      }
      results /= nextOperand;
    } else throw new Error("Invalid operator: " + operator);
  }
  return results;
}
function isOperator(value) {
  return value === "+" || value === "-" || value === "*" || value === "/";
}
