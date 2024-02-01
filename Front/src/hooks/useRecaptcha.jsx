import { useEffect, useState } from "react";
import { RecaptchaVerifier } from "@firebase/auth";
import { auth } from "../firebase/firebase";

function useRecaptcha(componentId) {
    const [recaptcha, setRecaptcha] = useState();

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(componentId, {
            size: "invisible",
            callback: () => { }
        }, auth);

        setRecaptcha(recaptchaVerifier);

        return () => {
            if (recaptchaVerifier.clear) {
                recaptchaVerifier.clear();
            }
        };
    }, [componentId]);

    return recaptcha;
}

export default useRecaptcha;