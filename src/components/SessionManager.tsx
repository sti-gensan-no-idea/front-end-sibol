import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { useAuth } from '../hooks/useAuth';

export const SessionManager: React.FC = () => {
  const { 
    isAuthenticated, 
    userRole, 
    userEmail, 
    sessionExpiry, 
    logout, 
    refreshSession,
    checkSession 
  } = useAuth();
  
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!sessionExpiry || !isAuthenticated) return;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = sessionExpiry - now;
      
      if (remaining <= 0) {
        logout();
        return;
      }
      
      // Show warning when 15 minutes or less remaining
      setShowWarning(remaining <= 15 * 60 * 1000);
      
      // Format time remaining
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [sessionExpiry, isAuthenticated, logout]);

  if (!isAuthenticated) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className={`w-80 ${showWarning ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
        <CardBody className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${checkSession() ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div className="text-sm">
                <p className="font-medium">{userEmail}</p>
                <p className="text-xs text-gray-600 capitalize">{userRole} Account</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-medium ${showWarning ? 'text-orange-600' : 'text-gray-600'}`}>
                Session: {timeRemaining}
              </p>
              <div className="flex space-x-1 mt-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={refreshSession}
                  className="text-xs px-2 py-1 h-6"
                >
                  Extend
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  variant="ghost"
                  onClick={logout}
                  className="text-xs px-2 py-1 h-6"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
          
          {showWarning && (
            <div className="mt-2 text-xs text-orange-700 bg-orange-100 p-2 rounded">
              ⚠️ Your session will expire soon. Click "Extend" to continue.
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};