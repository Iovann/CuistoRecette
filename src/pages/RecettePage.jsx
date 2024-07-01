import React, { useState, useEffect } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';
import Row_card from '../components/row_card';

const RecettePage = () => {
    const { userData } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const fullname = `${userData.firstName} ${userData.lastName}`;
    
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

    // Get current recipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <NavbarProfile name={fullname} image={userData.avatar} />
            <div className="container">
                <hr />
                <div className='row justify-content-between align-items-center'>
                    <div className="col-8">
                        <p className='fw-bold display-6 mb-0'>Recette</p>
                    </div>
                </div>
                <hr />
                <Row_card card={currentRecipes} />
                <nav>
                    <ul className='pagination justify-content-center'>
                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${number === currentPage ? 'brown fw-bolder' : ''}`}>
                                <a onClick={() => paginate(number)}  className='page-link'>
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default RecettePage;
