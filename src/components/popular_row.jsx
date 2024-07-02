import React from 'react'
import Popular from './popular'
import { useNavigate } from "react-router-dom";


const Popular_row = ({ pop }) => {
    const navigate = useNavigate();
    const handleCategoryClick = (item) => {
        navigate(`/category/${item}`);
    };

    return (
        <div className="container">
            <div className="row justify-content-lg-center">
                {pop.map((item, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-6  text-lg-center mt-4" onClick={() => handleCategoryClick(item.category)}>
                        <Popular image={item.randomRecipe.photo} />
                        <p className='text-center fw-bold fs-5 mt-3'>{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Popular_row
