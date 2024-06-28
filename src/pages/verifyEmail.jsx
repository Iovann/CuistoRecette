import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';
import Loading from '../components/Loading';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const { firstName, lastName, email, phoneNumber, avatar, uid } = location.state;

  useEffect(() => {
    const checkEmailVerified = async () => {
      try {
        const user = auth.currentUser;
        await user.reload();
        if (user.emailVerified) {
          const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            avatar
          };
          await setDoc(doc(db, "users", uid), userData);
          navigate('/user');
        } else {
          alert('Please verify your email before proceeding.');
          navigate('/inscription');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };
    checkEmailVerified();
  }, [auth, db, firstName, lastName, email, phoneNumber, avatar, uid, navigate]);

  return (
    <div className="container">
      <div className='row justify-content-center align-items-center vh-100'>
        <div className="col-11 col-md-8 col-lg-6 col-xl-5">
          <p className="d-flex justify-content-center align-items-center">
            <img src="/assets/icons/logo.svg" className='img-fluid' alt="" />
            <span className='fw-bolder fs-3'>Cuisto<span style={{ color: "#974344" }}>Recettes</span> </span>
          </p>
          <div className="shadow-lg px-4 py-5 rounded-5">
            <h2 className='text-center my-4'>Verification de l'Email</h2>
            <div className="d-flex justify-content-center"><Loading /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
