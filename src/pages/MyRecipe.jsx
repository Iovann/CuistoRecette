import React, { useState, useEffect } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where, orderBy, getFirestore, deleteDoc, doc } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';
import Row_card from '../components/row_card';
import { FaSearch } from "react-icons/fa";
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const MyRecipe = () => {
    const { userData } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const fullname = `${userData.firstName} ${userData.lastName}`;

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        handleSearch(search);
    }, [search, recipes]);

    const fetchRecipes = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error('User not authenticated');
            }
            console.log(user.uid)
            const q = query(collection(db, "recipes"), where("createdBy.userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const recipeList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRecipes(recipeList);
            setFilteredRecipes(recipeList);
        } catch (error) {
            console.error("Erreur lors de la récupération des recettes:", error);
        }
    };

    const handleSearch = (search) => {
        if (search.trim() === '') {
            setFilteredRecipes(recipes);
        } else {
            const filtered = recipes.filter((recette) =>
                recette.title.toLowerCase().includes(search.toLowerCase()) || 
                recette.createdBy.name.toLowerCase().includes(search.toLowerCase()) || 
                recette.category.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredRecipes(filtered);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRecipes.length / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleDelete = async (recipeId) => {
        try {
            await deleteDoc(doc(db, "recipes", recipeId));
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette:", error);
        }
    };

    return (
        <>
            <NavbarProfile name={fullname} image={userData.avatar} />
            <div className="container">
                <hr />
                <div className='row justify-content-between align-items-center'>
                    <div className="col-4">
                        <p className='fw-bold display-6 mb-0'>Recette</p>
                    </div>
                    <div className="col-7 col-lg-4 text-end">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control form-control-sm" placeholder="Rechercher une recette..." value={search} onChange={handleSearchChange} />
                            <span className="input-group-text">
                                <FaSearch size={25} color='#B55D51' className='cursor' />
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="recette">
                    {filteredRecipes.length === 0 ? (
                        <p className="text-center my-4 display-6">
                            Vous n'avez encore soumis aucune recette.
                        </p>
                    ) : (
                        <>
                            <Row_card card={currentRecipes} />
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyRecipe;
