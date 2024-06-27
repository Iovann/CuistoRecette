import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const GoogleLoginButton = () => {
    const handleSuccess = async (response) => {
        // try {
        //     console.log('Google Login Success:', response);
        //     const res = await axios.post('http://localhost:8000/api/google-login/', {
        //         access_token: response.credential,
        //     });
        //     console.log('Login successful:', res.data);
        // } catch (error) {
        //     console.error('Login failed:', error);
        // }
    };

    const handleFailure = (error) => {
        console.error('Login failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;