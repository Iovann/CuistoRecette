import React from 'react'
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

const Hero = () => {
    return (
        <div className='container pb-5'>
            <div className="text-center d-block d-lg-none">
                <span className='display-5 fw-bold'>Votre Plat Quotidien,</span> <br />
                <span className='display-4 fw-bold'>Un <span style={{ color: '#B55D51' }}>Voyage Culinaire</span></span>
            </div>
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-6 order-last order-lg-first text-center text-lg-start mt-xl-4">
                    <div className="d-none d-lg-block">
                        <span className='display-5 fw-bold text'>Votre Plat Quotidien,</span> <br />
                        <span className='display-5 fw-bold text'>Un <span style={{ color: '#B55D51' }}>Voyage Culinaire</span></span>
                    </div>
                    <p className='py-lg-3 fw-semibold'> Explorez une galaxie de saveurs, partagez vos créations gourmandes et connectez-vous avec d'autres passionnés de cuisine. Inspirez-vous, échangez des recettes authentiques et embarquez pour une aventure culinaire inoubliable chaque jour.</p>

                    <div>
                    <Link to="/connexion"><MDBBtn className='mx-1 d-lg-none fw-bold text-capitalize' color='light' rippleColor='dark' style={{ backgroundColor: '#EBEBEB' }}>Connexion</MDBBtn></Link>
                    <Link to='/inscription' className=''><MDBBtn className='mx-1 fw-bold text-capitalize text-white' color='white' rippleColor='light' style={{ backgroundColor: '#B55D51' }} >Inscription</MDBBtn></Link>
                    </div>

                    <p className='mt-3 d-none d-lg-block'>Avez-vous un compte? <Link to="/connexion" className='text-decoration-none' style={{ color: '#B55D51' }}>Connectez-vous</Link></p>
                </div>

                <div className="col-lg-6 order-first order-lg-last">
                    <p className='text-end'>
                        <img src="./assets/images/hero.webp" alt="" className='img-fluid' />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero
