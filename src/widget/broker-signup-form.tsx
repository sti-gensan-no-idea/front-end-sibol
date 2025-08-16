// This file is deprecated - redirects to unified signup
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BrokerSignUpCardForm = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to unified signup with broker role pre-selected
    navigate('/signup?role=broker', { replace: true });
  }, [navigate]);

  return null;
};