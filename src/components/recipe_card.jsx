import { ImFire } from "react-icons/im";
import React from 'react'
import Star from './star'
const Recipe_card = ({ image, count, title, avatar, name, cals }) => {
    if (count > 5) {count = 5.0; count = count.toFixed(1)}
    else {count = count.toFixed(1)}
    return (
        <div className="card card">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <Star count={count} />
                    <span className="fw-bold">{count}</span>
                </div>
                <h5 className="card-title mt-2">{title}</h5>
                <div className="card-text d-flex justify-content-between align-items-center">
                    <span className='fw-semibold'><img src={avatar} className='rounded-circle img-fluid me-3' style={{ width: '20%' }} alt="" />{name}</span>
                    <span className='p-1 border border-1 rounded-2 border-warning cals text-center d-none d-sm-inline'> <ImFire color="red" className="mb-1" /> <span className="">{cals} cals</span></span>
                </div>
            </div>
        </div>
    )
}

export default Recipe_card
