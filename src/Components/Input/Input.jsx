import React from 'react'

const Input = ({type, placeholder, onChange, value}) => {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} value={value} required/>
  )
}

export default Input