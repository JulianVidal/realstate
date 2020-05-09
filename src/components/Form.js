import React from 'react'

function Form ({ title, children }) {
  return (
    <div className='Form'>
      <h2> {title} </h2>
      <form onSubmit={handleSubmit}>
        { children }
      </form>
    </div>
  )
}

function handleSubmit (event, formId) {
  event.preventDefault()
  const button = document.getElementById(formId).getElementsByClassName('FormButtonInput')[0].childNodes[0]
  button.click()
}


export default Form
