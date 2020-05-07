export default function handleSubmit (event, formId) {
  event.preventDefault()
  const button = document.getElementById(formId).getElementsByClassName('FormButtonInput')[0].childNodes[0]
  button.click()
}