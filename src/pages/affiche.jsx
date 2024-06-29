import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
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

    return (
        <div>
            <h1>Liste des Recettes</h1>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <p><strong>Ingrédients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p><strong>Temps de préparation:</strong> {recipe.prepTime} minutes</p>
                            <p><strong>Temps de cuisson:</strong> {recipe.cookTime} minutes</p>
                            <p><strong>Portions:</strong> {recipe.servings}</p>
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                            <p><strong>Catégorie:</strong> {recipe.category}</p>
                            {recipe.photo && <img src={recipe.photo} alt={recipe.title} />}
                            <h3>Étapes</h3>
                            <ul>
                                {recipe.steps.map((step, index) => (
                                    <li key={index}>
                                        <p>{step.instructions}</p>
                                        {step.photo && <img src={step.photo} alt={`Step ${index + 1}`} />}
                                    </li>
                                ))}
                            </ul>
                            <h3>Créé par</h3>
                            {recipe.createdBy && (
                                <div>
                                    <p><strong>Nom:</strong> {recipe.createdBy.name}</p>
                                    <p><strong>Email:</strong> {recipe.createdBy.email}</p>
                                    {recipe.createdBy.photoURL && <img src={recipe.createdBy.photoURL} alt={recipe.createdBy.name} />}
                                </div>
                            )}
                            <h3>Commentaires</h3>
                            <ul>
                                {recipe.comments && recipe.comments.map((comment, index) => (
                                    <li key={index}>
                                        <p><strong>{comment.userName}:</strong> {comment.commentText}</p>
                                        {comment.userPhotoURL && <img src={comment.userPhotoURL} alt={comment.userName} />}
                                        <p><strong>Note:</strong> {comment.rating}</p>
                                        <p><strong>Date:</strong> {new Date(comment.timestamp.toDate()).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune recette trouvée.</p>
            )}
        </div>
    );
};

export default RecipeList;
