import React from 'react'
import imagePlaceholder from '../assets/Photo by Jesse Roberts on Unsplash.jpg'
import './PropertyCard.scss'

function PropertyCard () {
  return (
    <div className="PropertyCard">
      <img src={imagePlaceholder}  alt="Property" className='image'/>
      
      <div className="valuation">
        <p className="price">$1,329,000</p>
        {/* <p className="like">$1,329,000</p> */}
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

export default PropertyCard
