import React, { useRef } from "react";

function ApiC() {

    const validarURL = useRef(null);
    const validarIP = useRef(null);
    const validarArchivo = useRef(null);

    const validateURL = () => {
        console.log(validarURL.current.value);
    }
    const validateIP = () => {
        console.log(validarIP.current.value);
    }
    const validateFile = () => {
        console.log(validarArchivo.current.files[0]);
    }

    return (
        <>
            <div className="form-group">
                <label >Validar URL:</label>
                <div className="input-wrapper">
                    <input
                        ref={validarURL}
                        type="text"
                        name="text"
                        id="textUrl"
                        placeholder="Ingrese una URL"
                        className="input-field"
                    />
                    <button onClick={() => validateURL()} className="button-30">Validar</button>
                </div>
            </div>
            <div className="form-group">
                <label >Validar IP:</label>
                <div className="input-wrapper">
                    <input
                        ref={validarIP}
                        type="text"
                        name="text"
                        id="textIP"
                        placeholder="Ingrese una IP"
                        className="input-field"
                    />
                    <button onClick={() => validateIP()} className="button-30">Validar</button>
                </div>
            </div>
            <div className="form-group">
                <label >Comprobar archivos:</label>
                <div className="input-wrapper">
                    <input
                        ref={validarArchivo}
                        type="file"
                        name="file"
                        id="file"
                        className="input-field"
                    />
                    <button onClick={() => validateFile()} className="button-30">Validar</button>
                </div>
            </div>
        </>
    )
}
export default ApiC;