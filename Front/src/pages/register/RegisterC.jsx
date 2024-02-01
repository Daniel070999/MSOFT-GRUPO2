import { useRef } from "react";
import { registerFirebase, verifyUserEmail } from "../../firebase/authentication";

function RegisterC() {
    const email = useRef(null);
    const password = useRef(null);



    const register = async (event) => {
        event.preventDefault();

        if (email.current.value && password.current.value) {
            const response = await registerFirebase(email.current.value, password.current.value);
            await verifyUserEmail();
            if (response) {
                alert('Se envió un enlace de verificación a su correo');
                window.location.href = '/';
            } else {
                alert('Error al crear la cuenta');
            }
        }else{
            alert('Debe llenar los campos');
        }
    }


    return (
        <>
            <h2>Registrarse</h2>
            <form id="loginForm" onSubmit={register}>
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

                <button type="submit" className="button-30">Registrarse</button>
            </form>
        </>
    );
}

export default RegisterC;