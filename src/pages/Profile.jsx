import React, { useState, useRef } from 'react';
import NavbarProfile from '../components/NavbarProfile';
import Footer from '../components/footer';
import { CiBookmark } from "react-icons/ci";
import { BiSolidCategory } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { useAuth } from '../contexts/AuthContext';
import { BsPersonCircle } from "react-icons/bs";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateEmail, sendEmailVerification } from "firebase/auth";
import firebaseApp from '../firebaseConfig';

const Profile = () => {
  const { userData } = useAuth();
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [avatar, setAvatar] = useState(userData.avatar);
  const [newAvatar, setNewAvatar] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');


  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const fullname = `${userData.firstName} ${userData.lastName}`

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewAvatar(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const db = getFirestore(firebaseApp);

  const reauthenticateUser = async (currentPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      console.log("User reauthenticated");
    } catch (error) {
      console.error("Error reauthenticating user:", error);
      throw error;
    }
  };

  const updatePasswordForUser = async (currentPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await reauthenticateUser(currentPassword);
      await updatePassword(user, newPassword);
      console.log("Password updated");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const updateEmailForUser = async (currentPassword, newEmail) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore(firebaseApp);
  
    try {
      // Step 1: Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
  
      // Step 2: Update email in Firebase Authentication
      await updateEmail(user, newEmail);
  
      // Step 3: Send verification email
      await sendEmailVerification(user, { url: window.location.href });
      alert(`A verification email has been sent to ${newEmail}. Please verify your new email address.`);
  
      // Step 4: Listen for email verification
      auth.onAuthStateChanged(async (updatedUser) => {
        if (updatedUser && updatedUser.emailVerified) {
          // Step 5: Update email in Firestore
          const userDocRef = doc(db, "users", updatedUser.uid);
          await updateDoc(userDocRef, { email: newEmail });
          console.log("Email updated in Firestore");
          alert('Email updated successfully in Firestore');
        }
      });
    } catch (error) {
      console.error("Error updating email:", error);
      alert('Error updating email: ' + error.message);
    }
  };



  const auth = getAuth();
  const user = auth.currentUser;

  const handleSaveChanges = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      const storage = getStorage(firebaseApp);
      let avatarURL = avatar;

      if (newAvatar) {
        const storageRef = ref(storage, `avatars/${userData.id}/${newAvatar.name}`);
        await uploadBytes(storageRef, newAvatar);
        avatarURL = await getDownloadURL(storageRef);
      }

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        phoneNumber,
        avatar: avatarURL
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <NavbarProfile name={fullname} image={avatar} />
      <div className="container mt-5">
        <div className='row justify-content-between align-items-center'>
          <div className="col-6">
            <p className='fw-bolder display-5 mb-0'>Profil</p>
          </div>
          <div className="col-6 text-end">
            <button onClick={handleSaveChanges} className='btn bg-brown text-capitalize mb-0 text-white fw-bolder'>Enregistrer</button>
          </div>
        </div>
        <hr />
        <div className="row align-items-center">
          <div className="col-lg-2 text-center">
            <div className='circle-container mx-auto d-flex align-items-center justify-content-center'>
              {avatar ? <img src={avatar} className='circle-image' alt="Avatar" /> : <BsPersonCircle size={120} color='#B55D51' />}
            </div>
            <p className='text-center text-dark fw-bolder mt-2'>{firstName} {lastName}</p>
          </div>
          <div className="col-lg-3 gx-3 d-flex justify-content-xl-evenly justify-content-center">
            <button onClick={handleButtonClick} className='btn bg-brown fw-semibold text-white mb-3 mx-3' >Modifier la photo</button>
            <button onClick={() => setAvatar('')} className='btn fw-semibold mb-3 mx-3' style={{ backgroundColor: '#EDEDED' }} >Supprimer</button>
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

        <p className="display-6 fw-bolder mt-5 text-center text-lg-start">Sécurité</p>
        <div className='row gx-5  flex-wrap align-items-center'>
          <div className="col-lg-4 text-center text-lg-start">
            <button className='btn bg-brown text-white fw-bolder' data-bs-toggle="modal" data-bs-target="#changePasswordModal"><Si1Password className='me-2' size={20} />Modifier son mot de passe</button>
          </div>
        </div>
        <div className='row gx-5 flex-wrap align-items-center py-3'>
          <div className="col-lg-4 text-center text-lg-start">
            <button className='btn bg-brown text-white fw-bolder' data-bs-toggle="modal" data-bs-target="#changeEmailModal"><MdOutlineMarkEmailUnread className='me-2' size={20} />Modifier mon email</button>
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


        {/* Change Password Modal */}
        <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changePasswordModalLabel">Modifier le mot de passe</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">Mot de passe actuel</label>
                  <input type="password" className="form-control" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
                  <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" className="btn btn-primary" onClick={() => updatePasswordForUser(currentPassword, newPassword)}>Enregistrer</button>
              </div>
            </div>
          </div>
        </div>


        {/* Change Email Modal */}
        <div className="modal fade" id="changeEmailModal" tabIndex="-1" aria-labelledby="changeEmailModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changeEmailModalLabel">Modifier l'email</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="currentEmailPassword" className="form-label">Mot de passe actuel</label>
                  <input type="password" className="form-control" id="currentEmailPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="newEmail" className="form-label">Nouvel email</label>
                  <input type="email" className="form-control" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" className="btn btn-primary" onClick={() => updateEmailForUser(currentPassword, newEmail)}>Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;