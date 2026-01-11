import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
;

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // Check if user is logged in
        let response = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
          method: 'GET',
          credentials: 'include', // include cookies
          cache: 'no-store',
        });

        // If token expired, try refreshing
        if (!response.ok) {
          const refreshRes = await fetch(`${BACKEND_URL}/api/refresh`, {
            method: 'POST',
            credentials: 'include',
            cache: 'no-store',
          });

          if (!refreshRes.ok) {
            navigate('/guest/login', { replace: true });
            return;
          }

          response = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
          });
        }

        const data = await response.json();

        // Only allow admin access
        if (data.role !== 'admin') {
          navigate('/guest/login', { replace: true });
          return;
        }

        setIsLoading(false);
      } catch (error) {
        navigate('/guest/login', { replace: true });
      }
    };

    checkLogin();
  }, [navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
