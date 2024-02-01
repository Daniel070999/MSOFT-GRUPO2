package ec.edu.ups.controller;

import ec.edu.ups.model.InformationRequest;
import ec.edu.ups.model.RequestUrlDTO;
import ec.edu.ups.service.IScanService;
import ec.edu.ups.service.IVirusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("scan")
public class VirusTotalController {

    @Autowired
    IScanService scanService;

    @Autowired
    IVirusService virusService;

    @PostMapping("/url")
    public ResponseEntity<Object> scanUrl(@RequestBody RequestUrlDTO requestUrlDTO) {
        Map<String, Object> response = scanService.scanUrlProcess(requestUrlDTO.getUrl());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/ip")
    public ResponseEntity<String> getConsultIP(@RequestBody InformationRequest informationRequest) throws Exception {
        String virusTotalEntity = virusService.getConsultIP(informationRequest);
        if (virusTotalEntity == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(virusTotalEntity);
    }

}
