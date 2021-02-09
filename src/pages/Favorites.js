import React, {Component, Fragment} from 'react'
import SearchBox from '../components/SearchBox'
import NavItem from '../components/NavItem'
import PropertyCards from '../components/PropertyCards'
import Page from '../components/Page'
import firebase from '../firebase.js'
import './Favorites.scss'

class Favorites extends Component {

  state = {
    properties: null,
  }

  async componentDidMount() {
    const user = localStorage.getItem('user')
    const properties = await firebase.database().ref(user).once('value').then(snapshot => Object.values(snapshot.val() || {}))
    this.setState({properties})
  }
  
  render() {
    const navItems = <Fragment>
      <NavItem text="Rentify" id="NavRentify" type="logo" color="dark"/>
      <NavItem id="NavSearchBox"><SearchBox /></NavItem>
    </Fragment>
    return (
      <Page navItems={navItems} color="dark" id="Favorites">
        <PropertyCards data={this.state.properties} />
      </Page>
    )
  }
}

export default Favorites
