
import React, { forwardRef } from 'react'

const Button = forwardRef(( {className, text, ...props}, ref) => {
  return (
<button ref={ref}  className={className} {...props}>{text}</button>
  )
}) 

export default Button