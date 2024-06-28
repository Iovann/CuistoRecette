import React, { useState, useRef } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Footer from '../components/footer';
import { CiBookmark } from "react-icons/ci";
import { BiSolidCategory } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";
import { useAuth } from '../contexts/AuthContext';
import { BsPersonCircle } from "react-icons/bs";



const Profile = () => {
  const { userData } = useAuth();
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(userData.avatar);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const fullname = `${userData.firstName} ${userData.lastName}`

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };
  return (
    <div>
      <NavbarProfile name={fullname} image={userData.avatar} />
      <div className="container mt-5">
        <div className='row justify-content-between align-items-center'>
          <div className="col-6">
            <p className='fw-bolder display-5 mb-0'>Profil</p>
          </div>
          <div className="col-6 text-end">
            <button className='btn bg-brown text-capitalize mb-0 text-white fw-bolder'>Enregistrer</button>
          </div>
        </div>
        <hr />
        <div className="row align-items-center">
          <div className="col-lg-2 text-center">
            <div className='circle-container mx-auto d-flex align-items-center justify-content-center'>
              {userData.avatar && <img src={userData.avatar} className='circle-image' alt="" />}
              {!userData.avatar && <BsPersonCircle size={120} color='#B55D51' />}
            </div>
            <p className='text-center text-dark fw-bolder mt-2'>{firstName} {lastName}</p>
          </div>


          <div className="col-lg-3 gx-3 d-flex justify-content-xl-evenly justify-content-center">
            <button onClick={handleButtonClick} className='btn bg-brown fw-semibold text-white mb-3 mx-3' >Modifier la photo</button>
            <button onClick={handleButtonClick} className='btn fw-semibold mb-3 mx-3' style={{backgroundColor: '#EDEDED'}} >Supprimer</button>
          </div>
        </div>

        <div className="row mt-xl-5">
          <div className="col-lg-5">
            <div className="mb-4 border-bottom border-2 border-brown">
              <label className="form-label fw-semibold" htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                className="form-control out border-0"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mb-4 border-bottom border-2 border-brown">
              <label className="form-label fw-semibold" htmlFor="prenom">Prenom</label>
              <input
                type="text"
                id="prenom"
                className="form-control out border-0"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mb-4 border-bottom border-2 border-brown">
              <label className="form-label fw-semibold" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control out border-0"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mb-4 border-bottom border-2 border-brown">
              <label className="form-label fw-semibold" htmlFor="num">Téléphone</label>
              <input
                type="text"
                id="num"
                className="form-control out border-0"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="border-bottom border-2 border-brown">
              <label className="form-label fw-semibold" htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                className="form-control out border-0"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <p className='text-end fw-semibold brown'>Changer le mot de passe</p>
          </div>
          <div className="col-lg-5">
            <input
              type="file"
              id="photo"
              ref={fileInputRef}
              className="form-control out border-0"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <p className="display-6 fw-bolder mt-5 text-center text-lg-start">Organisation personnalisée</p>
        <div className='row gx-5  flex-wrap align-items-center'>
          <div className="col-lg-4 text-center text-lg-start">
            <button className='btn bg-brown text-white fw-bolder'><CiBookmark /> Mes Favoris</button>
          </div>
          <div className="col-lg-3 d-none d-xl-block">
            <p>Voir mes favoris</p>
          </div>
        </div>
        <div className='row gx-5 flex-wrap align-items-center py-3'>
          <div className="col-lg-4 text-center text-lg-start">
            <button className='btn bg-brown text-white fw-bolder'><BiSolidCategory className='me-2' />Catégories</button>
          </div>
          <div className="col-lg-3 d-none d-xl-block">
            <p>Categorie de recettes</p>
          </div>
        </div>

        <hr />
        <div className="row pt-2 pb-5 justify-content-between">
          <div className="col-sm-6"><PiSignOutBold className='mx-3' size={30} />Se déconnecter</div>
          <div className="col-sm-6 mt-4 mt-sm-0 text-end brown fw-bolder">Supprimer le compte</div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Profile;