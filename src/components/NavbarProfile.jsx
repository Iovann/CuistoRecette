import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import React from 'react'
import firebaseApp from '../firebaseConfig';
import { getAuth, signOut } from "firebase/auth";


const NavbarProfile = ({ name }) => {

    const Logout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth).then(() => {
            console.log('Sign-out successful')
        }).catch((error) => {
            console.log("Erreur")
        });
    }
    return (
        <nav className="navbar navbar-expand-xl shadow-none navbar-before-scroll">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100 d-xl-none">
                    <span className="navbar-brand align-items-center">
                        <img src="/assets/icons/logo.svg" className='img-fluid' alt="" />
                        <span className='fw-bolder brand'>Cuisto<span style={{ color: "#974344" }}>Recettes</span> </span>
                    </span>

                    <div className="text-end">
                        <Link to="/user/profile">
                            <span className='text-end mb-0 me-1 d-block d-xl-none'><img src="/public/assets/icons/avatar.jpg" className='rounded-circle' style={{ width: "25%" }} alt="" /></span>
                        </Link>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
                <div className="d-none d-xl-flex">
                    <span className="navbar-brand align-items-center">
                        <img src="/assets/icons/logo.svg" className='img-fluid' alt="" />
                        <span className='fw-bolder'>Cuisto<span style={{ color: "#974344" }}>Recettes</span> </span>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse d-xl-flex justify-content-evenly" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 fw-bold">
                        <li className="nav-item mx-1">
                            <Link to="/user" className="nav-link active" aria-current="page" href="#">Acceuil</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link" href="#">Recette</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/user/add" className="nav-link">Ajouter une Recette</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/" className="nav-link">A propos</Link>
                        </li>
                    </ul>

                    <div className='d-flex align-items-center'>
                        <Link to="/user/profile" title={name}>
                            <p className='text-end mb-0 mx-2 d-none d-xl-block'><img src="./assets/icons/avatar.jpg" className='rounded-circle' style={{ width: "50%" }} alt="" /></p>
                        </Link>
                        <Link to={"/connexion"}><MDBBtn onClick={Logout} className='mx-1 fw-bold text-capitalize text-white' color='white' rippleColor='light' style={{ backgroundColor: '#B55D51' }} >Deconnexion</MDBBtn></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarProfile
