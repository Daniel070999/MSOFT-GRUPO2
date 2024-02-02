import { useState } from "react";
import { logout, unEnrollUser, verifyIfUserIsEnrolled } from "../../firebase/authentication";
import CreateMultiFactorAuthentication from "./CreateMultiFactorAuthentication";
import { auth } from "../../firebase/firebase";
import ApiC from "../api/ApiC";

function UserC({ currentUser }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const savePhoneNoMFA = async () => {
        const savePhone = await unEnrollUser(currentUser);
        if (savePhone.code === 'auth/requires-recent-login') {
            alert('Debe volver a iniciar sesion');
            logout();
            window.location.href = '/';
        } else if (savePhone) {
            alert('2FA desactivado');
            window.location.href = '/user';
        }
    }


    return (
        <section>
            <h2 >Usuario en sesión</h2>
            <button onClick={logout} className="button-30">Cerrar sesión</button>
            {
                currentUser && currentUser.emailVerified && !verifyIfUserIsEnrolled(currentUser) ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <span>Activar 2FA: </span>
                            &nbsp;
                            &nbsp;
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                    </>) : (<>
                        <p>¿Cancelar 2FA?</p>
                        <button onClick={() => savePhoneNoMFA()} className="button-30">Cancelar 2FA</button>
                    </>)
            }
            {
                isChecked &&
                < CreateMultiFactorAuthentication currentUser={auth.currentUser} />
            }
            <hr />
            <ApiC />
        </section>
    );
}

export default UserC;
