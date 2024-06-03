class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(value) {
    return new Calculator(this.value + value);
  }

  subtract(value) {
    return new Calculator(this.value - value);
  }

  multiply(value) {
    return new Calculator(this.value * value);
  }

  divide(value) {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return new Calculator(this.value / value);
  }

  power(value) {
    return new Calculator(Math.pow(this.value, value));
  }

  getResult() {
    return this.value;
  }
}
