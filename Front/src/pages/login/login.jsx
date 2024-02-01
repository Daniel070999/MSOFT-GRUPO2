import React, { useState } from 'react';
import useRecaptcha from '../../hooks/useRecaptcha';
import { login, verifyUserMFA } from '../../firebase/authentication'
import { auth } from '../../firebase/firebase';
import { LoginC } from './LoginC';
import { CodeSignIn } from '../user/CodeSignIn';

function LoginPage() {
  const recaptcha = useRecaptcha('recaptcha');
  const [verificationId, setVerificationId] = useState();
  const [resolver, setResolver] = useState();


  const loginWithEmailAndPassword = async (email, password) => {
    const response = await login(email, password);
    if (response === true) {
      if (!auth.currentUser.emailVerified) {
        alert('Priemro debe verificar su correo');
      } else {
        window.location.href = ('/user');
      }
    } else {
      await handleMFA(response);
    }
  }

  const handleMFA = async (response) => {
    if (response.code === 'auth/multi-factor-auth-required' && recaptcha) {
      const data = await verifyUserMFA(
        response,
        recaptcha,
        0
      );

      if (!data) {
        alert('Problemas en la verificación de 2FA');
      } else {
        const { verificationId, resolver } = data;
        setVerificationId(verificationId);
        setResolver(resolver);
      }
    } else {
      alert('Credenciales no válidas');
    }
  }

  return (
    <>
      {!verificationId && !resolver && (
        <LoginC
          loginWithEmailAndPassword={loginWithEmailAndPassword}
        />
      )}
      {verificationId && resolver && (
        <CodeSignIn
          verificationId={verificationId}
          resolver={resolver}
        />
      )}
      <div id='recaptcha'></div>
    </>
  );
}

export default LoginPage;
