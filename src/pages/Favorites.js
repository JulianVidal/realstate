import React from 'react'
import SearchBox from '../components/SearchBox'
import NavItem from '../components/NavItem'
import PropertyCards from '../components/PropertyCards'
import Page from '../components/Page'
import './Favorites.scss'

function Favorites() {
  const navItems = <NavItem id="NavSearchBox"><SearchBox /></NavItem>

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <Page navItems={navItems} color="dark" id="Favorites">
      <PropertyCards data={user.properties} />
    </Page>
  )
}

export default Favorites
