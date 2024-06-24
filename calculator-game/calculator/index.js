let mode = 0;

function switchModes() {
    switch (mode) {
        case mode === 0:
            break;
        case mode === 1:
            break;
        case mode === 2:
            break;
        default:
            mode = 0;
    }
}

function evalExpression(expression) {
    function isDigit(char) {
        return char >= "0" && char <= "9";
    }

    function isOperator(char) {
        return char === "+" || char === "-" || char === "*" || char === "/";
    }

    function hasMatchingParentheses(expression) {
        let balance = 0;
        for (let char of expression) {
            if (char === "(") balance++;
            if (char === ")") balance--;
            if (balance < 0) return false;
        }
        return balance === 0;
    }

    function shuntingYard(expression) {
        let outputQueue = [];
        let operatorStack = [];
        const operators = {
            "+": { precedence: 1 },
            "-": { precedence: 1 },
            "*": { precedence: 2 },
            "/": { precedence: 2 },
        };

        let i = 0;
        while (i < expression.length) {
            let char = expression[i];
            if (char === " ") {
                i++;
                continue;
            }

            if (isDigit(char)) {
                // if number, make sure you grab the whole number ie 3.14
                let num = "";
                while (i < expression.length && (isDigit(expression[i]) || expression[i] === ".")) {
                    num += expression[i];
                    i++;
                }
                outputQueue.push(num);
                continue;
            }

            if (isOperator(char)) {
                while (
                    operatorStack.length &&
                    isOperator(operatorStack[operatorStack.length - 1]) &&
                    operators[char].precedence <= operators[operatorStack[operatorStack.length - 1]].precedence
                ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(char);
            } else if (char === "(") {
                operatorStack.push(char);
            } else if (char === ")") {
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            } else {
                throw new Error(`Invalid token: ${char}`);
            }
            i++;
        }

        while (operatorStack.length) {
            const op = operatorStack.pop();
            if (op === "(" || op === ")") {
                throw new Error("Mismatched parentheses");
            }
            outputQueue.push(op);
        }

        return outputQueue.join(" ");
    }

    if (!expression) {
        return;
    }
    expression = expression.trim(); // trim white spaces
    if (!hasMatchingParentheses) {
        return;
    }

    // convert infix expression to postfix expression using Shunting Yard algorithm
    let postfixexp = shuntingYard(expression);
    postfixexp = postfixexp.split(" ");
    let stack = [];
    for (let char of postfixexp) {
        if (isOperator(char)) {
            let val1 = stack.pop();
            let val2 = stack.pop();
            switch (char) {
                case "+":
                    stack.push(val2 + val1);
                    break;
                case "-":
                    stack.push(val2 - val1);
                    break;
                case "/":
                    stack.push(val2 / val1);
                    break;
                case "*":
                    stack.push(val2 * val1);
                    break;
                default:
                    throw new Error(`Unknown operator: ${char}`);
            }
        } else {
            stack.push(parseFloat(char));
        }
    }

    if (stack.length !== 1) {
        throw new Error("Invalid postfix expression");
    }
    return stack.pop();
}

const evaluateButton = document.getElementById("evaluate-btn");
evaluateButton.addEventListener("click", function (event) {
    event.preventDefault(); // prevent form submission to prevent refreshing page
    const userExpression = document.getElementById("calculator-input").value;
    const result = evalExpression(userExpression);
});

// visual calculator logic

// operator logic
function clear() {
    return "0";
}

function makeNumNegative(current_value) {
    let num = parseFloat(current_value);
    num = num * -1;
    return num.toString();
}

function modulo(current_value) {
    let num = parseFloat(current_value);
    num /= 100;
    let numStr = num.toFixed(4);
    numStr = numStr.replace(/\.?0+$/, ""); // Remove trailing zeros
    return numStr;
}

function doMath(stack) {
    let leftover_operator = stack.pop();
    let operand2 = stack.pop();
    let operator = stack.pop();
    let operand1 = stack.pop();

    switch (operator) {
        case "+":
            stack.push(operand1 + operand2);
            break;
        case "−":
            stack.push(operand1 - operand2);
            break;
        case "×":
            stack.push(operand1 * operand2);
            break;
        case "÷":
            if (operand) stack.push(operand1 / operand2);
            break;
    }
    if (leftover_operator !== "=") {
        stack.push(leftover_operator);
    } else {
        stack.push(operator);
    }
    return stack[0];
}

// if operands:
function addNumberToCurrentString(current_value, value) {
    if (value === "0") {
        return current_value;
    } else if (current_value.length === 9) {
        return current_value;
    } else if (current_value === "0") {
        return "".concat(value);
    }
    return current_value.concat(value);
}

function display(current_value) {
    const resultDiv = document.querySelector(".result");
    resultDiv.textContent = current_value;
}

function displayErrorMessage(show, message) {
    let error_message = document.querySelector(".error-message");
    if (show) {
        if (!error_message) {
            error_message = document.createElement("div");
            error_message.classList.add("error-message");
            document.body.appendChild(error_message);
        }
        error_message.textContent = message;
    } else if (error_message) {
        error_message.remove();
    }
}

let stack = [];
let current_value = "0"; // what we return or show in `result`
let math_operator = null; // for actual math operators

const cols = document.querySelectorAll(".col");
cols.forEach((col) => {
    col.addEventListener("click", () => {
        console.log(stack);
        if (col.classList.contains("operator")) {
            let operator = col.textContent;
            switch (operator) {
                case "AC":
                    current_value = clear();
                    stack.splice(0, stack.length);
                    break;
                case "+/-":
                    current_value = makeNumNegative(current_value);
                    break;
                case "%":
                    current_value = modulo(current_value);
                    break;
                default:
                    if (!(math_operator === operator) && !math_operator) {
                        stack.pop();
                        stack.pop();
                        math_operator = operator;
                        stack.push(parseFloat(current_value));
                        stack.push(math_operator);
                    }
                    break;
            }
        } else {
            if (math_operator) {
                current_value = "0";
                math_operator = null;
            }
            let operand = col.textContent;
            current_value = addNumberToCurrentString(current_value, operand);
        }

        if (stack.length === 4) {
            current_value = doMath(stack);
        }

        display(current_value);
        console.log(stack);

        // display messages below calculator
        if (current_value.length === 9) {
            displayErrorMessage(true, "Number exceeds more than 9 characters! Will not show in display.");
        } else {
            displayErrorMessage(false);
        }
    });
});

// reflect current_value changes to document
