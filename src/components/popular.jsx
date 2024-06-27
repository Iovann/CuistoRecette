import React from 'react'

const Popular = ({ image}) => {
    return (
        <div className='circle-container mx-auto'>
            <img src={image} className='circle-image img-fluid mb-3' alt="image de categorie" />
        </div>
    )
}

export default Popular
