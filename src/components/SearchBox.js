import React, { Component } from 'react'
import Lottie from 'react-lottie'
import iconSearchData from '../assets/icons/search.json'
import './SearchBox.scss'

class SearchBox extends Component {

  state = {
    isStopped: true
  }

  render (){
    const defaultOptions = {
      loop: false,
      renderer: 'svg',
      autoplay: false,
      animationData: iconSearchData,
      renderSettings: {
        preserveAspectRation: 'xMidYMid slice'
      }
    }
  
    return (
      <div id='SearchBox'>
        <button onClick={ () => this.setState({isStopped: false})}>
          <Lottie options={defaultOptions}
                  height ={20}
                  width  ={20}
                  isStopped={this.state.isStopped}
                  isClickToPauseDisabled = {true}
                  eventListeners={[
                    {
                      eventName: 'complete',
                      callback: () => this.setState({isStopped: true})
                    }
                  ]} />
        </button>
        <input type='text' placeholder='Search...'></input>
      </div>
    )
  }
}

export default SearchBox
