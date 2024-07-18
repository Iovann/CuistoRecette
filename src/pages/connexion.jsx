import React, { useState } from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Loading from '../components/Loading';
import { FcGoogle } from "react-icons/fc";
import firebaseApp from '../firebaseConfig';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import DividerWithText from '../components/divider';

const Connexion = () => {
  initMDB({ Input, Ripple });
  const [reset, setReset] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const displayName = user.displayName || "";
      const nameParts = displayName.split(" ");
      const lastName = nameParts[0] || "";
      const firstName = nameParts.slice(1).join(" ") || "";

      const db = getFirestore(firebaseApp);
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        avatar: user.photoURL
      };

      await setDoc(doc(db, "users", user.uid), userData);
      navigate('/user');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendEmailVerification(user, { url: window.location.href });
      await sendPasswordResetEmail(auth, reset);
      console.log("Email de réinitialisation envoyé.");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de réinitialisation : ", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate('/user');
    } catch (error) {
      handleAuthError(error);
      console.error(`Error ${error.code}: ${error.message}`);
    }
  };

  const handleAuthError = (err) => {
    switch (err.code) {
      case 'auth/invalid-email':
        setError('Adresse email invalide.');
        break;
      case 'auth/user-disabled':
        setError("Cet utilisateur a été désactivé.");
        break;
      case 'auth/user-not-found':
        setError("Aucun utilisateur trouvé avec cet email.");
        break;
      case 'auth/wrong-password':
        setError('Mot de passe incorrect.');
        break;
      default:
        setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <div className="container">
      <div className='row justify-content-center align-items-center vh-100'>
        <div className="col-11 col-md-8 col-lg-6 col-xl-5">
          <p className="d-flex justify-content-center align-items-center">
            <img src="/assets/icons/logo.svg" className='img-fluid' alt="" />
            <span className='fw-bolder fs-3'>Cuisto<span style={{ color: "#974344" }}>Recettes</span> </span>
          </p>

          <div className="shadow-lg px-4 py-5 rounded-5">
            <Link to="/" className='fw-semibold text-black text-decoration-none'>
              <MdOutlineArrowBackIosNew size={20} className='mx-2' />Retour a l'Acceuil
            </Link>
            <h2 className='text-center my-4'>Connexion</h2>
            <form onSubmit={handleSubmit} className='fw-semibold'>
              <label className="form-label fw-semibold mb-0" htmlFor="form3Example3">Email</label>
              <div className="form-outline mb-4 border-bottom border-2 border-brown">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control border-0 out"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-2 border-bottom border-2 border-brown">
                <label className="form-label mb-0 fw-semibold" htmlFor="form3Example4">Mot de passe</label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control border-0 out"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <p className='text-end cursor' data-bs-toggle="modal" data-bs-target="#resetPassword"> Mot de passe oublié? </p>

              <button type="submit" className="btn bg-brown text-white fw-bold btn-block w-100 mb-4">
                Connexion
              </button>
              {error && <p className='text-center alert alert-danger'>{error}</p>}
              <p className='text-center my-0'>Vous êtes nouveau? <Link to={"/inscription"} className='brown ms-2 text-decoration-none'>Rejoignez notre communauté</Link></p>

              <DividerWithText text="ou" />
              <div className="row justify-content-center">
                <div className="col-12 text-center mx-auto d-flex justify-content-center">
                  <button
                    data-mdb-ripple-init
                    type="button"
                    className="btn btn-secondary-subtle rounded-pill btn-floating py-2 text-start d-flex align-items-center"
                    onClick={handleGoogleSignUp}
                    style={{ backgroundColor: "#EDEDED" }}
                  >
                    <FcGoogle className='mx-2 ' size={30} />
                    <span className='text-capitalize'>S'inscrire <span className="text-lowercase">avec </span>Google</span>
                  </button>
                </div>
              </div>
            </form>
            {loading && <Loading />}
          </div>
        </div>
      </div>

      <div className="modal fade" id="resetPassword" tabIndex="-1" aria-labelledby="resetPassword" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="resetPassword">Rénitialisation du mot de passe</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="currentEmailPassword" className="form-label">Votre adresse mail</label>
                <input type="email" className="form-control" id="currentEmailPassword" value={reset} onChange={(e) => setReset(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary-subtle" data-bs-dismiss="modal">Fermer</button>
              <button type="button" className="btn bg-brown border border-light text-white" onClick={handlePasswordReset}>Envoyer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
