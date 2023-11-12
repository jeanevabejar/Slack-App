
import React from 'react'

export default function Button({type, any, className}) {
  return (
    <button type={type} className={className}>{any}</button>
  )
}
