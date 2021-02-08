import React, {Component} from 'react'
import Lottie from 'react-lottie-wrapper'
import { formDisplay } from './Form'
import iconHeartStartData from '../assets/icons/heart.json'
import emptyImage from '../assets/empty.png'
// import firebase from '../firebase'
import './PropertyCard.scss'

class PropertyCard extends Component {

  handleLike = () => {

    // const itemsRef = firebase.database().ref(userId);
    // const property = {"adress":"4447 Skookumchuck Rd SE, Tenino, WA 98589","link":"https://www.zillow.com/homedetails/4447-Skookumchuck-Rd-SE-Tenino-WA-98589/49352019_zpid/","price":"$490,000","beds":"3 bds,","baths":"2 ba,","sqft":"1,912 sqft","image":"https://photos.zillowstatic.com/fp/6631fa4637aeea0746aac3f9507621d3-zillow_web_48_23.jpg"}
    // itemsRef.push(property);

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      formDisplay('LogIn')
      return
    }

    this.setState({isHeartStartStopped: false})
    this.setState({isHeartStartPaused: false})
    console.log(user)
    const index = user.properties.findIndex(({adress}) => adress === this.props.data.adress)
      if (index !== -1){
        console.log('Property unliked:')
        user.properties.splice(index, 1)
      } else {
        console.log('Property liked:')
        user.properties.push(this.props.data)
      }

    // fetch('http://localhost:5000/likes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // })

    localStorage.setItem('user', JSON.stringify(user))
    console.log(this.props.data)
  }

  state = {
    isHeartStartStopped: true,
    isHeartStartPaused: false,
    isLiked: false
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    if (user.properties) {
      if (user.properties.find( ({ adress }) => adress === this.props.data.adress)) {
        this.setState({'isHeartStartStopped': false})
      }
    }
  }

  componentDidUpdate() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      if (this.state.isHeartStartPaused) this.setState({'isHeartStartPaused': false})
      return
    }
    if (user.properties) {
      if (user.properties.find( ({ adress }) => adress === this.props.data.adress) && this.state.isHeartStartStopped) {
        this.setState({'isHeartStartStopped': false})
      }
    }
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
      <div className={"PropertyCard"}>
        <img src={image || emptyImage}  alt="Property" className='image' onClick={() => {window.location.href = link}} />
        
        <div className="valuation">
          <p className="price">{price}</p>
          {<Lottie   options={defaultOptions(iconHeartStartData)}
                    isStopped={this.state.isHeartStartStopped}
                    isPaused={this.state.isHeartStartPaused}
                    height ={adress ? 26 : 0}
                    width  ={adress ? 26 : 0}
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
                    />}
        </div>
  
        <div className='details font'>
          <p className="bed font">{beds}</p>
          <p className="bath font">{baths}</p>
          <p className="sqft font">{sqft}</p>
        </div>
  
        <div className="place">
          <p className="address">{adress}</p>
          <p className="courtesy">{adress ? 'Courtesy of: Zillow' : ''}</p>
        </div>
  
      </div>
    )


  }
}

export default PropertyCard
