import React from 'react'
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbBrandPinterest } from "react-icons/tb";

const Footer = () => {
    return (
        <div>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted py-4">
                <section className="">
                    <div className="container text-center text-lg-start mt-5">
                        <div className="row mt-3 justify-content-evenly">
                            <div className=" col-lg-4 col-xl-3 mb-4">
                                <p className='d-flex justify-content-center justify-content-lg-start'>
                                    <a className="navbar-brand align-items-center text-center">
                                        <img src="/assets/icons/logo.svg" className='img-fluid' alt="" />
                                        <span className='ms-3 fw-bolder fs-4'>Cuisto<span style={{ color: "#974344" }}>Recettes</span> </span>
                                    </a>
                                </p>
                                <p className='fw-bold fs-5 text-center text-lg-start'>Découvrez une multitude de recettes savoureuses, partagez vos propres créations, et faites partie d'une communauté culinaire dynamique.</p>
                            </div>

                            <div className=" col-lg-2 col-xl-2 mb-2 mt-4">
                                <h6 className="text-uppercase fw-bold mb-4 text-black fw-bolder">Accès rapide</h6>
                                <p><span href="#!" className="text-reset fw-semibold">Acceuil</span></p>
                                <p><span href="#!" className="text-reset fw-semibold">Recette</span></p>
                                <p><span href="#!" className="text-reset fw-semibold">Blog</span></p>
                            </div>
                            <div className=" col-lg-2 col-xl-2  mb-2 mt-4">
                                <h6 className="text-uppercase fw-bold mb-4 text-black fw-bolder">Liens Utiles</h6>
                                <p><span href="#!" className="text-reset fw-semibold">Partager une recette</span></p>
                                <p><span href="#!" className="text-reset fw-semibold">À Propos</span></p>
                                <p><span href="#!" className="text-reset fw-semibold">Contact</span></p>
                            </div>
                            <div className=" col-lg-2 col-xl-2 mb-2 mt-4">
                                <h6 className="text-uppercase fw-bold mb-4 text-black fw-bolder">MentionLégals</h6>
                                <p><span href="#!" className="text-reset fw-semibold">Conditions d'utilisation</span></p>
                                <p><span href="#!" className="text-reset fw-semibold">Confidentialité et cookies</span></p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <hr />
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-4 fw-semibold text-black mt-3">© 2024 Plateforme de Recettes Culinaires.</div>
                        <div className="col-lg-2 fw-semibold text-black mt-3">By Iovann ATCHO</div>
                        <div className="col-lg-4 text-end d-flex justify-content-evenly mt-3">
                            <FaTiktok className='border border-2 border-black p-1' color='black' size={30} />
                            <BsTwitterX size={30} color='black' />
                            <FaFacebookF size={30} color='black' />
                            <FaInstagram size={30} color='black' />
                            <TbBrandPinterest size={30} color='black' />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
