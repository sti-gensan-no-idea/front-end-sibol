// This file is deprecated - redirects to unified signup
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DeveloperSignUpCardForm = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to unified signup with developer role pre-selected
    navigate('/signup?role=developer', { replace: true });
  }, [navigate]);

  return null;
};