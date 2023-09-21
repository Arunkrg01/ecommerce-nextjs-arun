// components/PrivateRoute.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children, isLoggedIn }) => {
  const router = useRouter();

  const [jwtData, setJwtData] = useState();
  

  useEffect(() => {
    const storedUserData = localStorage.getItem('jwtToken');
    if (!storedUserData) {
      router.push('/auth'); 
    }
  }, []);

  return children;
};

export default PrivateRoute;
