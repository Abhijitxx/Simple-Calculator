document.addEventListener("DOMContentLoaded", function() {

    let inputBox = document.getElementById("inputBox");
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let isOperatorClicked = false;

    function updateInput() {
        inputBox.value = currentInput;
    }


    function buttonClick(value) {
        if (isOperatorClicked) {
            currentInput = '';
            isOperatorClicked = false;
        }
        currentInput += value;
        updateInput();
    }

    function calculate() {
        if (operator && firstOperand && currentInput) {
            currentInput = operate(operator, parseFloat(firstOperand), parseFloat(currentInput));
            operator = '';
            firstOperand = '';
            isOperatorClicked = true;
            updateInput();
        }
    }

    function clear() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        updateInput();
    }

    document.querySelectorAll(".button").forEach(function(button) {
        button.addEventListener("click", function() {
            let value = this.textContent;
            if (!isNaN(value) || value === '.') {
                buttonClick(value);
            } else if (value === '=' || value === 'Enter') {
                calculate();
            } else if (value === 'AC') {
                clear();
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                updateInput();
            } else {
                if (operator && firstOperand) {
                    calculate();
                }
                firstOperand = currentInput;
                operator = value;
                isOperatorClicked = true;
            }
        });
    });

    function operate(operator, num1, num2) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    return "Error";
                }
                return num1 / num2;
            case '%':
                return num1 % num2;
            default:
                return num2;
        }
    }
});
