import React from 'react'
import './FormTextInput.scss'

function FormTextInput (props) {

  const {text, type, icon, after} = props
    return(
      <div className="FormTextInput">
        { icon }
        <input type={type} placeholder={text}></input>
        { after }
      </div>
    )
}

export default FormTextInput
