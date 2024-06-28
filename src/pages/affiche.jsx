import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { userData } = useAuth();

  if (!userData) {
    return <p>No user data found</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Avatar:</strong> {userData.avatar || 'N/A'}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
    </div>
  );
};

export default UserProfile;
