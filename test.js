// вспомогательные функции для тестирования
function testIncrease(a, b) {
    inputA.value = a;
    inputB.value = b;
    return increase();
}

function testDecrease(a, b) {
    inputA.value = a;
    inputB.value = b;
    return decrease();
}

function testMultiply(a, b) {
    inputA.value = a;
    inputB.value = b;
    return multiply();
}

function testDivide(a, b) {
    inputA.value = a;
    inputB.value = b;
    return divide();
}

function testDegree(a, b) {
    inputA.value = a;
    inputB.value = b;
    return degree();
}

function testRoot(a) {
    inputA.value = a;
    inputB.value = ""; // Очищаем inputB, так как корень использует только inputA
    return root();
}

function testProcent(a, b) {
    inputA.value = a;
    inputB.value = b;
    procent();
    return parseFloat(inputB.value); // Возвращаем результат из inputB
}

// Тесты
const a = 12;
const b = 11;

describe("increase", function () {
    it(`12 плюс 11 будет 23`, function () {
        assert.equal(testIncrease(a, b), 23); // Правильный результат
    });
    it(`12 плюс 11 будет 24`, function () {
        assert.equal(testIncrease(a, b), 24); // Неправильный результат
    });
});

describe("degree", function () {
    it(`12 в степени 11 будет 743008370688`, function () {
        assert.equal(testDegree(a, b), 743008370688); // Правильный результат
    });
    it(`12 в степени 11 будет 7430083706853`, function () {
        assert.equal(testDegree(a, b), 7430083706853); // Неправильный результат
    });
});

describe("procent", function () {
    it(`процент 100 от 12 будет 12`, function () {
        assert.equal(testProcent(100, 12), 12); // Правильный результат
    });
    it(`процент 100 от 12 будет 13`, function () {
        assert.equal(testProcent(100, 12), 13); // Неправильный результат
    });
});

describe("root", function () {
    it(`корень 9 будет 3`, function () {
        assert.equal(testRoot(9), 3); // Правильный результат
    });
    it(`корень 9 будет 4`, function () {
        assert.equal(testRoot(9), 4); // Неправильный результат
    });
});

describe("decrease", function () {
    it(`12 минус 11 будет 1`, function () {
        assert.equal(testDecrease(a, b), 1); // Правильный результат
    });
    it(`12 минус 11 будет 4`, function () {
        assert.equal(testDecrease(a, b), 4); // Неправильный результат
    });
});

describe("multiply", function () {
    it(`12 умножить на 11 будет 132`, function () {
        assert.equal(testMultiply(a, b), 132); // Правильный результат
    });
    it(`12 умножить на 11 будет 1352`, function () {
        assert.equal(testMultiply(a, b), 1352); // Неправильный результат
    });
});

describe("divide", function () {
    it(`12 делить на 4 будет 3`, function () {
        assert.equal(testDivide(12, 4), 3); // Правильный результат
    });
    it(`12 делить на 4 будет 634`, function () {
        assert.equal(testDivide(12, 4), 634); // Неправильный результат
    });
});