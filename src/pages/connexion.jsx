import React, { useState } from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Loading from '../components/Loading';
import { FcGoogle } from "react-icons/fc";
import firebaseApp from '../firebaseConfig';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import DividerWithText from '../components/divider';


const Connexion = () => {
  initMDB({ Input, Ripple });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      const auth = getAuth(firebaseApp);
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

  const handleSignIn = async () => {
    const auth = getAuth(firebaseApp);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate('/user');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error ${errorCode}: ${errorMessage}`);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <div className='row justify-content-center align-items-center vh-100'>
        <div className=" col-11 col-md-8 col-lg-6 col-xl-5">
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

              <button type="submit" className="btn bg-brown text-white fw-bold btn-block w-100 mb-4" onClick={handleSignIn}>
                Connexion
              </button>
              <DividerWithText text="ou" />
              <div className="row justify-content-center">
                <div className="col-12 text-center mx-auto d-flex justify-content-center">
                  <button
                    data-mdb-ripple-init
                    type="button"
                    className="btn btn-secondary-subtle rounded-pill btn-floating py-2 text-start d-flex align-items-center"
                    onClick={handleGoogleSignUp}
                    style={{backgroundColor:"#EDEDED"}}
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
    </div>
  );
}

export default Connexion;
