package ec.edu.ups.service.impl;

import ec.edu.ups.restclient.VirusTotalClient;
import ec.edu.ups.service.IScanService;
import ec.edu.ups.utils.Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class ScanServiceImpl implements IScanService {

    @Autowired
    VirusTotalClient virusTotalClient;

    @Autowired
    Util util;

    /**
     * Este metodo se encarga de preparar la trama que se envia al api de virus total para escanear una url recibida en
     * el endpoint expuesto
     *
     * @param url dominio que se va  a analizar
     * @return Map<String, Object> con la respuesta del analisis
     */
    @Override
    public Map<String, Object> scanUrlProcess(String url) {
        try {
            log.info("URL DE LA PAGINA WEB QUE SE VA A ANALIZAR: {}", url);

            String response = virusTotalClient.sendUrlScanRequest(url);
            log.info("RESPUESTA DE INGRESO DE LA URL PARA EL ESCANEO: {}", response.replaceAll("\\R", " "));

            String newUrl = getNewUrl(response);

            TimeUnit.SECONDS.sleep(1L);

            response = virusTotalClient.sendResponseRequest(newUrl);
            log.info("RESPUESTA DE ESCANEO DE LA URL: {}", response.replaceAll("\\R", " "));

            return util.getMapOfString(response);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    /**
     * Este metodo se encarga de preparar la trama que se envia al api de virus total para escanear un archivo recibido
     * en el endpoint expuesto
     *
     * @param multipartFile Archivo que se envia a virus total para el analisis
     * @return Map<String, Object> con la informacion obtenida coo respuesta de virus total
     */
    @Override
    public Map<String, Object> scanFile(MultipartFile multipartFile) {
        try {
            File file = util.convertMultipartFileToFile(multipartFile);
            String response = virusTotalClient.sendFileScanRequest(file);
            log.info("RESPUESTA DE INGRESO DEL ARCHIVO PARA EL ESCANEO: {}", response.replaceAll("\\R", " "));

            String newUrl = getNewUrl(response);

            TimeUnit.SECONDS.sleep(2L);

            response = virusTotalClient.sendResponseRequest(newUrl);

            log.info("RESPUESTA DE ESCANEO DEL ARCHIVO: {}", response.replaceAll("\\R", " "));

            return util.getMapOfString(response);

        } catch (Exception e) {
            throw new RuntimeException("ERROR AL ESCANEAR EL ARCHIVO EN VIRUS TOTAL " + e.getMessage());
        }
    }

    /**
     * Este metodo se encarga de extraer la url del analisis con la url obtenida vuelve a enviar una peticion a virus
     * total para extraer el resultado del analisis
     *
     * @param response respuesta obtenida desde virus total
     * @return String url para recuperar el resultado del analisis del archivo y de la url
     */
    private String getNewUrl(String response) {
        Map<String, Object> responseMap = util.getMapOfString(response);
        Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
        Map<String, Object> linksMap = (Map<String, Object>) dataMap.get("links");
        return String.valueOf(linksMap.get("self"));
    }

}
