import React, { useState, useEffect } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Footer from '../components/footer';
import { RiShareBoxFill } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import Star from '../components/star';
import Commentaire from '../components/Commentaire';
import { FaTelegramPlane } from "react-icons/fa";
import { Rating } from 'primereact/rating';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore, updateDoc, arrayUnion, arrayRemove, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { getAuth } from 'firebase/auth';

const Recipe = () => {
  const [value, setValue] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();
  const db = getFirestore(firebaseApp);
  const { userData } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, "rating");
        const q = query(commentsRef, where("recipeId", "==", id));
        const querySnapshot = await getDocs(q);

        const commentsList = querySnapshot.docs.map((doc) => doc.data());
        setComments(commentsList);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const checkIfFavorite = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().favorites.includes(id)) {
          setFavorite(true);
        }
      } catch (error) {
        console.error("Error checking if favorite:", error);
      }
    };

    fetchRecipe();
    fetchComments();
    checkIfFavorite();
  }, [id, auth.currentUser.uid, db]);

  console.log(auth.currentUser.uid)

  useEffect(() => {
    if (recipe) {
      setIngredients(
        recipe.ingredients ? recipe.ingredients.map((ingredient) => ({ name: ingredient, checked: false })) : []
      );
    }
  }, [recipe]);

  const addBook = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);

      if (favorite) {
        await updateDoc(userRef, {
          favorites: arrayRemove(id),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(id),
        });
      }

      setFavorite(!favorite);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    if (value === 0) {
      alert("Veuillez noter la recette avant d'envoyer votre commentaire.");
      return;
    }

    try {
      const ratingRef = collection(db, "rating");
      const fullname = `${userData.firstName} ${userData.lastName}`
      await addDoc(ratingRef, {
        comment: comment,
        rating: value,
        recipeId: id,
        userId: auth.currentUser.uid,
        userName: fullname,
        photo: userData.avatar,
      });
      const q = query(ratingRef, where("recipeId", "==", id));
      const querySnapshot = await getDocs(q);

      let totalRating = 0;
      let ratingCount = 0;

      querySnapshot.forEach((doc) => {
        totalRating += doc.data().rating;
        ratingCount++;
      });

      const newAverageRating = totalRating / ratingCount;

      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        rating: newAverageRating,
      });

      alert("Votre commentaire et note ont été ajoutés avec succès !");
      setComment("");
      setValue(0);
      fetchComments();
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Une erreur est survenue lors de l'envoi de votre commentaire. Veuillez réessayer.");
    }
  };

  const handleCheckboxChange = (index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].checked = !newIngredients[index].checked;
    setIngredients(newIngredients);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const fullname = `${userData.firstName} ${userData.lastName}`;
  return (
    <div>
      <NavbarProfile name={fullname} image={userData.avatar} />
      <div className="container">
        <p className="text-end">
          <RiShareBoxFill className='mx-2' size={25} />
          {favorite ? (
            <FaBookmark className='mx-2' size={25} onClick={addBook} />
          ) : (
            <CiBookmark className='mx-2' size={25} onClick={addBook} />
          )}
        </p>
        <h1 className='disply-4 fw-bolder'>{recipe.title}</h1>

        <div className='d-flex align-items-center mt-3 flex-wrap'>
          <span className='mb-0 me-sm-2'>
            <img src={recipe.createdBy.photoURL} className='rounded-circle avatar img-fluid' alt="" />
          </span>
          <span className='fw-bold'>{recipe.createdBy.name}</span>
          <span className='mx-4'>
            <FaRegMessage /><span className='mx-2'>{comments.length}</span>
          </span>
          <Star count={recipe.rating} />
        </div>
        <hr />

        <p className='fw-semibold text-black'>{recipe.description}</p>

        <div className="row recipe-image" style={{ backgroundImage: `url(${recipe.photo})` }}></div>
        <div className="row py-3">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-4">
                Temps PREPARATION <br />
                <span className='fw-bold text-black'>{recipe.prepTime} min</span>
              </div>
              <div className="col-1 border-start border-2 border-black"></div>
              <div className="col-3">
                Temps CUISSON <br />
                <span className='fw-bold text-black'>{recipe.cookTime} min</span>
              </div>
              <div className="col-1 border-start border-2 border-black"></div>
              <div className="col-3">
                PORTION <br />
                <span className='fw-bold text-black'>Pour {recipe.servings} Personnes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-lg-4">
            <h3>Ingrédients</h3>
            <ul className="list-group flex-nowrap">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={ingredient.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span className='fw-semibold text-black' style={{ textDecoration: ingredient.checked ? 'line-through' : 'none' }}>
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-8 mt-5 pt-lg-0">
            <h3>Instructions de Recette</h3>
            <ul className="list-group list-group-flush">
              {recipe.steps && recipe.steps.map((instruction, index) => (
                <li key={index} className="list-group-item">
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-2 col-sm-3 col-4 border-end border-2 text-center">
                      {instruction.photo && (
                        <img
                          src={instruction.photo}
                          alt={`Instruction ${index + 1}`}
                          className="img-thumbnail mt-2"
                          style={{ maxWidth: '100px' }}
                        />
                      )}

                      {!instruction.photo && (
                        <img
                          src="/assets/icons/logo.svg"
                          alt={`Instruction ${index + 1}`}
                          className="img-thumbnail mt-2"
                          style={{ maxWidth: '100px' }}
                        />
                      )}
                    </div>
                    <div className="col-lg-10 col-sm-9 col-8 d-flex">
                      <div className="row">
                        <div className="d-none d-lg-block col-lg-1 text-end">
                          <span className="me-2 px-2 py-1 rounded-circle bg-brown text-white fw-bolder fw-bold">{index + 1}</span>
                        </div>
                        <div className="col-lg-10">
                          <span className=''>{instruction.instructions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='border border-5 border-danger my-5' />

        <p className='fw-bold display-5 pt-5 pb-2'>Commentaires <span className='fs-6'>({comments.length})</span></p>
        {
          comments.map((item, index) => (
            <Commentaire key={index} photo={item.photo} text={item.comment} fullname={item.userName} />
          ))
        }
        <div className="row">
          <p className='fw-bold fs-1 py-3'>Évaluez cette recette et partagez votre avis</p>
          <div className="mb-3 col-lg-8">
            <p className='text-start'><Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} /></p>
            <textarea className="form-control bg-secondary-subtle" onChange={handleChangeComment} rows="6"></textarea>
            <p className='text-end mt-1'>
              <button className='btn bg-brown text-white fw-bold text-capitalize' onClick={handleSubmit}> <FaTelegramPlane className='me-2' size={20} />Envoyer</button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recipe;
