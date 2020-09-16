import React from 'react'
import SearchOptions from './SearchOptions'
import SearchBox from './SearchBox'
import './MainSearch.scss'

function MainSearch (props) {
  return (
    <div id='MainSearch'>
      <SearchOptions />
      <SearchBox history={props.history} />
    </div>
  )
}

export default MainSearch
