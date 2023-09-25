import { googleLogout } from '@react-oauth/google';
import React, { useState } from 'react';

const Test = () => {
    const handleLogoutSuccess = () => {
        // Handle successful logout here
        console.log('Logged out successfully');
        googleLogout();
      };
  return (
    <button onClick={handleLogoutSuccess}>logut</button>
  );
};

export default Test;
