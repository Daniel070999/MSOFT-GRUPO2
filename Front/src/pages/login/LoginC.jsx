import React, { useRef } from "react";

export function LoginC({ loginWithEmailAndPassword }) {
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.current.value && password.current.value) {
      loginWithEmailAndPassword(email.current.value, password.current.value);
    } else {
      alert('Debe llenar los campos');
    }
  }

  return (
    <section>
      <h2 >Iniciar Sesión</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo:</label>
          <div className="input-wrapper">
            <input
              ref={email}
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su correo"
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <label >Clave:</label>
          <div className="input-wrapper">
            <input
              ref={password}
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese su clave"
              className="input-field"
            />
          </div>
        </div>

        <button type="submit" className="button-30">Iniciar Sesión</button>
      </form>
    </section>
  );
}
