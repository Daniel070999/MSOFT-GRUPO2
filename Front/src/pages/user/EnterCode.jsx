import { enrollUser } from "../../firebase/authentication";
import Code from "../../pages/user/Code";

function EnterCode({ currentUser, verificationCodeId }) {

    const getCode = async (code) => {
        const response = await enrollUser(
            currentUser,
            verificationCodeId,
            code
        );

        if (response) {
            alert('Validación correcta');
            window.location.href = ('/user');
        } else {
            alert('Código no válido.');
        }
    };

    return <Code getCode={getCode} />;
};

export default EnterCode;
