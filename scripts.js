/*
TODO:
- fix text overflow on calculator screen.
*/

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
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            operator = "";
            return add(a, b);
        case "-":
            operator = "";
            return subtract(a, b);
        case "x":
            operator = "";
            return multiply(a, b);
        case "÷":
            operator = "";
            return divide(a, b);
    }
}

function updateBottomHalf() {
    screenBottomHalf.textContent = screenBottomValue;
}

function updateTopHalf() {
    screenTopHalf.textContent = screenTopValue;
}

const screenTopHalf = document.querySelector(".screen-top-half");
const screenBottomHalf = document.querySelector(".screen-bottom-half");
let screenTopValue = "";
let screenBottomValue = "";
let operator = "";

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        screenBottomValue += e.target.textContent;
        updateBottomHalf();
    });
});

const clearButton = document.getElementById("button-clear");
clearButton.addEventListener('click', (e) => {
    screenBottomValue = "";
    screenTopValue = "";
    updateBottomHalf();
    updateTopHalf();
});

const deleteButton = document.getElementById("button-delete");
deleteButton.addEventListener('click', (e) => {
    screenBottomValue = screenBottomValue.slice(0, -1);
    updateBottomHalf();
});

const decimalButton = document.getElementById("button-decimal");
decimalButton.addEventListener('click', (e) => {
    if (screenBottomValue.includes('.')) {
        return;
    } else {
        if (screenBottomValue === "") {
            screenBottomValue += "0.";    
        } else {
            screenBottomValue += ".";
        }
        updateBottomHalf();
    }
});

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        screenTopValue = `${screenBottomValue} ${e.target.textContent}`;
        screenBottomValue = "";
        operator = e.target.textContent;
        updateTopHalf();
        updateBottomHalf();
    });
});

const equalsButton = document.getElementById("button-equals");
equalsButton.addEventListener('click', (e) => {
    if (screenBottomValue === "" || operator === "") {
        return;
    } else if (screenBottomValue === "0" && operator === "÷"){
        alert("You can't divide by 0!");
        screenBottomValue = "";
        updateBottomHalf();
    } else {
        const screenTopResult = `${screenTopValue} ${screenBottomValue} =`;
        screenTopNum = screenTopValue.slice(0, -2);
        screenBottomValue = operate(operator, Number(screenTopNum), Number(screenBottomValue)).toString();
        screenTopValue = screenTopResult;
        updateTopHalf();
        updateBottomHalf();
    }
});