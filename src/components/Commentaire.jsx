import React from 'react'

const Commentaire = ({photo, fullname, text}) => {
    return (
        <div>
            <hr />
            <div className="row py-2">
                <div className="col-lg-8">
                    <div className='d-flex align-items-center'>
                        <span className='mb-0 me-sm-2'><img src={photo} className='rounded-circle avatar img-fluid' alt="" /></span>
                        <span className='fw-bold fs-5'>{fullname}</span>
                    </div>
                    <p className="fw-semibold mt-2 px-5">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Commentaire
