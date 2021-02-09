import React, { Component } from 'react'
import QueryString from 'query-string'
import './PropertyCards.scss'
import PropertyCard from './PropertyCard'
import { withRouter } from 'react-router-dom'
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



class PropertyCards extends Component {
  constructor(props) {
    super(props)
    gsap.registerPlugin(ScrollTrigger);
  }

  state = {
    data: null,
    search: null,
    error: null,
    loadedAnim: false,
    rel: false
  }

  async componentDidMount () {
    const animation = anim => {
      tl.to(".PropertyCard", 
      {autoAlpha: 1, 
        ease: Power3.easeOut,
        stagger: 0.1, 
        yoyo:true, 
        repeat: 1, 
        repeatDelay: 0.5,
        scaleX: 0.8,
        scaleY: 0.9,
        onComplete: () => {

          if (this.state.data || this.props.data) {
            tl.kill()
            this.setState({loadedAnim: true})
            ScrollTrigger.batch(".PropertyCard", {
              onEnter: batch =>{ 
                gsap.to(batch, {autoAlpha: 1, stagger: 0.1})
                gsap.from(batch, {scaleX: 0.88,scaleY: 0.94, stagger: 0.1})
            },
            });
          } else {
            anim(anim)
          }
        }})
    }

    const tl = gsap.timeline()

    animation(animation)
    this.setState({data: this.props.data})
    if (this.props.data) return
      let error
      const search = QueryString.parse(this.props.location.search).location
      const data = await fetch('/api?location=' + search).then(res => res.json()).catch(err => {error = err} )
      this.setState({search, data, error})
  }

  async componentDidUpdate () {
    if (this.props.data) return
    const search = QueryString.parse(this.props.location.search).location
    if (this.state.search !==  search) {
      let error
      const data = await fetch('/api?location=' + search).then(res => res.json()).catch(err => {error = err} )
      this.setState({search, data, error})
    }
  }

  render () {

    if (this.state.error) {
      return (
      <div id='PropertyCards'>
        <div className='noData'>
          Sorry! There has been an error getting your search results.
        </div>
      </div>
        )
  }


  window.onresize = () => {}
  if (!this.state.data || !this.state.loadedAnim) {
    window.onresize = () => {this.setState({rel: !this.state.rel})}
    const width = window.innerWidth
    const rows = Math.ceil((window.innerHeight - 126) / 238)

    let cols = 4

    if (width <= 400) {
      cols = 1
    } else if (width <= 1000 ) {
      cols = 2
    } else if (width <= 1500) {
      cols = 3
    }

    const properties = []
    const emptyPropertyData = {
      "adress": "",
      "link": "",
      "price": "",
      "beds": "",
      "baths": "",
      "sqft": "",
      "image": ""
    }
    for (let i = 0; i < cols * rows; i++) {
      properties.push(<PropertyCard data={emptyPropertyData} key={i} />)
    }

    return (
    <div id='PropertyCards' className='waitData'>
      {properties}
    </div>
      )
    }

    const data = this.props.data || this.state.data
    const properties = []
    for (let i = 0; i < data.length; i++) {
      properties.push(<PropertyCard data={data[i]} key={i} />)
    }

    return (
      <div id='PropertyCards'>
        {properties}
      </div>
    )
  }
}

export default withRouter(PropertyCards)
