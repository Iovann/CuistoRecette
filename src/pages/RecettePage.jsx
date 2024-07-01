import React, { useState, useEffect } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where, orderBy, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';
import Row_card from '../components/row_card';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const RecettePage = () => {
    const { userData } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const [activeTab, setActiveTab] = useState('Recette'); // State to track the active tab
    const fullname = `${userData.firstName} ${userData.lastName}`;

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        fetchRecipes();
    }, [activeTab]);

    const fetchRecipes = async () => {
        try {
            let q = collection(db, "recipes");
            if (activeTab === 'Favoris') {
                q = query(q, where("favorite", "==", true));
            } else if (activeTab === 'Les mieux notées') {
                q = query(q, orderBy("rating", "desc"));
            }

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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1); // Reset to first page on tab change
    };

    const navLinkStyle = {
        '--bs-nav-link-color': 'var(--bs-white)',
        '--bs-nav-pills-link-active-color': '#B55D51',
        '--bs-nav-pills-link-active-bg': 'var(--bs-white)',
    };

    return (
        <>
            <NavbarProfile name={fullname} image={userData.avatar} />
            <div className="container">
                <hr />
                <div className='row justify-content-between align-items-center'>
                    <div className="col-8">
                        <p className='fw-bold display-6 mb-0'>Recette</p>
                    </div>
                    <div className="col-3 text-end"><FaSearch size={30} color='#B55D51' /></div>
                </div>
                <hr />

                <ul className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm bg-brown" id="pillNav2" role="tablist" style={navLinkStyle}>
                    <li className="nav-item" role="presentation">
                        <Link className={`nav-link rounded-5 ${activeTab === 'Recette' ? 'active' : ''}`} to="#" onClick={() => handleTabClick('Recette')} id="home-tab2" role="tab">Recette</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link className={`nav-link rounded-5 ${activeTab === 'Les mieux notées' ? 'active' : ''}`} to="#" onClick={() => handleTabClick('Les mieux notées')} id="profile-tab2" role="tab">Les mieux notées</Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link className={`nav-link rounded-5 ${activeTab === 'Favoris' ? 'active' : ''}`} to="#" onClick={() => handleTabClick('Favoris')} id="contact-tab2" role="tab">Favoris</Link>
                    </li>
                </ul>

                <div className="recette">
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
                </div>
            </div>
        </>
    );
}

export default RecettePage;
