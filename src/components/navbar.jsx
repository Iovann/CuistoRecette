import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-xl mb-5 shadow-none navbar-before-scroll">
            <div className="container">
                <a className="navbar-brand align-items-center">
                    <img src="/assets/icons/logo.svg" className='img-fluid' alt="" />
                    <span className='fw-bolder'>Cuisto<span style={{color:"#974344"}}>Recettes</span> </span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-xl-flex justify-content-evenly" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 fw-bold">
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">Acceuil</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link" href="#">Recette</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link">Ajouter une Recette</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link">A propos</Link>
                        </li>
                    </ul>

                    <div className='d-flex justify-content-xl-between'>
                        <Link to="/connexion"><MDBBtn className='mx-1 fw-bold text-capitalize' color='light' rippleColor='dark' style={{ backgroundColor: '#EBEBEB' }}>Connexion</MDBBtn></Link>
                       <Link to='/inscription'><MDBBtn  className='mx-1 fw-bold text-capitalize text-white' color='white' rippleColor='light' style={{ backgroundColor: '#B55D51' }} >Inscription</MDBBtn></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
