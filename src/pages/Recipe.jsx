import React, { useState } from 'react'
import NavbarProfile from '../components/NavbarProfile'
import Footer from '../components/footer'
import { RiShareBoxFill } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import Star from '../components/star';
import Commentaire from '../components/Commentaire';
import { FaTelegramPlane } from "react-icons/fa";
import { Rating } from 'primereact/rating';


const Recipe = () => {
  const [value, setValue] =useState(0)
  const [favorite, setFavorite] = useState(true)
  const addBook = () => { setFavorite(!favorite) }
  const initialIngredients = [
    "450g de spaghetti",
    "450g de viande hachée maigre",
    "1 oignon haché finement",
    "2 gousses d'ail hachées finement",
    "1 carotte coupée en dés",
    "1 branche de céleri coupée en dés",
    "1 boîte (400g) de tomates concassées",
    "1 boîte (150ml) de bouillon de bœuf",
    "1 cuillère à soupe de concentré de tomate",
    "1 cuillère à café d'origan séché",
    "1/2 cuillère à café de thym séché",
    "Sel et poivre noir au goût",
    "Parmesan râpé (facultatif)"
  ];

  const instructions = [
    {
      text: "Cuire les spaghettis selon les instructions sur l'emballage.",
      photo: "./assets/images/food_2.jpg"
    },
    {
      text: "Pendant que les spaghettis cuisent, préparer la sauce bolognaise :",
      photo: "./assets/images/food_3.jpg"
    },
    {
      text: "Faire chauffer l'huile d'olive dans une grande poêle à feu moyen.",
      photo: "./assets/images/food_4.jpg"
    },
    {
      text: "Ajouter l'oignon, l'ail, la carotte et le céleri et cuire jusqu'à ce qu'ils soient tendres, environ 5 minutes.",
      photo: "./assets/images/food_5.jpg"
    },
    {
      text: "Ajouter la viande hachée et cuire en la brisant à la cuillère jusqu'à ce qu'elle soit bien dorée.",
      photo: "./assets/images/food_6.jpg"
    },
    {
      text: "Incorporer les tomates concassées, le bouillon de bœuf, le concentré de tomate, l'origan, le thym, le sel et le poivre.",
      photo: "./assets/images/food_11.jpg"
    },
    {
      text: "Porter à ébullition, puis réduire le feu et laisser mijoter à découvert pendant 30 minutes, ou jusqu'à ce que la sauce épaississe.",

    },
    {
      text: "Égoutter les spaghettis et les ajouter à la sauce bolognaise. Mélanger pour bien enrober.",
      photo: "./assets/images/food_9.jpg"
    },
    {
      text: "Servir immédiatement, garni de parmesan râpé si désiré.",
      photo: "./assets/images/food_10.jpg"
    }
  ];

  const [ingredients, setIngredients] = useState(
    initialIngredients.map(ingredient => ({ name: ingredient, checked: false }))
  );

  const handleCheckboxChange = (index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].checked = !newIngredients[index].checked;
    setIngredients(newIngredients);
  };


  return (
    <div>
      <NavbarProfile />
      <div className="container">
        <p className="text-end">
          <RiShareBoxFill className='mx-2' size={25} />
          {favorite && <FaBookmark className='mx-2' size={25} onClick={addBook} />}
          {!favorite && <CiBookmark className='mx-2' size={25} onClick={addBook} />}
        </p>
        <h1 className='disply-4 fw-bolder'>Spaghetti bolognaise</h1>

        <div className='d-flex align-items-center mt-3 flex-wrap'>
          <span className='mb-0 me-sm-2'><img src="/public/assets/icons/avatar.jpg" className='rounded-circle avatar img-fluid' alt="" /></span>
          <span className='fw-bold'>Tricia Albert</span>
          <span className='mx-4'><FaRegMessage /><span className='mx-2'>25</span></span>
          <Star count={5} />
        </div>
        <hr />

        <p className='fw-semibold text-black'>
          Les spaghettis à la bolognaise sont un plat de pâtes italien classique composé de spaghettis cuits nappés d'une sauce riche à base de viande hachée, de tomates, de légumes et d'épices. C'est un plat savoureux et réconfortant qui est apprécié dans le monde entier.
        </p>

        <div className="row">
          <img src="./assets/images/banner_9.jpg" alt="" />
        </div>
        <div className="row py-3">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-4">
                Temps PREPARATION <br />
                <span className='fw-bold text-black'>15 min</span>
              </div>
              <div className="col-1 border-start border-2 border-black"></div>
              <div className="col-3">
                Temps CUISSON <br />
                <span className='fw-bold text-black'>15 min</span>
              </div>
              <div className="col-1 border-start border-2 border-black"></div>
              <div className="col-3">
                PORTION <br />
                <span className='fw-bold text-black'>Pour 4 Personnes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-lg-4">
            <h3>Ingrédients</h3>
            <ul className="list-group  flex-nowrap">
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
              {instructions.map((instruction, index) => (
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
                          <span>{instruction.text}</span>
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

        <p className='fw-bold display-5 py-5'>Commentaires <span className='fs-6'>(25)</span></p>
        <Commentaire />
        <Commentaire />
        <Commentaire />
        <Commentaire />
        <Commentaire />

          <div className="row">
            <p className='fw-bold fs-1 py-3'>Évaluez cette recette et partagez votre avis</p>
            <div class="mb-3 col-lg-8">
              <p className='text-start'><Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} /></p>
              <textarea class="form-control bg-secondary-subtle" rows="6"></textarea>
              <p className='text-end mt-1'>
                <button className='btn bg-brown text-white fw-bold text-capitalize'> <FaTelegramPlane className='me-2' size={20} />Envoyer</button>
              </p>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Recipe
