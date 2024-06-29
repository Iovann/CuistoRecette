import React, { useEffect, useState } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Share from '../components/share';
import Row_card from '../components/row_card';
import Blog_row from '../components/blog_row';
import Popular_row from '../components/popular_row';
import { dataCategorie, dataRecipe } from '../common/data';
import Footer from '../components/footer';
import HeroAcceuil from '../components/HeroAcceuil';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';

const Acceuil = () => {
    const [card, setCard] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const { userData } = useAuth();
    const db = getFirestore(firebaseApp);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "recipes"));
                const recipeList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecipes(recipeList);
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes:", error);
            }
        };
        fetchRecipes();
    }, []);
    console.log(card)

    const fullname = `${userData.firstName} ${userData.lastName}`
    return (
        <>
            <div id=''>
                <NavbarProfile name={fullname} image={userData.avatar} />
                <HeroAcceuil infos={userData.lastName} />
            </div>
            <Share />
            <div className="container py-5">
                <h1>À la une</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Row_card card={recipes} />
            </div>
            <div className="container py-5">
                <h1>Blog</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Blog_row />
            </div>
            <div className="container pb-5">
                <h1>Explorez les recettes</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                {/* <Row_card card={recipe} /> */}
            </div>
            <div className="container py-5">
                <h1>Categories Populaire</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                {/* <Popular_row pop={categorie} /> */}
            </div>
            <Footer />
        </>
    );
}

export default Acceuil;