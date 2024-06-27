import React, { useState, useEffect } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Footer from '../components/footer';
import { CiBookmark } from "react-icons/ci";
import { BiSolidCategory } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";

const Profile = () => {
  const [infos, setInfos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null); // Use null to handle file object

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.files[0]); // Set file object directly

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          throw new Error("Token not found");
        }
        // const response = await axios.get('http://localhost:8000/api/user/profile/', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        setInfos(response.data);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setEmail(response.data.user.email);
        setPhoneNumber(response.data.phone_number);
        setAvatar(response.data.avatar); // Assuming avatar is a File object from backend
      } catch (error) {
        setError('Erreur de récupération du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmitAvatar = async () => {
    try {
      const token = localStorage.access;
      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();
      formData.append('user.first_name', firstName);
      formData.append('user.last_name', lastName);
      formData.append('user.email', email);
      formData.append('phone_number', phoneNumber);
      if (password) {
        formData.append('user.password', password);
      }
      if (avatar) {
        formData.append('avatar', avatar);
      }

      // const response = await axios.put('http://localhost:8000/api/user/profile/', formData, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data',
      //   }
      // });
      setInfos(response.data);
      alert('Profil mis à jour avec succès');
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!infos) {
    return <div>No profile information available</div>;
  }

  const isFormValid = firstName && lastName && email && phoneNumber;

  return (
    <div>
      <NavbarProfile name={infos.user.last_name} />
      <div className="container mt-5">
        <div className='row justify-content-between align-items-center'>
          <div className="col-6">
            <p className='fw-bolder display-5 mb-0'>Profil</p>
          </div>
          <div className="col-6 text-end">
            <button className='btn bg-brown text-capitalize mb-0 text-white fw-bolder' onClick={handleSubmitAvatar}>Enregistrer</button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-2 col-10 text-center">
            <div className='circle-container mx-auto'>
              <img src={avatar ? URL.createObjectURL(avatar) : "/public/assets/icons/avatar.jpg"} className='circle-image' alt="" />
            </div>
            <p className='text-center text-dark fw-bolder'>{firstName} {lastName}</p>
          </div>
        </div>

        <div className="row mt-5">
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
            <div className="mb-4 border-bottom border-2 border-brown">
              <label className="form-label fw-semibold" htmlFor="photo">Photo de Profil</label>
              <input
                type="file"
                id="photo"
                className="form-control out border-0"
                onChange={handleAvatarChange}
              />
            </div>
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