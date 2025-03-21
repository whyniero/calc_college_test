const monitor = document.getElementById("result");
const operationDisplay = document.getElementById("operation");
const inputA = document.querySelector(".a");
const inputB = document.querySelector(".b");
const errorField = document.querySelector(".error-field");
const procentBtn = document.querySelector(".percent-btn");

let selectedOperation = null; // Выбранная операция, изначально пустая
let activeButton = null; // Активная кнопка выбранной операции
let isPercentApplied = false; // Флаг для отслеживания применения процента
let originalInputBValue = null; // Переменная для хранения исходного значения inputB
let percentValue = null; // Переменная для хранения вычисленного значения процента

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function () {
        let value = this.value.replace(/[^0-9.-]/g, '');

        if (value.startsWith('.')) {
            value = '0' + value;
        }

        if (value.indexOf('.') !== value.lastIndexOf('.')) {
            value = value.substring(0, value.lastIndexOf('.'));
        }

        this.value = value;

        // Если процент применен, добавляем символ % к значению inputB
        if (isPercentApplied && input === inputB && !this.value.endsWith('%')) {
            this.value = this.value + '%';
        }

        // Проверяем условия для активации кнопки процента
        updateProcentButtonState();
    });
});

// Функция для проверки состояния кнопки процента
function updateProcentButtonState() {
    const hasBothInputs = inputA.value !== "" && inputB.value !== ""; // Проверяем, что оба поля не пустые

    if (hasBothInputs) {
        procentBtn.disabled = false;
        // Если процент применен, кнопка зеленая
        if (isPercentApplied) {
            procentBtn.style.backgroundColor = "green";
        } else {
            // Иначе цвет по умолчанию
            procentBtn.style.backgroundColor = "";
        }
    } else {
        procentBtn.disabled = true;
        // Если процент применен, кнопка зеленая, иначе серая
        if (isPercentApplied) {
            procentBtn.style.backgroundColor = "green";
        } else {
            procentBtn.style.backgroundColor = "#bdbdbd";
        }
    }
}

// Функция для извлечения актуальных значений
function getValues() {
    // Удаляем символ % из inputB, если он есть
    const inputBValue = inputB.value.replace('%', '');
    const a = parseFloat(inputA.value) || 0;
    let b = parseFloat(inputBValue) || 0;

    // Если процент применен, используем вычисленное значение процента
    if (isPercentApplied) {
        b = percentValue;
    }

    return [a, b];
}

// Округление до 7 знаков
function roundRes(res) {
    try {
        if (res >= 1e21) throw new Error("Результат слишком большой");
        else if (res < 0.00000005 && res !== 0) throw new Error("Результат слишком маленький");
        return Number(res.toFixed(7));
    } catch (error) {
        console.log(error);
        errorField.textContent = error.message;
        return "Ошибка";
    }
}

// Функция для сброса процента
function resetPercent() {
    if (isPercentApplied) {
        // Удаляем символ % из inputB
        inputB.value = originalInputBValue;
        isPercentApplied = false; // Сбрасываем флаг
        originalInputBValue = null; // Сбрасываем сохраненное значение
        percentValue = null; // Сбрасываем вычисленное значение процента
        procentBtn.style.backgroundColor = ""; // Возвращаем цвет по умолчанию
        updateProcentButtonState(); // Обновляем состояние кнопки
    }
}

// Выбор операции
function setOperation(symbol, operationFunc) {
    selectedOperation = operationFunc;
    errorField.textContent = ""; // После каждой смены операции стирает поле ошибки
    monitor.textContent = ""; // После каждой смены операции стирает результат

    // Если выбрана операция корня, сбрасываем процент
    if (symbol === "√") {
        resetPercent();
        inputB.style.display = "none";
    } else {
        inputB.style.display = "inline-block";
    }

    // Подсветка кнопки
    operationDisplay.textContent = symbol;
    if (activeButton) activeButton.classList.remove("active");
    event.target.classList.add("active");
    activeButton = event.target;

    // Обновляем состояние кнопки процента
    updateProcentButtonState();
}

// Выполнение вычисления только после нажатия "="
function calculate() {
    if (!selectedOperation) {
        errorField.textContent = "Выберите операцию";
        return;
    }
    selectedOperation();
}

// Функция для обработки процента (переключение процента для inputB)
function applyPercent() {
    const [a, b] = getValues();
    if (!a || !b) return; // Если одно из полей пустое – ничего не делаем

    if (isPercentApplied) {
        // Если процент уже применен, возвращаем исходное значение
        inputB.value = originalInputBValue;
        isPercentApplied = false; // Сбрасываем флаг
        originalInputBValue = null; // Сбрасываем сохраненное значение
        percentValue = null; // Сбрасываем вычисленное значение процента
        procentBtn.style.backgroundColor = ""; // Возвращаем цвет по умолчанию
    } else {
        // Сохраняем исходное значение inputB
        originalInputBValue = b.toString();
        // Вычисляем процент: (inputA / 100) * inputB
        percentValue = (a / 100) * b;
        // Добавляем символ % к значению inputB (визуально)
        inputB.value = originalInputBValue + '%';
        // Меняем стиль кнопки процента
        procentBtn.style.backgroundColor = "green";
        isPercentApplied = true; // Устанавливаем флаг, что процент применен
    }

    // Обновляем состояние кнопки процента
    updateProcentButtonState();
}

// Операции калькулятора
function increase() {
    const [a, b] = getValues();
    const res = roundRes(a + b);
    monitor.textContent = res;
    return res;
}

function decrease() {
    const [a, b] = getValues();
    const res = roundRes(a - b);
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
        const res = roundRes(a / b);
        monitor.textContent = res;
        return res;
    } catch (error) {
        console.log(error);
        monitor.textContent = "Ошибка";
        errorField.textContent = error.message;
        return null; // возвращаем null в случае ошибки
    }
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
        const res = roundRes(Math.sqrt(a));
        monitor.textContent = res;
        return res;
    } catch (error) {
        console.log(error);
        monitor.textContent = "Ошибка";
        errorField.textContent = error.message;
        return null; // возвращаем null в случае ошибки
    }
}

// Очищение инпутов, операции и результата, активных кнопок
function remove() {
    inputA.value = "";
    inputB.value = "";
    monitor.textContent = "0";
    operationDisplay.textContent = "?";
    errorField.textContent = "";

    if (activeButton) activeButton.classList.remove("active");
    activeButton = null;
    selectedOperation = null;
    isPercentApplied = false; // Сбрасываем флаг процента
    originalInputBValue = null; // Сбрасываем сохраненное значение
    percentValue = null; // Сбрасываем вычисленное значение процента

    inputB.style.display = "inline-block";
    updateProcentButtonState(); // Обновляем состояние кнопки процента
}

// Инициализация состояния кнопки процента при загрузке страницы
procentBtn.style.backgroundColor = "#bdbdbd"; // Устанавливаем серый цвет при запуске
procentBtn.disabled = true; // Отключаем кнопку при запуске
updateProcentButtonState();