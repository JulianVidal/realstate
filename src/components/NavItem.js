import React from 'react'
import './NavItem.scss'

function NavItem (props) {
  const {text} = props
  return (
    <li className={text.split(' ')[0]}> {text} </li>
  )
}

export default NavItem
