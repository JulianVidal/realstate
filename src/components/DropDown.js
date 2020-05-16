import React from 'react'
import './DropDown.scss'

function DropDown (props) {
  return (
    <div className='DropDown'>
      { props.children }
    </div>
  )
}

export default DropDown
