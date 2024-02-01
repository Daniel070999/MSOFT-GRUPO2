import { verifyUserEnrolled } from "../../firebase/authentication";
import Code from './Code';

const CodeSignIn = ({ verificationId, resolver }) => {

    const getCode = async (code) => {
        const response = await verifyUserEnrolled(
            {
                verificationId,
                resolver
            },
            code
        );

        if (response) {
            window.location.href = ('/user');
        } else {
            alert('Código no válido');
        }
    };

    return (
        <Code getCode={getCode} />
    );
};

export { CodeSignIn };
