import React from 'react'
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Share = () => {
    return (
        <div className='container py-5'>
            <div className="row justify-content-center justify-content-lg-start gx-5 align-items-center">
                <div className="col-lg-5 text-center">
                    <img src="/assets/images/share.jpg" className='img-fluid rounded-4' alt="" />
                </div>
                <div className="col-lg-6 text-lg-start text-center fw-semibold mt-3 mt-lg-0">
                    <p className='fw-bold display-5'>Partagez Vos <span className='brown'>Recettes</span></p>
                    <p className="">Découvrez un monde de saveurs sur notre plateforme de partage de recettes ! Que vous soyez un chef amateur ou un passionné de cuisine, explorez, créez et partagez vos meilleures recettes avec une communauté de gourmets enthousiastes. Rejoignez-nous pour une expérience culinaire délicieusement inspirante.</p>
                    <Link to="/user/add" className=''>
                        <MDBBtn className='mx-1 fw-bold  text-white' color='white' rippleColor='light' style={{ backgroundColor: '#B55D51' }} >Créer une nouvelle recette</MDBBtn>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Share
