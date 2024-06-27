import React from 'react'

const Blog_card = ({image, title, subtitle, content }) => {
    return (
        <div className="card mt-3">
            <img src={image} style={{minHeight:"270%"}} className="card-img-top" alt="Fissure in Sandstone" />
            <div className="card-body text-center">
                <h5 className="card-title">{title}</h5>
                <p className='mb-0'>{subtitle}</p>
             <p className="card-text text-truncate">{content}</p>
            </div>
        </div>
    )
}
export default Blog_card
