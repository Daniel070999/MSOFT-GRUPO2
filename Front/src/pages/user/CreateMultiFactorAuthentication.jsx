import { useState } from "react";
import { logout, verifyPhoneNumber } from "../../firebase/authentication";
import useRecaptcha from "../../hooks/useRecaptcha";
import RegisterPhone from "./RegisterPhone";
import EnterCode from "./EnterCode";

const CreateMultiFactorAuthentication = ({ currentUser }) => {
    const recaptcha = useRecaptcha('captcha');
    const [verificationCodeId, setVerificationCodeId] = useState(null);

    const getPhoneNumber = async (phoneNumber) => {
        if (!currentUser || !recaptcha) {
            return;
        }

        const verificationId = await verifyPhoneNumber(
            currentUser,
            phoneNumber,
            recaptcha
        );
        if (!verificationId) {
            alert('Vuelva a iniciar sesion para activar 2FA');
            logout();
        } else if (verificationId === 'errorPhone') {
            alert('Error en el formato de número');
        } else {
            setVerificationCodeId(verificationId);
        }
    };

    return (
        <>
            {!verificationCodeId && (
                <RegisterPhone
                    getPhoneNumber={getPhoneNumber}
                />
            )}
            {verificationCodeId && currentUser && (
                <EnterCode
                    currentUser={currentUser}
                    verificationCodeId={verificationCodeId}
                />
            )}
            <div id='captcha'></div>
        </>
    );
};

export default CreateMultiFactorAuthentication;
