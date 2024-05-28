let lastResult = 0;

const calculator = {
    expression: '',
    displayValue: '0',
};

function inputDigit(digit) {
    calculator.expression += digit;
}

function inputDecimal(dot) {
    calculator.expression += dot;
}

function handleOperator(nextOperator) {
    calculator.expression += ' ' + nextOperator + ' ';
}

function handleParenthesis(parenthesis) {
    calculator.expression += parenthesis;
}

function calculateResult() {
    try {
        const result = eval(calculator.expression.replace(/%/g, '/100').replace(/√/g, 'Math.sqrt'));
        lastResult = result;
        calculator.displayValue = String(result);
    } catch (error) {
        calculator.displayValue = 'Error';
    }
}

function deleteLast() {
    calculator.expression = calculator.expression.trim().slice(0, -1);
}

function resetCalculator() {
    calculator.expression = '';
    calculator.displayValue = '0';
}

function updateDisplay() {
    const expressionScreen = document.getElementById('expression-screen');
    const resultScreen = document.getElementById('result-screen');
    expressionScreen.value = calculator.expression;
    resultScreen.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            handleOperator(value);
            break;
        case '√':
            handleParenthesis('Math.sqrt(');
            break;
        case '.':
            inputDecimal(value);
            break;
        case '=':
            calculateResult();
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            if (value === 'del') {
                deleteLast();
            } else if (value === 'ans') {
                calculator.expression += lastResult;
            } else if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});
