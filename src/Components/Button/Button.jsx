
import React from 'react'

  

export default function Button({  type, text, className, onClick}) {

  return (
    <button type={type} className={className} onClick={onClick}>{text}</button>
  )
}
