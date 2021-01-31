import React from 'react'
import './DropDownItem.scss'

function DropDownItem ({ text, type, handleClick }) {
  const className = 'DropDownItem ' + type

  return (
    <p className={className} onClick={handleClick}>{text}</p>
  )
}

export default DropDownItem
