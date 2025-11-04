import { memo } from "react";
import buttonStyles from "./CalculatorButton.module.less";

type CalculatorButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
};

export const CalculatorButton = memo(function CalculatorButton({
  label,
  className = "",
  onClick,
}: CalculatorButtonProps) {
  const classes = [buttonStyles.button, className].filter(Boolean).join(" ");
  return (
    <button className={classes} onClick={onClick}>
      {label}
    </button>
  );
});
