const monitor = document.getElementById("result");
const operationDisplay = document.getElementById("operation");
const inputA = document.querySelector(".a");
const inputB = document.querySelector(".b");

let selectedOperation = null;
let activeButton = null;

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function (event) {
        let value = this.value.replace(/[^0-9,-]/g, '');

        if (value.startsWith(',')) {
            value = '0' + value;
        }

        if (value.indexOf(',') !== value.lastIndexOf(',')) {
            value = value.substring(0, value.lastIndexOf(','));
        }

        this.value = value;
    });
});

// функция для извлечения актуальных значений для использования перед каждой операцией
function getValues() {
    return [
        parseFloat(inputA.value) || 0,
        parseFloat(inputB.value) || 0
    ];
}

// округление до 7 знаков
function roundRes(res) {
    return Number(res.toFixed(7));
}

// Выбор операции
function setOperation(symbol, operationFunc) {
    selectedOperation = operationFunc;

    // Подсветка кнопки
    if (symbol !== "%") {
        operationDisplay.textContent = symbol;
        if (activeButton) activeButton.classList.remove("active");
        event.target.classList.add("active");
        activeButton = event.target;
    } else {
        calculate()
    }

    // Если операция с одним число (корень), скрываем второй инпут
    if (symbol === "√") {
        inputB.style.display = "none";
    } else {
        inputB.style.display = "inline-block";
    }
}

// выполнение вычисления только после нажатия "="
function calculate() {
    if (selectedOperation) {
        selectedOperation();
    }
}

// операции калькулятора
function increase() {
    const [a, b] = getValues();
    const res = roundRes(a + b)
    monitor.textContent = res;
    return res;
}

function decrease() {
    const [a, b] = getValues();
    const res = roundRes(a - b)
    monitor.textContent = res;
    return res;
}

function multiply() {
    const [a, b] = getValues();
    const res = roundRes(a * b);
    monitor.textContent = res;
    return res;
}

function divide() {
    const [a, b] = getValues();
    try {
        if (b === 0) throw new Error("На ноль делить нельзя");
        let res = roundRes(a / b);
        monitor.textContent = res;
        return res;
    } catch (error) {
        console.log(error);
        monitor.textContent = error.message;
        return null; // возвращаем null в случае ошибки
    }
}

function procent() {
    const [a, b] = getValues();
    if (!b) return; // если B пустое – ничего не делаем
    inputB.value = roundRes((a || 1) * (b / 100)); // если A пустое, считаем % от 1
}


function degree() {
    const [a, b] = getValues();
    const res = roundRes(a ** b);
    monitor.textContent = res;
    return res;
}

function root() {
    const [a] = getValues();
    try {
        if (a < 0) throw new Error("Отрицательного числа в корне быть не может");
        const res = roundRes(Math.sqrt(a))
        monitor.textContent = res;
        return res;
    } catch (error) {
        console.log(error)
        monitor.textContent = error.message;
        return null; // возвращаем null в случае ошибки
    }
}

// очищение инпутов, операции и результата, активных кнопок
function remove() {
    inputA.value = "";
    inputB.value = "";
    monitor.textContent = "0";
    operationDisplay.textContent = "?";

    if (activeButton) activeButton.classList.remove("active");
    activeButton = null;
    selectedOperation = null;

    inputB.style.display = "inline-block";
}