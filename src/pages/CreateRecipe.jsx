import React, { useState, useRef } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Footer from '../components/footer';
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Link } from 'react-router-dom';
import firebaseApp from '../firebaseConfig';
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useAuth } from '../contexts/AuthContext';

const CreateRecipe = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [items, setItems] = useState([{ photo: null, instructions: '' }]);
    const [title, setTitle] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [cookTime, setCookTime] = useState('');
    const [servings, setServings] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState(null);
    const [formErrors, setFormErrors] = useState({
        title: false,
        description: false,
        ingredients: false,
        instructions: false,
        servings: false,
        prepTime: false,
        cookTime: false,
        cuisine: false,
        category: false,
        photo: false
    });
    const { userData } = useAuth();

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImageUrl(reader.result);
                setPhoto(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setFormErrors({ ...formErrors, description: event.target.value.trim() === '' });
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
        setFormErrors({ ...formErrors, ingredients: false });
    };

    const handleChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setFormErrors({ ...formErrors, title: event.target.value.trim() === '' });
    };

    const handlePrepTimeChange = (event) => {
        setPrepTime(event.target.value);
        setFormErrors({ ...formErrors, prepTime: event.target.value.trim() === '' });
    };

    const handleCookTimeChange = (event) => {
        setCookTime(event.target.value);
        setFormErrors({ ...formErrors, cookTime: event.target.value.trim() === '' });
    };

    const handleServingsChange = (event) => {
        setServings(event.target.value);
        setFormErrors({ ...formErrors, servings: event.target.value.trim() === '' });
    };

    const handleCuisineChange = (event) => {
        setCuisine(event.target.value);
        setFormErrors({ ...formErrors, cuisine: event.target.value.trim() === '' });
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setFormErrors({ ...formErrors, category: event.target.value.trim() === '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const db = getFirestore(firebaseApp);
        const storage = getStorage(firebaseApp);
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;

        if (!user) {
            alert('Vous devez être connecté pour soumettre une recette.');
            return;
        }

        const newFormErrors = {
            title: title.trim() === '',
            description: description.trim() === '',
            ingredients: ingredients.some(ingredient => ingredient.trim() === ''),
            servings: servings.trim() === '',
            prepTime: prepTime.trim() === '',
            cookTime: cookTime.trim() === '',
            cuisine: cuisine.trim() === '',
            category: category.trim() === '',
            photo: photo === null,
            instructions: items.some(item => item.instructions.trim() === '')
        };

        setFormErrors(newFormErrors);

        const hasErrors = Object.values(newFormErrors).some(error => error);
        if (hasErrors) {
            alert('Veuillez remplir tous les champs obligatoires correctement.');
            return;
        }

        try {
            const recipeRef = doc(collection(db, 'recipes'));
            const recipeId = recipeRef.id;

            let photoUrl = null;
            if (photo) {
                const photoRef = ref(storage, `recipes/${recipeId}/mainPhoto.jpg`);
                await uploadString(photoRef, photo, 'data_url');
                photoUrl = await getDownloadURL(photoRef);
            }

            const steps = await Promise.all(items.map(async (item, index) => {
                let stepPhotoUrl = null;
                if (item.photo) {
                    const stepPhotoRef = ref(storage, `recipes/${recipeId}/steps/step${index + 1}.jpg`);
                    await uploadString(stepPhotoRef, item.photo, 'data_url');
                    stepPhotoUrl = await getDownloadURL(stepPhotoRef);
                }
                return {
                    instructions: item.instructions,
                    photo: stepPhotoUrl
                };
            }));

            const fullname = `${userData.firstName} ${userData.lastName}`
            const userInfo = {
                userId: user.uid,
                name: fullname,
                photoURL: userData.avatar
            };

            await setDoc(recipeRef, {
                title,
                description,
                ingredients,
                prepTime,
                cookTime,
                servings,
                cuisine,
                category,
                photo: photoUrl,
                steps,
                createdBy: userInfo,
            });
            alert('Recette enregistrée avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement de la recette:', error);
            alert('Erreur lors de l\'enregistrement de la recette');
        }
    };

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleAddItem = () => {
        setItems([...items, { photo: null, instructions: '' }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handlePhotoChange = (index, event) => {
        const newItems = [...items];
        const newPhoto = event.target.files[0];
        if (newPhoto) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newItems[index].photo = reader.result;
                setItems(newItems);
            };
            reader.readAsDataURL(newPhoto);
        }
    };

    const handleInstructionsChange = (index, event) => {
        const newItems = [...items];
        newItems[index].instructions = event.target.value;
        setItems(newItems);
        setFormErrors({ ...formErrors, instructions: event.target.value.trim() === '' });
    };
    const fullname = `${userData.firstName} ${userData.lastName}`

    return (
        <>
            <NavbarProfile name={fullname} image={userData.avatar} />
            <div className="container">
                <hr />
                <div className='row justify-content-between align-items-center'>
                    <div className="col-8">
                        <p className='fw-bold display-6 mb-0'>Créer une recette</p>
                    </div>
                    <div className="col-4 text-end">
                        <Link to="/user"><button className='btn bg-brown text-capitalize mb-0 text-white fw-bolder' onClick={handleSubmit}>Enregistrer</button></Link>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-6 pb-5">
                        <div className="mb-3 border-bottom border-brown border-2">
                            <label htmlFor="title" className="form-label fw-bold fs-4 text-black">Nom de la recette:</label>
                            <input type="text" className={`form-control form-control-outline ${formErrors.title ? 'is-invalid' : ''}`} id="title" placeholder="Nom de la recette" value={title} onChange={handleTitleChange} required />
                            {formErrors.title && <div className="invalid-feedback">Veuillez entrer un nom de recette valide.</div>}
                        </div>

                        <div className="mx-4 mb-3 my-1">
                            <label htmlFor="recipeimage" className="form-label fw-bold fs-4 text-black">Image de la recette</label>
                            <div style={{ minHeight: "250px" }} className='bg-secondary-subtle' id='recipeimage'>
                                {imageUrl && (
                                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: '250px' }} />
                                )}
                            </div>
                            <input
                                className={`form-control mt-2 ${formErrors.photo ? 'is-invalid' : ''}`}
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                            {formErrors.photo && <div className="invalid-feedback">Veuillez télécharger une image pour la recette.</div>}
                        </div>

                        <div>
                            <div className="border-bottom border-2 border-brown">
                                <label htmlFor="recipeDescription" className="form-label fw-bold fs-4 text-black">Description de la recette</label>
                                <textarea
                                    id="recipeDescription"
                                    className={`form-control form-control-lg border-0 out rounded-2 ${formErrors.description ? 'is-invalid' : ''}`}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    maxLength="250"
                                    rows="1"
                                    placeholder='Décrivez la recette'
                                    required
                                ></textarea>
                                {formErrors.description && <div className="invalid-feedback">Veuillez entrer une description valide pour la recette.</div>}
                            </div>
                            <p className="text-end mb-3"><small className="text-muted">{description.length}/250</small></p>
                        </div>

                        <h3 className='fw-bold'>Ingrédients:</h3>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-input border-bottom border-3 border-brown input-group mb-3">
                                <input
                                    className={`form-control out border-0 ${formErrors.ingredients ? 'is-invalid' : ''}`}
                                    type="text"
                                    value={ingredient}
                                    onChange={(event) => handleChange(index, event)}
                                    placeholder={`Ingrédient ${index + 1}`}
                                    required
                                />
                                <button type="button" className='btn btn-light' onClick={() => handleRemoveIngredient(index)}><MdDelete size={25} color='#B55D51' /></button>
                            </div>
                        ))}
                        <button type="button" className='btn btn-light' onClick={handleAddIngredient}><IoIosAddCircleOutline size={30} color='#B55D51' /></button>

                        <h3 className='fw-bold mt-5 mb-2'>Instructions:</h3>
                        {items.map((item, index) => (
                            <div key={index} className="item-input">
                                <h4>Etape {index + 1}</h4>
                                <div className="photo-container photo mb-2">
                                    {item.photo ? (
                                        <img src={item.photo} onClick={() => document.getElementById(`photo-input-${index}`).click()} alt={`Photo ${index + 1}`} className="photo" />
                                    ) : (
                                        <div className='bg-secondary-subtle rounded-3 photo my-2 mx-1 align-items-center row justify-content-center fw-bold' onClick={() => document.getElementById(`photo-input-${index}`).click()}>
                                            <MdOutlineAddAPhoto size={30} className='mt-3' />
                                            <p className='text-center'>Ajouter</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id={`photo-input-${index}`}
                                        onChange={(event) => handlePhotoChange(index, event)}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className="input-group border-bottom border-3 border-brown mb-3">
                                    <textarea
                                        value={item.instructions}
                                        onChange={(event) => handleInstructionsChange(index, event)}
                                        placeholder=""
                                        rows="3"
                                        className={`form-control form-control-lg text-height out border-0 ${formErrors.instructions ? 'is-invalid' : ''}`}
                                        aria-label="With textarea"
                                        required
                                    ></textarea>
                                    <button type="button" className='btn btn-light input-group-text' onClick={() => handleRemoveItem(index)}><MdDelete size={25} color='#B55D51' /></button>
                                </div>
                                {formErrors.instructions && <div className="invalid-feedback">Veuillez entrer des instructions valides pour l'étape.</div>}
                            </div>
                        ))}
                        <button type="button" className='btn btn-light' onClick={handleAddItem}><IoIosAddCircleOutline size={30} color='#B55D51' /></button>

                        <div className="my-3">
                            <label htmlFor="portion" className="form-label fw-bold fs-4 text-black">Portion</label>
                            <input type="text" className={`form-control ${formErrors.servings ? 'is-invalid' : ''}`} id="portion" placeholder="Cette recette nourira combien de personnes?" value={servings} onChange={handleServingsChange} required />
                            {formErrors.servings && <div className="invalid-feedback">Veuillez entrer le nombre de portions correctement.</div>}
                        </div>

                        <div className="my-3">
                            <label htmlFor="prep" className="form-label fw-bold fs-4 text-black">Temps de préparation</label>
                            <input type="text" className={`form-control ${formErrors.prepTime ? 'is-invalid' : ''}`} id="prep" placeholder="Temps de préparation" value={prepTime} onChange={handlePrepTimeChange} required />
                            {formErrors.prepTime && <div className="invalid-feedback">Veuillez entrer le temps de préparation correctement.</div>}
                        </div>

                        <div className="my-3">
                            <label htmlFor="cuisson" className="form-label fw-bold fs-4 text-black">Temps de cuisson</label>
                            <input type="text" className={`form-control ${formErrors.cookTime ? 'is-invalid' : ''}`} id="cuisson" placeholder="Temps de cuisson" value={cookTime} onChange={handleCookTimeChange} required />
                            {formErrors.cookTime && <div className="invalid-feedback">Veuillez entrer le temps de cuisson correctement.</div>}
                        </div>

                        <div className="my-3">
                            <label htmlFor="cuisine" className="form-label fw-bold fs-4 text-black">Cuisine</label>
                            <select className={`form-select ${formErrors.cuisine ? 'is-invalid' : ''}`} aria-label="Default select example" id='cuisine' value={cuisine} onChange={handleCuisineChange} required>
                                <option value="">---------------</option>
                                <option value="Africaine">Africaine</option>
                                <option value="Européenne">Européenne</option>
                                <option value="Américaine">Américaine</option>
                                <option value="Italienne">Italienne</option>
                            </select>
                            {formErrors.cuisine && <div className="invalid-feedback">Veuillez sélectionner une cuisine.</div>}
                        </div>

                        <div className="my-3">
                            <label htmlFor="categorie" className="form-label fw-bold fs-4 text-black">Catégorie</label>
                            <select className={`form-select ${formErrors.category ? 'is-invalid' : ''}`} aria-label="Default select example" id='categorie' required value={category} onChange={handleCategoryChange}>
                                <option value="">---------------</option>
                                <option value="Petit Déjeuner">Petit Déjeuner</option>
                                <option value="Fast Food">Fast Food</option>
                                <option value="Dîner">Dîner</option>
                                <option value="Casse-croute">Casse-croute</option>
                            </select>
                            {formErrors.category && <div className="invalid-feedback">Veuillez sélectionner une categorie.</div>}
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default CreateRecipe