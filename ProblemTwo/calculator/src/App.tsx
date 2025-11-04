import { useCallback, useMemo, useState } from "react";
import styles from "./App.module.less";
import { CalculatorButton } from "./ui-components/CalculatorButton";
import { buttons } from "./buttons";
import { CalculatorEngine } from "./services/CalculatorEngine";
import type { Operator } from "./services/CalculatorEngine";

function App() {
  const engine = useMemo(() => new CalculatorEngine(), []);
  const [display, setDisplay] = useState(engine.getDisplay());

  const sync = useCallback(() => setDisplay(engine.getDisplay()), [engine]);

  const onDigit = useCallback(
    (d: string) => {
      engine.inputDigit(d);
      sync();
    },
    [engine, sync]
  );

  const onDot = useCallback(() => {
    engine.inputDot();
    sync();
  }, [engine, sync]);

  const onOperator = useCallback(
    (op: Operator) => {
      engine.inputOperator(op);
      sync();
    },
    [engine, sync]
  );

  const onEquals = useCallback(() => {
    engine.equals();
    sync();
  }, [engine, sync]);

  const onClear = useCallback(() => {
    engine.clear();
    sync();
  }, [engine, sync]);

  const onToggleSign = useCallback(() => {
    engine.toggleSign();
    sync();
  }, [engine, sync]);

  const onPercent = useCallback(() => {
    engine.percent();
    sync();
  }, [engine, sync]);

  const clickHandlers = useMemo(() => {
    return buttons.map((btn) => {
      switch (btn.type) {
        case "digit":
          return () => onDigit(btn.value ?? "");
        case "operator":
          return () => onOperator((btn.value as Operator) ?? "+");
        case "dot":
          return onDot;
        case "equals":
          return onEquals;
        case "clear":
          return onClear;
        case "toggleSign":
          return onToggleSign;
        case "percent":
          return onPercent;
        default:
          return () => {};
      }
    });
  }, [onDigit, onOperator, onDot, onEquals, onClear, onToggleSign, onPercent]);

  return (
    <div className={styles.calculator}>
      <div className={styles["calculator-display"]}>{display}</div>
      <div className={styles["calculator-keys"]}>
        {buttons.map((btn, idx) => {
          const classNames: string[] = [styles["calculator-key"]];
          if (btn.variant === "function")
            classNames.push(styles["calculator-key__function"]);
          if (btn.variant === "operator")
            classNames.push(styles["calculator-key__operator"]);
          if (btn.variant === "equals")
            classNames.push(styles["calculator-key__equals"]);
          if (btn.wide) classNames.push(styles["calculator-key__wide"]);

          return (
            <CalculatorButton
              key={`${btn.label}-${idx}`}
              className={classNames.join(" ")}
              onClick={clickHandlers[idx]}
              label={btn.label}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
