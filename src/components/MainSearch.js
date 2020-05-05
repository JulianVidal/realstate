import React from 'react'
import SearchOptions from './SearchOptions'
import SearchBox from './SearchBox'
import './MainSearch.scss'

function MainSearch () {
  return (
    <div id='MainSearch'>
      <SearchOptions />
      <SearchBox />
    </div>
  )
}

export default MainSearch
