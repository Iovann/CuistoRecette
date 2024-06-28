import React, { useState } from 'react';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Loading from '../components/Loading';
import firebaseApp from '../firebaseConfig';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import DividerWithText from '../components/divider';

const Inscription = () => {
  initMDB({ Input, Ripple });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const avatar = ""
  const navigate = useNavigate();

  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      const db = getFirestore(firebaseApp);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phoneNumber,
        avatar
      });

      navigate('/user');
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
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
            <h2 className='text-center my-4'>Rejoignez notre Communauté</h2>
            <form onSubmit={handleSubmit} className='fw-semibold'>
              <div className="row mb-4 gx-3">
                <div className="col-6">
                  <div className="form-outline border-bottom border-2 border-brown">
                    <label className="form-label mb-0" htmlFor="form3Example1">Nom</label>
                    <input
                      type="text"
                      id="form3Example1"
                      className="form-control out border-0"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label mb-0" htmlFor="form3Example2">Prénom</label>
                  <div className="form-outline border-bottom border-2 border-brown">
                    <input
                      type="text"
                      id="form3Example2"
                      className="form-control out border-0"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4 border-bottom border-2 border-brown">
                <label className="form-label mb-0" htmlFor="form3Example3">Email</label>
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control out border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4 border-bottom border-2 border-brown">
                <label className="form-label mb-0" htmlFor="form6Example6">Téléphone</label>
                <input
                  type="tel"
                  id="form6Example6"
                  className="form-control out border-0"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4 border-bottom border-2 border-brown">
                <label className="form-label mb-0" htmlFor="form3Example4">Mot de passe</label>
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control out border-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                data-mdb-ripple-init
                type="submit"
                className="btn bg-brown text-white fw-bold btn-block w-100 mb-4"
              >
                S'inscrire
              </button>

              <div className="d-flex justify-content-center">{loading && <Loading />}</div>
              <div className="">
              <DividerWithText text="ou" />
              <div className="row justify-content-center">
                  <div className="col-12 text-center mx-auto d-flex justify-content-center">
                    <button
                      data-mdb-ripple-init
                      type="button"
                      className="btn rounded-pill btn-floating py-2 text-start d-flex align-items-center"
                      onClick={handleGoogleSignUp}
                      style={{backgroundColor:"#EDEDED"}}
                    >
                      <FcGoogle className='mx-2 ' size={30} />
                      <span className='text-capitalize'>S'inscrire <span className="text-lowercase">avec </span>Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
