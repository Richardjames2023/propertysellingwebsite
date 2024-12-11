
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('userId');

    console.log("Access Token:", accessToken);
    console.log("Stored User:", storedUser);

    if (accessToken && storedUser) {
      try {
        //const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(storedUser);
      } catch (error) {
        console.error("Failed to parse user data from local storage:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  return { isAuthenticated, user };
};