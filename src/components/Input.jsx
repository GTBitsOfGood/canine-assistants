import React from "react";

const Input = React.forwardRef(({ className = "", ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={`rounded bg-foreground border border-neutral-300 text-neutral-700 text-lg p-1 pl-2 font-normal ${className}`}
    />
  );
});

Input.displayName = "Input";

export default Input;
