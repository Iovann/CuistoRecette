import React, { useState, useEffect } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where, orderBy, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';
import Row_card from '../components/row_card';
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const RecettePage = () => {
    const { userData } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const [activeTab, setActiveTab] = useState('Recette');
    const fullname = `${userData.firstName} ${userData.lastName}`;

    const db = getFirestore(firebaseApp);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tab = queryParams.get('tab');
        if (tab) {
            if(tab === 'LesMieuxNotees') {setActiveTab("Les mieux notées")}
            else if(tab === 'Favoris') {setActiveTab("Favoris")}
        }
        fetchRecipes();
    }, [location.search]);

    useEffect(() => {
        handleSearch(search);
    }, [search, recipes]);

    const fetchRecipes = async () => {
        try {
            const db = getFirestore(firebaseApp);
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error('User not authenticated');
            }

            let q = collection(db, "recipes");

            if (activeTab === 'Favoris') {
                const userDocRef = collection(db, "users");
                const userDocSnapshot = await getDocs(query(userDocRef, where("email", "==", user.email)));

                if (!userDocSnapshot.empty) {
                    const userData = userDocSnapshot.docs[0].data();
                    const userFavorites = userData.favorites || [];

                    if (userFavorites.length === 0) {
                        setRecipes([]);
                        return;
                    }

                    q = query(q, where("__name__", "in", userFavorites));
                } else {
                    setRecipes([]);
                    return;
                }
            } else if (activeTab === 'Les mieux notées') {
                q = query(q, orderBy("rating", "desc"));
            }

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
                recette.title.toLowerCase().includes(search.toLowerCase()) || recette.createdBy.name.toLowerCase().includes(search.toLowerCase()) || recette.category.toLowerCase().includes(search.toLowerCase())
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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1);
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
                    {filteredRecipes.length === 0 ? (
                        <p className="text-center my-4 display-6">
                            {activeTab === 'Favoris' ? "Vous n'avez pas encore de favoris." : "Aucune recette disponible."}
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

export default RecettePage;
