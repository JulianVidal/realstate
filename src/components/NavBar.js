import React from 'react'
import './NavBar.scss'

function NavBar ({ children }) {
  return(
    <nav>
      <ul>
          { children }
      </ul>
    </nav>
  )
}

export default NavBar
