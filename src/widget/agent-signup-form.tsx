// This file is deprecated - redirects to unified signup
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AgentSignUpCardForm = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to unified signup with agent role pre-selected
    navigate('/signup?role=agent', { replace: true });
  }, [navigate]);

  return null;
};