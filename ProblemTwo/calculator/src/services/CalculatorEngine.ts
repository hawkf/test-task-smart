export type Operator = "+" | "-" | "×" | "÷";

export class CalculatorEngine {
  private displayValue: string;
  private firstOperand: number | null;
  private operator: Operator | null;
  private waitingForSecondOperand: boolean;

  constructor() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  getDisplay(): string {
    return this.displayValue;
  }

  clear(): void {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  inputDigit(digit: string): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
      return;
    }

    if (this.displayValue === "0") {
      this.displayValue = digit;
    } else {
      this.displayValue += digit;
    }
  }

  inputDot(): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = "0.";
      this.waitingForSecondOperand = false;
      return;
    }

    if (!this.displayValue.includes(".")) {
      this.displayValue += ".";
    }
  }

  toggleSign(): void {
    if (this.displayValue === "0") return;
    if (this.displayValue.startsWith("-")) {
      this.displayValue = this.displayValue.slice(1);
    } else {
      this.displayValue = "-" + this.displayValue;
    }
  }

  percent(): void {
    const value = parseFloat(this.displayValue);
    if (!Number.isNaN(value)) {
      this.displayValue = String(value / 100);
    }
  }

  inputOperator(nextOperator: Operator): void {
    const inputValue = parseFloat(this.displayValue);

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = `${result}`;
      this.firstOperand = result;
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
  }

  equals(): void {
    if (this.operator === null || this.firstOperand === null) return;
    const secondOperand = parseFloat(this.displayValue);
    const result = this.performCalculation(
      this.firstOperand,
      secondOperand,
      this.operator
    );
    this.displayValue = `${result}`;
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  private performCalculation(a: number, b: number, operator: Operator): number {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  }
}
