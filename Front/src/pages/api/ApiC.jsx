import React, { useRef, useState } from "react";

function ApiC() {
    const validarURL = useRef(null);
    const validarIP = useRef(null);
    const validarArchivo = useRef(null);
    const [data, setData] = useState();
    const [generalData, setGeneralData] = useState();

    /**
     * Método que sirve para obtener el response del backend
     * @param {*} url Url del endpoint a consumir
     * @param {*} body Body del form a consumir
     * @returns 
     */
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

    /**
     * Método que cierra el modal en el cual se presenta la información
     */
    const closeModal = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    };

    /**
     * Método que sirve para manejar la validación de URL
     */
    const validateURL = async () => {
        const urlForm = validarURL.current.value;
        if (!urlForm) {
            alert('Debe ingresar una URL');
            return;
        }
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setData();
        setGeneralData();
        let formattedData;
        try {
            const result = await makeRequest("http://localhost:8081/scan/url", { url: urlForm });
            const jsonData = JSON.parse(result);
            formattedData = Object.entries(Object.assign({ 'URL': urlForm }, jsonData.data.attributes.stats))
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
            setGeneralData(result);
            setData(formattedData);
        } catch (error) {
            setData('URL no válido');
        }


    };

    /**
     * Método que sirve para manejar la validación de IP
     */
    const validateIP = async () => {
        const IPForm = validarIP.current.value;
        if (!IPForm) {
            alert('Debe ingresar una IP');
            return;
        }
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setData();
        setGeneralData();
        let formattedData;
        try {
            const result = await makeRequest("http://localhost:8081/scan/ip", { ip: IPForm })
            const jsonData = JSON.parse(result);
            const ownerIP = jsonData.data.attributes.as_owner
            formattedData = Object.entries(Object.assign(
                { 'IP': IPForm },
                { 'Owner': ownerIP },
                jsonData.data.attributes.last_analysis_stats))
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
            setGeneralData(result);
            setData(formattedData);
        } catch (error) {
            setData('IP no válido');
        }
    };

    /**
     * Método que sirve para validar los archivos
     */
    const validateFile = () => {
        const fileForm = validarArchivo.current.files[0];
        if (!fileForm) {
            alert('Debe subir un archivo');
            return;
        }
        const maxSizeInBytes = 10 * 1024 * 1024;
        if (fileForm.size > maxSizeInBytes) {
            alert('El archivo no debe ser mayor a 10MB');
            return;
        }
        var formdata = new FormData();
        formdata.append("file", fileForm);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        setData();
        setGeneralData();
        let formattedData;
        try {
            fetch("http://localhost:8081/scan/file", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const jsonData = JSON.parse(result);
                    formattedData = Object.entries(jsonData.data.attributes.stats)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('\n');
                    setGeneralData(result);
                    setData(formattedData);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            setData('Archivo no válido');
        }
    };

    /**
     * Método que sirve para descargar todo el contenido consultado de la verificación
     */
    const downloadData = () => {
        const currentDate = new Date();
        const formattedDate = currentDate
            .toLocaleString()
            .replace(/,|:|\//g, '_')
            .replace(/\s+/g, '_')
            .replace('--', '_')
            .replace(/^-/, '')
            .replace(/-$/, '');

        const blob = new Blob([generalData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'analisis-' + formattedDate + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
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
                    {!data ? (
                        <p>Cargando...</p>
                    ) : (
                        <div>
                            {data.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                            {generalData ? (
                                <>
                                    Ver información completa: &nbsp;
                                    <button className="button-30" onClick={downloadData}>Descargar</button>
                                </>
                            ) : (<></>)}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ApiC;
