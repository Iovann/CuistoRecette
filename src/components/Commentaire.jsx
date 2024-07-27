import React from 'react'
import { BsPersonCircle } from "react-icons/bs";
import Star from './star';
const Commentaire = ({ photo, fullname, text, rating, date }) => {
    return (
        <div>
            <div className="row py-2">
                <div className="col-lg-8">
                    <hr />
                    <div className='d-flex align-items-center py-2'>
                        {photo && <span className='mb-0 me-sm-2'><img src={photo} className='rounded-circle avatar img-fluid' alt="" /></span>}
                        {!photo && <span className='mb-0 me-sm-2'><BsPersonCircle size={50} color='#B55D51' className='avatar' /></span>}
                        <span className='fw-bold fs-5'>{fullname}</span>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Star count={rating} />
                        {date && <span className='px-4 fw-semibold'>{date}</span>}
                        {!date && <span className='px-4 fw-semibold'>17/02/23</span>}
                    </div>
                    <p className="fw-semibold py-2">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Commentaire
