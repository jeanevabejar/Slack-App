import React, { forwardRef } from 'react';

const Button = forwardRef(({ className, children, text, ...props }, ref) => {
  return (
    <button ref={ref} className={className} {...props}>
      {children}{text}
    </button>
  );
});

export default Button;
