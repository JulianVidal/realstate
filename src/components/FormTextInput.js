import React from 'react'
import './FormTextInput.scss'

function FormTextInput (props) {
 
  const {text, type, icon, after, onChange} = props
    return(
      <div className="FormTextInput">
        { icon }
        <input type={type} placeholder={text} onChange={onChange}></input>
        { after }
        <div className={"error-block " + type}> Hello error </div>
      </div>
    )
}

export default FormTextInput
