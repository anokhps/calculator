const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


let operator = '';
let currentValue = '';
let previousValue = '';

function handleNum(num) {
    if (currentValue.length < 5) {
        if (num == '.' && currentValue.includes('.')) return;

        else {
            currentValue += num;
        }
    }

}

function operation(op) {
    if (currentValue === '') return
    if (previousValue !== '') {
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    previousOperandTextElement.textContent = currentValue + " " + operator;
    currentOperandTextElement.textContent = '';
    currentValue = '';
}


function clear() {
    previousValue = '';
    currentValue = '';
    operator = ''
    previousOperandTextElement.textContent = currentValue;
    currentOperandTextElement.textContent = currentValue;

}

function deleteNum() {
    if (typeof (currentValue) == 'string') {
        currentValue = currentValue.slice(0, -1);
        currentOperandTextElement.textContent = currentValue;
    }
}


function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    // console.log(previousValue, currentValue);
    if (currentValue !== "" && previousValue !== "") {
        if (operator == '+') {
            previousValue = (previousValue + currentValue).toFixed(2);
            previousOperandTextElement.textContent = previousValue;
            currentValue = previousValue;
            currentOperandTextElement.textContent = '';
            operator = '';
        } else if (operator == '-') {
            previousValue = (previousValue - currentValue).toFixed(2);
            previousOperandTextElement.textContent = previousValue;
            currentValue = previousValue;
            currentOperandTextElement.textContent = '';
            operator = '';
        } else if (operator == '*') {
            previousValue = (previousValue * currentValue).toFixed(2);
            previousOperandTextElement.textContent = previousValue;
            currentValue = previousValue;
            currentOperandTextElement.textContent = '';
            operator = '';
        } else if (operator == '÷') {
            if (currentValue <= 0) {
                currentOperandTextElement.textContent = 'ERROR'
            } else {
                previousValue = (previousValue / currentValue).toFixed(2);
                previousOperandTextElement.textContent = previousValue;
                currentValue = previousValue;
                currentOperandTextElement.textContent = '';
                operator = '';
            }

        }

    }
}

numberButtons.forEach(numberButton => numberButton.addEventListener('click', (e) => {
    handleNum(e.target.textContent);
    currentOperandTextElement.textContent = currentValue;

}));


operationButtons.forEach(operationButton => operationButton.addEventListener('click', (e) => {
    operation(e.target.textContent);

}));

allClearButton.addEventListener('click', () => {
    clear();
});

deleteButton.addEventListener('click', () => {
    deleteNum();
});

equalsButton.addEventListener('click', () => {
    calculate();

});

//  keyboard functionality added
function keyboardFunction(e) {
    // console.log(e.key)
    if (e.key >= 0 && e.key <= 9) {
        handleNum(e.key);
        currentOperandTextElement.textContent = currentValue;
    }
    else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        operation(e.key);
    } else if (e.key == 'Delete') {
        clear();
    } else if (e.key == 'Backspace') {
        deleteNum();
    } else if (e.key == 'Enter') {
        calculate();
    } else if (e.key == '.') {
        if (!currentValue.includes('.')) {
            handleNum(e.key);
            currentOperandTextElement.textContent = currentValue;
        }
    }

}


document.addEventListener('keyup', keyboardFunction)