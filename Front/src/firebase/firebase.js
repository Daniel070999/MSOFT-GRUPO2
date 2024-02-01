import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHu-W42A2-rxVGfgQ9Ag3-_Umd40VRSfI",
    authDomain: "proyecto-msoft-2fa.firebaseapp.com",
    projectId: "proyecto-msoft-2fa",
    storageBucket: "proyecto-msoft-2fa.appspot.com",
    messagingSenderId: "854698024331",
    appId: "1:854698024331:web:d996fbfcda8810eadc638e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
