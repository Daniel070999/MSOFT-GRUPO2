import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator, sendEmailVerification, getMultiFactorResolver
} from "@firebase/auth";
import { auth } from "./firebase";

/**
 * Método que sirve para el registro de una persona
 * @param {*} email correo de la persona que se va a registrar
 * @param {*} password clave de la persona que se va a registrar
 * @returns boolean - true o false si el registro se realiza sin problemas
 */
const registerFirebase = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Método que sirve para iniciar sesión
 * @param {*} email correo que se valida para iniciar sesion
 * @param {*} password clave que se valida para iniciar sesion
 * @returns boolean true o false si el logeo es correcto 
 */
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (e) {
        return e;
    }
}

/**
 * Método que sirve para cerrar la sesion que se encuentre vigente y redirecciona al home '/'
 * @returns boolean - true o false si se cierra sesion correctamente
 */
const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = '/';
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Método que sirve para verificar si el usuario tiene más de un método de iniciar sesión
 * @param {*} user 
 * @returns 
 */
const verifyIfUserIsEnrolled = (user) => {
    const enrolledFactors = multiFactor(user).enrolledFactors;
    return enrolledFactors.length > 0;
}

/**
 * Método que sirve para validar el número de teléfono
 * @param {*} user usuario en sesión
 * @param {*} phoneNumber número de teléfono a validar
 * @param {*} recaptchaVerifier captcha usado 
 * @returns retorna la verificación del número, 
 * caso contrario indica error en el formato del número
 */
const verifyPhoneNumber = async (user, phoneNumber, recaptchaVerifier) => {
    const session = await multiFactor(user).getSession();
    const phoneInfoOptions = {
        phoneNumber,
        session
    };

    const phoneAuthProvider = new PhoneAuthProvider(auth);
    try {
        return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
    } catch (e) {
        if (e.code === 'auth/invalid-phone-number') {
            return 'errorPhone';
        }
        return false;
    }
}

/**
 * Método que crea el segundo factor de inicio de sesión
 * @param {*} user usuario actual en sesion 
 * @param {*} verificationCodeId id del código de verificacion
 * @param {*} verificationCode codigo de verificación enviado al teléfono
 * @returns boolean - true o false si se creo correctamente el segundo factor de 
 * inicio de sesion
 */
const enrollUser = async (user, verificationCodeId, verificationCode) => {
    const phoneAuthCredential = PhoneAuthProvider.credential(verificationCodeId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

    try {
        await multiFactor(user).enroll(multiFactorAssertion, 'Teléfono');
        return true;
    } catch (e) {
        return false;
    }
}

const unEnrollUser = async (currentUser) => {
    try {
        const multiFactorUser = multiFactor(currentUser);
        await multiFactorUser.unenroll(multiFactorUser.enrolledFactors[0]);
        return true;
    } catch (error) {
        return error;
    }
}
/**
 * Método que sirve para el envío de código al teléfono cada vez que inicia sesión
 * @param {*} error error de requerimiento para inciar sesión "auth/multi-factor-auth-required"
 * @param {*} recaptchaVerifier captcha verificado
 * @param {*} selectedIndex selección del factor de inicio de sesión (siempre será 0 ya que es 
 * el único que se está trabajando)
 * @returns retorna el id del código generado para validar con el código que llega 
 * al teléfono 
 */
const verifyUserMFA = async (error, recaptchaVerifier, selectedIndex) => {
    const resolver = getMultiFactorResolver(auth, error);

    if (resolver.hints[selectedIndex].factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
        const phoneInfoOptions = {
            multiFactorHint: resolver.hints[selectedIndex],
            session: resolver.session
        };

        const phoneAuthProvider = new PhoneAuthProvider(auth);
        try {
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
            return { verificationId, resolver };
        } catch (e) {
            return false;
        }
    }
}

/**
 * Método que sirve para la validación del segundo factor de inicio de sesión
 * @param {*} verificationMFA  contiene el id del código a verificar 
 * @param {*} verificationCode contiene el código enviado al teléfono
 * @returns boolean - true o false si se logró verificar
 */
const verifyUserEnrolled = async (verificationMFA, verificationCode) => {
    const { verificationId, resolver } = verificationMFA;
    const credentials = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credentials);

    try {
        await resolver.resolveSignIn(multiFactorAssertion);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Método que sirve para enviar un correo de verificación al usuario en sesión
 */
const verifyUserEmail = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
    } catch (e) {
        console.log(e);
    }
}

export {
    registerFirebase,
    login,
    logout,
    verifyIfUserIsEnrolled,
    verifyUserEnrolled,
    verifyPhoneNumber,
    enrollUser,
    unEnrollUser,
    verifyUserMFA,
    verifyUserEmail
}