import React, {Component} from 'react'
import Lottie from 'react-lottie-wrapper'
import iconHeartStartData from '../assets/icons/heart.json'
import './PropertyCard.scss'

class PropertyCard extends Component {

  handleLike = () => {
    this.setState({isHeartStartStopped: false})
    this.setState({isHeartStartPaused: false})
  }

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

    const {adress, baths, beds, image, link, price, sqft} = this.props.data

    return (
      <div className="PropertyCard" onClick={() => {window.location.href = link}} >
        <img src={image}  alt="Property" className='image'/>
        
        <div className="valuation">
          <p className="price">{price}</p>
          <Lottie   options={defaultOptions(iconHeartStartData)}
                    isStopped={this.state.isHeartStartStopped}
                    isPaused={this.state.isHeartStartPaused}
                    height ={36}
                    width  ={36}
                    isClickToPauseDisabled = {true}
                    onClick = {this.handleLike}
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
          <p className="bed font">{beds}</p>
          <p className="bath font">{baths}</p>
          <p className="sqft font">{sqft}</p>
        </div>
  
        <div className="place">
          <p className="address">{adress}</p>
          <p className="courtesy">Courtesy of: Zillow</p>
        </div>
  
      </div>
    )


  }
}

export default PropertyCard
