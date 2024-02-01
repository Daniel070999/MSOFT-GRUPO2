import React, { useRef } from "react";

const Code = ({ getCode }) => {
    const finalCode = useRef(null);

    const handleClick = () => {
        getCode(finalCode.current.value);
    };

    return (
        <>
            <p >Ingrese el código enviado a su teléfono</p>
            <div >
                <div className="input-wrapper">
                    <input
                        ref={finalCode}
                        type="text"
                        name="number"
                        id="number"
                        placeholder="Ingrese el código"
                        className="input-field"
                    />
                </div>

            </div>
            <button onClick={handleClick} className="button-30">Validar Código</button>
        </>
    );
};

export default Code;
