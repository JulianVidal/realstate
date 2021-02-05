import React, { Component } from 'react'
import QueryString from 'query-string'
import './PropertyCards.scss'
import PropertyCard from './PropertyCard'
import { withRouter } from 'react-router-dom'
// import data from '../assets/data.json'

class PropertyCards extends Component {

  state = {
    data: null,
    search: null,
    page: 0
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    const search = QueryString.parse(this.props.location.search).location
    this.setState({search})
    this.loadData(search)
  }

  handleScroll () {
    if (document.body.scrollHeight - window.innerHeight <= window.scrollY) {
      console.log('load more')
      this.loadData(this.state.search, this.state.page + 1)
    }
  }

  componentDidUpdate () {
    if (this.state.search !==  QueryString.parse(this.props.location.search).location) {
      const search = QueryString.parse(this.props.location.search).location
      this.setState({search})
      this.loadData(search)
    }
  }

  async loadData (search, page) {
    // const data = await fetch('/api?location=' + search).then(res => res.json())
    this.setState({data: null})
    const data = await fetch('/api?location=' + search).then(res => res.json())
    this.setState({page: this.state.page + 1})
    this.setState({data: data})
  }

  render () {
    if (!this.state.data) return <div />

    const properties = []
    for (let i = 0; i < (16 * this.state.page < this.state.data.length ? 16 * this.state.page : this.state.data.length); i++) {
      properties.push(<PropertyCard data={this.state.data[i]} key={i} />)
    }
    return (
      <div id='PropertyCards'>
        {properties}
      </div>
    )
  }
}

export default withRouter(PropertyCards)
