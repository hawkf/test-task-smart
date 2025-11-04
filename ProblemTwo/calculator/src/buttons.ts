export type ButtonConfig = {
  label: string;
  type:
    | "digit"
    | "operator"
    | "dot"
    | "equals"
    | "clear"
    | "toggleSign"
    | "percent";
  value?: string;
  wide?: boolean;
  variant?: "function" | "operator" | "equals";
};

export const buttons: ButtonConfig[] = [
  { label: "C", type: "clear", variant: "function" },
  { label: "±", type: "toggleSign", variant: "function" },
  { label: "%", type: "percent", variant: "function" },
  { label: "÷", type: "operator", value: "÷", variant: "operator" },

  { label: "7", type: "digit", value: "7" },
  { label: "8", type: "digit", value: "8" },
  { label: "9", type: "digit", value: "9" },
  { label: "×", type: "operator", value: "×", variant: "operator" },

  { label: "4", type: "digit", value: "4" },
  { label: "5", type: "digit", value: "5" },
  { label: "6", type: "digit", value: "6" },
  { label: "−", type: "operator", value: "-", variant: "operator" },

  { label: "1", type: "digit", value: "1" },
  { label: "2", type: "digit", value: "2" },
  { label: "3", type: "digit", value: "3" },
  { label: "+", type: "operator", value: "+", variant: "operator" },

  { label: "0", type: "digit", value: "0", wide: true },
  { label: ".", type: "dot" },
  { label: "=", type: "equals", variant: "equals" },
];
