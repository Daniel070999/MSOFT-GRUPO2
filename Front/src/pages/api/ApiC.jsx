import React, { useEffect, useRef, useState } from "react";

function ApiC() {
    const validarURL = useRef(null);
    const validarIP = useRef(null);
    const validarArchivo = useRef(null);
    const [data, setData] = useState();

    const makeRequest = async (url, body) => {
        try {
            const myHeaders = new Headers({
                "Content-Type": "application/json",
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body),
                redirect: 'follow',
            };

            const response = await fetch(url, requestOptions);
            const result = await response.text();
            return result;
        } catch (error) {
            console.log('error', error);
        }
    };

    const closeModal = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    };

    const validateURL = async () => {
        const urlForm = validarURL.current.value;
        if (!urlForm) {
            alert('Debe ingresar una URL');
            return;
        }
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setData();
        setData(await makeRequest("http://localhost:8080/scan/url", { url: urlForm }));
    };

    const validateIP = async () => {
        const IPForm = validarIP.current.value;
        if (!IPForm) {
            alert('Debe ingresar una IP');
            return;
        }
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setData();
        setData(await makeRequest("http://localhost:8080/scan/ip", { ip: IPForm }));
    };

    const validateFile = () => {
        const fileForm = validarArchivo.current.files[0];
        if (!fileForm) {
            alert('Debe subir un archivo');
            return;
        }
        console.log(fileForm);
    };

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
                        placeholder="https://www.google.com"
                        className="input-field"
                    />
                    <button onClick={validateURL} className="button-30">Validar</button>
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
                        placeholder="8.8.8.8"
                        className="input-field"
                    />
                    <button onClick={validateIP} className="button-30">Validar</button>
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
                    <button onClick={validateFile} className="button-30">Validar</button>
                </div>
            </div>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p>{!data ? (<>Cargando...</>) : (<>{data}</>)}</p>
                </div>
            </div>
        </>
    );
}

export default ApiC;
