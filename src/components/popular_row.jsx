import React from 'react'
import Popular from './popular'

const Popular_row = ({pop}) => {
    return (
        <div className="container">
            <div className="row justify-content-lg-center">
            {pop.map((item, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-6  text-lg-center mt-4">
                        <Popular image={item.image}/>
                        <p className='text-center fw-bold fs-5 mt-3'>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Popular_row
