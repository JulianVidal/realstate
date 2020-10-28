import React, { Component } from 'react'
import QueryString from 'query-string'
import './PropertyCards.scss'
import PropertyCard from './PropertyCard'
import { withRouter } from 'react-router-dom'

class PropertyCards extends Component {

  state = {
    data: null,
    search: null
  }

  componentDidMount () {
    const search = QueryString.parse(this.props.location.search).location
    this.setState({search})
    this.loadData(search)
  }

  componentDidUpdate () {
    if (this.state.search !==  QueryString.parse(this.props.location.search).location) {
      const search = QueryString.parse(this.props.location.search).location
      this.setState({search})
      this.loadData(search)
    }
  }

  async loadData (search) {
    const data = await fetch('/api?location=' + search).then(res => res.json())
    this.setState({data: null})
    this.setState({data: data})
  }

  render () {
    if (!this.state.data) return <div />

    const properties = []
    for (let i = 0; i < this.state.data.length; i++) {
      properties.push(<PropertyCard data={this.state.data[i]} />)
    }
    return (
      <div id='PropertyCards'>
        {properties}
      </div>
    )
  }
}

export default withRouter(PropertyCards)
