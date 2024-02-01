import { useRef } from "react";

function RegisterPhone({ getPhoneNumber }) {
    const phoneNumber = useRef(null);

    const handleClick = () => {
        if (phoneNumber.current) {
            getPhoneNumber(phoneNumber.current.value);
        }
    }

    return (
        <>
            <hr />
            <p>Ingrese su número de teléfono, incluyendo el código de país</p>
            <div className="form-group">
                <div className="input-wrapper">
                    <input
                        ref={phoneNumber}
                        type="phone"
                        name="phone"
                        id="phone"
                        placeholder="Ej. +593 912 345 578"
                        className="input-field"
                    />
                </div>
            </div>
            <button onClick={handleClick} className="button-30">Enviar Código</button>
        </>
    );
}

export default RegisterPhone;