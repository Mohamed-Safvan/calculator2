const calculators = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
};
const keys = document.querySelector('.keys');
console.log('keys', keys);
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

keys.addEventListener('click', e => {
    const { target } = e;
    console.log('target ', target);
    const { value } = target;
    console.log('value', value);
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            operatorEvent(value);
            break;
        case '.':
            dotValue(value);
            break;
        case 'all-clear':
            resetValue();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputValue(value);
            }
    }

    displayContent();
});
function displayContent() {
    const display = document.querySelector('.display');
    display.value = calculators.displayValue;
}

displayContent();

function inputValue(number) {
    const { displayValue, secondOperand } = calculators;

    if (secondOperand === true) {
        calculators.displayValue = number;
        calculators.secondOperand = false;
    } else {
        calculators.displayValue = displayValue === '0' ? number : displayValue + number;
    }
}

function operatorEvent(nextOperator) {
    const { firstOperand, displayValue, operator } = calculators
    const inputValue = parseFloat(displayValue);
    if (operator && calculators.secondOperand) {
        calculators.operator = nextOperator;
        return;
    }
    else if (firstOperand == null && !isNaN(inputValue)) {
        calculators.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculators.displayValue = `${parseFloat(result.toFixed(4))}`;
        calculators.firstOperand = result;
    }
    calculators.secondOperand = true;
    calculators.operator = nextOperator;
}

function calculate(firstOperand, nextOperand, operator) {
    if (operator === '+') {
        return firstOperand + nextOperand;
    } else if (operator === '-') {
        return firstOperand - nextOperand;
    } else if (operator === '*') {
        return firstOperand * nextOperand;
    } else if (operator === '/') {
        return firstOperand / nextOperand;
    }

    return nextOperand;
}

function dotValue(dot) {
    if (!calculators.displayValue.includes(dot)) {
        calculators.displayValue += dot;
    }
}

function resetValue() {
    calculators.displayValue = '0';
    calculators.firstOperand = null;
    calculators.secondOperand = false;
    calculators.operator = null;
}



