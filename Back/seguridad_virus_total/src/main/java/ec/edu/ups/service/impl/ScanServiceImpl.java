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

    @Override
    public Map<String, Object> scanUrlProcess(String url) {
        try {
            log.info("URL DE LA PAGINA WEB QUE SE VA A ANALIZAR: {}", url);

            String response = virusTotalClient.sendPostRequest(url);
            log.info("RESPUESTA DE INGRESO DE LA URL PARA EL ESCANEO: {}", response.replaceAll("\\R", " "));

            String newUrl = getNewUrl(response);

            TimeUnit.SECONDS.sleep(1L);

            response = virusTotalClient.sendGetRequest(newUrl);
            log.info("RESPUESTA DE ESCANEO DE LA URL: {}", response.replaceAll("\\R", " "));

            return util.getMapOfString(response);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public Map<String, Object> scanFile(MultipartFile multipartFile) {
        try {
            File file = util.convertMultipartFileToFile(multipartFile);
            String response = virusTotalClient.sendFile(file);
            log.info("RESPUESTA DE INGRESO DEL ARCHIVO PARA EL ESCANEO: {}", response.replaceAll("\\R", " "));

            String newUrl = getNewUrl(response);

            TimeUnit.SECONDS.sleep(2L);

            response = virusTotalClient.sendGetRequest(newUrl);

            log.info("RESPUESTA DE ESCANEO DEL ARCHIVO: {}", response.replaceAll("\\R", " "));

            return util.getMapOfString(response);

        } catch (Exception e) {
            throw new RuntimeException("ERROR AL ESCANEAR EL ARCHIVO EN VIRUS TOTAL " + e.getMessage());
        }
    }

    private String getNewUrl(String response) {
        Map<String, Object> responseMap = util.getMapOfString(response);
        Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
        Map<String, Object> linksMap = (Map<String, Object>) dataMap.get("links");
        return String.valueOf(linksMap.get("self"));
    }

}
