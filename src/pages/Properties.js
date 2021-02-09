import React from 'react'
import NavItem from '../components/NavItem'
import PropertyCards from '../components/PropertyCards'
import SearchBox from '../components/SearchBox'
import Page from '../components/Page'
import './Properties.scss'


function Properties() {
  const navItems = <NavItem id="NavSearchBox"><SearchBox /></NavItem>

  return (
    <Page navItems={navItems} color="dark" id="Properties">
      <PropertyCards />
    </Page>
  )
}

export default Properties
