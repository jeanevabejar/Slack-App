
import React from 'react'

export default function Button({type, text, className}) {
  return (
    <button type={type} className={className}>{text}</button>
  )
}
