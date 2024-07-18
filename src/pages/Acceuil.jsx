import React, { useEffect, useState } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Share from '../components/share';
import Loading from '../components/Loading';
import Row_card from '../components/row_card';
import Blog_row from '../components/blog_row';
import Popular_row from '../components/popular_row';
import Footer from '../components/footer';
import HeroAcceuil from '../components/HeroAcceuil';
import { useAuth } from '../contexts/AuthContext';
import { getFirestore, collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';

const Acceuil = () => {
    const [categorie, setCategorie] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [sort, setSort] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userData } = useAuth();
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const q = query(collection(db, "recipes"), limit(6));
                const querySnapshot = await getDocs(q);
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

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchRecipes(), fetchRecipesWithRating(), fetchCategoriesWithRandomRecipe()]);
            setLoading(false);
        };

        fetchData();
    }, [db]);

    if (loading || !userData) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className='text-center'>
                    <Loading />
                </div>
            </div>
        );
    }

    const fullname = `${userData.firstName} ${userData.lastName}`;

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
            <div className="container py-5">
                <h1>Categories Populaire</h1>
                <p className='brown fs-5 fw-bold text-end pb-5 pt-0'>Voir plus</p>
                <Popular_row pop={categorie} />
            </div>
            <Footer />
        </>
    );
};

export default Acceuil;
