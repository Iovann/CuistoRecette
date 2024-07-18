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
import { useAuth } from '../contexts/AuthContext';
import { getFirestore, collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [sort, setSort] = useState([])
    const [categorie, setCategorie] =  useState([])
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

        const fetchRecipesWithRating = async () => {
            try {
                const q = query(collection(db, "recipes"), orderBy("rating", "desc"), limit(6));
                const querySnapshot = await getDocs(q);
                const sortedRecipes = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSort(sortedRecipes);
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes triées par la note:", error);
            }
        };

        const fetchCategoriesWithRandomRecipe = async () => {
            const categories = new Set();
            const categoryRecipes = {};

            // Récupérer toutes les recettes
            const recipesSnapshot = await getDocs(collection(db, "recipes"));
            recipesSnapshot.forEach((doc) => {
                const recipe = doc.data();
                const category = recipe.category;
                if (category) {
                    categories.add(category);
                    if (!categoryRecipes[category]) {
                        categoryRecipes[category] = [];
                    }
                    categoryRecipes[category].push(recipe);
                }
            });

            // Choisir une recette aléatoire pour chaque catégorie
            const categoriesWithRandomRecipe = Array.from(categories).map((category) => {
                const recipes = categoryRecipes[category];
                const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
                return { category, randomRecipe };
            });

            setCategorie(categoriesWithRandomRecipe);
        };


        fetchRecipes();
        fetchRecipesWithRating();
        fetchCategoriesWithRandomRecipe();
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
                <Row_card card={sort} />
            </div>
            <div className="container py-5">
                <h1>Blog</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Blog_row />
            </div>
            <div className="container pb-5">
                <h1>Explorez les recettes</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Row_card card={recipes} />
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
            <Footer />
        </>
    )
}

export default Home