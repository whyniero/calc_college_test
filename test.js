const a = 12;
const b = 11;

describe("increase", function () {
    it(`12 плюс 11 будет 23`, function () {
        assert.equal(increase(a, b), 23);
    });
    it(`${a} плюс ${b} будет ${a + b}`, function () {
        assert.equal(increase(a, b), 22);
    });

});

describe("degree", function () {
    it(`${a} в степени ${b} будет ${a ** b}`, function () {
        assert.equal(degree(a, b), 743008370688);
    });
    it(`${a} в степени ${b} будет ${a ** b}`, function () {
        assert.equal(degree(a, b), 743008370687);
    });
});

describe("procent", function () {
    it(`процент 12 от 100 будет 12`, function () {
        assert.equal(procent(100, 12), 12);
    });
    it(`процент 12 от 100 будет 12`, function () {
        assert.equal(procent(100, 12), 13);
    });
});

describe("root", function () {
    it(`корень 9 будет 3`, function () {
        assert.equal(root(9), 3);
    });
    it(`корень 9 будет 3`, function () {
        assert.equal(root(9), 4);
    });
});

describe("decrease", function () {
    it(`${a} минус ${b} будет ${a - b}`, function () {
        assert.equal(decrease(a, b), 1);
    });
    it(`${a} минус ${b} будет ${a - b}`, function () {
        assert.equal(decrease(a, b), 2);
    });
});

describe("multiply", function () {
    it(`${a} умножить на ${b} будет ${a * b}`, function () {
        assert.equal(multiply(a, b), 132);
    });
    it(`${a} умножить на ${b} будет ${a * b}`, function () {
        assert.equal(multiply(a, b), 133);
    });
});

describe("devide", function () {
    it(`12 делить на 4 будет 3`, function () {
        assert.equal(devide(12, 4), 3);
    });
    it(`12 делить на 4 будет 3`, function () {
        assert.equal(devide(12, 4), 2);
    });
});
