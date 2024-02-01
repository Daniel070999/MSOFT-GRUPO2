import React from "react";

function Home() {

  const iniciarSesion = () => {
    window.location.href = 'login';
  }
  const registrarse = () => {
    window.location.href = 'register';
  }

  return (
    <section className="section-home">
      <h1 >Sistema de autenticación de dos factores (2FA)</h1>
      <h3 >Universidad Politécnica Salesiana - SEGURIDAD INFORMÁTICA</h3>
      <h2 >Grupo 2</h2>
      <h2 >Integrantes</h2>
      <p >Daniel Patiño</p>
      <p >John Tenesaca</p>
      <p >Saul </p>
      <p >Christian Delgado</p>
      <div>
        <button className="button-30" onClick={() => iniciarSesion()}>Iniciar Sesión</button>
        <button className="button-30" onClick={() => registrarse()}>Registrarse</button>
      </div>


    </section>
  );
}

export default Home;
