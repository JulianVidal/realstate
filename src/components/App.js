import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from '../pages/Main'
import Properties from '../pages/Properties.js' 
import Favorites from '../pages/Favorites.js' 

function App () {
  return (
    <div id='App 'style={{height: '100%'}}>
      <Router>
        <Route exact={true} path='/' component={Main}/>
        <Route path='/properties' component={Properties}/>
        <Route path='/favorites' component={Favorites}/>
      </Router>
    </div>
  )
}

export default App
