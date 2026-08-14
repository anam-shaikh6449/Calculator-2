let history = [];

const previousDisplay = document.getElementById("previous-display");
const currentDisplay = document.getElementById("current-display");
const historyList = document.getElementById("history-list");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let previousNumber = "";
let operator = "";

buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            enterNumber(value);

        } else if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {
            chooseOperator(value);

        } else if (value === "=") {
            calculate();

        } else if (value === "AC") {
            clearCalculator();

        } else if (value === "DEL") {
            deleteNumber();

        } else if (value === "%") {
            percentage();
        }
    });
});


function enterNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    currentNumber += number;

    currentDisplay.textContent = currentNumber;
}


function chooseOperator(selectedOperator) {

    if (currentNumber === "") {
        return;
    }

    previousNumber = currentNumber;
    operator = selectedOperator;

    previousDisplay.textContent =
        previousNumber + " " + operator;

    currentNumber = "";
}


function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === ""
    ) {
        return;
    }

    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    let result;

    if (operator === "+") {
        result = num1 + num2;

    } else if (operator === "−") {
        result = num1 - num2;

    } else if (operator === "×") {
        result = num1 * num2;

    } else if (operator === "÷") {

        if (num2 === 0) {
            currentDisplay.textContent = "Error";
            return;
        }

        result = num1 / num2;
    }

    previousDisplay.textContent =
        previousNumber + " " + operator + " " + currentNumber;

    currentDisplay.textContent = result;

    addToHistory(
        previousNumber + " " + operator + " " + currentNumber,
        result
    );

    currentNumber = result.toString();

    previousNumber = "";
    operator = "";
}


function clearCalculator() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    previousDisplay.textContent = "";
    currentDisplay.textContent = "0";
}


function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    if (currentNumber === "") {
        currentDisplay.textContent = "0";
    } else {
        currentDisplay.textContent = currentNumber;
    }
}


function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber =
        (parseFloat(currentNumber) / 100).toString();

    currentDisplay.textContent = currentNumber;
}


function addToHistory(expression, result) {

    history.push({
        expression: expression,
        result: result
    });

    displayHistory();
}


function displayHistory() {

    historyList.innerHTML = "";

    history.forEach(function(item) {

        const historyItem =
            document.createElement("div");

        historyItem.textContent =
            item.expression + " = " + item.result;

        historyList.appendChild(historyItem);
    });
}