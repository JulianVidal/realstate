import React, {Component} from 'react'
import Lottie from 'react-lottie-wrapper'
import iconHeartStartData from '../assets/icons/heart.json'
import './PropertyCard.scss'

class PropertyCard extends Component {

  handleLike = () => {
    this.setState({isHeartStartStopped: false})
    this.setState({isHeartStartPaused: false})

    // const user = JSON.parse(localStorage.getItem('user'))

    // user.properties = []
    // user.properties.push(this.props.data)

    // fetch('http://localhost:5000/post', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // })

    // localStorage.setItem('user', JSON.stringify(user))
  }

  state = {
    isHeartStartStopped: true,
    isHeartStartPaused: false,
    isLiked: false
  }

  // componentDidMount() {
  //   const user = JSON.parse(localStorage.getItem('user'))

  //   if (user.properties) {
  //     if (user.properties.find( ({ adress }) => adress === this.props.data.adress)) {
  //       this.setState({'isLiked': true})
  //     }
  //   }
  // }

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
      <div className="PropertyCard">
        <img src={image}  alt="Property" className='image' onClick={() => {window.location.href = link}} />
        
        <div className="valuation">
          <p className="price">{price}</p>
          <Lottie   options={defaultOptions(iconHeartStartData)}
                    isStopped={this.state.isHeartStartStopped}
                    isPaused={this.state.isHeartStartPaused}
                    height ={26}
                    width  ={26}
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
