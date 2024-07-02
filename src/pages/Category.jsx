import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import firebaseApp from '../firebaseConfig'
import { useAuth } from '../contexts/AuthContext';
import NavbarProfile from "../components/NavbarProfile";
import { FaSearch } from "react-icons/fa";
import Row_card from "../components/row_card";

const Category = () => {
    const { userData } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const fullname = `${userData.firstName} ${userData.lastName}`;
    const db = getFirestore(firebaseApp);
    const { category } = useParams();

    useEffect(() => {
        const fetchRecipes = async () => {
            console.log(category);
            const db = getFirestore();
            const recipesQuery = query(collection(db, "recipes"), where("category", "==", category));
            const recipesSnapshot = await getDocs(recipesQuery);
            const recipesList = recipesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecipes(recipesList);
        };
        
        fetchRecipes();
    }, [category]);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    console.log(recipes)



    return (
        <>
            <NavbarProfile name={fullname} image={userData.avatar} />
            <div className="container">
                <hr />
                <div className='row justify-content-between align-items-center'>
                    <div className="col-8">
                        <p className='fw-bold display-6 mb-0'>Categorie</p>
                    </div>
                    <div className="col-3 text-end"><FaSearch size={30} color='#B55D51' /></div>
                </div>
                <hr />

                <div className="recette">
                    <Row_card card={recipes} />
                    <nav>
                        <ul className='pagination justify-content-center'>
                            {pageNumbers.map(number => (
                                <li key={number} className={`page-item ${number === currentPage ? 'fw-bolder active' : ''}`}>
                                    <a onClick={() => paginate(number)} className='page-link'>
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Category
