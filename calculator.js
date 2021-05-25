class Caculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); //khi thuc thi thi ham clear duoc goi
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; //invalid double dot in function
        this.currentOperand = this.currentOperand.toString() + number.toString(); //khong can toString thi no van hieu la chuoi
        console.log("currentOperand is " + this.currentOperand);
        console.log("previousOperand is " + this.previousOperand);
        console.log("currentOperandText is " + this.currentOperandTextElement);
    }
    chooseOperation(operation) {
        console.log("currentOperand is " + this.currentOperand);
        console.log("previousOperand is " + this.previousOperand);
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        console.log("operation is " + this.operation);
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
        console.log("currentOperand is " + this.currentOperand);
        console.log("previousOperand is " + this.previousOperand);
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = (this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerHTML = `${this.previousOperand}
            ${ this.operation }`;
        } else {
            this.previousOperandTextElement.innerHTML = '';
        }
    }
}
const numberButton = document.getElementsByClassName('data_number');
const operationButton = document.querySelectorAll('[data_operation]');
const equalsButton = document.querySelector('[data_equals]');
const allClearButton = document.querySelector('[data_all_clear]');
const deleteButton = document.getElementsByClassName('data_delete');
const previousOperandTextElement = document.querySelector('[data_previous_operand]');
const currentOperandTextElement = document.querySelector('[data_current_operand]');
const calculator = new Caculator(previousOperandTextElement, currentOperandTextElement);
// document.getElementsByClassName khong dung duoc forEach
// phai chuyen ve array vi no la mot HTML collection
Array.from(numberButton).forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});
//querySelectorAll thi dung duoc
operationButton.forEach(button => {
    button.addEventListener('click', function() {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click', function() {
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', parameter => {
    calculator.clear();
    calculator.updateDisplay();
});
Array.from(deleteButton).forEach(button => {
    button.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();

    })
});