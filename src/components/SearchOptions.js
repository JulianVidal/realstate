import React from 'react'
import { TimelineLite, Power3 } from 'gsap'
import './SearchOptions.scss'

function SearchOptions (){
  return (
    <div id='SearchOptions'>
      <p className="SearchOption" onClick={changeActive}>Buy  <span className="underline active" style={{width: '61px'}}> </span> </p>
      <p className="SearchOption" onClick={changeActive}>Rent <span className="underline"> </span></p>
      <p className="SearchOption" onClick={changeActive}>Sell <span className="underline"> </span></p>
    </div>
  )
}

export default SearchOptions

function changeActive (event) {
  const active = event.target.parentNode.getElementsByClassName('active')[0]
  const newActive = event.target.childNodes[1]

  if (active === newActive) return

  active.classList.remove('active')
  newActive.classList.add('active')

  const tl = new TimelineLite()
  tl.to(active, 0.4, {width: 0, ease: Power3.easeOut})
    .to(newActive, 0.4, {width: 61, ease: Power3.easeOut}, 0.1)

}
