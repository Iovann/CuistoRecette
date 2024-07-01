import { ImFire } from "react-icons/im";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Star from './star';

const Recipe_card = ({ id, image, count, title, avatar, name, cals }) => {
    const navigate = useNavigate();

    if (count) {
        if (count > 5) {
            count = 5.0;
            count = count.toFixed(1);
        } else {
            count = count.toFixed(1);
        }
    }

    const handleCardClick = () => {
        navigate(`/recette/${id}`);
    };

    return (
        <div className="card card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <img src={image} className="card-img-top card-image" alt={image} />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <Star count={count} />
                    <span className="fw-bold">{count}</span>
                </div>
                <h5 className="card-title mt-2">{title}</h5>
                <div className="card-text d-flex justify-content-between align-items-center">
                    <span className='fw-semibold'><img src={avatar} className='rounded-circle img-fluid me-1 avatar2' alt="" />{name}</span>
                    {/* <span className='p-1 border border-1 rounded-2 border-warning cals text-center d-none d-lg-inline'> <ImFire color="red" className="mb-1" /> <span className="">{cals} cals</span></span> */}
                </div>
            </div>
        </div>
    );
};

export default Recipe_card;
