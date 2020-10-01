import React, {Component} from 'react'
import imagePlaceholder from '../assets/Photo by Jesse Roberts on Unsplash.jpg'
import Lottie from 'react-lottie-wrapper'
import iconHeartStartData from '../assets/icons/heart.json'
import './PropertyCard.scss'

class PropertyCard extends Component {
  state = {
    isHeartStartStopped: true,
    isHeartStartPaused: false,
    isLiked: false
  }

  render () {
    const defaultOptions = (data, loop = false) => {
      return {
          loop,
          autoplay: false,
          animationData: data,
          rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
    }

    return (
      <div className="PropertyCard">
        <img src={imagePlaceholder}  alt="Property" className='image'/>
        
        <div className="valuation">
          <p className="price">$1,329,000</p>
          <Lottie   options={defaultOptions(iconHeartStartData)}
                    isStopped={this.state.isHeartStartStopped}
                    isPaused={this.state.isHeartStartPaused}
                    height ={26}
                    width  ={26}
                    isClickToPauseDisabled = {true}
                    onClick = {() => {
                      this.setState({isHeartStartStopped: false})
                      this.setState({isHeartStartPaused: false})
                    }}
                    eventListeners={[
                      {
                        eventName: 'enterFrame',
                        callback: frame => {
                          if (frame.currentTime > 12 && !this.state.isLiked) {
                            this.setState({isHeartStartPaused: true, isLiked: true})
                          }
                          else if (frame.currentTime >= 27 && this.state.isLiked) {
                            this.setState({isHeartStartStopped: true, isHeartStartPaused: false, isLiked: false})
                          }
                        }
                      }
                    ]}
                    />
        </div>
  
        <div className='details font'>
          <p className="bed font">3 beds</p>
          <p className="bath font">2 baths</p>
          <p className="sqft font">5,341 sqft</p>
        </div>
  
        <div className="place">
          <p className="address">4751 W Ruffner St, Seattle, WA 98199</p>
          <p className="courtesy">Courtesy of: Zillow</p>
        </div>
  
      </div>
    )


  }
}

export default PropertyCard
