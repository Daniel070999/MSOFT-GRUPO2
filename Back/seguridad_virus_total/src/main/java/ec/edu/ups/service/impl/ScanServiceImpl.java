package ec.edu.ups.service.impl;

import ec.edu.ups.restclient.VirusTotalClient;
import ec.edu.ups.service.IScanService;
import ec.edu.ups.utils.Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

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
            log.info("response: {}", response);

            Map<String, Object> responseMap = util.getMapOfString(response);
            Map<String, Object> dataMap = (Map<String, Object>) responseMap.get("data");
            Map<String, Object> linksMap = (Map<String, Object>) dataMap.get("links");
            String newUrl = String.valueOf(linksMap.get("self"));

            response = virusTotalClient.sendGetRequest(newUrl);
            return util.getMapOfString(response);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }


}
