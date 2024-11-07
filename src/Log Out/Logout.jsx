import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Log the user out when this component mounts
    handleLogout();
    navigate('/login'); // Redirect to login or home page after logout
  }, [handleLogout, navigate]);

  return null; // Optionally render a loading spinner or message if you like
}

export default Logout;
