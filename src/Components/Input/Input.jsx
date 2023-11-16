import React, { forwardRef } from 'react'

const Input = forwardRef(({type, ...props}, ref) => {
  return (
    <input ref={ref} type={type} {...props} required/>
  )
}
) 
export default Input