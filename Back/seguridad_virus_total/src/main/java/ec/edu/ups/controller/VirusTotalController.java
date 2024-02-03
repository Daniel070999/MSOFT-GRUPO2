package ec.edu.ups.controller;

import ec.edu.ups.model.InformationRequest;
import ec.edu.ups.model.RequestUrlDTO;
import ec.edu.ups.service.IScanService;
import ec.edu.ups.service.IVirusService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("scan")
public class VirusTotalController {

    @Autowired
    IScanService scanService;

    @Autowired
    IVirusService virusService;

    @Value("${max.capacity.file}")
    private Long maxCapacityFile;

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

    @PostMapping("/file")
    public ResponseEntity<Object> scanFile(@RequestParam("file") MultipartFile multipartFile) {

        if (multipartFile.getSize() > maxCapacityFile) {
            log.error("El ARCHIVO SUPERA LA CAPACIDAD MAXIMA");
            return new ResponseEntity<>(Map.of("ERROR","ARCHIVO SUPERA LA CAPACIDAD MAXIMA"), HttpStatusCode.valueOf(413));
        }

        Map<String, Object> response = scanService.scanFile(multipartFile);
        return ResponseEntity.ok(response);
    }

}
