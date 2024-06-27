import React, { useEffect, useState } from 'react'
import { FaApple } from "react-icons/fa";
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Share from '../components/share'
import Row_card from '../components/row_card'
import Blog_row from '../components/blog_row'
import Popular_row from '../components/popular_row'
import { dataCategorie, dataRecipe, dataCard } from '../common/data';
import Footer from '../components/footer';
const Home = () => {
    const [card, setCard] = useState([]);
    useEffect(() => {
        setCard(dataCard.slice(0, 6));
    }, []);

    const [recipe, setRecipe] = useState([]);
    useEffect(() => {
        setRecipe(dataRecipe.slice(0, 6));
    }, []);

    const [categorie, setCategorie] = useState([]);
    useEffect(() => {
        setCategorie(dataCategorie.slice(0, 8));
    }, []);

    return (
        <>
            <div id='fond'>
                <Navbar />
                <Hero />
            </div>
            <Share />
            <div className="container py-5">
                <h1>À la une</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Row_card card={card} />
            </div>
            <div className="container py-5">
                <h1>Blog</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Blog_row />
            </div>
            <div className="container pb-5">
                <h1>Explorez les recettes</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Row_card card={recipe} />
            </div>

            <div className="container-fluid bg-rose">
                <div className="row justify-content-center py-5 px-lg-5 px-1">
                    <div className="col-lg-6  col-xxl-4 col-sm-10 text-center">
                        <h1 className='py-3'>Gardez le contact!</h1>
                        <p className='text-center py-3 fs-4'>Rejoignez notre newsletter pour que nous puissions vous tenir informé de nos actualités et offres.</p>
                        <form action="" className='d-lg-flex text-center align-items-center justify-content-between'>
                            <input type="text" className='form-control mx-md-2' placeholder='Entrez votre email' />
                            <button type='submit' className='btn px-lg-3 mt-2 mt-lg-0 text-white fw-bold bg-brown'>S'abonner</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <h1>Categories Populaire</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Popular_row pop={categorie} />
            </div>
            <Footer/>
        </>
    )
}

export default Home