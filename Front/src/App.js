import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import { auth } from './firebase/firebase';
import RegisterC from './pages/register/RegisterC';
import UserC from './pages/user/UserC';
import LoginPage from './pages/login/login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifySession = () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        setUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = verifySession();
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        {user ? (
          <>
            <Route path="user" element={<UserC currentUser={auth.currentUser} />} />
          </>
        ) : (<></>
        )}

        <Route path="register" element={<RegisterC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
